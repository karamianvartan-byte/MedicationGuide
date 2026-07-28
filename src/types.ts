export type PrescriptionStatus = 'OTC' | 'Rx'; // OTC = Без рецепта, Rx = По рецепту

export type AppMode = 'human' | 'veterinary';

export type AnimalSpecies = 'Собаки' | 'Кошки' | 'С/х животные' | 'Птицы' | 'Грызуны и экзоты';

export interface Medication {
  id: string;
  name: string; // Название (e.g. Парацетамол)
  latinName: string; // Латинское название (e.g. Paracetamol)
  activeSubstance: string; // Действующее вещество (e.g. Парацетамол)
  activeSubstanceLatin: string; // Действующее вещество на латыни
  pharmGroup: string; // Фармакологическая группа (e.g. Анальгетики и антипиретики)
  prescriptionStatus: PrescriptionStatus;
  releaseForms: string[]; // Таблетки, капсулы, сироп, спрей, мазь и т.д.
  category: string; // Категория (Простуда и грипп, Обезболивающие, etc.)
  symptoms: string[]; // Список симптомов (Температура, Головная боль, etc.)
  description: string; // Краткое описание
  indications: string[]; // Показания к применению
  contraindications: string[]; // Противопоказания
  sideEffects: string[]; // Побочные эффекты
  dosage: {
    adults: string;
    children?: string;
    maxDaily: string;
  };
  specialInstructions?: string; // Особые указания
  pregnancySafety?: 'Безопасно' | 'С осторожностью' | 'Противопоказано' | 'По назначению врача';
  priceEstimate?: string; // Примерная цена (опционально)
  manufacturer?: string; // Производитель
  analogues?: string[]; // Названия аналогов
  isVED?: boolean; // Входит в перечень ЖНВЛП (Минздрав)
  grlsRegNum?: string; // Регистрационный номер ГРЛС Минздрава
  atcCode?: string; // Анатомо-терапевтическо-химический код АТХ
  minzdravGuideline?: string; // Выдержка из Клинических рекомендаций Минздрава
}

export interface SymptomCategory {
  id: string;
  name: string;
  icon?: string;
  symptoms: string[];
}

// Veterinary Types
export interface VetMedication {
  id: string;
  name: string;
  latinName: string;
  activeSubstance: string;
  species: AnimalSpecies[];
  category: string; // Антибиотики, Противопаразитарные, Обезболивающие, Желудочно-кишечные, Витамины, Кардио, Дерматология
  releaseForms: string[];
  symptoms: string[];
  description: string;
  indications: string[];
  contraindications: string[];
  sideEffects: string[];
  dosageByWeight: {
    dogs?: string;
    cats?: string;
    livestock?: string;
    birds?: string;
    mgPerKg?: number; // for dose calculation in mg/kg
  };
  priceEstimate?: string;
  manufacturer?: string;
  isToxicToCats?: boolean; // Warning flag for cat toxicity (e.g. permethrin)
  analogues?: string[];
}

export interface AnimalDisease {
  id: string;
  title: string;
  latinTitle?: string;
  affectedSpecies: AnimalSpecies[];
  category: string; // Инфекционные, Паразитарные, Незаразные, Незаразные системные
  symptoms: string[];
  description: string;
  causes: string;
  diagnostics: string;
  treatmentProtocol: string[];
  recommendedMeds: string[];
  urgency: 'Плановая' | 'Высокая' | 'Экстренная (Реанимация)';
  firstAid?: string;
}

export interface ProhibitedHumanDrug {
  id: string;
  drugName: string;
  toxicFor: AnimalSpecies[];
  dangerLevel: 'Смертельно опасно' | 'Высокий риск отравления' | 'Только по назначению ветеринара';
  symptomsOfPoisoning: string[];
  whyDangerous: string;
  safeVetAnalogue: string;
  firstAidAction: string;
}

export interface VetFirstAidGuide {
  id: string;
  title: string;
  iconName: string;
  emergencyType: string;
  steps: string[];
  doNotDo: string[];
  whenToSeeVetImmediately: string;
}

