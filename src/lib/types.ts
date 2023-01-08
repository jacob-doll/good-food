export interface Meal {
    id: string;
    type: string;
}

export interface MealEntry {
    id: string;
    mealId: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}