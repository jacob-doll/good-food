import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoadEvent } from './$types';

export async function load(event: LayoutServerLoadEvent) {
    if (!event.locals.pb.authStore.isValid) {
        throw redirect(303, '/login');
    }
}