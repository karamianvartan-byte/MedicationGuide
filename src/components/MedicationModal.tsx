import React, { useState } from 'react';
import { Medication } from '../types';
import {
  X, Heart, AlertTriangle, Clock, CheckCircle2,
  FileText, ShieldAlert, Pill, Sparkles, Printer, ArrowRight
} from 'lucide-react';

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
                {medication.prescriptionStatus === 'Rx' ? 'По рецепту (Rx)' : 'Без рецепта (OTC)'}
              </span>

              <span className="text-xs text-[#7B8E6A] font-semibold bg-white px-2.5 py-0.5 rounded-full border border-[#D1CCBF]">
                {medication.pharmGroup}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A5D44]">
              {medication.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#A09B8E] font-medium">
              Латинское название: <span className="italic">{medication.latinName}</span> | Действующее вещество: <span className="font-semibold text-[#3E4238]">{medication.activeSubstance}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleBookmark(medication.id)}
              className={`p-2 rounded-full border border-[#D1CCBF] transition-colors ${
                isBookmarked ? 'bg-[#7B8E6A] text-white' : 'bg-white text-[#7B8E6A] hover:bg-[#F5F2EB]'
              }`}
              title={isBookmarked ? 'В избранном' : 'Добавить в избранное'}
            >
              <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-full bg-white border border-[#D1CCBF] text-[#5A5A44] hover:bg-[#F5F2EB] transition-colors hidden sm:flex"
              title="Распечатать инструкцию"
            >
              <Printer className="w-5 h-5" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white border border-[#D1CCBF] text-[#A09B8E] hover:text-[#3E4238] hover:bg-[#F5F2EB] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-[#E0DBCF] bg-[#F5F2EB] px-6 gap-2 sm:gap-4 text-xs sm:text-sm font-semibold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`py-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'instructions'
                ? 'border-[#7B8E6A] text-[#7B8E6A] font-bold'
                : 'border-transparent text-[#707060] hover:text-[#3E4238]'
            }`}
          >
            Применение и дозировка
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`py-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'safety'
                ? 'border-[#7B8E6A] text-[#7B8E6A] font-bold'
                : 'border-transparent text-[#707060] hover:text-[#3E4238]'
            }`}
          >
            Противопоказания & Побочные
          </button>
          <button
            onClick={() => setActiveTab('analogues')}
            className={`py-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'analogues'
                ? 'border-[#7B8E6A] text-[#7B8E6A] font-bold'
                : 'border-transparent text-[#707060] hover:text-[#3E4238]'
            }`}
          >
            Аналоги ({medication.analogues?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`py-3 px-1 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'border-[#7B8E6A] text-[#7B8E6A] font-bold'
                : 'border-transparent text-[#707060] hover:text-[#3E4238]'
            }`}
          >
            График & Калькулятор
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-[#3E4238] text-sm">

          {/* TAB 1: INSTRUCTIONS */}
          {activeTab === 'instructions' && (
            <div className="space-y-5">
              {/* Description */}
              <div className="p-4 bg-[#F5F2EB] rounded-2xl border border-[#E0DBCF]">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#7B8E6A] mb-1">
                  Фармакологическое действие
                </h4>
                <p className="text-sm text-[#3E4238] leading-relaxed">
                  {medication.description}
                </p>
              </div>

              {/* Indications */}
              <div>
                <h3 className="text-base font-serif font-bold text-[#4A5D44] mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7B8E6A]" />
                  Показания к применению (Симптомы)
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

              {/* Forms and Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-white border border-[#E0DBCF] rounded-2xl">
                  <span className="text-xs text-[#A09B8E] font-bold uppercase tracking-wider">Формы выпуска</span>
                  <p className="font-semibold text-sm text-[#3E4238] mt-1">
                    {medication.releaseForms.join(', ')}
                  </p>
                </div>
                <div className="p-3.5 bg-white border border-[#E0DBCF] rounded-2xl">
                  <span className="text-xs text-[#A09B8E] font-bold uppercase tracking-wider">Ориентировочная цена</span>
                  <p className="font-bold text-sm text-[#7B8E6A] mt-1">
                    {medication.priceEstimate}
                  </p>
                </div>
              </div>

              {/* Dosage Rules */}
              <div className="p-4 bg-white border border-[#E0DBCF] rounded-2xl space-y-3">
                <h3 className="text-base font-serif font-bold text-[#4A5D44] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#7B8E6A]" />
                  Способ применения и дозы
                </h3>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="p-2.5 bg-[#FDFCF8] rounded-xl border border-[#F5F2EB]">
                    <span className="font-bold text-[#4A5D44]">Для взрослых: </span>
                    <span>{medication.dosage.adults}</span>
                  </div>

                  {medication.dosage.children && (
                    <div className="p-2.5 bg-[#FDFCF8] rounded-xl border border-[#F5F2EB]">
                      <span className="font-bold text-[#4A5D44]">Для детей: </span>
                      <span>{medication.dosage.children}</span>
                    </div>
                  )}

                  <div className="p-2.5 bg-[#FBEFF2] rounded-xl border border-[#F2D7D7] text-[#B87A7A] font-medium">
                    <span className="font-bold">Максимальная суточная доза: </span>
                    <span>{medication.dosage.maxDaily}</span>
                  </div>
                </div>
              </div>

              {/* Manufacturer */}
              {medication.manufacturer && (
                <div className="text-xs text-[#A09B8E]">
                  Производитель: <span className="font-semibold text-[#707060]">{medication.manufacturer}</span>
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
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A09B8E]">Безопасность при беременности:</span>
                  <p className="font-bold text-sm text-[#4A5D44]">
                    {medication.pregnancySafety || 'По назначению врача'}
                  </p>
                </div>
              </div>

              {/* Contraindications */}
              <div className="p-4 bg-white border border-[#F2D7D7] rounded-2xl">
                <h3 className="text-base font-serif font-bold text-[#B87A7A] mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#B87A7A]" />
                  Противопоказания
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
                  Возможные побочные эффекты
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
                    Особые указания & Меры предосторожности
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
                  Препараты-синонимы
                </h4>
                <p className="text-xs text-[#707060]">
                  Ниже приведены препараты с аналогичным действующим веществом или сопоставимым фарм-действием.
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
                          Действующее вещество: {medication.activeSubstance}
                        </p>
                      </div>
                      {onSelectAnalogue && (
                        <button
                          onClick={() => onSelectAnalogue(analogue)}
                          className="text-xs text-[#7B8E6A] font-bold hover:underline flex items-center gap-1"
                        >
                          Найти <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#A09B8E] italic">Прямые синонимы не указаны.</p>
              )}
            </div>
          )}

          {/* TAB 4: CALCULATOR & DOSAGE HELPER */}
          {activeTab === 'calculator' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#E9EDDC] rounded-2xl border border-[#D3DBBD]">
                <h4 className="font-serif font-bold text-base text-[#4A5D44] mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#7B8E6A]" />
                  Памятка приёма & Калькулятор интервалов
                </h4>
                <p className="text-xs text-[#4A5D44]">
                  Рассчитайте рекомендуемый интервал и проконтролируйте суточный лимит для препарата {medication.name}.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E0DBCF] rounded-2xl space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#A09B8E] mb-1">
                    Время последнего приёма препарата:
                  </label>
                  <input
                    type="time"
                    value={lastDoseTime}
                    onChange={(e) => setLastDoseTime(e.target.value)}
                    className="px-3 py-2 bg-[#F5F2EB] border border-[#D1CCBF] rounded-xl text-sm font-semibold text-[#3E4238]"
                  />
                </div>

                <div className="p-3 bg-[#F5F2EB] rounded-xl border border-[#E0DBCF] space-y-1">
                  <span className="text-xs font-bold text-[#7B8E6A]">Рекомендуемый следующий приём:</span>
                  <p className="text-sm font-bold text-[#4A5D44]">
                    Не ранее чем через 4–6 часов после последнего приёма
                  </p>
                  <p className="text-[11px] text-[#707060]">
                    Максимальный дневной лимит: <span className="font-semibold">{medication.dosage.maxDaily}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Disclaimer */}
        <div className="px-6 py-3 bg-[#4A5D44] text-[#E9EDDC] text-[10px] sm:text-[11px] flex items-center justify-between">
          <p>
            ИНФОРМАЦИЯ ПРЕДОСТАВЛЕНА В ОЗНАКОМИТЕЛЬНЫХ ЦЕЛЯХ. НЕ ЗАМЕНЯЕТ КОНСУЛЬТАЦИЮ ВРАЧА.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#7B8E6A] hover:bg-[#687B58] text-white rounded-full font-bold text-xs"
          >
            Закрыть
          </button>
        </div>

      </div>
    </div>
  );
};
