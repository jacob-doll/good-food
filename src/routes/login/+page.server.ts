import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoadEvent } from './$types';

export async function load(_: PageServerLoadEvent) {
    return {
        title: 'Login',
    }
}

export const actions: Actions = {
    default: async (event) => {
        const body = Object.fromEntries(await event.request.formData());

        const username = body.username.toString();
        const password = body.password.toString();

        try {
            await event.locals.pb.collection('users').authWithPassword(username, password);
            if (!event.locals.pb.authStore.model?.verified) {
                event.locals.pb.authStore.clear();
                return { notVerified: true };
            }
        } catch (err) {
            throw error(500, 'Something went wrong logging in');
        }

        throw redirect(303, "/");
    }
};