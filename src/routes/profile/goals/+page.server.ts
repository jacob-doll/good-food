import { error } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { Actions, PageServerLoadEvent } from './$types';

export async function load(event: PageServerLoadEvent) {
    const goals = await event.locals.pb.collection('goals').getFirstListItem(`user="${event.locals.user?.id}"`);

    return {
        title: 'Goals',
        goals: {
            calories: goals.calories,
            protein: goals.protein,
            carbs: goals.carbs,
            fat: goals.fat
        }
    }
}

export const actions: Actions = {
    default: async (event) => {
        const body = Object.fromEntries(await event.request.formData());

        const data = {
            calories: body.calories.toString(),
            protein: body.protein.toString(),
            carbs: body.carbs.toString(),
            fat: body.fat.toString(),
        };

        try {
            const goals = await event.locals.pb.collection('goals').getFirstListItem(`user="${event.locals.user?.id}"`);
            await event.locals.pb.collection('goals').update(goals.id, data);
        } catch (err) {
            return { msg: (err as ClientResponseError).message }
        }
    }
};