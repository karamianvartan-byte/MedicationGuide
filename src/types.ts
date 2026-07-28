export type PrescriptionStatus = 'OTC' | 'Rx'; // OTC = Без рецепта, Rx = По рецепту

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
  priceEstimate: string; // Примерная цена
  manufacturer?: string; // Производитель
  analogues?: string[]; // Названия аналогов
}

export interface SymptomCategory {
  id: string;
  name: string;
  icon?: string;
  symptoms: string[];
}
