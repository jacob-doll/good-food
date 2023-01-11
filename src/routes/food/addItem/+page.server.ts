import type { ClientResponseError } from "pocketbase";
import type { Actions, PageServerLoadEvent } from "./$types";

export async function load(event: PageServerLoadEvent) {
    return {
        title: 'Add Food Item',
    }
}

export const actions: Actions = {
    default: async (event) => {
        const { request, locals } = event;

        const formData = Object.fromEntries(await request.formData());

        const data = {
            brandName: formData['brandName'].toString(),
            subbrandName: formData['subbrandName'].toString(),
            brandOwner: formData['brandOwner'].toString(),
            description: formData['description'].toString(),
            shortDescription: formData['shortDescription'].toString(),
            ingredients: formData['ingredients'].toString(),
            brandedFoodCategory: formData['brandedFoodCategory'].toString(),
            servingSize: +(formData['servingSize'].toString()),
            servingSizeUnit: formData['servingSizeUnit'].toString(),
            householdServingFullText: formData['householdServingFullText'].toString(),
            packageWeight: formData['packageWeight'].toString(),
            fat: +(formData['fat'].toString()),
            saturatedFat: +(formData['saturatedFat'].toString()),
            transFat: +(formData['transFat'].toString()),
            cholesterol: +(formData['cholesterol'].toString()),
            sodium: +(formData['sodium'].toString()),
            carbohydrates: +(formData['carbohydrates'].toString()),
            sugars: +(formData['sugars'].toString()),
            protein: +(formData['protein'].toString()),
            calcium: +(formData['calcium'].toString()),
            iron: +(formData['iron'].toString()),
            potassium: +(formData['potassium'].toString()),
            calories: +(formData['calories'].toString()),
            fiber: +(formData['fiber'].toString()),
        };

        try {
            await locals.pb.collection('foodItems').create(data);
        } catch (err) {
            return { err: (err as ClientResponseError).data.message };
        }
    }
}