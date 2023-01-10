<script lang="ts">
	import type { AdvancedSearchQuery, FoodItem, FoodItemResult } from '$lib/types';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let { query, addEntry, journal } = data;
	let result: FoodItemResult | undefined;
	let currPage: number = 0;
	let totalPages: number = 0;
	let selected: FoodItem | undefined;

	let advancedSearch = false;
	let advancedQuery: AdvancedSearchQuery;

	function incPage() {
		if (currPage != totalPages) {
			currPage += 1;
			if (result?.advanced) {
				advancedQuery.page = currPage;
				getAdvancedFoodItems();
			} else {
				getFoodItems(query, currPage);
			}
		}
	}

	function decPage() {
		if (currPage !== 1) {
			currPage -= 1;
			if (result?.advanced) {
				advancedQuery.page = currPage;
				getAdvancedFoodItems();
			} else {
				getFoodItems(query, currPage);
			}
		}
	}

	function getFoodItems(query: string | undefined, page: number) {
		let fetchQuery = query ? `query=${query}` : '';
		self
			.fetch(`/api/foodItems?${fetchQuery}&page=${page}`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				result = data.result;
				if (result) {
					currPage = result.page;
					totalPages = result.totalPages;
				}
			});
	}

	function getAdvancedFoodItems() {
		self
			.fetch('/api/foodItems', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(advancedQuery)
			})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				result = data.result;
				if (result) {
					currPage = result.page;
					totalPages = result.totalPages;
				}
			});
	}

	function search(formData: FormData) {
		if (!advancedSearch) {
			query = formData.get('query')?.toString();
			if (query) {
				getFoodItems(encodeURIComponent(query), 0);
			}
		} else {
			const caloriesHigh = formData.get('caloriesHigh')?.toString();
			const caloriesLow = formData.get('caloriesLow')?.toString();
			advancedQuery = {
				page: 0,
				brandName: formData.get('brandName')?.toString() ?? '',
				brandOwner: formData.get('brandOwner')?.toString() ?? '',
				description: formData.get('query')?.toString() ?? '',
				brandedFoodCategory: formData.get('brandedFoodCategory')?.toString() ?? '',
				caloriesHigh: caloriesHigh ? parseInt(caloriesHigh) : Number.MAX_SAFE_INTEGER,
				caloriesLow: caloriesLow ? parseInt(caloriesLow) : 0
			};
			getAdvancedFoodItems();
		}
	}

	onMount(async () => {
		getFoodItems(query, currPage);
	});
</script>

<form
	on:submit|preventDefault={(event) => {
		const formData = new FormData(event.currentTarget);
		search(formData);
	}}
	class="form-control w-full pt-4"
