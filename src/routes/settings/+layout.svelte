<script>
	import { page } from '$app/stores';
	const navigation = [
		{
			title: 'Profile',
			href: '/settings/profile'
		},
		{
			title: 'Account',
			href: '/settings/account'
		}
	];
</script>

<div class="w-full pt-4">
	<h3 class="text-2xl font-medium">Settings</h3>
	<div class="divider" />
</div>

<div class="flex">
	<ul class="menu bg-base-100 w-56 rounded-box">
		{#each navigation as navItem}
			<li>
				<a
					href={navItem.href}
					class="font-medium {$page.url.pathname === navItem.href ? 'active' : ''}"
					>{navItem.title}</a
				>
			</li>
		{/each}
	</ul>
	<div class="w-full px-2">
		<slot />
	</div>
</div>
