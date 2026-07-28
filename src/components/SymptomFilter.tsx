import React from 'react';
import { SYMPTOM_CATEGORIES } from '../data/medications';
import { Filter, X, Check, Stethoscope } from 'lucide-react';
import { PrescriptionStatus } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface SymptomFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  selectedSymptom: string | null;
  onSelectSymptom: (symptom: string | null) => void;
  selectedRxStatus: PrescriptionStatus | 'ALL';
  onSelectRxStatus: (status: PrescriptionStatus | 'ALL') => void;
  onlyVED?: boolean;
  onToggleOnlyVED?: () => void;
  activeLetter: string;
  totalResults: number;
  onClearAllFilters: () => void;
}

export const SymptomFilter: React.FC<SymptomFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedSymptom,
  onSelectSymptom,
  selectedRxStatus,
  onSelectRxStatus,
  onlyVED = false,
  onToggleOnlyVED,
  activeLetter,
  totalResults,
  onClearAllFilters
}) => {
  const { t } = useLanguage();

  const popularSymptoms = [
    'Головная боль',
    'Высокая температура',
    'Кашель с мокротой',
    'Боль в горле',
    'Изжога',
    'Аллергический насморк',
    'Бессонница',
    'Зубная боль',
    'Боль в суставах',
    'Вздутие живота',
    'Ожоги'
  ];

  const hasActiveFilter = Boolean(
    selectedCategory ||
    selectedSymptom ||
    selectedRxStatus !== 'ALL' ||
    onlyVED ||
    (activeLetter !== 'Все' && activeLetter !== 'All' && activeLetter !== 'Բոլորը')
  );

  return (
    <section className="mb-6 space-y-4">
      {/* Disease Groups Header & Selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#A09B8E] flex items-center gap-1.5">
            <Stethoscope className="w-3.5 h-3.5 text-[#7B8E6A]" />
            {t('symptomsAndCategories')}
          </h2>
          {hasActiveFilter && (
            <button
              onClick={onClearAllFilters}
              className="text-xs text-[#7B8E6A] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              {t('resetFiltersBtn')}
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1.5 flex-1 min-w-0">
            <button
              onClick={() => {
                onSelectCategory(null);
                onSelectSymptom(null);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                selectedCategory === null && selectedSymptom === null
                  ? 'bg-[#4A5D44] text-white border-[#4A5D44] shadow-2xs font-bold'
                  : 'bg-white text-[#5A5A44] border-[#D1CCBF] hover:bg-[#F5F2EB]'
              }`}
            >
              {t('allCategories')}
            </button>

            {SYMPTOM_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  if (selectedCategory === cat.name) {
                    onSelectCategory(null);
                  } else {
                    onSelectCategory(cat.name);
                    onSelectSymptom(null);
                  }
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                  selectedCategory === cat.name
                    ? 'bg-[#7B8E6A] text-white border-[#7B8E6A] shadow-2xs font-bold'
                    : 'bg-white text-[#5A5A44] border-[#D1CCBF] hover:bg-[#F5F2EB]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Prescription Status Filter (OTC / Rx) */}
          <div className="flex items-center gap-1 bg-[#F5F2EB] p-1 rounded-2xl border border-[#E0DBCF] text-xs sm:text-sm font-medium shrink-0 self-start lg:self-auto">
            <button
              onClick={() => onSelectRxStatus('ALL')}
              className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                selectedRxStatus === 'ALL'
                  ? 'bg-white text-[#3E4238] shadow-2xs font-bold'
                  : 'text-[#A09B8E] hover:text-[#3E4238]'
              }`}
            >
              {t('allLetters')}
            </button>
            <button
              onClick={() => onSelectRxStatus('OTC')}
              className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                selectedRxStatus === 'OTC'
                  ? 'bg-[#7B8E6A] text-white font-bold shadow-2xs'
                  : 'text-[#3E4238] hover:text-[#7B8E6A]'
              }`}
            >
              {t('otcFilter')}
            </button>
            <button
              onClick={() => onSelectRxStatus('Rx')}
              className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                selectedRxStatus === 'Rx'
                  ? 'bg-[#B87A7A] text-white font-bold shadow-2xs'
                  : 'text-[#3E4238] hover:text-[#B87A7A]'
              }`}
            >
              {t('rxFilter')}
            </button>
            {onToggleOnlyVED && (
              <button
                onClick={onToggleOnlyVED}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                  onlyVED
                    ? 'bg-[#2E5E2A] text-white font-bold shadow-2xs'
                    : 'text-[#2E5E2A] hover:bg-[#E8F0E6] bg-white border border-[#BCD4B8]'
                }`}
                title={t('isVEDLabel')}
              >
                <span>🏛️</span>
                <span>{t('filterVEDOnly')}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Popular Symptoms Chips */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#A09B8E] mb-2">
          {t('symptomCheckerBtn')}
        </h2>

        <div className="flex flex-wrap gap-2">
          {popularSymptoms.map((symptom) => {
            const isSelected = selectedSymptom === symptom;
            return (
              <button
                key={symptom}
                onClick={() => onSelectSymptom(isSelected ? null : symptom)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#E9EDDC] text-[#4A5D44] border-[#D3DBBD] font-bold shadow-2xs'
                    : 'bg-white text-[#5A5A44] border-[#D1CCBF] hover:border-[#7B8E6A] hover:bg-[#FDFCF8]'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-[#7B8E6A]" />}
                {symptom}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Title Bar */}
      <div className="pt-2 border-t border-[#E0DBCF] flex items-center justify-between">
        <div className="text-sm font-semibold text-[#4A5D44]">
          {selectedSymptom
            ? `${t('symptomsLabel')} "${selectedSymptom}"`
            : selectedCategory
            ? `${t('symptomsAndCategories')}: "${selectedCategory}"`
            : activeLetter !== 'Все' && activeLetter !== 'All' && activeLetter !== 'Բոլորը'
            ? `${t('alphabetTitle')} "${activeLetter}"`
            : t('allDrugsFilter')}
          <span className="ml-2 text-xs font-normal text-[#A09B8E]">
            ({t('foundCount')} {totalResults})
          </span>
        </div>
      </div>
    </section>
  );
};


