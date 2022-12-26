import type { LayoutServerLoadEvent } from './$types';

export async function load(event: LayoutServerLoadEvent) {
    return {
        user: event.locals.user,
    }
}