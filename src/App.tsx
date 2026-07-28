import React, { useState, useEffect, useMemo } from 'react';
import { MEDICATIONS, ALPHABET_RU } from './data/medications';
import { Medication, PrescriptionStatus, AppMode } from './types';
import { Header } from './components/Header';
import { AlphabetSidebar } from './components/AlphabetSidebar';
import { SymptomFilter } from './components/SymptomFilter';
import { MedicationCard } from './components/MedicationCard';
import { MedicationModal } from './components/MedicationModal';
import { SymptomCheckerModal } from './components/SymptomCheckerModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { VeterinaryGuideView } from './components/VeterinaryGuideView';
import { VetDosageCalculatorModal } from './components/VetDosageCalculatorModal';
import { Footer } from './components/Footer';
import { SearchX, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>('human');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLetter, setSelectedLetter] = useState<string>('Все');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [selectedRxStatus, setSelectedRxStatus] = useState<PrescriptionStatus | 'ALL'>('ALL');
  const [onlyVED, setOnlyVED] = useState<boolean>(false);

  // Modals & Drawers state
  const [activeModalMedication, setActiveModalMedication] = useState<Medication | null>(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [isSymptomCheckerOpen, setIsSymptomCheckerOpen] = useState<boolean>(false);
  const [isVetCalculatorOpen, setIsVetCalculatorOpen] = useState<boolean>(false);

  // Bookmarks persistence
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pharma_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pharma_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  }, [bookmarkedIds]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const clearAllBookmarks = () => {
    setBookmarkedIds([]);
  };

  // Letter medication counts
  const letterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ALPHABET_RU.forEach((letter) => {
      if (letter !== 'Все') {
        counts[letter] = MEDICATIONS.filter((m) =>
          m.name.toUpperCase().startsWith(letter)
        ).length;
      }
    });
    return counts;
  }, []);

  // Filtered medications calculation
  const filteredMedications = useMemo(() => {
    return MEDICATIONS.filter((med) => {
      // 1. Search Query
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = med.name.toLowerCase().includes(query);
        const matchesLatin = med.latinName.toLowerCase().includes(query);
        const matchesActive = med.activeSubstance.toLowerCase().includes(query);
        const matchesSymptom = med.symptoms.some((s) => s.toLowerCase().includes(query));
        const matchesIndication = med.indications.some((ind) => ind.toLowerCase().includes(query));
        const matchesCategory = med.category.toLowerCase().includes(query);
        const matchesMinzdravKeywords =
          (query.includes('минздрав') || query.includes('жнвлп') || query.includes('грлс')) &&
          (med.isVED || Boolean(med.grlsRegNum) || Boolean(med.minzdravGuideline));

        if (
          !matchesName &&
          !matchesLatin &&
          !matchesActive &&
          !matchesSymptom &&
          !matchesIndication &&
          !matchesCategory &&
          !matchesMinzdravKeywords
        ) {
          return false;
        }
      }

      // 2. Alphabetical Letter Filter
      if (selectedLetter !== 'Все') {
        if (!med.name.toUpperCase().startsWith(selectedLetter)) {
          return false;
        }
      }

      // 3. Category Filter
      if (selectedCategory) {
        if (med.category !== selectedCategory) {
          return false;
        }
      }

      // 4. Symptom Filter
      if (selectedSymptom) {
        const matchesSymptom = med.symptoms.some((s) =>
          s.toLowerCase().includes(selectedSymptom.toLowerCase())
        );
        if (!matchesSymptom) {
          return false;
        }
      }

      // 5. Prescription Status (OTC / Rx)
      if (selectedRxStatus !== 'ALL') {
        if (med.prescriptionStatus !== selectedRxStatus) {
          return false;
        }
      }

      // 6. Ministry of Health VED Filter (ЖНВЛП Минздрава)
      if (onlyVED) {
        if (!med.isVED) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedLetter, selectedCategory, selectedSymptom, selectedRxStatus, onlyVED]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedLetter('Все');
    setSelectedCategory(null);
    setSelectedSymptom(null);
    setSelectedRxStatus('ALL');
    setOnlyVED(false);
  };

  const bookmarkedMeds = useMemo(() => {
    return MEDICATIONS.filter((m) => bookmarkedIds.includes(m.id));
  }, [bookmarkedIds]);

  // Handle analogue click in modal
  const handleSelectAnalogue = (analogueName: string) => {
    setActiveModalMedication(null);
    setSearchQuery(analogueName);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#FDFCF8] text-[#3E4238] font-sans overflow-hidden">

      {/* Header */}
      <Header
        appMode={appMode}
        setAppMode={setAppMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        bookmarksCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenSymptomChecker={() => setIsSymptomCheckerOpen(true)}
        onOpenVetCalculator={() => setIsVetCalculatorOpen(true)}
        medications={MEDICATIONS}
        onSelectMedication={(med) => setActiveModalMedication(med)}
      />

      {/* Main Content Area: Human Mode vs Veterinary Mode */}
      {appMode === 'human' ? (
        <div className="flex flex-1 overflow-hidden flex-col md:flex-row">

          {/* Alphabetical Index Sidebar */}
          <AlphabetSidebar
            selectedLetter={selectedLetter}
            onSelectLetter={(letter) => {
              setSelectedLetter(letter);
              // reset conflicting filters when picking a specific letter
              if (letter !== 'Все') {
                setSelectedCategory(null);
                setSelectedSymptom(null);
              }
            }}
            letterCounts={letterCounts}
          />

          {/* Main Directory Area */}
          <main className="flex-1 flex flex-col p-4 sm:p-8 overflow-y-auto">

            {/* Symptom & Category Filters */}
            <SymptomFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedSymptom={selectedSymptom}
              onSelectSymptom={setSelectedSymptom}
              selectedRxStatus={selectedRxStatus}
              onSelectRxStatus={setSelectedRxStatus}
              onlyVED={onlyVED}
              onToggleOnlyVED={() => setOnlyVED(!onlyVED)}
              activeLetter={selectedLetter}
              totalResults={filteredMedications.length}
              onClearAllFilters={clearAllFilters}
            />

            {/* Medication Cards Grid */}
            {filteredMedications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 pb-8">
                {filteredMedications.map((medication) => (
                  <MedicationCard
                    key={medication.id}
                    medication={medication}
                    onOpenDetails={(med) => setActiveModalMedication(med)}
                    isBookmarked={bookmarkedIds.includes(medication.id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center bg-white border border-[#E0DBCF] rounded-3xl my-4">
                <div className="w-16 h-16 rounded-full bg-[#F5F2EB] border border-[#D1CCBF] flex items-center justify-center text-[#A09B8E] mb-4">
                  <SearchX className="w-8 h-8 stroke-1 text-[#7B8E6A]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#4A5D44] mb-2">
                  Препараты не найдены
                </h3>
                <p className="text-sm text-[#707060] max-w-md mb-6 leading-relaxed">
                  По вашему запросу ничего не найдено. Попробуйте изменить поисковое слово, сбросить выбранный символ алфавита или воспользоваться подбором по симптомам.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={clearAllFilters}
                    className="px-5 py-2.5 rounded-full bg-[#7B8E6A] text-white text-xs font-bold hover:bg-[#687B58] transition-colors"
                  >
                    Сбросить все фильтры
                  </button>
                  <button
                    onClick={() => setIsSymptomCheckerOpen(true)}
                    className="px-5 py-2.5 rounded-full border border-[#D3DBBD] bg-[#E9EDDC] text-[#4A5D44] text-xs font-bold hover:bg-[#DFE5D0] transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4 text-[#7B8E6A]" />
                    Открыть мастер симптомов
                  </button>
                </div>
              </div>
            )}

          </main>
        </div>
      ) : (
        /* Veterinary Mode View */
        <VeterinaryGuideView
          onOpenCalculator={() => setIsVetCalculatorOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}

      {/* Medication Instruction Modal */}
      <MedicationModal
        medication={activeModalMedication}
        onClose={() => setActiveModalMedication(null)}
        isBookmarked={activeModalMedication ? bookmarkedIds.includes(activeModalMedication.id) : false}
        onToggleBookmark={toggleBookmark}
        onSelectAnalogue={handleSelectAnalogue}
      />

      {/* Interactive Symptom Checker Modal */}
      <SymptomCheckerModal
        isOpen={isSymptomCheckerOpen}
        onClose={() => setIsSymptomCheckerOpen(false)}
        medications={MEDICATIONS}
        onSelectMedication={(med) => setActiveModalMedication(med)}
      />

      {/* Veterinary Dosage Calculator Modal */}
      <VetDosageCalculatorModal
        isOpen={isVetCalculatorOpen}
        onClose={() => setIsVetCalculatorOpen(false)}
      />

      {/* Favorites / Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedMeds={bookmarkedMeds}
        onRemoveBookmark={toggleBookmark}
        onClearAll={clearAllBookmarks}
        onSelectMedication={(med) => setActiveModalMedication(med)}
      />

      {/* Footer Medical Disclaimer */}
      <Footer />

    </div>
  );
}

