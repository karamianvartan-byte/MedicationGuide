import React from 'react';
import { Medication } from '../types';
import { X, Heart, Trash2, Printer, ChevronRight } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedMeds: Medication[];
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
  onSelectMedication: (med: Medication) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedMeds,
  onRemoveBookmark,
  onClearAll,
  onSelectMedication
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#FDFCF8] h-full border-l border-[#E0DBCF] shadow-2xl flex flex-col justify-between">

        {/* Header */}
        <div className="px-6 py-5 bg-[#F5F2EB] border-b border-[#E0DBCF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#7B8E6A] fill-[#7B8E6A]" />
            <h2 className="text-xl font-serif font-bold text-[#4A5D44]">
              Избранные препараты ({bookmarkedMeds.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white border border-[#D1CCBF] text-[#A09B8E] hover:text-[#3E4238]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {bookmarkedMeds.length > 0 ? (
            bookmarkedMeds.map((med) => (
              <div
                key={med.id}
                className="p-4 bg-white border border-[#E0DBCF] rounded-2xl flex items-center justify-between gap-3 hover:border-[#7B8E6A] transition-all"
              >
                <div>
                  <h3 className="font-bold text-sm text-[#4A5D44]">{med.name}</h3>
                  <p className="text-xs text-[#A09B8E]">{med.activeSubstance}</p>
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-[#E9EDDC] text-[#4A5D44] font-medium border border-[#D3DBBD]">
                    {med.category}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectMedication(med);
                    }}
                    className="p-2 text-[#7B8E6A] hover:bg-[#F5F2EB] rounded-full transition-colors"
                    title="Открыть инструкцию"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(med.id)}
                    className="p-2 text-[#B87A7A] hover:bg-[#FBEFF2] rounded-full transition-colors"
                    title="Удалить"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-[#A09B8E] space-y-2">
              <Heart className="w-12 h-12 mx-auto stroke-1 opacity-40 text-[#7B8E6A]" />
              <p className="text-sm font-semibold">Список избранного пуст</p>
              <p className="text-xs text-[#707060]">
                Нажимайте на иконку сердечка на карточках лекарств, чтобы сохранять нужные препараты под рукой.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {bookmarkedMeds.length > 0 && (
          <div className="p-4 bg-[#F5F2EB] border-t border-[#E0DBCF] flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-[#B87A7A] hover:underline font-semibold"
            >
              Очистить всё
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#7B8E6A] text-white rounded-full text-xs font-bold hover:bg-[#687B58] transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              Распечатать список
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
