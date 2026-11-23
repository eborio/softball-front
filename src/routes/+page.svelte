<script lang="ts">
	import { untrack } from 'svelte';
	import type { PageProps } from './$types';
	import { app } from '#lib/stores/app.svelte';
	import DesignLab from '#lib/components/DesignLab.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import ContextBanner from '#lib/components/ContextBanner.svelte';
	import LiveGames from '#lib/components/LiveGames.svelte';
	import StandingsView from '#lib/components/StandingsView.svelte';
	import StadiumsView from '#lib/components/StadiumsView.svelte';
	import ScorerView from '#lib/components/ScorerView.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import Toast from '#lib/components/Toast.svelte';

	let { data }: PageProps = $props();

	let games = $state(untrack(() => data.portal.games));
	const standings = untrack(() => data.portal.standings);
	const stadiums = untrack(() => data.portal.stadiums);

	const liveGame = $derived(games[0]);
	const liveCount = $derived(games.filter((game) => game.status === 'live').length);
</script>

<div class="min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
	<DesignLab />
	<SiteHeader />

	<main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
		<ContextBanner {liveCount} />

		{#if app.activeTab === 'live'}
			<LiveGames {games} />
		{:else if app.activeTab === 'standings'}
			<StandingsView {standings} />
		{:else if app.activeTab === 'stadiums'}
			<StadiumsView {stadiums} />
		{:else if liveGame}
			<ScorerView game={liveGame} />
		{/if}
	</main>

	<SiteFooter />
	<Toast />
</div>
