import { redirect } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types';
import type { Meal, MealEntry } from 'src/lib/types';

export async function load(event: PageServerLoadEvent) {
    if (!event.locals.user) {
        throw redirect(302, '/login')
    }

    let goals = await event.locals.pb.collection('goals').getFirstListItem(`user="${event.locals.user.id}"`);

    let filterDate = new Date();
    let currDate = new Date();
    filterDate.setUTCDate(filterDate.getUTCDate() - 1);
    filterDate.setUTCHours(23, 59, 59, 0);

    let meals: Meal[] =
        (await event.locals.pb.collection('meals').getFullList(5, {
            filter: `user="${event.locals.user.id}" && date >= "${filterDate.toISOString()}"`
        })).map((meal) => { return { id: meal.id, type: meal.type } });

    if (meals.length === 0) {
        const breakfast = await event.locals.pb.collection('meals').create({
            user: event.locals.user.id,
            date: currDate,
            type: "breakfast"
        });
        const lunch = await event.locals.pb.collection('meals').create({
            user: event.locals.user.id,
            date: currDate,
            type: "lunch"
        });
        const dinner = await event.locals.pb.collection('meals').create({
            user: event.locals.user.id,
            date: currDate,
            type: "dinner"
        });
        const snack = await event.locals.pb.collection('meals').create({
            user: event.locals.user.id,
            date: currDate,
            type: "snack"
        });
        meals = [
            { id: breakfast.id, type: breakfast.type },
            { id: lunch.id, type: lunch.type },
            { id: dinner.id, type: dinner.type },
            { id: snack.id, type: snack.type },
        ];
    }

    let meal_filter = '';
    meals.forEach((meal, i) => {
        meal_filter += `meal="${meal.id}"`;
        if (i < meals.length - 1) {
            meal_filter += "||";
        }
    });

    let entries: MealEntry[] =
        (await event.locals.pb.collection('meal_entries').getFullList(200, { filter: meal_filter }))
            .map((entry) => {
                return {
                    id: entry.id,
                    mealId: entry.meal,
                    name: entry.name,
                    calories: entry.calories,
                    protein: entry.protein,
                    carbs: entry.carbs,
                    fat: entry.fat
                }
            });

    return {
        user: event.locals.user,
        goals: {
            calories: goals.calories,
            protein: goals.protein,
            carbs: goals.carbs,
            fat: goals.fat
        },
        meals,
        entries
    }
}