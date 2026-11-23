<script lang="ts">
	import { untrack } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';
	import type { Game } from '#lib/types';
	import { app } from '#lib/stores/app.svelte';
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
	const sports = $derived(data.portal.sports);
	const standings = $derived(data.portal.standings);
	const states = $derived(data.portal.states);
	const stadiums = $derived(data.portal.stadiums);

	const selectedSport = $derived(
		sports.find((sport) => sport.slug === data.portal.selectedSport) ?? sports[0]
	);
	const selectedState = $derived(
		states.find((state) => state.code === data.portal.selectedState) ?? states[0]
	);

	const liveGame = $derived(games[0]);
	const liveCount = $derived(games.filter((game) => game.status === 'live').length);

	$effect(() => {
		syncGames(data.portal.games);
	});

	function changeFilters(next: { sport?: string; state?: string }) {
		const params = new URLSearchParams({
			sport: next.sport ?? data.portal.selectedSport,
			state: next.state ?? data.portal.selectedState
		});

		void goto(resolve(`/?${params.toString()}`), { reset: false });
	}

	function handleSportChange(slug: string) {
		changeFilters({ sport: slug });
	}

	function handleStateChange(code: string) {
		changeFilters({ state: code });
	}

	function syncGames(next: Game[]) {
		games = next;
	}
</script>

<div class="min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
	<SiteHeader
		{sports}
		{states}
		selectedSport={data.portal.selectedSport}
		selectedState={data.portal.selectedState}
		onSportChange={handleSportChange}
		onStateChange={handleStateChange}
	/>

	<main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
		<ContextBanner
			{liveCount}
			{sports}
			{states}
			selectedSport={data.portal.selectedSport}
			selectedState={data.portal.selectedState}
		/>

		{#if app.activeTab === 'live'}
			<LiveGames {games} />
		{:else if app.activeTab === 'standings'}
			<StandingsView
				{standings}
				sportName={selectedSport?.name ?? 'Deporte'}
				stateName={selectedState?.name ?? 'Venezuela'}
			/>
		{:else if app.activeTab === 'stadiums'}
			<StadiumsView {stadiums} />
		{:else if liveGame}
			<ScorerView game={liveGame} />
		{/if}
	</main>

	<SiteFooter />
	<Toast />
</div>
