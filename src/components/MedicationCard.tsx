import React, { useState } from 'react';
import { Medication } from '../types';
import { Heart, ChevronRight, Pill, AlertTriangle, Clock, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';

interface MedicationCardProps {
  medication: Medication;
  onOpenDetails: (medication: Medication) => void;
  isBookmarked: boolean;
  onToggleBookmark: (medicationId: string) => void;
}

export const MedicationCard: React.FC<MedicationCardProps> = ({
  medication,
  onOpenDetails,
  isBookmarked,
  onToggleBookmark
}) => {
  const [showSafetyDetails, setShowSafetyDetails] = useState<boolean>(false);

  return (
    <div className="p-5 sm:p-6 bg-white border border-[#E0DBCF] rounded-3xl shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Top Header */}
        <div className="flex justify-between items-start mb-3 gap-2">
          <div className="pr-2">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#4A5D44] group-hover:text-[#7B8E6A] transition-colors">
              {medication.name}
            </h3>
            <p className="text-xs text-[#A09B8E] font-medium mt-0.5">
              {medication.activeSubstance} <span className="italic opacity-80">({medication.activeSubstanceLatin})</span>
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Prescription Badge */}
            <span
              className={`px-2 py-1 text-[10px] font-bold rounded border ${
                medication.prescriptionStatus === 'Rx'
                  ? 'bg-[#FBEFF2] text-[#B87A7A] border-[#F2D7D7]'
                  : 'bg-[#F5F2EB] text-[#5A5A44] border-[#E0DBCF]'
              }`}
              title={medication.prescriptionStatus === 'Rx' ? 'По рецепту врача' : 'Без рецепта'}
            >
              {medication.prescriptionStatus === 'Rx' ? 'По рецепту' : 'Без рецепта'}
            </span>

            {/* Bookmark button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(medication.id);
              }}
              className="p-1.5 rounded-full hover:bg-[#F5F2EB] text-[#A09B8E] transition-colors"
              title={isBookmarked ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isBookmarked ? 'fill-[#7B8E6A] text-[#7B8E6A]' : 'hover:text-[#7B8E6A]'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Release form & category badges */}
        <div className="space-y-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-[#A09B8E] uppercase tracking-wider">Форма выпуска:</span>
            {medication.releaseForms.map((form, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-[#F5F2EB] text-[#5A5A44] rounded-md text-[11px] font-medium border border-[#E0DBCF] flex items-center gap-1"
              >
                <Pill className="w-3 h-3 text-[#7B8E6A]" />
                {form}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 bg-[#E9EDDC] text-[#4A5D44] rounded-md text-[11px] font-semibold border border-[#D3DBBD]">
              {medication.category}
            </span>
            <span className="text-[11px] text-[#A09B8E] italic">
              {medication.priceEstimate}
            </span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[#707060] leading-relaxed mb-3 line-clamp-2">
          {medication.description}
        </p>

        {/* Standard Dosage Box */}
        <div className="mb-3 p-3 bg-[#FDFCF8] border border-[#E0DBCF] rounded-2xl text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-[#4A5D44] font-bold text-[11px] uppercase tracking-wider mb-1">
            <Clock className="w-3.5 h-3.5 text-[#7B8E6A]" />
            Стандартная дозировка:
          </div>
          <div className="text-[#3E4238] leading-tight">
            <span className="font-semibold text-[#4A5D44]">Взрослым: </span>
            {medication.dosage.adults}
          </div>
          {medication.dosage.children && (
            <div className="text-[#3E4238] leading-tight text-[11px]">
              <span className="font-semibold text-[#4A5D44]">Детям: </span>
              {medication.dosage.children}
            </div>
          )}
          <div className="text-[11px] text-[#B87A7A] font-medium pt-0.5 border-t border-[#F5F2EB]">
            <span className="font-bold">Макс. суточная: </span>
            {medication.dosage.maxDaily}
          </div>
        </div>

        {/* Side Effects & Contraindications Collapsible Section */}
        <div className="mb-3 border border-[#E0DBCF] rounded-2xl bg-[#F5F2EB] overflow-hidden text-xs">
          <button
            onClick={() => setShowSafetyDetails(!showSafetyDetails)}
            className="w-full px-3 py-2 flex items-center justify-between text-left font-bold text-[#4A5D44] hover:bg-[#E0DBCF]/30 transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-[#B87A7A]" />
              <span>Побочные эффекты & Противопоказания</span>
            </div>
            {showSafetyDetails ? (
              <ChevronUp className="w-4 h-4 text-[#7B8E6A]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#7B8E6A]" />
            )}
          </button>

          {showSafetyDetails ? (
            <div className="p-3 bg-white border-t border-[#E0DBCF] space-y-2 text-[11px] text-[#5A5A44]">
              <div>
                <span className="font-bold text-[#B87A7A] flex items-center gap-1 mb-0.5">
                  <AlertTriangle className="w-3 h-3 text-[#B87A7A]" />
                  Противопоказания:
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-[#707060]">
                  {medication.contraindications.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-1 border-t border-[#F5F2EB]">
                <span className="font-bold text-[#4A5D44] block mb-0.5">
                  Возможные побочные эффекты:
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-[#707060]">
                  {medication.sideEffects.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="px-3 pb-2 pt-0.5 text-[11px] text-[#707060] flex flex-wrap gap-1">
              <span className="font-semibold text-[#B87A7A]">Противопоказания: </span>
              <span>{medication.contraindications.slice(0, 2).join(', ')}...</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-[#F5F2EB] flex items-center justify-between gap-2 mt-auto">
        <div className="text-[11px] sm:text-xs text-[#7B8E6A] font-semibold line-clamp-1">
          <span className="text-[#A09B8E] font-normal">При: </span>
          {medication.symptoms.slice(0, 3).join(', ')}
        </div>

        <button
          onClick={() => onOpenDetails(medication)}
          className="text-[#7B8E6A] font-bold text-xs sm:text-sm hover:underline flex items-center gap-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Полная инструкция</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

