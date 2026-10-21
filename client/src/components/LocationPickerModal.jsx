import React, { useState } from 'react';
import { Globe, MapPin, Check, X, Search, Building } from 'lucide-react';
import { useLocationContext, COUNTRIES } from '../context/LocationContext';

const LocationPickerModal = ({ isOpen, onClose }) => {
  const { country, city, selectedCinema, setCountry, setCity, setSelectedCinema, cinemas } =
    useLocationContext();
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const currentCountryObj = COUNTRIES.find((c) => c.code === country) || COUNTRIES[0];

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.cities.some((ct) => ct.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#12151d] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-black/90 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#161a24]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Select Your Worldwide Cinema Region
              </h3>
              <p className="text-[11px] text-slate-400">
                Localized showtimes, ticket currencies, and luxury cinema auditoriums
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-800/80 bg-[#0e1118]">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by country, city, or territory..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#080a0f] border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Content Tabs: Country & City Selection */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2">
              1. Choose Country & Currency
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {filteredCountries.map((c) => {
                const isSelected = c.code === country;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setCountry(c.code)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-sm'
                        : 'bg-[#0d1017] border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] font-mono font-bold text-[#00F2FE]">{c.code}</span>
                      <span className="font-semibold truncate">{c.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-400/90 font-bold ml-1 shrink-0">
                      {c.currency}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2">
              2. Select City in {currentCountryObj.name}
            </label>
            <div className="flex flex-wrap gap-2">
              {currentCountryObj.cities.map((ct) => {
                const isSelected = ct.toLowerCase() === city.toLowerCase();
                return (
                  <button
                    key={ct}
                    type="button"
                    onClick={() => setCity(ct)}
                    className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-[#0b0d12] border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <MapPin className="w-3 h-3" />
                    <span>{ct}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {cinemas && cinemas.length > 0 && (
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2">
                3. Preferred Cinema in {city}
              </label>
              <div className="space-y-2">
                {cinemas.map((cin) => {
                  const isSelected = selectedCinema?._id === cin._id;
                  return (
                    <button
                      key={cin._id}
                      type="button"
                      onClick={() => setSelectedCinema(cin)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 text-white'
                          : 'bg-[#0d1017] border-slate-800/80 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Building className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="font-bold text-white text-xs">{cin.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 pl-5.5">{cin.address}</p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-[#161a24] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20"
          >
            Apply Location ({city})
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPickerModal;
