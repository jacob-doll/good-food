import type { Journal } from '$lib/types';
import { redirect, type Actions } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { PageServerLoadEvent } from './$types';

export async function load(event: PageServerLoadEvent) {
    const { locals } = event;

    if (!locals.user) {
        throw redirect(302, '/login')
    }

    const goals = await locals.pb.collection('goals').getFirstListItem(`user="${locals.user.id}"`);

    let filterDate = new Date();
    filterDate.setUTCDate(filterDate.getUTCDate() - 1);
    filterDate.setUTCHours(23, 59, 59, 0);

    const journals = await locals.pb.collection('journals').getFullList<Journal>(200, {
        filter: `user="${locals.user.id}"`,
        sort: '-userDate'
    });

    return {
        goals: {
            calories: goals.calories,
            protein: goals.protein,
            carbs: goals.carbs,
            fat: goals.fat
        },
        journals: journals.map((journal) => {
            return {
                id: journal.id,
                collectionId: journal.collectionId,
                collectionName: journal.collectionName,
                created: journal.created,
                updated: journal.updated,
                user: journal.user,
                userDate: journal.userDate,
            }
        })
    }
}

export const actions: Actions = {
    addEntry: async (event) => {
        const { request, locals } = event;

        const body = Object.fromEntries(await request.formData());
        const userDate = body['entry-date'].toString();

        try {
            const record = await locals.pb.collection('journals').create({
                user: locals.user?.id,
                userDate
            });
        } catch (err) {
            return { err: (err as ClientResponseError).data.message };
        }
    }
}