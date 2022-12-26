import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoadEvent } from './$types';

export async function load(event: LayoutServerLoadEvent) {
    if (!event.locals.user) {
        throw redirect(302, '/login')
    }

    let goals = await event.locals.pb.collection('goals').getFirstListItem(`user="${event.locals.user.id}"`);

    return {
        user: event.locals.user,
        goals: {
            calories: goals.calories,
            protein: goals.protein,
            carbs: goals.carbs,
            fat: goals.fat
        }
    }
}