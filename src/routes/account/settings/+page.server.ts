import { error, redirect } from "@sveltejs/kit";
import type { ClientResponseError } from "pocketbase";
import type { Actions, PageServerLoadEvent } from "./$types";

export async function load(event: PageServerLoadEvent) {
    return {
        title: 'Account Settings',
        user: event.locals.user
    }
}

export const actions: Actions = {
    default: async (event) => {
        const body = Object.fromEntries(await event.request.formData());

        const data = {
            oldPassword: body.oldPassword.toString(),
            password: body.password.toString(),
            passwordConfirm: body.passwordConfirm.toString(),
        };

        const userId = event.locals.user?.id;

        if (!userId) {
            throw error(500, "User not logged in!");
        }

        try {
            const user = await event.locals.pb.collection('users').update(userId, data);
            event.locals.pb.authStore.clear();
            event.locals.user = null;
        } catch (err) {
            return { msg: (err as ClientResponseError).message }
        }

        throw redirect(303, '/login');
    }
};