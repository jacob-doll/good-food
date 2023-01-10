import type { FoodItem } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { Actions, PageServerLoadEvent } from './$types';

export async function load(event: PageServerLoadEvent) {
    const { url } = event;

    const addEntry = url.searchParams.get('addEntry')?.toString();
    const journal = url.searchParams.get('journal')?.toString();
    const query = url.searchParams.get('query')?.toString();

    return {
        addEntry,
        journal,
        query,
    }
}

export const actions: Actions = {
    addFoodItem: async (event) => {
        const body = Object.fromEntries(await event.request.formData());

        const data = {
            journal: body['journal'].toString(),
            type: body['type'].toString(),
            foodItem: body['foodItem'].toString(),
            servings: +body['servings'].toString(),
        };

        try {
            await event.locals.pb.collection('journalEntries').create(data);
        } catch (err) {
            console.log(err);
            return { err: (err as ClientResponseError).data.message };
        }

        throw redirect(303, "/");
    }
}
