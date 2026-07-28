import React, { useState } from 'react';
import { Medication } from '../types';
import {
  X, Heart, AlertTriangle, Clock, CheckCircle2,
  FileText, ShieldAlert, Pill, Sparkles, Printer, ArrowRight
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface MedicationModalProps {
  medication: Medication | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (medicationId: string) => void;
  onSelectAnalogue?: (analogueName: string) => void;
}

export const MedicationModal: React.FC<MedicationModalProps> = ({
  medication,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSelectAnalogue
}) => {
  const { t } = useLanguage();
  if (!medication) return null;

  const [activeTab, setActiveTab] = useState<'instructions' | 'safety' | 'analogues' | 'calculator'>('instructions');

  // Simple state for dosage calculator helper
  const [userWeight, setUserWeight] = useState<number>(70);
  const [lastDoseTime, setLastDoseTime] = useState<string>('08:00');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FDFCF8] border border-[#E0DBCF] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#F5F2EB] border-b border-[#E0DBCF] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span
                className={`px-2.5 py-0.5 text-[10px] font-bold rounded border ${
                  medication.prescriptionStatus === 'Rx'
                    ? 'bg-[#FBEFF2] text-[#B87A7A] border-[#F2D7D7]'
                    : 'bg-[#E9EDDC] text-[#4A5D44] border-[#D3DBBD]'
                }`}
              >
                {medication.prescriptionStatus === 'Rx' ? t('byPrescription') : t('withoutPrescription')}
              </span>

              <span className="text-xs text-[#7B8E6A] font-semibold bg-white px-2.5 py-0.5 rounded-full border border-[#D1CCBF]">
                {medication.pharmGroup}
              </span>

              {medication.isVED && (
                <span className="text-xs font-bold bg-[#E8F0E6] text-[#2E5E2A] px-2.5 py-0.5 rounded-full border border-[#BCD4B8] flex items-center gap-1">
                  <span>🏛️</span>
                  <span>{t('isVEDLabel')}</span>
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A5D44]">
              {medication.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#A09B8E] font-medium">
              {t('activeSubstanceLabel')} <span className="font-semibold text-[#3E4238]">{medication.activeSubstance}</span> <span className="italic">({medication.activeSubstanceLatin})</span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleBookmark(medication.id)}
              className={`p-2 rounded-full border border-[#D1CCBF] transition-colors cursor-pointer ${
                isBookmarked ? 'bg-[#7B8E6A] text-white' : 'bg-white text-[#7B8E6A] hover:bg-[#F5F2EB]'
              }`}
              title={isBookmarked ? t('bookmarksBtn') : t('bookmarksBtn')}
            >
              <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-full bg-white border border-[#D1CCBF] text-[#5A5A44] hover:bg-[#F5F2EB] transition-colors hidden sm:flex cursor-pointer"
              title="Print"
            >
              <Printer className="w-5 h-5" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white border border-[#D1CCBF] text-[#A09B8E] hover:text-[#3E4238] hover:bg-[#F5F2EB] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-[#E0DBCF] bg-[#F5F2EB] px-6 gap-2 sm:gap-4 text-xs sm:text-sm font-semibold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`py-3 px-1 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'instructions'
                ? 'border-[#7B8E6A] text-[#7B8E6A] font-bold'
                : 'border-transparent text-[#707060] hover:text-[#3E4238]'
            }`}
          >
            {t('dosageAndUsage')}
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`py-3 px-1 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'safety'
                ? 'border-[#7B8E6A] text-[#7B8E6A] font-bold'
                : 'border-transparent text-[#707060] hover:text-[#3E4238]'
            }`}
          >
            {t('contraindications')} & {t('sideEffects')}
          </button>
          <button
            onClick={() => setActiveTab('analogues')}
            className={`py-3 px-1 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'analogues'
                ? 'border-[#7B8E6A] text-[#7B8E6A] font-bold'
                : 'border-transparent text-[#707060] hover:text-[#3E4238]'
            }`}
          >
            {t('analogues')} ({medication.analogues?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`py-3 px-1 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'calculator'
                ? 'border-[#7B8E6A] text-[#7B8E6A] font-bold'
                : 'border-transparent text-[#707060] hover:text-[#3E4238]'
            }`}
          >
            {t('calcTitle')}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-[#3E4238] text-sm">

          {/* TAB 1: INSTRUCTIONS */}
          {activeTab === 'instructions' && (
            <div className="space-y-5">
              {/* Ministry of Health Official Registry & Guidelines Card */}
              <div className="p-4 bg-[#F2F7F0] border border-[#C6DFC1] rounded-2xl space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 font-bold text-[#2E5E2A] text-xs sm:text-sm">
                    <span className="text-base">🏛️</span>
                    <span>{t('minzdravBadge')}</span>
                    {medication.isVED && (
                      <span className="px-2 py-0.5 bg-[#2E5E2A] text-white rounded text-[10px] font-extrabold uppercase tracking-wide">
                        {t('isVEDLabel')}
                      </span>
                    )}
                  </div>
                  {medication.grlsRegNum && (
                    <span className="text-xs text-[#5A6E55] font-mono font-semibold bg-white/80 px-2 py-0.5 rounded border border-[#C6DFC1]">
                      {t('grlsLabel')} {medication.grlsRegNum}
                    </span>
                  )}
                </div>
                {medication.atcCode && (
                  <p className="text-xs text-[#4A5D44]">
                    <span className="font-semibold text-[#2E5E2A]">{t('atcLabel')}</span> <code className="bg-white px-1.5 py-0.5 rounded border border-[#C6DFC1] text-[#2E5E2A] font-mono">{medication.atcCode}</code>
                  </p>
                )}
                {medication.minzdravGuideline ? (
                  <div className="pt-2 border-t border-[#D3E8CD] text-xs text-[#2A4027] leading-relaxed">
                    <span className="font-bold text-[#2E5E2A] block mb-1">📋 {t('minzdravGuidelineTitle')}</span>
                    <p className="bg-white/90 p-2.5 rounded-xl border border-[#D3E8CD] text-[#2E4528] italic">"{medication.minzdravGuideline}"</p>
                  </div>
                ) : (
                  <div className="pt-1.5 border-t border-[#D3E8CD] text-[11px] text-[#4A5D44]">
                    <span>Зарегистрирован в Государственном реестре лекарственных средств (ГРЛС) Минздрава.</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="p-4 bg-[#F5F2EB] rounded-2xl border border-[#E0DBCF]">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#7B8E6A] mb-1">
                  {t('pharmGroup')}
                </h4>
                <p className="text-sm text-[#3E4238] leading-relaxed">
                  {medication.description}
                </p>
              </div>

              {/* Indications */}
              <div>
                <h3 className="text-base font-serif font-bold text-[#4A5D44] mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7B8E6A]" />
                  {t('indications')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {medication.indications.map((ind, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#E9EDDC] text-[#4A5D44] rounded-lg text-xs font-medium border border-[#D3DBBD]"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              {/* Forms */}
              <div className="p-3.5 bg-white border border-[#E0DBCF] rounded-2xl">
                <span className="text-xs text-[#A09B8E] font-bold uppercase tracking-wider">{t('releaseFormsLabel')}</span>
                <p className="font-semibold text-sm text-[#3E4238] mt-1">
                  {medication.releaseForms.join(', ')}
                </p>
              </div>

              {/* Dosage Rules */}
              <div className="p-4 bg-white border border-[#E0DBCF] rounded-2xl space-y-3">
                <h3 className="text-base font-serif font-bold text-[#4A5D44] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#7B8E6A]" />
                  {t('dosageAndUsage')}
                </h3>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="p-2.5 bg-[#FDFCF8] rounded-xl border border-[#F5F2EB]">
                    <span className="font-bold text-[#4A5D44]">{t('dosageAdults')} </span>
                    <span>{medication.dosage.adults}</span>
                  </div>

                  {medication.dosage.children && (
                    <div className="p-2.5 bg-[#FDFCF8] rounded-xl border border-[#F5F2EB]">
                      <span className="font-bold text-[#4A5D44]">{t('dosageChildren')} </span>
                      <span>{medication.dosage.children}</span>
                    </div>
                  )}

                  <div className="p-2.5 bg-[#FBEFF2] rounded-xl border border-[#F2D7D7] text-[#B87A7A] font-medium">
                    <span className="font-bold">{t('maxDaily')} </span>
                    <span>{medication.dosage.maxDaily}</span>
                  </div>
                </div>
              </div>

              {/* Manufacturer */}
              {medication.manufacturer && (
                <div className="text-xs text-[#A09B8E]">
                  {t('manufacturer')} <span className="font-semibold text-[#707060]">{medication.manufacturer}</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SAFETY & CONTRAINDICATIONS */}
          {activeTab === 'safety' && (
            <div className="space-y-5">
              {/* Pregnancy Warning */}
              <div className="p-4 rounded-2xl border flex items-center gap-3 bg-[#F5F2EB] border-[#E0DBCF]">
                <ShieldAlert className="w-6 h-6 text-[#7B8E6A] shrink-0" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A09B8E]">{t('pregnancySafety')}</span>
                  <p className="font-bold text-sm text-[#4A5D44]">
                    {medication.pregnancySafety || t('byDoctorOrder')}
                  </p>
                </div>
              </div>

              {/* Contraindications */}
              <div className="p-4 bg-white border border-[#F2D7D7] rounded-2xl">
                <h3 className="text-base font-serif font-bold text-[#B87A7A] mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#B87A7A]" />
                  {t('contraindications')}
                </h3>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#707060]">
                  {medication.contraindications.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Side Effects */}
              <div className="p-4 bg-white border border-[#E0DBCF] rounded-2xl">
                <h3 className="text-base font-serif font-bold text-[#4A5D44] mb-2">
                  {t('sideEffects')}
                </h3>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#707060]">
                  {medication.sideEffects.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Special Instructions */}
              {medication.specialInstructions && (
                <div className="p-4 bg-[#F5F2EB] rounded-2xl border border-[#D1CCBF]">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#4A5D44] mb-1">
                    {t('specialInstructions')}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#3E4238]">
                    {medication.specialInstructions}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ANALOGUES */}
          {activeTab === 'analogues' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#F5F2EB] rounded-2xl border border-[#E0DBCF]">
                <h4 className="font-serif font-bold text-base text-[#4A5D44] mb-1">
                  {t('analogues')}
                </h4>
                <p className="text-xs text-[#707060]">
                  {medication.name}
                </p>
              </div>

              {medication.analogues && medication.analogues.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {medication.analogues.map((analogue, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white border border-[#E0DBCF] rounded-2xl flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-sm text-[#4A5D44]">{analogue}</span>
                        <p className="text-[11px] text-[#A09B8E]">
                          {t('activeSubstanceLabel')} {medication.activeSubstance}
                        </p>
                      </div>
                      {onSelectAnalogue && (
                        <button
                          onClick={() => onSelectAnalogue(analogue)}
                          className="text-xs text-[#7B8E6A] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#A09B8E] italic">...</p>
              )}
            </div>
          )}

          {/* TAB 4: CALCULATOR & DOSAGE HELPER */}
          {activeTab === 'calculator' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#E9EDDC] rounded-2xl border border-[#D3DBBD]">
                <h4 className="font-serif font-bold text-base text-[#4A5D44] mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#7B8E6A]" />
                  {t('calcTitle')}
                </h4>
                <p className="text-xs text-[#4A5D44]">
                  {medication.name}
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E0DBCF] rounded-2xl space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#A09B8E] mb-1">
                    {t('dosageAndUsage')}
                  </label>
                  <input
                    type="time"
                    value={lastDoseTime}
                    onChange={(e) => setLastDoseTime(e.target.value)}
                    className="px-3 py-2 bg-[#F5F2EB] border border-[#D1CCBF] rounded-xl text-sm font-semibold text-[#3E4238]"
                  />
                </div>

                <div className="p-3 bg-[#F5F2EB] rounded-xl border border-[#E0DBCF] space-y-1">
                  <span className="text-xs font-bold text-[#7B8E6A]">{t('dosageAndUsage')}</span>
                  <p className="text-sm font-bold text-[#4A5D44]">
                    {medication.dosage.adults}
                  </p>
                  <p className="text-[11px] text-[#707060]">
                    {t('maxDaily')} <span className="font-semibold">{medication.dosage.maxDaily}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Disclaimer */}
        <div className="px-6 py-3 bg-[#4A5D44] text-[#E9EDDC] text-[10px] sm:text-[11px] flex items-center justify-between">
          <p className="pr-2">
            {t('disclaimerText')}
          </p>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#7B8E6A] hover:bg-[#687B58] text-white rounded-full font-bold text-xs cursor-pointer shrink-0"
          >
            {t('closeBtn')}
          </button>
        </div>

      </div>
    </div>
  );
};

