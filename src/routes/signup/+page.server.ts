import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async (event) => {
        const body = Object.fromEntries(await event.request.formData());

        let username = body.username.toString();
        let email = body.email.toString();
        let password = body.password.toString();
        let passwordConfirm = body.passwordConfirm.toString();

        try {
            const user = await event.locals.pb.collection('users').create({
                username,
                email,
                password,
                passwordConfirm
            });
            await event.locals.pb.collection('goals').create({
                user: user.id
            });
        } catch (err) {
            throw error(500, 'Something went wrong logging in');
        }

        throw redirect(303, "/login");
    }
};