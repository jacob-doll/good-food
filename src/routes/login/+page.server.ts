import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async (event) => {
        const body = Object.fromEntries(await event.request.formData());

        try {
            await event.locals.pb.collection('users').authWithPassword(body.username.toString(), body.password.toString());
        } catch (err) {
            throw error(500, 'Something went wrong logging in');
        }

        throw redirect(303, "/");
    }
};