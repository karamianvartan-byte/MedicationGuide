import React, { useState } from 'react';
import { Medication } from '../types';
import { SYMPTOM_CATEGORIES } from '../data/medications';
import { X, Activity, ChevronRight, Check, AlertCircle, ArrowLeft } from 'lucide-react';

interface SymptomCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  medications: Medication[];
  onSelectMedication: (med: Medication) => void;
}

export const SymptomCheckerModal: React.FC<SymptomCheckerModalProps> = ({
  isOpen,
  onClose,
  medications,
  onSelectMedication
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [ageGroup, setAgeGroup] = useState<'adult' | 'child' | 'elderly'>('adult');
  const [prescriptionOnly, setPrescriptionOnly] = useState<boolean>(false);

  // Toggle symptom selection
  const toggleSymptom = (sym: string) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  // Find matching medications
  const matchedMedications = medications.filter(med => {
    if (prescriptionOnly && med.prescriptionStatus === 'Rx') return false;

    // Check if medication matches any of the selected symptoms
    if (selectedSymptoms.length > 0) {
      const matchesSymptom = selectedSymptoms.some(sym =>
        med.symptoms.some(ms => ms.toLowerCase().includes(sym.toLowerCase())) ||
        med.indications.some(ind => ind.toLowerCase().includes(sym.toLowerCase()))
      );
      if (!matchesSymptom) return false;
    } else if (selectedCategory) {
      if (med.category !== selectedCategory) return false;
    }

    return true;
  });

  const resetAll = () => {
    setStep(1);
    setSelectedCategory(null);
    setSelectedSymptoms([]);
    setAgeGroup('adult');
    setPrescriptionOnly(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FDFCF8] border border-[#E0DBCF] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-6 py-4 bg-[#F5F2EB] border-b border-[#E0DBCF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E9EDDC] border border-[#D3DBBD] flex items-center justify-center text-[#4A5D44]">
              <Activity className="w-4 h-4 text-[#7B8E6A]" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-[#4A5D44]">
                Интерактивный подбор по симптомам
              </h2>
              <p className="text-xs text-[#A09B8E]">Шаг {step} из 3</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white border border-[#D1CCBF] text-[#A09B8E] hover:text-[#3E4238]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">

          {/* STEP 1: Select Category & Main Symptoms */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-serif font-bold text-[#4A5D44] mb-1">
                  1. Укажите, что вас беспокоит
                </h3>
                <p className="text-xs text-[#707060]">
                  Выберите основные категории или несколько конкретных симптомов:
                </p>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SYMPTOM_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(isSelected ? null : cat.name);
                      }}
                      className={`p-3 text-left rounded-2xl border transition-all text-xs font-semibold ${
                        isSelected
                          ? 'bg-[#E9EDDC] border-[#7B8E6A] text-[#4A5D44] shadow-2xs'
                          : 'bg-white border-[#E0DBCF] text-[#3E4238] hover:bg-[#F5F2EB]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>

              {/* Specific Symptoms checkboxes */}
              {selectedCategory && (
                <div className="pt-3 border-t border-[#E0DBCF]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A09B8E] block mb-2">
                    Уточните конкретные проявления ({selectedCategory}):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SYMPTOM_CATEGORIES.find(c => c.name === selectedCategory)?.symptoms.map((sym) => {
                      const isChecked = selectedSymptoms.includes(sym);
                      return (
                        <button
                          key={sym}
                          onClick={() => toggleSymptom(sym)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 ${
                            isChecked
                              ? 'bg-[#7B8E6A] text-white border-[#7B8E6A]'
                              : 'bg-white text-[#3E4238] border-[#D1CCBF] hover:bg-[#F5F2EB]'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                          {sym}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Age group & Filter Preferences */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-serif font-bold text-[#4A5D44] mb-1">
                  2. Возрастная категория и параметры
                </h3>
                <p className="text-xs text-[#707060]">
                  Это поможет отфильтровать препараты с возрастными ограничениями:
                </p>
              </div>

              {/* Age Group Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setAgeGroup('adult')}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    ageGroup === 'adult'
                      ? 'bg-[#E9EDDC] border-[#7B8E6A] text-[#4A5D44] font-bold'
                      : 'bg-white border-[#E0DBCF] text-[#3E4238]'
                  }`}
                >
                  <div className="text-sm">Взрослый</div>
                  <div className="text-[10px] text-[#707060]">От 18 до 65 лет</div>
                </button>

                <button
                  onClick={() => setAgeGroup('child')}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    ageGroup === 'child'
                      ? 'bg-[#E9EDDC] border-[#7B8E6A] text-[#4A5D44] font-bold'
                      : 'bg-white border-[#E0DBCF] text-[#3E4238]'
                  }`}
                >
                  <div className="text-sm">Ребёнок</div>
                  <div className="text-[10px] text-[#707060]">До 18 лет</div>
                </button>

                <button
                  onClick={() => setAgeGroup('elderly')}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    ageGroup === 'elderly'
                      ? 'bg-[#E9EDDC] border-[#7B8E6A] text-[#4A5D44] font-bold'
                      : 'bg-white border-[#E0DBCF] text-[#3E4238]'
                  }`}
                >
                  <div className="text-sm">Пожилой</div>
                  <div className="text-[10px] text-[#707060]">Старше 65 лет</div>
                </button>
              </div>

              {/* OTC Checkbox */}
              <label className="flex items-center gap-2 p-3 bg-[#F5F2EB] rounded-2xl border border-[#E0DBCF] cursor-pointer">
                <input
                  type="checkbox"
                  checked={prescriptionOnly}
                  onChange={(e) => setPrescriptionOnly(e.target.checked)}
                  className="rounded text-[#7B8E6A] focus:ring-[#7B8E6A]"
                />
                <span className="text-xs font-semibold text-[#3E4238]">
                  Показывать только безрецептурные препараты (OTC)
                </span>
              </label>
            </div>
          )}

          {/* STEP 3: Results */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#4A5D44]">
                    Рекомендуемые препараты
                  </h3>
                  <p className="text-xs text-[#707060]">
                    Найдено подходящих средств: {matchedMedications.length}
                  </p>
                </div>
                <button
                  onClick={resetAll}
                  className="text-xs text-[#7B8E6A] hover:underline font-semibold"
                >
                  Сбросить подбор
                </button>
              </div>

              {matchedMedications.length > 0 ? (
                <div className="space-y-3">
                  {matchedMedications.map((med) => (
                    <div
                      key={med.id}
                      className="p-4 bg-white border border-[#E0DBCF] rounded-2xl flex items-center justify-between gap-3 hover:border-[#7B8E6A] transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#4A5D44]">{med.name}</h4>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold border ${
                            med.prescriptionStatus === 'Rx'
                              ? 'bg-[#FBEFF2] text-[#B87A7A] border-[#F2D7D7]'
                              : 'bg-[#F5F2EB] text-[#5A5A44] border-[#E0DBCF]'
                          }`}>
                            {med.prescriptionStatus}
                          </span>
                        </div>
                        <p className="text-xs text-[#A09B8E]">{med.activeSubstance}</p>
                        <p className="text-[11px] text-[#707060] mt-1 line-clamp-1">
                          Применяется при: {med.symptoms.slice(0, 3).join(', ')}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onSelectMedication(med);
                        }}
                        className="px-3 py-1.5 bg-[#7B8E6A] text-white rounded-full font-bold text-xs hover:bg-[#687B58] transition-colors shrink-0"
                      >
                        Инструкция
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center bg-[#F5F2EB] rounded-2xl border border-[#E0DBCF] text-xs text-[#707060]">
                   По выбранным параметрам подходящих препаратов не найдено. Попробуйте сбросить фильтры.
                </div>
              )}

              {/* Safety notice */}
              <div className="p-3 bg-[#FBEFF2] border border-[#F2D7D7] rounded-xl text-[11px] text-[#B87A7A] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Результаты подбора являются справочными. Обязательно проконсультируйтесь с лечащим врачом перед приёмом любого лекарственного средства.
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-3 bg-[#F5F2EB] border-t border-[#E0DBCF] flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 border border-[#D1CCBF] rounded-full text-xs font-semibold text-[#3E4238] hover:bg-white flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Назад
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2 bg-[#7B8E6A] hover:bg-[#687B58] text-white rounded-full text-xs font-bold transition-colors flex items-center gap-1 shadow-xs"
            >
              Далее <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#4A5D44] text-white rounded-full text-xs font-bold hover:bg-[#3B4A36]"
            >
              Готово
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
