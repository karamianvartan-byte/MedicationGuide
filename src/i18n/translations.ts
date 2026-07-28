export type Language = 'ru' | 'en' | 'hy';

export interface TranslationStructure {
  // Brand & Header
  appTitle: string;
  appSubtitle: string;
  humanMode: string;
  vetMode: string;
  searchPlaceholderHuman: string;
  searchPlaceholderVet: string;
  symptomCheckerBtn: string;
  vetCalcBtn: string;
  bookmarksBtn: string;
  foundMedications: string;
  rxTag: string;
  otcTag: string;
  byPrescription: string;
  withoutPrescription: string;

  // Alphabet
  alphabetTitle: string;
  allLetters: string;

  // Filter Bar
  symptomsAndCategories: string;
  allCategories: string;
  allDrugsFilter: string;
  otcFilter: string;
  rxFilter: string;
  resetFiltersBtn: string;
  foundCount: string;
  activeFilterLabel: string;
  openSymptomWizard: string;

  // Card & Details
  activeSubstanceLabel: string;
  symptomsLabel: string;
  releaseFormsLabel: string;
  priceEstimateLabel: string;
  viewInstructionBtn: string;
  pharmGroup: string;
  indications: string;
  dosageAndUsage: string;
  dosageAdults: string;
  dosageChildren: string;
  maxDaily: string;
  contraindications: string;
  sideEffects: string;
  specialInstructions: string;
  pregnancySafety: string;
  analogues: string;
  manufacturer: string;
  isVEDLabel: string;
  minzdravBadge: string;
  grlsLabel: string;
  atcLabel: string;
  minzdravGuidelineTitle: string;
  filterVEDOnly: string;
  closeBtn: string;
  copyLink: string;
  linkCopied: string;

  // Veterinary View
  vetTitle: string;
  veterinaryTitle: string;
  vetSubtitle: string;
  tabAll: string;
  tabMeds: string;
  tabDiseases: string;
  tabToxic: string;
  tabFirstAid: string;
  vetTabMeds: string;
  vetTabDiseases: string;
  vetTabProhibited: string;
  vetTabAll: string;
  vetTabFirstAid: string;
  vetMedsHeader: string;
  vetDiseasesHeader: string;
  toxicDrugsHeader: string;
  firstAidHeader: string;
  openCalcBannerBtn: string;
  toxicCatBadge: string;
  showProtocol: string;
  hideProtocol: string;
  urgencyLabel: string;
  firstAidHome: string;
  prescribedMeds: string;
  speciesLabel: string;
  searchPlaceholder: string;
  notFoundText: string;
  resetFilters: string;
  symptomCheckerTitle: string;
  ageRestrictionLabel: string;
  consultDoctorDisclaimer: string;

  // Calculator
  calcTitle: string;
  calcSubTitle: string;
  selectMedication: string;
  enterWeight: string;
  calculatedDose: string;
  doseNote: string;
  calculateBtn: string;

  // Symptom Checker
  checkerTitle: string;
  step1Title: string;
  step2Title: string;
  selectSymptomsHint: string;
  matchingMedsFound: string;
  noMedsFoundForSymptoms: string;

  // Bookmarks
  bookmarksTitle: string;
  noBookmarks: string;
  clearAllBtn: string;

  // Empty State
  noMedsFound: string;
  noMedsFoundDesc: string;

  // Footer
  disclaimerTitle: string;
  disclaimerText: string;
  copyright: string;

  // Species
  speciesDogs: string;
  speciesCats: string;
  speciesLivestock: string;
  speciesBirds: string;
  speciesExotic: string;

  // Pregnancy safety statuses
  safeInPregnancy: string;
  withCaution: string;
  contraindicatedInPregnancy: string;
  byDoctorOrder: string;
}

