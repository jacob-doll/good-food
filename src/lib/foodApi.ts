export enum DataType {
    BRANDED = "Branded",
    FOUNDATION = "Foundation",
    SURVEY = "Survey (FNDDS)",
    SR_LEGACY = "SR Legacy"
}

export interface FoodItem {
    fdcId: number;
    dataType: DataType;
    description: string;
}

interface AbridgedFoodItem extends FoodItem {
    foodNutrients: AbridgedFoodNutrient[];
    publicationDate: string;
    brandOwner: string;
    gtinUpc: string;
    ndbNumber: string;
    foodCode: string;
}

export interface BrandedFoodItem extends FoodItem {
    availableDate: string;
    brandOwner: string;
    dataSource: string;
    foodClass: string;
    gtinUpc: string;
    householdServingFullText: string;
    ingredients: string;
    modifiedDate: string;
    publicationDate: string;
    servingSize: number;
    servingSizeUnit: string;
    brandedFoodCategory: string;
    foodNutrients: FoodNutrient[];
    foodUpdateLog: FoodUpdateLog[];
    labelNutrients: {
        fat: { value: number } | undefined;
        saturatedFat: { value: number } | undefined;
        transFat: { value: number } | undefined;
        cholesterol: { value: number } | undefined;
        sodium: { value: number } | undefined;
        carbohydrates: { value: number } | undefined;
        fiber: { value: number } | undefined;
        sugars: { value: number } | undefined;
        protein: { value: number } | undefined;
        calcium: { value: number } | undefined;
        iron: { value: number } | undefined;
        postassium: { value: number } | undefined;
        calories: { value: number } | undefined;
    };
}

interface FoundationFoodItem extends FoodItem {
    foodClass: string;
    footNote: string;
    isHistoricalReference: boolean;
    ndbNumber: string;
    publicationDate: string;
    scientificName: string;
    foodCategory: FoodCategory;
    foodComponents: FoodComponent[];
    foodNutrients: FoodNutrient[];
    foodPortions: FoodPortion[];
    inputFoods: InputFoodFoundation[];
    nutrientConversionFactors: NutrientConversionFactors[];
}

interface SRLegacyFoodItem extends FoodItem {
    foodClass: string;
    isHistoricalReference: boolean;
    ndbNumber: string;
    publicationDate: string;
    scientificName: string;
    foodCategory: FoodCategory;
    foodNutrients: FoodNutrient[];
    nutrientConversionFactors: NutrientConversionFactors[]
}

interface SurveyFoodItem extends FoodItem {
    endDate: string;
    foodClass: string;
    foodCode: string;
    publicationDate: string
    startDate: string;
    foodAttributes: FoodAttribute[];
    foodPortions: FoodPortion[];
    inputFoods: InputFoodSurvey[];
    wweiaFoodCategory: WweiaFoodCategory;
}

interface SampleFoodItem extends FoodItem {
    foodClass: string;
    publicationDate: string;
    foodAttributes: FoodAttribute[];
}

interface AbridgedFoodNutrient {
    number: number;
    name: string;
    amount: number;
    unitName: string;
    derivationCode: string;
    derivationDescription: string;
}

interface FoodNutrient {
    id: number;
    amount: number;
    dataPoints: number;
    min: number;
    max: number;
    median: number;
    type: string;
    nutrient: Nutrient;
    foodNutrientDerivation: FoodNutrientDerivation;
    nutrientAnalysisDetails: NutrientAnalysisDetails;
}

interface Nutrient {
    id: number;
    number: string;
    name: string;
    rank: number;
    unitName: string;
}

interface FoodNutrientDerivation {
    id: number;
    code: string;
    description: string;
    foodNutrientSource: FoodNutrientSource;
}

interface FoodNutrientSource {
    id: number;
    code: string;
    description: string;
}

interface NutrientAnalysisDetails {
    subSampleId: number;
    amount: number;
    nutrientId: number;
    labMethodDescription: string;
    labMethodOriginalDescription: string;
    labMethodLink: string;
    labMethodTechnique: string;
    nutrientAcquisitionDetails: NutrientAcquisitionDetails[];
}

interface NutrientAcquisitionDetails {
    sampleUnitId: number;
    purchaseDate: string;
    storeCity: string;
    storeState: string;
}

interface NutrientConversionFactors {
    type: string;
    value: number;
}

interface FoodUpdateLog {
    fdcId: number;
    availableDate: string;
    brandOwner: string;
    dataSource: string;
    dataType: string;
    description: string;
    foodClass: string;
    gtinUpc: string;
    householdServingFullText: string;
    ingredients: string;
    modifiedDate: string;
    publicationDate: string;
    servingSize: number;
    servingSizeUnit: string;
    brandedFoodCategory: string;
    changes: string;
    foodAttributes: FoodAttribute[];
}

interface FoodAttribute {
    id: number;
    sequenceNumber: number;
    value: string;
    FoodAttributeType: {
        id: number;
        name: string;
        description: string;
    };
}

interface FoodCategory {
    id: number;
    code: string;
    description: string;
}

interface FoodComponent {
    id: number;
    name: string;
    dataPoints: number;
    gramWeight: number;
    isRefuse: boolean;
    minYearAcquired: number;
    percentWeight: number;
}

interface FoodPortion {
    id: number;
    amount: number;
    dataPoints: number;
    gramWeight: number;
    minYearAcquired: number;
    modifier: string;
    portionDescription: string;
    sequenceNumber: number;
    measureUnit: MeasureUnit;
}

interface InputFoodFoundation {
    id: number;
    foodDescription: number;
    inputFood: number;
}

interface InputFoodSurvey {
    id: number;
    amount: number;
    foodDescription: string;
    ingredientCode: number;
    ingredientDescription: string;
    ingredientWeight: number;
    portionCode: string;
    portionDescription: string;
    sequenceNumber: number;
    surveyFlag: number;
    unit: string;
    inputFood: SurveyFoodItem;
    retentionFactor: RetentionFactor;
}

interface MeasureUnit {
    id: number;
    abbreviation: string;
    name: string;
}

interface RetentionFactor {
    id: number;
    code: number;
    description: string;
}

interface WweiaFoodCategory {
    wweiaFoodCategoryCode: number;
    wweiaFoodCategoryDescription: string;
}

interface FoodsCriteria {
    fdcIds: number[];
    format: string;
    nutrients: number[];
}

interface FoodListCriteria {
    dataType: string[];
    pageSize: number;
    pageNumber: number;
    sortBy: string;
    sortOrder: string;
}

export interface FoodSearchCriteria {
    query: string;
    dataType: string[];
    pageSize: number;
    pageNumber: number;
    sortBy: string;
    sortOrder: string;
    brandOwner: string;
}


export interface SearchResult {
    foodSearchCriteria: FoodSearchCriteria;
    totalHits: number;
    currentPage: number;
    totalPages: number;
    foods: SearchResultFood[];
}

export interface SearchResultFood {
    fdcId: number;
    dataType: string;
    description: string;
    foodCode: string;
    foodNutrients: AbridgedFoodNutrient[];
    publicationDate: string;
    scientificName: string;
    brandOwner: string;
    gtinUpc: string;
    ingredients: string;
    ndbNumber: string;
    additionalDescriptions: string;
    allHighlightFields: string;
    score: number;
}