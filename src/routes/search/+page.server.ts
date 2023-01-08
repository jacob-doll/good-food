import type { SearchResult } from '$lib/foodApi';
import type { PageServerLoadEvent } from './$types';

export async function load(event: PageServerLoadEvent) {
    let query = event.url.searchParams.get('query')?.toString();
    let page = event.url.searchParams.get('page')?.toString();
    let pageNumber = page ? parseInt(page) : 1;

    const response = await fetch('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=VnlMm2qUAOCziNDke8cxXwHoTVAX6Q1g7fxgdAN9', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "query": query,
            "pageSize": 25,
            "pageNumber": pageNumber,
            "sortOrder": "asc",
            "dataType": [
                "Branded",
            ],
        })
    });

    let data: SearchResult = await response.json();

    return {
        query,
        searchResult: data
    }
}