export const TRANSLATIONS: Record<Language, TranslationStructure> = {
  ru: {
    appTitle: 'ФАРМА-ГИД',
    appSubtitle: 'Медицинский & Ветеринарный справочник',
    humanMode: 'Человек',
    vetMode: 'Животные 🐾',
    searchPlaceholderHuman: 'Поиск по названию, веществу или симптомам (например: температура, изжога)...',
    searchPlaceholderVet: 'Поиск ветеринарных лекарств, болезней, симптомов животных...',
    symptomCheckerBtn: 'Подбор по симптомам',
    vetCalcBtn: 'Вет-Калькулятор',
    bookmarksBtn: 'Избранное',
    foundMedications: 'Найденные препараты',
    rxTag: 'По рецепту',
    otcTag: 'Без рецепта',
    byPrescription: 'По рецепту',
    withoutPrescription: 'Без рецепта',

    alphabetTitle: 'Алфавитный указатель',
    allLetters: 'Все',

    symptomsAndCategories: 'Симптомы и Категории',
    allCategories: 'Все категории',
    allDrugsFilter: 'Все препараты',
    otcFilter: 'Без рецепта (OTC)',
    rxFilter: 'По рецепту (Rx)',
    resetFiltersBtn: 'Сбросить фильтры',
    foundCount: 'Найдено:',
    activeFilterLabel: 'Активный фильтр:',
    openSymptomWizard: 'Мастер симптомов',

    activeSubstanceLabel: 'Действ. вещество:',
    symptomsLabel: 'Симптомы:',
    releaseFormsLabel: 'Форма выпуска:',
    priceEstimateLabel: 'Примерная цена:',
    viewInstructionBtn: 'Инструкция & Дозы',
    pharmGroup: 'Фарм. группа:',
    indications: 'Показания к применению:',
    dosageAndUsage: 'Дозировка и способ применения:',
    dosageAdults: 'Взрослым:',
    dosageChildren: 'Детям:',
    maxDaily: 'Макс. суточная доза:',
    contraindications: 'Противопоказания:',
    sideEffects: 'Побочные действия:',
    specialInstructions: 'Особые указания:',
    pregnancySafety: 'При беременности:',
    analogues: 'Аналоги и заменяющие препараты:',
    manufacturer: 'Производитель:',
    isVEDLabel: 'Входит в ЖНВЛП (Минздрав)',
    minzdravBadge: 'Минздрав',
    grlsLabel: 'Рег. номер ГРЛС:',
    atcLabel: 'Код АТХ:',
    minzdravGuidelineTitle: 'Клинические рекомендации Минздрава:',
    filterVEDOnly: 'ЖНВЛП (Минздрав)',
    closeBtn: 'Закрыть',
    copyLink: 'Поделиться',
    linkCopied: 'Ссылка скопирована!',

    vetTitle: 'Ветеринарный Справочник & Дозировки',
    vetSubtitle: 'Инструкции к вет-препаратам, симптомы болезней животных, расчет доз и экстренная помощь.',
    tabAll: 'Все разделы',
    tabMeds: '💊 Вет-Препараты',
    tabDiseases: '🩺 Болезни животных',
    tabToxic: '🚫 Опасные чело-лекарства',
    tabFirstAid: '🚑 Первая помощь',
    vetMedsHeader: 'Ветеринарные препараты',
    vetDiseasesHeader: 'Заболевания животных',
    toxicDrugsHeader: 'Опасные для животных человеческие лекарства',
    firstAidHeader: 'Экстренная первая помощь животному',
    openCalcBannerBtn: 'Открыть вет-калькулятор',
    toxicCatBadge: 'Опасно кошкам',
    showProtocol: 'Показать протокол лечения',
    hideProtocol: 'Скрыть протокол лечения',
    urgencyLabel: 'Срочность:',
    firstAidHome: 'Первая помощь хозяину:',
    prescribedMeds: 'Назначают:',

    calcTitle: 'Ветеринарный Калькулятор Дозировок',
    calcSubTitle: 'Точный расчет дозы вет-препарата по весу питомца',
    selectMedication: 'Выберите ветеринарный препарат:',
    enterWeight: 'Укажите вес питомца (в кг):',
    calculatedDose: 'Рассчитанная индивидуальная доза:',
    doseNote: 'Внимание: Точная доза всегда согласовывается с ветеринарным врачом.',
    calculateBtn: 'Рассчитать дозу',

    checkerTitle: 'Мастер подбора лекарств по симптомам',
    step1Title: 'Шаг 1: Что вас беспокоит?',
    step2Title: 'Подходящие препараты:',
    selectSymptomsHint: 'Выберите один или несколько симптомов из списка:',
    matchingMedsFound: 'Найдено препаратов по выбранным симптомам:',
    noMedsFoundForSymptoms: 'Выберите симптомы выше, чтобы подобрать лекарства.',

    bookmarksTitle: 'Избранные препараты',
    noBookmarks: 'В избранном пока ничего нет. Нажмите на иконку сердечка на карточке препарата.',
    clearAllBtn: 'Очистить список',

    noMedsFound: 'Препараты не найдены',
    noMedsFoundDesc: 'По вашему запросу ничего не найдено. Попробуйте изменить поисковое слово или сбросить фильтры.',

    disclaimerTitle: 'Медицинский & Ветеринарный Дисклеймер',
    disclaimerText: 'Информация в справочнике предназначена исключительно для ознакомительных целей. Самолечение может быть опасно для здоровья. Перед применением любых лекарственных препаратов проконсультируйтесь с квалифицированным врачом или ветеринаром.',
    copyright: '© 2026 ФАРМА-ГИД. Все права защищены.',

    speciesDogs: 'Собаки',
    speciesCats: 'Кошки',
    speciesLivestock: 'С/х животные',
    speciesBirds: 'Птицы',
    speciesExotic: 'Грызуны и экзоты',

    safeInPregnancy: 'Безопасно',
    withCaution: 'С осторожностью',
    contraindicatedInPregnancy: 'Противопоказано',
    byDoctorOrder: 'По назначению врача',

    symptomCheckerTitle: 'Интерактивный подбор по симптомам',
    ageRestrictionLabel: 'Возрастная категория и параметры',
    vetTabMeds: 'Вет-Препараты',
    resetFilters: 'Сбросить фильтры',
    notFoundText: 'Ничего не найдено',
    consultDoctorDisclaimer: 'Обязательно проконсультируйтесь с врачом или ветеринаром.',
    speciesLabel: 'Вид животного',
    vetTabProhibited: 'Опасные препараты',
    veterinaryTitle: 'Ветеринарный справочник',
    vetTabDiseases: 'Заболевания',
    vetTabAll: 'Все категории',
    vetTabFirstAid: 'Первая помощь',
    searchPlaceholder: 'Фильтр по названию, болезни или симптомам...'
  },
  en: {
    appTitle: 'PHARMA-GUIDE',
    appSubtitle: 'Medical & Veterinary Directory',
    humanMode: 'Human',
    vetMode: 'Animals 🐾',
    searchPlaceholderHuman: 'Search by drug name, active ingredient or symptom (e.g. fever, heartburn)...',
    searchPlaceholderVet: 'Search vet medications, diseases, animal symptoms...',
    symptomCheckerBtn: 'Symptom Matcher',
    vetCalcBtn: 'Vet Calculator',
    bookmarksBtn: 'Favorites',
    foundMedications: 'Found Medications',
    rxTag: 'Prescription Only',
    otcTag: 'Over-the-Counter',
    byPrescription: 'Prescription (Rx)',
    withoutPrescription: 'Over-the-counter (OTC)',

    alphabetTitle: 'Alphabetical Index',
    allLetters: 'All',

    symptomsAndCategories: 'Symptoms & Categories',
    allCategories: 'All categories',
    allDrugsFilter: 'All drugs',
    otcFilter: 'OTC (Over-the-counter)',
    rxFilter: 'Rx (Prescription)',
    resetFiltersBtn: 'Reset filters',
    foundCount: 'Found:',
    activeFilterLabel: 'Active filter:',
    openSymptomWizard: 'Symptom Wizard',

    activeSubstanceLabel: 'Active ingredient:',
    symptomsLabel: 'Symptoms:',
    releaseFormsLabel: 'Dosage form:',
    priceEstimateLabel: 'Est. Price:',
    viewInstructionBtn: 'Instruction & Doses',
    pharmGroup: 'Pharm. group:',
    indications: 'Indications:',
    dosageAndUsage: 'Dosage & Administration:',
    dosageAdults: 'Adults:',
    dosageChildren: 'Children:',
    maxDaily: 'Max daily dose:',
    contraindications: 'Contraindications:',
    sideEffects: 'Side effects:',
    specialInstructions: 'Special instructions:',
    pregnancySafety: 'Pregnancy safety:',
    analogues: 'Analogues & Substitutes:',
    manufacturer: 'Manufacturer:',
    isVEDLabel: 'VED Essential Drug (Minzdrav)',
    minzdravBadge: 'Minzdrav',
    grlsLabel: 'GRLS Reg. No:',
    atcLabel: 'ATC Code:',
    minzdravGuidelineTitle: 'Minzdrav Clinical Guidelines:',
    filterVEDOnly: 'VED List (Minzdrav)',
    closeBtn: 'Close',
    copyLink: 'Share',
    linkCopied: 'Link copied!',

    vetTitle: 'Veterinary Directory & Dosages',
    vetSubtitle: 'Vet drug guides, animal disease symptoms, dosage calculator & emergency first aid.',
    tabAll: 'All Sections',
    tabMeds: '💊 Vet Medications',
    tabDiseases: '🩺 Animal Diseases',
    tabToxic: '🚫 Toxic Human Drugs',
    tabFirstAid: '🚑 Emergency First Aid',
    vetMedsHeader: 'Veterinary Medications',
    vetDiseasesHeader: 'Animal Diseases',
    toxicDrugsHeader: 'Human Drugs Toxic to Animals',
    firstAidHeader: 'Emergency Animal First Aid',
    openCalcBannerBtn: 'Open Vet Calculator',
    toxicCatBadge: 'Toxic to Cats',
    showProtocol: 'Show Treatment Protocol',
    hideProtocol: 'Hide Treatment Protocol',
    urgencyLabel: 'Urgency:',
    firstAidHome: 'Pet owner first aid:',
    prescribedMeds: 'Prescribed:',

    calcTitle: 'Veterinary Dosage Calculator',
    calcSubTitle: 'Accurate vet drug dose calculation based on pet weight',
    selectMedication: 'Select veterinary drug:',
    enterWeight: 'Enter pet weight (in kg):',
    calculatedDose: 'Calculated individual dose:',
    doseNote: 'Notice: Always confirm exact dosages with a licensed veterinarian.',
    calculateBtn: 'Calculate Dose',

    checkerTitle: 'Symptom Matching Wizard',
    step1Title: 'Step 1: What is troubling you?',
    step2Title: 'Recommended Medications:',
    selectSymptomsHint: 'Select one or more symptoms from the list:',
    matchingMedsFound: 'Medications found for selected symptoms:',
    noMedsFoundForSymptoms: 'Select symptoms above to view recommended drugs.',

    bookmarksTitle: 'Saved Favorites',
    noBookmarks: 'Your saved list is empty. Click the heart icon on any drug card to save it.',
    clearAllBtn: 'Clear List',

    noMedsFound: 'No Medications Found',
    noMedsFoundDesc: 'No results found for your query. Try modifying search terms or clearing filters.',

    disclaimerTitle: 'Medical & Veterinary Disclaimer',
    disclaimerText: 'The information in this directory is for educational purposes only. Self-medication can be hazardous to health. Always consult a qualified medical doctor or veterinarian before taking or administering any medication.',
    copyright: '© 2026 PHARMA-GUIDE. All rights reserved.',

    speciesDogs: 'Dogs',
    speciesCats: 'Cats',
    speciesLivestock: 'Livestock',
    speciesBirds: 'Birds',
    speciesExotic: 'Rodents & Exotics',

    safeInPregnancy: 'Safe',
    withCaution: 'With caution',
    contraindicatedInPregnancy: 'Contraindicated',
    byDoctorOrder: 'Doctor order only',

    symptomCheckerTitle: 'Interactive Symptom Matcher',
    ageRestrictionLabel: 'Age group and preferences',
    vetTabMeds: 'Vet Medications',
    resetFilters: 'Reset Filters',
    notFoundText: 'No items found',
    consultDoctorDisclaimer: 'Always consult a qualified doctor or veterinarian.',
    speciesLabel: 'Species',
    vetTabProhibited: 'Dangerous Drugs',
    veterinaryTitle: 'Veterinary Directory',
    vetTabDiseases: 'Diseases',
    vetTabAll: 'All Categories',
    vetTabFirstAid: 'First Aid',
    searchPlaceholder: 'Search by title, disease or symptom...'
  },
  hy: {
    appTitle: 'ՖԱՐՄԱ-ՈՒՂԵՑՈՒՅՑ',
    appSubtitle: 'Բժշկական և Անասնաբուժական տեղեկատու',
    humanMode: 'Մարդ',
    vetMode: 'Կենդանիներ 🐾',
    searchPlaceholderHuman: 'Որոնում ըստ անվանման, ազդող նյութի կամ ախտանիշների (օրինակ՝ ջերմություն)...',
    searchPlaceholderVet: 'Անասնաբուժական դեղերի, հիվանդությունների որոնում...',
    symptomCheckerBtn: 'Ընտրություն ըստ ախտանիշների',
    vetCalcBtn: 'Անասնաբուժական հաշվիչ',
    bookmarksBtn: 'Ընտրվածներ',
    foundMedications: 'Գտնված դեղամիջոցներ',
    rxTag: 'Դեղատոմսով',
    otcTag: 'Առանց դեղատոմսի',
    byPrescription: 'Դեղատոմսով (Rx)',
    withoutPrescription: 'Առանց դեղատոմսի (OTC)',

    alphabetTitle: 'Այբբենական ցանկ',
    allLetters: 'Բոլորը',

    symptomsAndCategories: 'Ախտանիշներ և Կատեգորիաներ',
    allCategories: 'Բոլոր կատեգորիաները',
    allDrugsFilter: 'Բոլոր դեղերը',
    otcFilter: 'Առանց դեղատոմսի (OTC)',
    rxFilter: 'Դեղատոմսով (Rx)',
    resetFiltersBtn: 'Մաքրել ֆիլտրերը',
    foundCount: 'Գտնվել է՝',
    activeFilterLabel: 'Ակտիվ ֆիլտր՝',
    openSymptomWizard: 'Ախտանիշների վարպետ',

    activeSubstanceLabel: 'Ազդող նյութ՝',
    symptomsLabel: 'Ախտանիշներ՝',
    releaseFormsLabel: 'Թողարկման ձև՝',
    priceEstimateLabel: 'Մոտավոր գին՝',
    viewInstructionBtn: 'Հրահանգ և Չափաբաժիններ',
    pharmGroup: 'Դեղաբանական խումբ՝',
    indications: 'Ցուցումներ՝',
    dosageAndUsage: 'Չափաբաժին և օգտագործման եղանակ՝',
    dosageAdults: 'Մեծահասակներին՝',
    dosageChildren: 'Երեխաներին՝',
    maxDaily: 'Առավելագույն օրական չափաբաժին՝',
    contraindications: 'Հակացուցումներ՝',
    sideEffects: 'Կողմնակի ազդեցություններ՝',
    specialInstructions: 'Հատուկ ցուցումներ՝',
    pregnancySafety: 'Հղիության ընթացքում՝',
    analogues: 'Նմանատիպ դեղեր՝',
    manufacturer: 'Արտադրող՝',
    isVEDLabel: 'Մտնում է ЖНВЛП ցանկի մեջ (ԱՆ)',
    minzdravBadge: 'ԱՆ',
    grlsLabel: 'Գրանցման № (ԳՌԼՍ)՝',
    atcLabel: 'ԱՏՔ Կոդ՝',
    minzdravGuidelineTitle: 'ԱՆ Կլինիկական հանձնարարականներ՝',
    filterVEDOnly: 'ЖНВЛП (ԱՆ)',
    closeBtn: 'Փակել',
    copyLink: 'Կիսվել',
    linkCopied: 'Հղումը պատճենված է:',

    vetTitle: 'Անասնաբուժական Տեղեկատու և Չափաբաժիններ',
    veterinaryTitle: 'Անասնաբուժական Տեղեկատու և Չափաբաժիններ',
    vetSubtitle: 'Անասնաբուժական դեղերի հրահանգներ, հիվանդությունների ախտանիшиներ, չափաբաժնի հաշվարկ և առաջին օգնություն:',
    tabAll: 'Բոլոր բաժինները',
    tabMeds: '💊 Անասնաբուժական դեղեր',
    tabDiseases: '🩺 Կենդանիների հիվանդություններ',
    tabToxic: '🚫 Վտանգավոր մարդկային դեղեր',
    tabFirstAid: '🚑 Առաջին օգնություն',
    vetTabMeds: '💊 Անասնաբուժական դեղեր',
    vetTabDiseases: '🩺 Կենդանիների հիվանդություններ',
    vetTabProhibited: '🚫 Վտանգավոր մարդկային դեղեր',
    vetTabAll: 'Բոլոր բաժինները',
    vetTabFirstAid: '🚑 Առաջին օգնություն',
    vetMedsHeader: 'Անասնաբուժական դեղամիջոցներ',
    vetDiseasesHeader: 'Կենդանիների հիվանդություններ',
    toxicDrugsHeader: 'Կենդանիների համար վտանգավոր մարդկային դեղեր',
    firstAidHeader: 'Կենդանու անհետաձգելի առաջին օգնություն',
    openCalcBannerBtn: 'Բացել անասնաբուժական հաշվիչը',
    toxicCatBadge: 'Վտանգավոր է կատուներին',
    showProtocol: 'Ցույց տալ բուժման արձանագրությունը',
    hideProtocol: 'Թաքցնել բուժման արձանագրությունը',
    urgencyLabel: 'Հրատապություն՝',
    firstAidHome: 'Առաջին օգնություն տիրոջ կողմից՝',
    prescribedMeds: 'Նշանակվում է՝',
    speciesLabel: 'Կենդանու տեսակ՝',
    searchPlaceholder: 'Անասնաբուժական դեղերի, հիվանդությունների որոնում...',
    notFoundText: 'Ձեր հարցմամբ ոչինչ չի գտնվել:',
    resetFilters: 'Մաքրել ֆիլտրերը',
    symptomCheckerTitle: 'Ախտանիշներով դեղերի ընտրության վարպետ',
    ageRestrictionLabel: 'Տարիքային կատեգորիա՝',
    consultDoctorDisclaimer: 'Օգտագործելուց առաջ խորհրդակցեք բժշկի կամ անասնաբույժի հետ:',

    calcTitle: 'Անասնաբուժական Չափաբաժնի Հաշվիչ',
    calcSubTitle: 'Դեղաչափի ճշգրիտ հաշվարկ՝ ըստ կենդանու քաշի',
    selectMedication: 'Ընտրեք անասնաբուժական դեղամիջոցը՝',
    enterWeight: 'Նշեք կենդանու քաշը (կգ)՝',
    calculatedDose: 'Հաշվարկված անհատական չափաբաժինը՝',
    doseNote: 'Ուշադրություն․ Ճշգրիտ չափաբաժինը միշտ համաձայնեցրեք անասնաբույժի հետ:',
    calculateBtn: 'Հաշվարկել չափաբաժինը',

    checkerTitle: 'Ախտանիշներով դեղերի ընտրության վարպետ',
    step1Title: 'Քայլ 1․ Ի՞նչն է ձեզ անհանգստացնում',
    step2Title: 'Համապատասխան դեղամիջոցներ՝',
    selectSymptomsHint: 'Ընտրեք մեկ կամ մի քանի ախտանիշ ցանկից՝',
    matchingMedsFound: 'Գտնվել են դեղամիջոցներ ըստ ընտրված ախտանիշների՝',
    noMedsFoundForSymptoms: 'Ընտրեք ախտանիշները վերևում՝ դեղամիջոցներ ընտրելու համար:',

    bookmarksTitle: 'Ընտրված դեղամիջոցներ',
    noBookmarks: 'Ընտրվածներում դեռ ոչինչ չկա: Սեղմեք սրտիկի պատկերակին՝ դեղը պահպանելու համար:',
    clearAllBtn: 'Մաքրել ցանկը',

    noMedsFound: 'Դեղամիջոցներ չեն գտնվել',
    noMedsFoundDesc: 'Ձեր հարցմամբ ոչինչ չի գտնվել: Փորձեք փոխել որոնման բառը կամ մաքրել ֆիլտրերը:',

    disclaimerTitle: 'Բժշկական և Անասնաբուժական Հրաժարագիր',
    disclaimerText: 'Տեղեկատուում ներկայացված տեղեկատվությունը կրում է բացառապես ճանաչողական բնույթ: Ինքնաբուժումը կարող է վտանգավոր լինել առողջության համար: Ցանկացած դեղամիջոց օգտագործելուց առաջ խորհրդակցեք որակավորված բժշկի կամ անասնաբույժի հետ:',
    copyright: '© 2026 ՖԱՐՄԱ-ՈՒՂԵՑՈՒՅՑ: Բոլոր իրավունքները պաշտպանված են:',

    speciesDogs: 'Շներ',
    speciesCats: 'Կատուներ',
    speciesLivestock: 'Գյուղատնտեսական',
    speciesBirds: 'Թռչուններ',
    speciesExotic: 'Կրծողներ և էկզոտիկ',

    safeInPregnancy: 'Անվտանգ է',
    withCaution: 'Զգուշությամբ',
    contraindicatedInPregnancy: 'Հակացուցված է',
    byDoctorOrder: 'Բժշկի նշանակմամբ'
  }
};

// Language specific alphabets for the sidebar
export const ALPHABETS: Record<Language, string[]> = {
  ru: ['Все', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Э', 'Ю', 'Я'],
  en: ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  hy: ['Բոլորը', 'Ա', 'Բ', 'Գ', 'Դ', 'Ե', 'Զ', 'Է', 'Ը', 'Թ', 'Ժ', 'Ի', 'Լ', 'Խ', 'Ծ', 'Կ', 'Հ', 'Ձ', 'Ղ', 'Ճ', 'Մ', 'Յ', 'Ն', 'Շ', 'Ո', 'Չ', 'Պ', 'Ջ', 'Ռ', 'Ս', 'Վ', 'Տ', 'Ր', 'Ց', 'Ու', 'Փ', 'Ք', 'Օ', 'Ֆ']
};
