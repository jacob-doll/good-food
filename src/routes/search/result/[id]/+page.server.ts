import type { BrandedFoodItem, FoodItem } from '$lib/foodApi';
import type { PageServerLoadEvent } from './$types';

export async function load(event: PageServerLoadEvent) {
    let fccId = event.params.id;

    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${fccId}?api_key=VnlMm2qUAOCziNDke8cxXwHoTVAX6Q1g7fxgdAN9`);

    let data: BrandedFoodItem = await response.json();

    return {
        foodItem: data
    }
}
