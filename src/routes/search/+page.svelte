<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	let currPage = data.searchResult.foodSearchCriteria.pageNumber;
	let pageSize = data.searchResult.foodSearchCriteria.pageSize;
	let totalPages = data.searchResult.totalPages;
	let origQuery = data.query;

	console.log(origQuery);

	function incPage() {
		currPage += 1;
	}

	function decPage() {
		if (currPage !== 1) {
			currPage -= 1;
		}
	}
</script>

<div class="flex flex-col w-full pb-4">
	<div class="w-full overflow-auto">
		<table class="w-full table">
			<!-- head -->
			<thead>
				<tr>
					<th />
					<th>Name</th>
					<th>Brand</th>
					<th>Type</th>
				</tr>
			</thead>
			<tbody>
				{#each data.searchResult.foods as food, index}
					<tr
						class="hover hover:cursor-pointer"
						on:click={() => (window.location.href = `/search/result/${food.fdcId}`)}
					>
						<th>{index + (currPage - 1) * pageSize + 1}</th>
						<td>{food.description}</td>
						<td>{food.brandOwner}</td>
						<td>{food.dataType}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<form class="btn-group mx-auto">
		<button class="btn" type="submit" on:click={decPage}>«</button>
		<button class="btn">Page {currPage}/{totalPages}</button>
		<input type="hidden" name="query" value={origQuery} />
		<input type="hidden" name="page" value={currPage} />
		<button class="btn" type="submit" on:click={incPage}>»</button>
	</form>
</div>
