import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#4A5D44] text-[#E9EDDC] px-4 sm:px-10 py-3 text-[10px] sm:text-[11px] flex flex-col sm:flex-row justify-between items-center gap-1.5 shrink-0 select-none">
      <p className="text-center sm:text-left font-bold tracking-wide">
        ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ. НЕОБХОДИМО ОЗНАКОМИТЬСЯ С ИНСТРУКЦИЕЙ ИЛИ ПРОКОНСУЛЬТИРОВАТЬСЯ СО СПЕЦИАЛИСТОМ.
      </p>
      <p className="opacity-70 whitespace-nowrap text-[10px]">
        Справочник «Фарма-Гид»
      </p>
    </footer>
  );
};
