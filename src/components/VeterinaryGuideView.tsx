import React, { useState, useMemo } from 'react';
import {
  VET_MEDICATIONS,
  ANIMAL_DISEASES,
  PROHIBITED_HUMAN_DRUGS,
  VET_FIRST_AID,
  VET_SPECIES_LIST,
  VET_CATEGORIES
} from '../data/veterinary';
import { VetMedication, AnimalDisease, ProhibitedHumanDrug, AnimalSpecies } from '../types';
import {
  Search,
  Filter,
  Pill,
  ShieldAlert,
  AlertTriangle,
  Calculator,
  Stethoscope,
  HeartPulse,
  Info,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
  Clock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface VeterinaryGuideViewProps {
  onOpenCalculator: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

type VetTab = 'all' | 'meds' | 'diseases' | 'prohibited' | 'firstaid';

export const VeterinaryGuideView: React.FC<VeterinaryGuideViewProps> = ({
  onOpenCalculator,
  searchQuery,
  setSearchQuery
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<VetTab>('all');
  const [selectedSpecies, setSelectedSpecies] = useState<AnimalSpecies | 'Все'>('Все');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Selected Item Modals/Details
  const [selectedVetMed, setSelectedVetMed] = useState<VetMedication | null>(null);
  const [selectedDisease, setSelectedDisease] = useState<AnimalDisease | null>(null);

  // Filtered Vet Meds
  const filteredVetMeds = useMemo(() => {
    return VET_MEDICATIONS.filter((med) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = med.name.toLowerCase().includes(q);
        const matchesActive = med.activeSubstance.toLowerCase().includes(q);
        const matchesCategory = med.category.toLowerCase().includes(q);
        const matchesSymptoms = med.symptoms.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesActive && !matchesCategory && !matchesSymptoms) {
          return false;
        }
      }

      if (selectedSpecies !== 'Все' && selectedSpecies !== 'All' && selectedSpecies !== 'Բոլորը') {
        if (!med.species.includes(selectedSpecies as AnimalSpecies)) {
          return false;
        }
      }

      if (selectedCategory) {
        if (med.category !== selectedCategory) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedSpecies, selectedCategory]);

  // Filtered Diseases
  const filteredDiseases = useMemo(() => {
    return ANIMAL_DISEASES.filter((dis) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = dis.title.toLowerCase().includes(q);
        const matchesSymptoms = dis.symptoms.some((s) => s.toLowerCase().includes(q));
        const matchesDescription = dis.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSymptoms && !matchesDescription) {
          return false;
        }
      }

      if (selectedSpecies !== 'Все' && selectedSpecies !== 'All' && selectedSpecies !== 'Բոլորը') {
        if (!dis.affectedSpecies.includes(selectedSpecies as AnimalSpecies)) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedSpecies]);

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto bg-[#FDFCF8]">
      {/* Compact Top Header Bar */}
      <div className="mb-3 p-3 sm:p-4 bg-[#F5F2EB] border border-[#E0DBCF] rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#7B8E6A] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-serif font-bold text-[#4A5D44] leading-tight">
              {t('veterinaryTitle')}
            </h1>
            <p className="text-[11px] sm:text-xs text-[#707060]">
              {t('vetTabMeds')} & {t('vetTabDiseases')}
            </p>
          </div>
        </div>

        {/* Action Button: Calculator */}
        <button
          onClick={onOpenCalculator}
          className="px-3.5 py-2 rounded-xl bg-[#4A5D44] hover:bg-[#3E4238] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-2xs shrink-0 cursor-pointer"
        >
          <Calculator className="w-4 h-4 text-[#D3DBBD]" />
          <span>{t('calcTitle')}</span>
        </button>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-3 pb-1 shrink-0">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border flex items-center gap-2 cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#4A5D44] text-white border-[#4A5D44] shadow-2xs font-extrabold'
              : 'bg-white text-[#5A5A44] border-[#E0DBCF] hover:bg-[#F5F2EB]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#D3DBBD]" />
          <span>{t('vetTabAll')}</span>
        </button>

        <button
          onClick={() => setActiveTab('meds')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border flex items-center gap-2 cursor-pointer ${
            activeTab === 'meds'
              ? 'bg-[#7B8E6A] text-white border-[#7B8E6A] shadow-2xs'
              : 'bg-white text-[#5A5A44] border-[#E0DBCF] hover:bg-[#F5F2EB]'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>{t('vetTabMeds')} ({VET_MEDICATIONS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('diseases')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border flex items-center gap-2 cursor-pointer ${
            activeTab === 'diseases'
              ? 'bg-[#7B8E6A] text-white border-[#7B8E6A] shadow-2xs'
              : 'bg-white text-[#5A5A44] border-[#E0DBCF] hover:bg-[#F5F2EB]'
          }`}
        >
          <HeartPulse className="w-4 h-4" />
          <span>{t('vetTabDiseases')} ({ANIMAL_DISEASES.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('prohibited')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border flex items-center gap-2 cursor-pointer ${
            activeTab === 'prohibited'
              ? 'bg-[#B87A7A] text-white border-[#B87A7A] shadow-2xs'
              : 'bg-white text-[#B87A7A] border-[#E0DBCF] hover:bg-[#FDF3F3]'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{t('vetTabProhibited')} ({PROHIBITED_HUMAN_DRUGS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('firstaid')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border flex items-center gap-2 cursor-pointer ${
            activeTab === 'firstaid'
              ? 'bg-[#4A5D44] text-white border-[#4A5D44] shadow-2xs'
              : 'bg-white text-[#5A5A44] border-[#E0DBCF] hover:bg-[#F5F2EB]'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-[#D3DBBD]" />
          <span>{t('vetTabFirstAid')} ({VET_FIRST_AID.length})</span>
        </button>
      </div>

      {/* Sleek Filter Bar */}
      {(activeTab === 'all' || activeTab === 'meds' || activeTab === 'diseases') && (
        <div className="mb-4 space-y-2 p-3 bg-white border border-[#E0DBCF] rounded-2xl shadow-2xs">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A09B8E]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-9 pr-8 py-1.5 rounded-xl bg-[#FDFCF8] border border-[#E0DBCF] text-xs font-medium text-[#3E4238] focus:outline-none focus:ring-1 focus:ring-[#7B8E6A]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A09B8E] hover:text-[#3E4238] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Species Filter */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0">
              <span className="text-[10px] font-bold text-[#A09B8E] uppercase mr-1">{t('speciesLabel')}:</span>
              <button
                onClick={() => setSelectedSpecies('Все')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSpecies === 'Все' || selectedSpecies === 'All' || selectedSpecies === 'Բոլորը'
                    ? 'bg-[#7B8E6A] text-white'
                    : 'bg-[#F5F2EB] text-[#5A5A44] hover:bg-[#E0DBCF]'
                }`}
              >
                {t('allCategories')}
              </button>
              {VET_SPECIES_LIST.map((sp) => (
                <button
                  key={sp}
                  onClick={() => setSelectedSpecies(sp)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedSpecies === sp
                      ? 'bg-[#7B8E6A] text-white'
                      : 'bg-[#F5F2EB] text-[#5A5A44] hover:bg-[#E0DBCF]'
                  }`}
                >
                  {sp}
                </button>
              ))}
            </div>
          </div>

          {/* Categories Filter (For Meds & All) */}
          {(activeTab === 'all' || activeTab === 'meds') && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1.5 border-t border-[#F5F2EB]">
              <span className="text-[10px] font-bold text-[#A09B8E] uppercase shrink-0">{t('symptomsAndCategories')}:</span>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap border cursor-pointer ${
                  selectedCategory === null
                    ? 'bg-[#4A5D44] text-white border-[#4A5D44]'
                    : 'bg-white text-[#5A5A44] border-[#E0DBCF]'
                }`}
              >
                {t('allCategories')}
              </button>
              {VET_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap border cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#7B8E6A] text-white border-[#7B8E6A]'
                      : 'bg-white text-[#5A5A44] border-[#E0DBCF]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* COMBINED VIEW ('all') - SIDE BY SIDE PREPARATIONS & DISEASES */}
      {activeTab === 'all' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mb-8">
          {/* Left Column: Vet Medications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E0DBCF] pb-2">
              <div className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-[#7B8E6A]" />
                <h2 className="text-base sm:text-lg font-serif font-bold text-[#4A5D44]">
                  💊 {t('vetTabMeds')} ({filteredVetMeds.length})
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('meds')}
                className="text-xs font-bold text-[#7B8E6A] hover:underline shrink-0 cursor-pointer"
              >
                {t('vetTabMeds')} →
              </button>
            </div>

            {filteredVetMeds.length === 0 ? (
              <div className="p-6 bg-white border border-[#E0DBCF] rounded-2xl text-center text-xs text-[#A09B8E]">
                {t('notFoundText')}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredVetMeds.map((med) => (
                  <div
                    key={med.id}
                    className="p-4 bg-white border border-[#E0DBCF] rounded-2xl shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div>
                          <h3 className="text-sm sm:text-base font-serif font-bold text-[#4A5D44]">
                            {med.name}
                          </h3>
                          <p className="text-[11px] text-[#707060] italic">
                            {med.activeSubstance}
                          </p>
                        </div>
                        {med.isToxicToCats && (
                          <span
                            title="Toxic!"
                            className="px-2 py-0.5 bg-[#FDF3F3] text-[#B87A7A] border border-[#F0C4C4] rounded-md text-[10px] font-bold flex items-center gap-1 shrink-0"
                          >
                            <AlertTriangle className="w-3 h-3 text-[#B87A7A]" />
                            {t('vetTabProhibited')}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {med.species.map((sp) => (
                          <span
                            key={sp}
                            className="px-2 py-0.5 bg-[#E9EDDC] text-[#4A5D44] border border-[#D3DBBD] rounded-md text-[10px] font-bold"
                          >
                            {sp}
                          </span>
                        ))}
                        <span className="px-2 py-0.5 bg-[#F5F2EB] text-[#707060] border border-[#E0DBCF] rounded-md text-[10px] font-medium">
                          {med.category}
                        </span>
                      </div>

                      <p className="text-xs text-[#707060] line-clamp-2 mb-2">
                        {med.description}
                      </p>

                      <div className="text-[11px]">
                        <span className="font-bold text-[#4A5D44]">{t('symptomsLabel')} </span>
                        <span className="text-[#5A5A44]">
                          {med.symptoms.slice(0, 3).join(', ')}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#F5F2EB] flex items-center justify-end">
                      <button
                        onClick={() => setSelectedVetMed(med)}
                        className="text-[#7B8E6A] font-bold text-xs hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>{t('viewInstructionBtn')}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Diseases */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E0DBCF] pb-2">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-[#B87A7A]" />
                <h2 className="text-base sm:text-lg font-serif font-bold text-[#4A5D44]">
                  🩺 {t('vetTabDiseases')} ({filteredDiseases.length})
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('diseases')}
                className="text-xs font-bold text-[#7B8E6A] hover:underline shrink-0 cursor-pointer"
              >
                {t('vetTabDiseases')} →
              </button>
            </div>

            {filteredDiseases.length === 0 ? (
              <div className="p-6 bg-white border border-[#E0DBCF] rounded-2xl text-center text-xs text-[#A09B8E]">
                {t('notFoundText')}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredDiseases.map((disease) => (
                  <div
                    key={disease.id}
                    className="p-4 bg-white border border-[#E0DBCF] rounded-2xl shadow-2xs hover:shadow-xs transition-all space-y-2.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm sm:text-base font-serif font-bold text-[#4A5D44]">
                          {disease.title}
                        </h3>
                        {disease.latinTitle && (
                          <span className="text-[11px] text-[#A09B8E] italic">
                            ({disease.latinTitle})
                          </span>
                        )}
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          disease.urgency === 'Экстренная (Реанимация)'
                            ? 'bg-[#FDF3F3] text-[#B87A7A] border border-[#F0C4C4]'
                            : disease.urgency === 'Высокая'
                            ? 'bg-[#FEF9EC] text-[#D97706] border border-[#FDE68A]'
                            : 'bg-[#E9EDDC] text-[#4A5D44] border border-[#D3DBBD]'
                        }`}
                      >
                        {disease.urgency}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px]">
                      <span className="font-bold text-[#707060]">{t('speciesLabel')}:</span>
                      {disease.affectedSpecies.map((sp) => (
                        <span
                          key={sp}
                          className="px-1.5 py-0.5 bg-[#F5F2EB] text-[#4A5D44] rounded font-semibold border border-[#E0DBCF]"
                        >
                          {sp}
                        </span>
                      ))}
                    </div>

                    <div className="p-2.5 bg-[#FDFCF8] border border-[#E0DBCF] rounded-xl text-[11px] space-y-1">
                      <span className="font-bold text-[#B87A7A] uppercase tracking-wider block text-[10px]">
                        {t('symptomsLabel')}
                      </span>
                      <div className="flex flex-wrap gap-1 text-[#3E4238]">
                        {disease.symptoms.slice(0, 4).map((s, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 bg-white border border-[#E0DBCF] rounded"
                          >
                            • {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {disease.recommendedMeds && disease.recommendedMeds.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                        <span className="font-bold text-[#4A5D44]">💊 {t('vetTabMeds')}:</span>
                        {disease.recommendedMeds.map((medName) => {
                          const matchedMed = VET_MEDICATIONS.find(
                            (m) =>
                              m.name.toLowerCase().includes(medName.toLowerCase()) ||
                              medName.toLowerCase().includes(m.name.toLowerCase())
                          );
                          return (
                            <button
                              key={medName}
                              onClick={() => {
                                if (matchedMed) {
                                  setSelectedVetMed(matchedMed);
                                }
                              }}
                              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all border ${
                                matchedMed
                                  ? 'bg-[#E9EDDC] text-[#4A5D44] border-[#D3DBBD] hover:bg-[#7B8E6A] hover:text-white cursor-pointer'
                                  : 'bg-[#F5F2EB] text-[#707060] border-[#E0DBCF]'
                              }`}
                            >
                              {medName} {matchedMed && '→'}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    <div>
                      <button
                        onClick={() =>
                          setSelectedDisease(selectedDisease?.id === disease.id ? null : disease)
                        }
                        className="text-[11px] font-bold text-[#7B8E6A] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>
                          {selectedDisease?.id === disease.id
                            ? t('closeBtn')
                            : t('viewInstructionBtn')}
                        </span>
                        {selectedDisease?.id === disease.id ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {selectedDisease?.id === disease.id && (
                        <div className="mt-2 p-3 bg-[#F5F2EB] rounded-xl text-xs space-y-1.5 border border-[#E0DBCF]">
                          <span className="font-bold text-[#4A5D44] block">
                            {t('dosageAndUsage')}:
                          </span>
                          <ol className="list-decimal list-inside space-y-1 text-[#3E4238] text-[11px]">
                            {disease.treatmentProtocol.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* INDIVIDUAL TAB: ONLY VET MEDS ('meds') */}
      {activeTab === 'meds' && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVetMeds.map((med) => (
              <div
                key={med.id}
                className="p-5 bg-white border border-[#E0DBCF] rounded-3xl shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-base font-serif font-bold text-[#4A5D44]">
                        {med.name}
                      </h3>
                      <p className="text-xs text-[#707060] italic">
                        {med.activeSubstance}
                      </p>
                    </div>
                    {med.isToxicToCats && (
                      <span
                        title="Toxic!"
                        className="px-2 py-0.5 bg-[#FDF3F3] text-[#B87A7A] border border-[#F0C4C4] rounded-md text-[10px] font-bold flex items-center gap-1 shrink-0"
                      >
                        <AlertTriangle className="w-3 h-3 text-[#B87A7A]" />
                        {t('vetTabProhibited')}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {med.species.map((sp) => (
                      <span
                        key={sp}
                        className="px-2 py-0.5 bg-[#E9EDDC] text-[#4A5D44] border border-[#D3DBBD] rounded-md text-[10px] font-bold"
                      >
                        {sp}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 bg-[#F5F2EB] text-[#707060] border border-[#E0DBCF] rounded-md text-[10px] font-medium">
                      {med.category}
                    </span>
                  </div>

                  <p className="text-xs text-[#707060] leading-relaxed mb-3 line-clamp-2">
                    {med.description}
                  </p>

                  <div className="mb-3 text-[11px]">
                    <span className="font-bold text-[#4A5D44]">{t('symptomsLabel')} </span>
                    <span className="text-[#5A5A44]">
                      {med.symptoms.slice(0, 3).join(', ')}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F5F2EB] flex items-center justify-end">
                  <button
                    onClick={() => setSelectedVetMed(med)}
                    className="text-[#7B8E6A] font-bold text-xs hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>{t('viewInstructionBtn')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* INDIVIDUAL TAB: ONLY DISEASES ('diseases') */}
      {activeTab === 'diseases' && (
        <div className="mb-8 space-y-4">
          {filteredDiseases.map((disease) => (
            <div
              key={disease.id}
              className="p-5 sm:p-6 bg-white border border-[#E0DBCF] rounded-3xl shadow-2xs hover:shadow-xs transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-serif font-bold text-[#4A5D44]">
                    {disease.title}
                  </h3>
                  {disease.latinTitle && (
                    <span className="text-xs text-[#A09B8E] italic">
                      ({disease.latinTitle})
                    </span>
                  )}
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    disease.urgency === 'Экстренная (Реанимация)'
                      ? 'bg-[#FDF3F3] text-[#B87A7A] border border-[#F0C4C4]'
                      : disease.urgency === 'Высокая'
                      ? 'bg-[#FEF9EC] text-[#D97706] border border-[#FDE68A]'
                      : 'bg-[#E9EDDC] text-[#4A5D44] border border-[#D3DBBD]'
                  }`}
                >
                  {disease.urgency}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-[#707060]">{t('speciesLabel')}:</span>
                {disease.affectedSpecies.map((sp) => (
                  <span
                    key={sp}
                    className="px-2 py-0.5 bg-[#F5F2EB] text-[#4A5D44] rounded-md font-semibold border border-[#E0DBCF]"
                  >
                    {sp}
                  </span>
                ))}
              </div>

              <div className="p-3 bg-[#FDFCF8] border border-[#E0DBCF] rounded-2xl text-xs space-y-1">
                <span className="font-bold text-[#B87A7A] uppercase tracking-wider block">
                  {t('symptomsLabel')}:
                </span>
                <div className="flex flex-wrap gap-1.5 text-[#3E4238]">
                  {disease.symptoms.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-white border border-[#E0DBCF] rounded-md"
                    >
                      • {s}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#707060] leading-relaxed">
                {disease.description}
              </p>

              {disease.firstAid && (
                <div className="p-3 bg-[#FEF9EC] border border-[#FDE68A] rounded-2xl text-xs text-[#B45309] flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">{t('vetTabFirstAid')}:</strong>
                    {disease.firstAid}
                  </div>
                </div>
              )}

              {disease.recommendedMeds && disease.recommendedMeds.length > 0 && (
                <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-[#4A5D44]">💊 {t('vetTabMeds')}:</span>
                  {disease.recommendedMeds.map((medName) => {
                    const matchedMed = VET_MEDICATIONS.find(
                      (m) =>
                        m.name.toLowerCase().includes(medName.toLowerCase()) ||
                        medName.toLowerCase().includes(m.name.toLowerCase())
                    );
                    return (
                      <button
                        key={medName}
                        onClick={() => {
                          if (matchedMed) {
                            setSelectedVetMed(matchedMed);
                          }
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                          matchedMed
                            ? 'bg-[#E9EDDC] text-[#4A5D44] border-[#D3DBBD] hover:bg-[#7B8E6A] hover:text-white cursor-pointer'
                            : 'bg-[#F5F2EB] text-[#707060] border-[#E0DBCF]'
                        }`}
                      >
                        {medName} {matchedMed && '→'}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() =>
                    setSelectedDisease(selectedDisease?.id === disease.id ? null : disease)
                  }
                  className="text-xs font-bold text-[#7B8E6A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>
                    {selectedDisease?.id === disease.id
                      ? t('closeBtn')
                      : t('viewInstructionBtn')}
                  </span>
                  {selectedDisease?.id === disease.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {selectedDisease?.id === disease.id && (
                  <div className="mt-3 p-4 bg-[#F5F2EB] rounded-2xl text-xs space-y-2 border border-[#E0DBCF]">
                    <span className="font-bold text-[#4A5D44] block">
                      {t('dosageAndUsage')}:
                    </span>
                    <ol className="list-decimal list-inside space-y-1 text-[#3E4238]">
                      {disease.treatmentProtocol.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Prohibited Human Drugs for Pets */}
      {activeTab === 'prohibited' && (
        <div className="space-y-4">
          <div className="p-4 bg-[#FDF3F3] border border-[#F0C4C4] rounded-2xl text-xs text-[#B87A7A] flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#B87A7A] shrink-0 mt-0.5" />
            <div>
              <strong className="text-sm font-bold block mb-1">
                {t('vetTabProhibited')}
              </strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROHIBITED_HUMAN_DRUGS.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-white border border-[#F0C4C4] rounded-3xl shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-serif font-bold text-[#B87A7A]">
                    {item.drugName}
                  </h3>
                  <span className="px-2.5 py-0.5 bg-[#FDF3F3] text-[#B87A7A] font-bold text-[10px] rounded-full border border-[#F0C4C4]">
                    {item.dangerLevel}
                  </span>
                </div>

                {/* Toxic for */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[#707060]">{t('speciesLabel')}:</span>
                  {item.toxicFor.map((sp) => (
                    <span
                      key={sp}
                      className="px-2 py-0.5 bg-[#FDF3F3] text-[#B87A7A] rounded-md font-bold text-[10px]"
                    >
                      {sp}
                    </span>
                  ))}
                </div>

                {/* Why Dangerous */}
                <div className="text-xs text-[#5A5A44] bg-[#F5F2EB] p-3 rounded-2xl border border-[#E0DBCF]">
                  <span className="font-bold text-[#4A5D44] block mb-0.5">
                    {t('contraindications')}:
                  </span>
                  <p>{item.whyDangerous}</p>
                </div>

                {/* Poisoning Symptoms */}
                <div className="text-xs">
                  <span className="font-bold text-[#B87A7A] block mb-1">
                    {t('symptomsLabel')}:
                  </span>
                  <ul className="list-disc list-inside text-[#707060] space-y-0.5">
                    {item.symptomsOfPoisoning.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>

                {/* Safe Veterinary Analogue */}
                <div className="p-3 bg-[#E9EDDC] border border-[#D3DBBD] rounded-2xl text-xs text-[#4A5D44]">
                  <strong className="block font-bold mb-0.5">{t('analogues')}:</strong>
                  {item.safeVetAnalogue}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: First Aid Guide */}
      {activeTab === 'firstaid' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VET_FIRST_AID.map((fa) => (
              <div
                key={fa.id}
                className="p-5 bg-white border border-[#E0DBCF] rounded-3xl shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-serif font-bold text-[#4A5D44]">
                    {fa.title}
                  </h3>
                  <span className="px-2.5 py-0.5 bg-[#FDF3F3] text-[#B87A7A] font-bold text-[10px] rounded-full border border-[#F0C4C4]">
                    {fa.emergencyType}
                  </span>
                </div>

                {/* Steps */}
                <div className="text-xs space-y-1.5">
                  <span className="font-bold text-[#7B8E6A] block">{t('dosageAndUsage')}:</span>
                  <ol className="list-decimal list-inside text-[#3E4238] space-y-1 leading-relaxed">
                    {fa.steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Do NOT do */}
                <div className="p-3 bg-[#FDF3F3] border border-[#F0C4C4] rounded-2xl text-xs text-[#B87A7A] space-y-1">
                  <span className="font-bold block">{t('contraindications')}:</span>
                  <ul className="list-disc list-inside space-y-0.5">
                    {fa.doNotDo.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                </div>

                {/* When to see vet */}
                <div className="text-[11px] text-[#A09B8E]">
                  <strong className="text-[#3E4238]">{t('vetTabFirstAid')}: </strong>
                  {fa.whenToSeeVetImmediately}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Vet Med Instruction Modal */}
      {selectedVetMed && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#E0DBCF] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedVetMed(null)}
              className="absolute top-5 right-5 p-2 text-[#A09B8E] hover:text-[#3E4238] hover:bg-[#F5F2EB] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="px-2.5 py-0.5 bg-[#E9EDDC] text-[#4A5D44] border border-[#D3DBBD] rounded-md text-[11px] font-bold">
                {selectedVetMed.category}
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#4A5D44] mt-2">
                {selectedVetMed.name}
              </h2>
              <p className="text-xs text-[#707060] italic">
                {t('activeSubstanceLabel')} {selectedVetMed.activeSubstance}
              </p>
            </div>

            {/* Species list */}
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-xs font-bold text-[#707060]">{t('speciesLabel')}:</span>
              {selectedVetMed.species.map((sp) => (
                <span
                  key={sp}
                  className="px-2.5 py-0.5 bg-[#7B8E6A] text-white rounded-md text-xs font-bold"
                >
                  {sp}
                </span>
              ))}
            </div>

            {/* Dosage instructions */}
            <div className="p-4 bg-[#F5F2EB] border border-[#E0DBCF] rounded-2xl text-xs space-y-2 mb-4">
              <span className="font-bold text-[#4A5D44] uppercase tracking-wider block">
                {t('dosageAndUsage')}:
              </span>
              {selectedVetMed.dosageByWeight.dogs && (
                <div>
                  <strong className="text-[#3E4238]">Dogs: </strong>
                  <span>{selectedVetMed.dosageByWeight.dogs}</span>
                </div>
              )}
              {selectedVetMed.dosageByWeight.cats && (
                <div>
                  <strong className="text-[#3E4238]">Cats: </strong>
                  <span>{selectedVetMed.dosageByWeight.cats}</span>
                </div>
              )}
              {selectedVetMed.dosageByWeight.livestock && (
                <div>
                  <strong className="text-[#3E4238]">Livestock: </strong>
                  <span>{selectedVetMed.dosageByWeight.livestock}</span>
                </div>
              )}
            </div>

            {/* Indications */}
            <div className="mb-4 text-xs space-y-1">
              <span className="font-bold text-[#4A5D44] block">{t('indications')}:</span>
              <ul className="list-disc list-inside text-[#5A5A44] space-y-0.5">
                {selectedVetMed.indications.map((ind, idx) => (
                  <li key={idx}>{ind}</li>
                ))}
              </ul>
            </div>

            {/* Contraindications */}
            <div className="mb-4 text-xs space-y-1">
              <span className="font-bold text-[#B87A7A] block">{t('contraindications')}:</span>
              <ul className="list-disc list-inside text-[#707060] space-y-0.5">
                {selectedVetMed.contraindications.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedVetMed(null)}
                className="px-6 py-2.5 rounded-full bg-[#7B8E6A] text-white text-xs font-bold hover:bg-[#687B58] transition-colors cursor-pointer"
              >
                {t('closeBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

