import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import {
  LOCATION_HIERARCHY,
  CITY_COORDINATES,
  calculateDistanceKm,
  findClosestLocation,
  getCountryByCode
} from '../data/locations';

export const COUNTRIES = LOCATION_HIERARCHY;
export { CITY_COORDINATES, calculateDistanceKm };

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  // Read persisted location, defaulting intelligently (e.g. India / Maharashtra / Mumbai or previous selection)
  const [country, setCountryState] = useState(() => localStorage.getItem('imovies_country') || 'IN');
  const [stateName, setStateName] = useState(() => localStorage.getItem('imovies_state') || 'Maharashtra');
  const [city, setCityState] = useState(() => localStorage.getItem('imovies_city') || 'Mumbai');

  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [loadingCinemas, setLoadingCinemas] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState(null);

  const activeCountry = getCountryByCode(country);
  const currentStateObj =
    activeCountry.states?.find((s) => s.name.toLowerCase() === stateName.toLowerCase()) ||
    activeCountry.states?.[0] || { name: stateName, cities: [city] };

  // Fetch cinemas whenever country, state, or city updates
  useEffect(() => {
    localStorage.setItem('imovies_country', country);
    localStorage.setItem('imovies_state', stateName);
    localStorage.setItem('imovies_city', city);

    const fetchCinemas = async () => {
      try {
        setLoadingCinemas(true);
        const { data } = await API.get('/cinemas', {
          params: { country, city, state: stateName }
        });
        setCinemas(data || []);
        if (data && data.length > 0) {
          setSelectedCinema(data[0]);
        } else {
          setSelectedCinema(null);
        }
      } catch (err) {
        console.error('Failed to load cinemas for location:', err);
      } finally {
        setLoadingCinemas(false);
      }
    };

    fetchCinemas();
  }, [country, stateName, city]);

  // Hierarchical country change: resets state and city to first available in chosen country
  const handleCountryChange = (newCountryCode) => {
    const targetCountry = getCountryByCode(newCountryCode);
    if (targetCountry) {
      setCountryState(targetCountry.code);
      const firstState = targetCountry.states?.[0];
      const newState = firstState ? firstState.name : '';
      const newCity = firstState?.cities?.[0] || 'Main City';
      setStateName(newState);
      setCityState(newCity);
    }
  };

  // Hierarchical state change: resets city to first available in chosen state
  const handleStateChange = (newStateName) => {
    setStateName(newStateName);
    const targetState = activeCountry.states?.find(
      (s) => s.name.toLowerCase() === newStateName.toLowerCase()
    );
    if (targetState && targetState.cities.length > 0) {
      setCityState(targetState.cities[0]);
    }
  };

  const handleCityChange = (newCityName) => {
    setCityState(newCityName);
  };

  // Browser Geolocation: With automatic country, state, city detection and India preselection
  const detectCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = 'Geolocation is not supported by your browser.';
        setLocationStatus({ error: err });
        reject(new Error(err));
        return;
      }

      setDetectingLocation(true);
      setLocationStatus({ loading: true, message: 'Detecting your coordinates...' });

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          // Perform reverse geocoding if online, with offline geometric fallback
          let detected = findClosestLocation(userLat, userLng);

          try {
            // Lightweight reverse geocoding via OpenStreetMap Nominatim with fast timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2500);
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${userLat}&lon=${userLng}&format=json`,
              { signal: controller.signal }
            );
            clearTimeout(timeoutId);
            if (res.ok) {
              const geoData = await res.json();
              const addr = geoData.address || {};
              const detectedCountryCode = (addr.country_code || '').toUpperCase();
              const detectedCity =
                addr.city || addr.town || addr.village || addr.suburb || addr.municipality || detected.city;
              const detectedState = addr.state || detected.state;

              if (detectedCountryCode === 'IN') {
                detected = {
                  country: 'IN',
                  state: detectedState || 'Maharashtra',
                  city: detectedCity || 'Mumbai',
                  distanceKm: detected.distanceKm
                };
              } else if (detectedCountryCode) {
                const matchCountry = LOCATION_HIERARCHY.find((c) => c.code === detectedCountryCode);
                if (matchCountry) {
                  detected.country = detectedCountryCode;
                  if (detectedState) detected.state = detectedState;
                  if (detectedCity) detected.city = detectedCity;
                }
              }
            }
          } catch {
            // Safe fallback to mathematical nearest coordinate match
          }

          setCountryState(detected.country);
          setStateName(detected.state);
          setCityState(detected.city);
          setDetectingLocation(false);

          setLocationStatus({
            success: true,
            isIndia: detected.country === 'IN',
            message: `Detected: ${detected.city}, ${detected.state} (${detected.country})`
          });

          resolve(detected);
        },
        (error) => {
          setDetectingLocation(false);
          let errText = 'Location access was denied or timed out.';
          if (error.code === 1) {
            errText = 'Location permission denied. Please choose country, state, and city manually.';
          }
          setLocationStatus({ error: errText });
          reject(new Error(errText));
        },
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 }
      );
    });
  };

  // Format price accurately based on active currency
  const formatPrice = (basePriceInInrOrUsd) => {
    if (activeCountry.code === 'IN') {
      const val = basePriceInInrOrUsd || 300;
      return `${activeCountry.symbol}${val.toLocaleString()}`;
    }

    let usdEquivalent = 18;
    if (basePriceInInrOrUsd > 100) {
      usdEquivalent = (basePriceInInrOrUsd / 300) * 18;
    } else {
      usdEquivalent = basePriceInInrOrUsd;
    }

    const localAmount = usdEquivalent * (activeCountry.rateToUSD || 1);

    if (activeCountry.code === 'JP') {
      return `${activeCountry.symbol}${Math.round(localAmount / 100) * 100}`;
    }

    return `${activeCountry.symbol}${localAmount.toFixed(2)}`;
  };

  const getRawPrice = (basePriceInInrOrUsd) => {
    if (activeCountry.code === 'IN') return basePriceInInrOrUsd || 300;
    const usdEquivalent = basePriceInInrOrUsd > 100 ? (basePriceInInrOrUsd / 300) * 18 : basePriceInInrOrUsd;
    return Math.round(usdEquivalent * (activeCountry.rateToUSD || 1));
  };

  return (
    <LocationContext.Provider
      value={{
        countries: LOCATION_HIERARCHY,
        country,
        state: stateName,
        city,
        activeCountry,
        currentState: currentStateObj,
        cinemas,
        selectedCinema,
        loadingCinemas,
        detectingLocation,
        locationStatus,
        setCountry: handleCountryChange,
        setState: handleStateChange,
        setCity: handleCityChange,
        setSelectedCinema,
        detectCurrentLocation,
        formatPrice,
        getRawPrice
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