>
	<div class="input-group">
		<input type="text" name="query" placeholder="Search…" class="input input-bordered flex-grow" />
		<button type="submit" class="btn btn-square">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>
		</button>
	</div>
	<button
		class="btn btn-ghost btn-square w-full"
		type="button"
		on:click={() => {
			advancedSearch = !advancedSearch;
		}}
	>
		{#if advancedSearch}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
			</svg>
		{/if}
	</button>
	{#if advancedSearch}
		<div class="mt-2">
			<div class="md:input-group flex-col md:flex-row">
				<input
					type="text"
					name="brandName"
					placeholder="Brand Name"
					class="input input-bordered w-full md:flex-1"
				/>
				<input
					type="text"
					name="brandOwner"
					placeholder="Brand Owner"
					class="input input-bordered w-full md:flex-1"
				/>
				<input
					type="text"
					name="brandedFoodCategory"
					placeholder="Category"
					class="input input-bordered w-full md:flex-1"
				/>
			</div>
			<div class="md:input-group flex-col md:flex-row">
				<input
					type="number"
					name="caloriesLow"
					placeholder="Calories Min"
					class="input input-bordered w-full md:flex-1"
				/>
				<div class="divider">to</div>
				<input
					type="number"
					name="caloriesHigh"
					placeholder="Calories Max"
					class="input input-bordered w-full md:flex-1"
				/>
			</div>
		</div>
	{/if}
</form>

<div class="flex flex-col pt-4">
	{#if selected}
		<div class="flex bg-neutral-focus rounded-t-box p-4">
			<div class="flex-grow">
				<h2 class="text-lg">{selected.brandOwner} {selected.brandName} {selected.subbrandName}</h2>
				<p>{selected.description}</p>
			</div>
			<button
				class="btn btn-circle btn-ghost"
				on:click={() => {
					selected = undefined;
				}}
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</button>
		</div>
		<div class="p-4 bg-neutral rounded-b-box flex-shrink flex flex-col">
			<div class="overflow-auto">
				<table class="w-full table table-compact table-fixed">
					<thead>
						<tr>
							<th>Nutrient</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Calories</td>
							<td>{selected.calories}</td>
						</tr>
						<tr>
							<td>Protein</td>
							<td>{selected.protein}</td>
						</tr>
						<tr>
							<td>Carbohydrates</td>
							<td>{selected.carbohydrates}</td>
						</tr>
						<tr>
							<td>Fat</td>
							<td>{selected.fat}</td>
						</tr>
						<tr>
							<td>Saturated Fat</td>
							<td>{selected.saturatedFat}</td>
						</tr>
						<tr>
							<td>Trans Fat</td>
							<td>{selected.transFat}</td>
						</tr>
						<tr>
							<td>Cholesterol</td>
							<td>{selected.cholesterol}</td>
						</tr>
						<tr>
							<td>Sodium</td>
							<td>{selected.sodium}</td>
						</tr>
						<tr>
							<td>Sugars</td>
							<td>{selected.sugars}</td>
						</tr>
						<tr>
							<td>Calcium</td>
							<td>{selected.calcium}</td>
						</tr>
						<tr>
							<td>Iron</td>
							<td>{selected.iron}</td>
						</tr>
						<tr>
							<td>Potassium</td>
							<td>{selected.potassium}</td>
						</tr>
						<tr>
							<td>Fiber</td>
							<td>{selected.fiber}</td>
						</tr>
					</tbody>
				</table>
			</div>
			{#if journal}
				<form method="POST" action="?/addFoodItem" class="form-control pt-4">
					<div class="md:input-group flex-col md:flex-row">
						<input type="hidden" name="journal" value={journal} />
						<input type="hidden" name="type" value={addEntry} />
						<input type="hidden" name="foodItem" value={selected?.id} />
						<input
							type="text"
							name="servings"
							placeholder="servings"
							class="w-full md:flex-grow input input-bordered"
						/>
						<button type="submit" class="w-full md:w-1/5 btn btn-primary">Add Food</button>
					</div>
				</form>
			{/if}
		</div>
	{/if}
	{#if result && !selected}
		<div class="flex flex-col pb-4 overflow-auto rounded-box">
			<div class="w-full overflow-auto">
				<table class="w-full table table-fixed">
					<thead>
						<tr>
							<th>Name</th>
							<th>Brand</th>
							<th>Calories</th>
						</tr>
					</thead>
					<tbody>
						{#each result.items as food}
							<tr class="hover hover:cursor-pointer" on:click={() => (selected = food)}>
								<!-- {#if food.brandName || food.subbrandName}
									<td class="truncate">{food.brandName} {food.subbrandName}</td>
								{:else} -->
								<td class="truncate">{food.description}</td>
								<!-- {/if} -->
								<td class="truncate">{food.brandOwner}</td>
								<td class="truncate">{food.calories}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="btn-group mx-auto">
				<button class="btn" on:click={decPage}>«</button>
				<button class="btn">Page {currPage}/{totalPages}</button>
				<button class="btn" on:click={incPage}>»</button>
			</div>
		</div>
	{/if}
</div>
