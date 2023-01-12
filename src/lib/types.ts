export interface FoodItem {
    id: string;
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;
    brandName: string;
    subbrandName: string;
    brandOwner: string;
    description: string;
    shortDescription: string;
    gtinUpc: string;
    ingredients: string;
    brandedFoodCategory: string;
    servingSize: number;
    servingSizeUnit: string;
    householdServingFullText: string;
    packageWeight: string;
    fat: number;
    saturatedFat: number;
    transFat: number;
    cholesterol: number;
    sodium: number;
    carbohydrates: number;
    fiber: number;
    sugars: number;
    protein: number;
    calcium: number;
    iron: number;
    potassium: number;
    calories: number;
}

export interface FoodItemResult {
    page: number,
    perPage: number,
    totalItems: number,
    totalPages: number,
    advanced: boolean,
    items: FoodItem[];
}

export interface Journal {
    id: string;
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;
    user: string;
    userDate: string;
}

export interface JournalEntry {
    id: string;
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;
    journal: string;
    type: string;
    foodItem: string;
    servings: number;
    expand: {
        foodItem: FoodItem;
    }
}

export interface AdvancedSearchQuery {
    page: number;
    brandName: string;
    brandOwner: string;
    description: string;
    brandedFoodCategory: string;
    caloriesHigh: number;
    caloriesLow: number;
}