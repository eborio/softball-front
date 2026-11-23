<script lang="ts">
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { app } from '#lib/stores/app.svelte';

	let { children }: LayoutProps = $props();

	$effect(() => {
		document.body.dataset.theme = app.theme;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>PuntoDeportivo · Softbol Venezuela</title>
</svelte:head>

{@render children()}
