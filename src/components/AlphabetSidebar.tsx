import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface AlphabetSidebarProps {
  selectedLetter: string;
  onSelectLetter: (letter: string) => void;
  letterCounts: Record<string, number>;
}

export const AlphabetSidebar: React.FC<AlphabetSidebarProps> = ({
  selectedLetter,
  onSelectLetter,
  letterCounts
}) => {
  const { alphabet, t } = useLanguage();
  const allLabel = alphabet[0]; // First item in alphabet is 'Все' / 'All' / 'Բոլորը'

  return (
    <>
      {/* Desktop Vertical Sidebar */}
      <aside className="hidden md:flex w-20 bg-[#F5F2EB] border-r border-[#E0DBCF] flex-col py-4 overflow-y-auto no-scrollbar shrink-0 select-none">
        <div className="flex flex-col items-center gap-1.5 px-2">
          <span className="text-[9px] uppercase tracking-widest text-[#A09B8E] mb-1 font-bold text-center">
            {t('alphabetTitle')}
          </span>

          {alphabet.map((letter, idx) => {
            const isAll = idx === 0;
            const isSelected = selectedLetter === letter || (isAll && (selectedLetter === 'Все' || selectedLetter === 'All' || selectedLetter === 'Բոլորը'));
            const count = isAll ? null : (letterCounts[letter] || 0);

            return (
              <button
                key={letter}
                onClick={() => onSelectLetter(isAll ? 'Все' : letter)}
                title={isAll ? t('allDrugsFilter') : `${t('alphabetTitle')} '${letter}': ${count || 0}`}
                className={`w-9 h-9 flex items-center justify-center font-bold text-xs transition-all rounded-lg relative cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#7B8E6A] border-2 border-[#7B8E6A] shadow-xs'
                    : 'text-[#3E4238] hover:bg-[#EAE5D9] hover:text-[#7B8E6A]'
                }`}
              >
                {letter}
                {count !== null && count > 0 && !isSelected && (
                  <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[#7B8E6A]"></span>
                )}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile Horizontal Alphabet Bar */}
      <div className="flex md:hidden bg-[#F5F2EB] border-b border-[#E0DBCF] px-3 py-2 overflow-x-auto no-scrollbar gap-1.5 shrink-0 select-none items-center">
        <span className="text-[10px] font-bold text-[#A09B8E] uppercase tracking-wider shrink-0 mr-1">
          {t('alphabetTitle')}:
        </span>
        {alphabet.map((letter, idx) => {
          const isAll = idx === 0;
          const isSelected = selectedLetter === letter || (isAll && (selectedLetter === 'Все' || selectedLetter === 'All' || selectedLetter === 'Բոլորը'));

          return (
            <button
              key={letter}
              onClick={() => onSelectLetter(isAll ? 'Все' : letter)}
              className={`px-2.5 py-1 text-xs font-bold rounded-md shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#7B8E6A] text-white'
                  : 'bg-white text-[#3E4238] border border-[#D1CCBF]'
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </>
  );
};

