import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

export const COUNTRIES = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    symbol: '$',
    rateToUSD: 1.0,
    cities: ['New York', 'Los Angeles', 'Chicago', 'San Francisco']
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    symbol: '£',
    rateToUSD: 0.79,
    cities: ['London', 'Manchester', 'Birmingham']
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    currency: 'INR',
    symbol: '₹',
    rateToUSD: 83.5,
    cities: ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad']
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    symbol: 'CA$',
    rateToUSD: 1.36,
    cities: ['Toronto', 'Vancouver', 'Montreal']
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    symbol: 'A$',
    rateToUSD: 1.52,
    cities: ['Sydney', 'Melbourne', 'Brisbane']
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR',
    symbol: '€',
    rateToUSD: 0.92,
    cities: ['Berlin', 'Munich', 'Hamburg']
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    currency: 'JPY',
    symbol: '¥',
    rateToUSD: 155.0,
    cities: ['Tokyo', 'Osaka', 'Kyoto']
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    currency: 'SGD',
    symbol: 'S$',
    rateToUSD: 1.35,
    cities: ['Singapore']
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    currency: 'AED',
    symbol: 'AED ',
    rateToUSD: 3.67,
    cities: ['Dubai', 'Abu Dhabi']
  }
];

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [country, setCountry] = useState(() => localStorage.getItem('imovies_country') || 'US');
  const [city, setCity] = useState(() => localStorage.getItem('imovies_city') || 'New York');
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [loadingCinemas, setLoadingCinemas] = useState(false);

  const activeCountry = COUNTRIES.find((c) => c.code === country) || COUNTRIES[0];

  // Fetch cinemas when country or city changes
  useEffect(() => {
    localStorage.setItem('imovies_country', country);
    localStorage.setItem('imovies_city', city);

    const fetchCinemas = async () => {
      try {
        setLoadingCinemas(true);
        const { data } = await API.get('/cinemas', {
          params: { country, city }
        });
        setCinemas(data || []);
        if (data && data.length > 0) {
          setSelectedCinema(data[0]);
        } else {
          setSelectedCinema(null);
        }
      } catch (err) {
        console.error('Failed to load cinemas:', err);
      } finally {
        setLoadingCinemas(false);
      }
    };

    fetchCinemas();
  }, [country, city]);

  const handleCountryChange = (newCountryCode) => {
    const targetCountry = COUNTRIES.find((c) => c.code === newCountryCode);
    if (targetCountry) {
      setCountry(newCountryCode);
      setCity(targetCountry.cities[0]);
    }
  };

  // Format price accurately based on active currency
  const formatPrice = (basePriceInInrOrUsd) => {
    // If country is India, use standard INR pricing
    if (activeCountry.code === 'IN') {
      const val = basePriceInInrOrUsd || 300;
      return `${activeCountry.symbol}${val.toLocaleString()}`;
    }

    // Convert from INR baseline (~300 INR = ~$3.60, ticket typical is $18-$22)
    // If base price is around ~250-350 INR, calculate realistic localized ticket price
    let usdEquivalent = 18;
    if (basePriceInInrOrUsd > 100) {
      usdEquivalent = (basePriceInInrOrUsd / 300) * 18;
    } else {
      usdEquivalent = basePriceInInrOrUsd;
    }

    const localAmount = usdEquivalent * activeCountry.rateToUSD;

    if (activeCountry.code === 'JP') {
      return `${activeCountry.symbol}${Math.round(localAmount / 100) * 100}`;
    }

    return `${activeCountry.symbol}${localAmount.toFixed(2)}`;
  };

  const getRawPrice = (basePriceInInrOrUsd) => {
    if (activeCountry.code === 'IN') return basePriceInInrOrUsd || 300;
    const usdEquivalent = basePriceInInrOrUsd > 100 ? (basePriceInInrOrUsd / 300) * 18 : basePriceInInrOrUsd;
    return Math.round(usdEquivalent * activeCountry.rateToUSD);
  };

  return (
    <LocationContext.Provider
      value={{
        countries: COUNTRIES,
        country,
        city,
        activeCountry,
        cinemas,
        selectedCinema,
        loadingCinemas,
        setCountry: handleCountryChange,
        setCity,
        setSelectedCinema,
        formatPrice,
        getRawPrice
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
