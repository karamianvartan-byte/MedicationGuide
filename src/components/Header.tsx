import React, { useState, useRef, useEffect } from 'react';
import { Search, Heart, Sparkles, X, Activity, Stethoscope, User, Calculator, Globe } from 'lucide-react';
import { Medication, AppMode } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

interface HeaderProps {
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  onOpenSymptomChecker: () => void;
  onOpenVetCalculator: () => void;
  medications: Medication[];
  onSelectMedication: (med: Medication) => void;
}

export const Header: React.FC<HeaderProps> = ({
  appMode,
  setAppMode,
  searchQuery,
  setSearchQuery,
  bookmarksCount,
  onOpenBookmarks,
  onOpenSymptomChecker,
  onOpenVetCalculator,
  medications,
  onSelectMedication
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const languagesList: { code: Language; label: string; flag: string }[] = [
    { code: 'ru', label: 'РУС', flag: '🇷🇺' },
    { code: 'en', label: 'ENG', flag: '🇬🇧' },
    { code: 'hy', label: 'ՀԱՅ', flag: '🇦🇲' }
  ];

  // Filter top 5 quick suggestions when user types in search
  const suggestions = searchQuery.trim().length >= 2
    ? appMode === 'human'
      ? medications.filter(m =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.activeSubstance.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
        ).slice(0, 5)
      : []
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
    <header className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 py-3.5 bg-[#F5F2EB] border-b border-[#E0DBCF] gap-3 shrink-0">
      {/* Brand Logo & App Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between md:justify-start gap-3 w-full md:w-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#7B8E6A] rounded-full flex items-center justify-center text-white shadow-sm shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#4A5D44]">{t('appTitle')}</h1>
            <p className="text-xs text-[#A09B8E] hidden sm:block">{t('appSubtitle')}</p>
          </div>
        </div>

        {/* Mode Switcher Toggle (Human vs Vet) */}
        <div className="flex items-center bg-[#E0DBCF] p-1 rounded-full border border-[#D1CCBF] shadow-2xs">
          <button
            onClick={() => setAppMode('human')}
            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              appMode === 'human'
                ? 'bg-[#4A5D44] text-white shadow-xs'
                : 'text-[#5A5A44] hover:text-[#3E4238]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t('humanMode')}</span>
          </button>
          <button
            onClick={() => setAppMode('veterinary')}
            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              appMode === 'veterinary'
                ? 'bg-[#7B8E6A] text-white shadow-xs'
                : 'text-[#5A5A44] hover:text-[#3E4238]'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>{t('vetMode')}</span>
          </button>
        </div>

        {/* Language Switcher (RU / EN / HY) */}
        <div className="flex items-center bg-white p-1 rounded-full border border-[#D1CCBF] shadow-2xs">
          {languagesList.map((item) => (
            <button
              key={item.code}
              onClick={() => setLanguage(item.code)}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                language === item.code
                  ? 'bg-[#7B8E6A] text-white shadow-xs'
                  : 'text-[#707060] hover:text-[#3E4238]'
              }`}
              title={item.label}
            >
              <span>{item.flag}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Bookmark trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenBookmarks}
            className="p-2.5 rounded-full bg-white border border-[#D1CCBF] text-[#4A5D44] relative flex items-center justify-center shadow-xs cursor-pointer"
            title={t('bookmarksBtn')}
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

      {/* Search Input Bar (Visible in ALL Modes) */}
      <div className="flex-1 max-w-2xl w-full mx-0 md:mx-4 my-1 md:my-0" ref={searchRef}>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder={
              appMode === 'human'
                ? t('searchPlaceholderHuman')
                : t('searchPlaceholderVet')
            }
            className="w-full pl-11 pr-10 py-2.5 sm:py-2.5 bg-white border border-[#D1CCBF] rounded-2xl shadow-xs focus:outline-none focus:border-[#7B8E6A] focus:ring-1 focus:ring-[#7B8E6A] text-[#3E4238] placeholder-[#A09B8E] text-xs sm:text-sm transition-all"
          />
          <Search className="h-5 w-5 absolute left-3.5 top-2.5 sm:top-2.5 text-[#A09B8E] pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-2.5 sm:top-2.5 text-[#A09B8E] hover:text-[#3E4238] cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Search Quick Suggestions Dropdown for Human Mode */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E0DBCF] rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-[#F5F2EB]">
              <div className="px-4 py-2 bg-[#F5F2EB] text-xs font-bold uppercase tracking-wider text-[#A09B8E]">
                {t('foundMedications')} ({suggestions.length})
              </div>
              {suggestions.map((med) => (
                <button
                  key={med.id}
                  onClick={() => {
                    onSelectMedication(med);
                    setShowSuggestions(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-[#F9F7F2] flex items-center justify-between group transition-colors gap-3 cursor-pointer"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-[#4A5D44] group-hover:text-[#7B8E6A]">
                        {med.name}
                      </span>
                      <span className="text-xs text-[#A09B8E]">
                        ({med.activeSubstance})
                      </span>
                    </div>
                    <div className="text-xs text-[#707060] mt-0.5 truncate">
                      {t('symptomsLabel')} {med.symptoms.join(', ')}
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-md font-bold border shrink-0 ${
                    med.prescriptionStatus === 'Rx'
                      ? 'bg-[#FBEFF2] text-[#B87A7A] border-[#F2D7D7]'
                      : 'bg-[#F5F2EB] text-[#5A5A44] border-[#E0DBCF]'
                  }`}>
                    {med.prescriptionStatus === 'Rx' ? t('rxTag') : t('otcTag')}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="hidden md:flex items-center gap-3 shrink-0">
        {appMode === 'human' ? (
          <button
            onClick={onOpenSymptomChecker}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#D3DBBD] bg-[#E9EDDC] text-[#4A5D44] hover:bg-[#DFE5D0] font-bold text-xs sm:text-sm transition-colors shadow-2xs cursor-pointer"
          >
            <Activity className="w-4 h-4 text-[#7B8E6A]" />
            <span>{t('symptomCheckerBtn')}</span>
          </button>
        ) : (
          <button
            onClick={onOpenVetCalculator}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#D3DBBD] bg-[#E9EDDC] text-[#4A5D44] hover:bg-[#DFE5D0] font-bold text-xs sm:text-sm transition-colors shadow-2xs cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-[#7B8E6A]" />
            <span>{t('vetCalcBtn')}</span>
          </button>
        )}

        <button
          onClick={onOpenBookmarks}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7B8E6A] text-white hover:bg-[#687B58] font-bold text-xs sm:text-sm transition-colors shadow-xs cursor-pointer"
        >
          <Heart className={`w-4 h-4 ${bookmarksCount > 0 ? 'fill-white' : ''}`} />
          <span>{t('bookmarksBtn')}</span>
          {bookmarksCount > 0 && (
            <span className="bg-white text-[#7B8E6A] font-bold text-xs px-2 py-0.5 rounded-full ml-1">
              {bookmarksCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};


