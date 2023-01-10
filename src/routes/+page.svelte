<script lang="ts">
	import type { JournalEntry } from '$lib/types';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { goals, journals } = data;

	let journalEntries: JournalEntry[] = [];
	let selectedIndex = 0;
	$: selectedJournal = journals.at(selectedIndex);

	$: totalCals = journalEntries.reduce((accum, journalEntry) => {
		return (accum += journalEntry.expand.foodItem.calories);
	}, 0);
	$: totalProtein = journalEntries.reduce((accum, journalEntry) => {
		return (accum += journalEntry.expand.foodItem.protein);
	}, 0);
	$: totalCarbs = journalEntries.reduce((accum, journalEntry) => {
		return (accum += journalEntry.expand.foodItem.carbohydrates);
	}, 0);
	$: totalFat = journalEntries.reduce((accum, journalEntry) => {
		return (accum += journalEntry.expand.foodItem.fat);
	}, 0);

	async function getJournalEntries(journal: string | undefined) {
		const response = await self
			.fetch(`/api/journalEntries?journal=${journal}`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				journalEntries = data['journalEntries'];
			});
	}

	function setJournal(currentTarget: HTMLInputElement) {
		if (!selectedJournal) return;

		const found = journals.findIndex((element) => {
			if (element.userDate === currentTarget.value) return true;
		});

		if (found < 0) {
			alert(`No journal for ${currentTarget.value}!`);
			currentTarget.value = selectedJournal?.userDate;
		} else {
			selectedIndex = found;
		}
	}

	function prevEntry() {
		if (selectedIndex < journals.length - 1) {
			selectedIndex++;
			getJournalEntries(journals.at(selectedIndex)?.id);
		}
	}

	function nextEntry() {
		if (selectedIndex > 0) {
			selectedIndex--;
			getJournalEntries(journals.at(selectedIndex)?.id);
		}
	}

	onMount(() => {
		if (selectedJournal) {
			getJournalEntries(selectedJournal.id);
		}
	});
</script>

<div class="flex flex-col md:flex-row bg-neutral-focus rounded-t-box p-4 mt-4">
	<div class="flex-grow flex">
		{#if journals.length == 0}
			<h1>You have no Journal Entries...</h1>
		{:else}
			<h1 class="hidden md:block text-lg my-auto">Journal for:</h1>
			<div class="btn-group md:ml-4">
				<button
					class={selectedIndex === journals.length - 1 ? 'btn btn-disabled' : 'btn btn-outline'}
					on:click={prevEntry}>Prev</button
				>
				<input
					type="date"
					name="entry-date"
					value={selectedJournal?.userDate}
					class="input input-bordered"
					on:input={({ currentTarget }) => {
						setJournal(currentTarget);
					}}
				/>
				<button
					class={selectedIndex === 0 ? 'btn btn-disabled' : 'btn btn-outline'}
					on:click={nextEntry}>Next</button
				>
			</div>
		{/if}
	</div>
	<form method="POST" action="?/addEntry" class="form-control">
		<div class="input-group">
			<input type="date" name="entry-date" class="input input-bordered flex-grow text-center" />
			<button class="btn btn-primary">Add Day</button>
		</div>
	</form>
</div>
<div class="flex flex-col bg-neutral rounded-b-box p-4">
	<p class="text-center text-lg mb-1">{totalCals}/{goals.calories} KCals</p>
	<progress
		class="progress progress-primary w-1/3 mx-auto mb-4"
		value={totalCals}
		max={goals.calories}
	/>
	<div class="flex justify-center">
		<div class="mx-4">
			<p class="text-center mb-4">Protein</p>
			<div class="radial-progress" style="--value:{(totalProtein / goals.protein) * 100};">
				{totalProtein}g
			</div>
		</div>
		<div class="mx-4">
			<p class="text-center mb-4">Carbs</p>
			<div class="radial-progress" style="--value:{(totalCarbs / goals.carbs) * 100};">
				{totalCarbs}g
			</div>
		</div>
		<div class="mx-4">
			<p class="text-center mb-4">Fat</p>
			<div class="radial-progress" style="--value:{(totalFat / goals.fat) * 100};">
				{totalFat}g
			</div>
		</div>
	</div>
</div>

<div class="flex bg-neutral-focus rounded-t-box mt-4 p-4">
	<div class="flex-grow flex">
		<h1 class="text-lg my-auto">Journal Entries</h1>
	</div>
	<div class="dropdown dropdown-end">
		<label for="entry-dropdown" tabindex="-1" class="btn btn-primary m-1">Add Entry</label>
		<ul
			id="entry-dropdown"
			tabindex="-1"
			class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
		>
			<li><a href="/search?addEntry=breakfast&journal={selectedJournal?.id}">Breakfast</a></li>
			<li><a href="/search?addEntry=lunch&journal={selectedJournal?.id}">Lunch</a></li>
			<li><a href="/search?addEntry=dinner&journal={selectedJournal?.id}">Dinner</a></li>
			<li><a href="/search?addEntry=snack&journal={selectedJournal?.id}">Snack</a></li>
		</ul>
	</div>
</div>
{#if journalEntries}
	<div class="overflow-x-auto bg-neutral rounded-b-box mb-4">
		<table class="table table-compact w-full">
			<thead>
				<tr>
					<th>Type</th>
					<th>Name</th>
					<th>Brand</th>
					<th>Calories</th>
					<th>Protein</th>
					<th>Carbs</th>
					<th>Fat</th>
				</tr>
			</thead>
			<tbody>
				{#each journalEntries as journalEntry}
					<tr>
						<td>{journalEntry.type}</td>
						<td>
							{journalEntry.expand.foodItem.brandName}
							{journalEntry.expand.foodItem.subbrandName}
						</td>
						<td>{journalEntry.expand.foodItem.brandOwner}</td>
						<td>{journalEntry.expand.foodItem.calories}</td>
						<td>{journalEntry.expand.foodItem.protein}</td>
						<td>{journalEntry.expand.foodItem.carbohydrates}</td>
						<td>{journalEntry.expand.foodItem.fat}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
