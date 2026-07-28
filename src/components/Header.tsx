import React, { useState, useRef, useEffect } from 'react';
import { Search, Heart, Sparkles, X, Activity } from 'lucide-react';
import { Medication } from '../types';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  onOpenSymptomChecker: () => void;
  medications: Medication[];
  onSelectMedication: (med: Medication) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  bookmarksCount,
  onOpenBookmarks,
  onOpenSymptomChecker,
  medications,
  onSelectMedication
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter top 5 quick suggestions when user types in search
  const suggestions = searchQuery.trim().length >= 2
    ? medications.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.activeSubstance.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 py-4 md:py-5 bg-[#F5F2EB] border-b border-[#E0DBCF] gap-4">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#7B8E6A] rounded-full flex items-center justify-center text-white shadow-sm shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#4A5D44]">ФАРМА-ГИД</h1>
            <p className="text-[11px] text-[#A09B8E] hidden sm:block">Справочник лекарств & подбор по симптомам</p>
          </div>
        </div>

        {/* Mobile Bookmark trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenBookmarks}
            className="p-2.5 rounded-full bg-white border border-[#D1CCBF] text-[#4A5D44] relative flex items-center justify-center shadow-xs"
            title="Избранное"
          >
            <Heart className={`w-5 h-5 ${bookmarksCount > 0 ? 'fill-[#7B8E6A] text-[#7B8E6A]' : ''}`} />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#7B8E6A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {bookmarksCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="flex-1 max-w-2xl w-full mx-0 md:mx-6" ref={searchRef}>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Поиск по названию, веществу или симптомам (например: температура, изжога)..."
            className="w-full pl-11 pr-10 py-2.5 sm:py-3 bg-white border border-[#D1CCBF] rounded-2xl shadow-xs focus:outline-none focus:border-[#7B8E6A] focus:ring-1 focus:ring-[#7B8E6A] text-[#3E4238] placeholder-[#A09B8E] text-sm transition-all"
          />
          <Search className="h-5 w-5 absolute left-3.5 top-3 sm:top-3.5 text-[#A09B8E] pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 sm:top-3.5 text-[#A09B8E] hover:text-[#3E4238]"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Search Quick Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E0DBCF] rounded-2xl shadow-lg z-50 overflow-hidden divide-y divide-[#F5F2EB]">
              <div className="px-3 py-1.5 bg-[#F5F2EB] text-[11px] font-bold uppercase tracking-wider text-[#A09B8E]">
                Найденные препараты ({suggestions.length})
              </div>
              {suggestions.map((med) => (
                <button
                  key={med.id}
                  onClick={() => {
                    onSelectMedication(med);
                    setShowSuggestions(false);
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-[#F9F7F2] flex items-center justify-between group transition-colors"
                >
                  <div>
                    <span className="font-semibold text-sm text-[#4A5D44] group-hover:text-[#7B8E6A]">
                      {med.name}
                    </span>
                    <span className="text-xs text-[#A09B8E] ml-2">
                      ({med.activeSubstance})
                    </span>
                    <div className="text-[11px] text-[#707060] line-clamp-1">
                      Симптомы: {med.symptoms.slice(0, 3).join(', ')}
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                    med.prescriptionStatus === 'Rx'
                      ? 'bg-[#FBEFF2] text-[#B87A7A] border-[#F2D7D7]'
                      : 'bg-[#F5F2EB] text-[#5A5A44] border-[#E0DBCF]'
                  }`}>
                    {med.prescriptionStatus}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="hidden md:flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenSymptomChecker}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#D3DBBD] bg-[#E9EDDC] text-[#4A5D44] hover:bg-[#DFE5D0] font-medium text-xs sm:text-sm transition-colors shadow-2xs"
        >
          <Activity className="w-4 h-4 text-[#7B8E6A]" />
          <span>Подбор по симптомам</span>
        </button>

        <button
          onClick={onOpenBookmarks}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7B8E6A] text-white hover:bg-[#687B58] font-medium text-xs sm:text-sm transition-colors shadow-xs"
        >
          <Heart className={`w-4 h-4 ${bookmarksCount > 0 ? 'fill-white' : ''}`} />
          <span>Избранное</span>
          {bookmarksCount > 0 && (
            <span className="bg-white text-[#7B8E6A] font-bold text-xs px-1.5 py-0.2 rounded-full ml-1">
              {bookmarksCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
