<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';

	export let data: LayoutData;
</script>

<div class="drawer drawer-mobile">
	<input id="drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<div class="navbar bg-primary gap-2 sticky top-0 z-50">
			<label for="drawer" class="btn btn-primary drawer-button lg:hidden">
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
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</label>
			<div class="text-white font-bold breadcrumbs pl-2">
				{$page.data.title}
			</div>
		</div>
		<div class="container md:mx-auto">
			<slot />
		</div>
	</div>
	<div class="drawer-side">
		<label for="drawer" class="drawer-overlay" />
		<aside class="bg-base-200 w-80">
			<div class="navbar gap-2 sticky top-0 z-50">
				<a href="/" class="flex-0 btn btn-ghost px-2">Good Food</a>
			</div>
			<ul class="menu p-4 w-80 bg-base-100 text-base-content">
				<li class="menu-title">
					<span>Food</span>
				</li>
				<li><a href="/food/search">Search</a></li>
				<li><a href="/food/scanBarCode">Scan Bar Code</a></li>
				{#if data.user?.admin}
					<li><a href="/food/addItem">Add Food Item</a></li>
				{/if}
				{#if data.user}
					<li class="menu-title">
						<span>Profile</span>
					</li>
					<li><a href="/profile/goals">Goals</a></li>
				{/if}
				<li class="menu-title">
					<span>Account</span>
				</li>
				{#if data.user}
					<li><a href="/account/settings">Settings</a></li>
					<li>
						<form action="/logout" method="POST">
							<button type="submit" class="w-full text-start">Logout</button>
						</form>
					</li>
				{:else}
					<li><a href="/login">Login</a></li>
					<li><a href="/signup">Sign-Up</a></li>
				{/if}
			</ul>
		</aside>
	</div>
</div>
