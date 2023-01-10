import type { RequestHandler } from './$types';
import type { FoodItem, JournalEntry } from '$lib/types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, url }) => {
    const journal = url.searchParams.get('journal')?.toString();

    const journalEntries = await locals.pb.collection('journalEntries').getFullList<JournalEntry>(200, {
        filter: `journal="${journal}"`,
        expand: 'foodItem',
        sort: '-created'
    });

    return json({
        journalEntries: journalEntries.map((journalEntry) => {
            return {
                id: journalEntry.id,
                collectionId: journalEntry.collectionId,
                collectionName: journalEntry.collectionName,
                created: journalEntry.created,
                updated: journalEntry.updated,
                journal: journalEntry.journal,
                type: journalEntry.type,
                servings: journalEntry.servings,
                expand: {
                    foodItem: {
                        id: journalEntry.expand.foodItem.id,
                        collectionId: journalEntry.expand.foodItem.collectionId,
                        collectionName: journalEntry.expand.foodItem.collectionName,
                        created: journalEntry.expand.foodItem.created,
                        updated: journalEntry.expand.foodItem.updated,
                        brandName: journalEntry.expand.foodItem.brandName,
                        subbrandName: journalEntry.expand.foodItem.subbrandName,
                        brandOwner: journalEntry.expand.foodItem.brandOwner,
                        description: journalEntry.expand.foodItem.description,
                        shortDescription: journalEntry.expand.foodItem.shortDescription,
                        ingredients: journalEntry.expand.foodItem.ingredients,
                        brandedFoodCategory: journalEntry.expand.foodItem.brandedFoodCategory,
                        servingSize: journalEntry.expand.foodItem.servingSize,
                        servingSizeUnit: journalEntry.expand.foodItem.servingSizeUnit,
                        householdServingFullText: journalEntry.expand.foodItem.householdServingFullText,
                        packageWeight: journalEntry.expand.foodItem.packageWeight,
                        fat: journalEntry.expand.foodItem.fat,
                        saturatedFat: journalEntry.expand.foodItem.saturatedFat,
                        transFat: journalEntry.expand.foodItem.transFat,
                        cholesterol: journalEntry.expand.foodItem.cholesterol,
                        sodium: journalEntry.expand.foodItem.sodium,
                        carbohydrates: journalEntry.expand.foodItem.carbohydrates,
                        sugars: journalEntry.expand.foodItem.sugars,
                        protein: journalEntry.expand.foodItem.protein,
                        calcium: journalEntry.expand.foodItem.calcium,
                        iron: journalEntry.expand.foodItem.iron,
                        potassium: journalEntry.expand.foodItem.potassium,
                        calories: journalEntry.expand.foodItem.calories,
                        fiber: journalEntry.expand.foodItem.fiber,
                    }
                },
            }
        })
    })
}