import type { AdvancedSearchQuery, FoodItem } from "$lib/types";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals, url }) => {
    const query = url.searchParams.get('query')?.toString();
    const page = url.searchParams.get('page')?.toString();
    const pageNumber = page ? parseInt(page) : 1;

    const filter = query ? `brandName ~ "${query}" || brandOwner ~ "${query}" || description ~ "${query}"` : "";

    const searchResult = await locals.pb.collection("foodItems").getList<FoodItem>(pageNumber, 25, {
        filter
    });

    return json({
        result: {
            page: searchResult.page,
            perPage: searchResult.perPage,
            totalItems: searchResult.totalItems,
            totalPages: searchResult.totalPages,
            advanced: false,
            items: searchResult.items.map((item) => {
                return {
                    id: item.id,
                    collectionId: item.collectionId,
                    collectionName: item.collectionName,
                    created: item.created,
                    updated: item.updated,
                    brandName: item.brandName,
                    subbrandName: item.subbrandName,
                    brandOwner: item.brandOwner,
                    description: item.description,
                    shortDescription: item.shortDescription,
                    ingredients: item.ingredients,
                    brandedFoodCategory: item.brandedFoodCategory,
                    servingSize: item.servingSize,
                    servingSizeUnit: item.servingSizeUnit,
                    householdServingFullText: item.householdServingFullText,
                    packageWeight: item.packageWeight,
                    fat: item.fat,
                    saturatedFat: item.saturatedFat,
                    transFat: item.transFat,
                    cholesterol: item.cholesterol,
                    sodium: item.sodium,
                    carbohydrates: item.carbohydrates,
                    sugars: item.sugars,
                    protein: item.protein,
                    calcium: item.calcium,
                    iron: item.iron,
                    potassium: item.potassium,
                    calories: item.calories,
                    fiber: item.fiber
                }
            })
        }
    })
}

export const POST: RequestHandler = async ({ locals, request }) => {

    const query: AdvancedSearchQuery = await request.json();

    const filter = `brandName~"${query.brandName}" && brandOwner~"${query.brandOwner}" && description~"${query.description}" && brandedFoodCategory~"${query.brandedFoodCategory}" && calories <= ${query.caloriesHigh} && calories >= ${query.caloriesLow}`;

    const searchResult = await locals.pb.collection("foodItems").getList<FoodItem>(query.page, 25, {
        filter
    });

    return json({
        result: {
            page: searchResult.page,
            perPage: searchResult.perPage,
            totalItems: searchResult.totalItems,
            totalPages: searchResult.totalPages,
            advanced: true,
            items: searchResult.items.map((item) => {
                return {
                    id: item.id,
                    collectionId: item.collectionId,
                    collectionName: item.collectionName,
                    created: item.created,
                    updated: item.updated,
                    brandName: item.brandName,
                    subbrandName: item.subbrandName,
                    brandOwner: item.brandOwner,
                    description: item.description,
                    shortDescription: item.shortDescription,
                    ingredients: item.ingredients,
                    brandedFoodCategory: item.brandedFoodCategory,
                    servingSize: item.servingSize,
                    servingSizeUnit: item.servingSizeUnit,
                    householdServingFullText: item.householdServingFullText,
                    packageWeight: item.packageWeight,
                    fat: item.fat,
                    saturatedFat: item.saturatedFat,
                    transFat: item.transFat,
                    cholesterol: item.cholesterol,
                    sodium: item.sodium,
                    carbohydrates: item.carbohydrates,
                    sugars: item.sugars,
                    protein: item.protein,
                    calcium: item.calcium,
                    iron: item.iron,
                    potassium: item.potassium,
                    calories: item.calories,
                    fiber: item.fiber
                }
            })
        }
    })
}