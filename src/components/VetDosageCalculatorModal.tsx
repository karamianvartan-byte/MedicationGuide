import React, { useState } from 'react';
import { VET_MEDICATIONS } from '../data/veterinary';
import { Calculator, X, Scale, AlertTriangle, CheckCircle, Info, ShieldAlert } from 'lucide-react';
import { AnimalSpecies } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface VetDosageCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VetDosageCalculatorModal: React.FC<VetDosageCalculatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const { t } = useLanguage();
  const [selectedMedId, setSelectedMedId] = useState<string>(VET_MEDICATIONS[0].id);
  const [weightKg, setWeightKg] = useState<string>('5');
  const [selectedSpecies, setSelectedSpecies] = useState<AnimalSpecies>('Собаки');

  if (!isOpen) return null;

  const currentMed = VET_MEDICATIONS.find((m) => m.id === selectedMedId) || VET_MEDICATIONS[0];

  const parsedWeight = parseFloat(weightKg.replace(',', '.')) || 0;

  // Calculate dosage in mg
  const mgPerKg = currentMed.dosageByWeight.mgPerKg || 0;
  const calculatedTotalMg = parsedWeight > 0 && mgPerKg > 0 ? (parsedWeight * mgPerKg).toFixed(1) : null;

  // Specific text dosage by species
  let speciesDosageText = '';
  if ((selectedSpecies === 'Собаки' || selectedSpecies === 'Dogs' || selectedSpecies === 'Շներ') && currentMed.dosageByWeight.dogs) {
    speciesDosageText = currentMed.dosageByWeight.dogs;
  } else if ((selectedSpecies === 'Кошки' || selectedSpecies === 'Cats' || selectedSpecies === 'Կատուներ') && currentMed.dosageByWeight.cats) {
    speciesDosageText = currentMed.dosageByWeight.cats;
  } else if ((selectedSpecies === 'С/х животные' || selectedSpecies === 'Livestock' || selectedSpecies === 'Գյուղատնտեսական կենդանիներ') && currentMed.dosageByWeight.livestock) {
    speciesDosageText = currentMed.dosageByWeight.livestock;
  } else if ((selectedSpecies === 'Птицы' || selectedSpecies === 'Birds' || selectedSpecies === 'Թռչուններ') && currentMed.dosageByWeight.birds) {
    speciesDosageText = currentMed.dosageByWeight.birds;
  } else {
    speciesDosageText = t('dosageAndUsage');
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[#E0DBCF] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#A09B8E] hover:text-[#3E4238] hover:bg-[#F5F2EB] rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#E9EDDC] border border-[#D3DBBD] flex items-center justify-center text-[#4A5D44] shrink-0">
            <Calculator className="w-6 h-6 text-[#7B8E6A]" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-[#4A5D44]">
              {t('calcTitle')}
            </h2>
            <p className="text-xs text-[#707060]">
              {t('dosageAndUsage')}
            </p>
          </div>
        </div>

        {/* Form Controls */}
        <div className="space-y-4 mb-6">
          {/* Select Species */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#707060] mb-1.5">
              {t('speciesLabel')}:
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {(['Собаки', 'Кошки', 'С/х животные', 'Птицы', 'Грызуны и экзоты'] as AnimalSpecies[]).map((sp) => (
                <button
                  key={sp}
                  type="button"
                  onClick={() => setSelectedSpecies(sp)}
                  className={`px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                    selectedSpecies === sp
                      ? 'bg-[#7B8E6A] text-white border-[#7B8E6A] shadow-2xs font-bold'
                      : 'bg-[#FDFCF8] text-[#5A5A44] border-[#E0DBCF] hover:bg-[#F5F2EB]'
                  }`}
                >
                  {sp}
                </button>
              ))}
            </div>
          </div>

          {/* Select Medication */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#707060] mb-1.5">
              {t('vetTabMeds')}:
            </label>
            <select
              value={selectedMedId}
              onChange={(e) => setSelectedMedId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0DBCF] bg-white text-sm text-[#3E4238] font-medium focus:outline-none focus:ring-2 focus:ring-[#7B8E6A]"
            >
              {VET_MEDICATIONS.map((med) => (
                <option key={med.id} value={med.id}>
                  {med.name} ({med.activeSubstance})
                </option>
              ))}
            </select>
          </div>

          {/* Enter Weight */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#707060] mb-1.5 flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-[#7B8E6A]" />
              {t('speciesLabel')} (kg):
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="1000"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                placeholder="4.5"
                className="w-full pl-4 pr-12 py-2.5 rounded-xl border border-[#E0DBCF] bg-white text-sm font-bold text-[#3E4238] focus:outline-none focus:ring-2 focus:ring-[#7B8E6A]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#A09B8E]">
                kg
              </span>
            </div>
          </div>
        </div>

        {/* Calculation Result Box */}
        <div className="p-5 bg-[#F5F2EB] border border-[#E0DBCF] rounded-2xl space-y-3 mb-6">
          <div className="flex items-center justify-between border-b border-[#E0DBCF] pb-3">
            <span className="text-xs font-bold text-[#4A5D44] uppercase tracking-wider">
              {t('vetTabMeds')}:
            </span>
            <span className="text-sm font-bold text-[#3E4238]">
              {currentMed.name}
            </span>
          </div>

          {/* Cat toxicity alert */}
          {(selectedSpecies === 'Кошки' || selectedSpecies === 'Cats' || selectedSpecies === 'Կատուներ') && currentMed.isToxicToCats && (
            <div className="p-3 bg-[#FDF3F3] border border-[#F0C4C4] rounded-xl text-xs text-[#B87A7A] flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#B87A7A] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">{t('vetTabProhibited')}</strong>
              </div>
            </div>
          )}

          {/* Calculated mg dose if applicable */}
          {calculatedTotalMg && mgPerKg > 0 && (
            <div className="p-3.5 bg-white border border-[#D3DBBD] rounded-xl text-center space-y-1">
              <div className="text-2xl font-serif font-bold text-[#4A5D44]">
                ~ {calculatedTotalMg} mg
              </div>
              <span className="text-[11px] text-[#A09B8E]">
                ({mgPerKg} mg/kg x {parsedWeight} kg)
              </span>
            </div>
          )}

          {/* Official recommended instruction text */}
          <div className="text-xs space-y-1 text-[#5A5A44]">
            <span className="font-bold text-[#4A5D44] flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-[#7B8E6A]" />
              {t('dosageAndUsage')}:
            </span>
            <p className="p-2.5 bg-white rounded-xl border border-[#E0DBCF] leading-relaxed text-[#3E4238]">
              {speciesDosageText}
            </p>
          </div>
        </div>

        {/* Disclaimer Footer */}
        <div className="p-3 bg-[#FDFCF8] border border-[#E0DBCF] rounded-xl text-[11px] text-[#A09B8E] flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-[#B87A7A] shrink-0 mt-0.5" />
          <p className="leading-tight">
            {t('consultDoctorDisclaimer')}
          </p>
        </div>

        {/* Close Modal Action */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#7B8E6A] text-white text-xs font-bold hover:bg-[#687B58] transition-colors cursor-pointer"
          >
            {t('closeBtn')}
          </button>
        </div>
      </div>
    </div>
  );
};

