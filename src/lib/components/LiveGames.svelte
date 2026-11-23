<script lang="ts">
	import GameCard from './GameCard.svelte';
	import type { Game } from '#lib/types';

	let { games }: { games: Game[] } = $props();

	let selectedLeague = $state('all');

	const leagues = $derived([...new Set(games.map((game) => game.league))]);
	const filtered = $derived(
		selectedLeague === 'all' ? games : games.filter((game) => game.league === selectedLeague)
	);

	function isActive(league: string): boolean {
		return selectedLeague === league;
	}

	function pillClass(league: string): string {
		const base = 'league-pill px-3.5 py-1.5 rounded-xl text-xs whitespace-nowrap transition';
		return isActive(league)
			? `${base} font-bold btn-accent`
			: `${base} font-semibold theme-surface border theme-border hover:opacity-80`;
	}
</script>

<section class="space-y-6">
	<div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
		<button type="button" class={pillClass('all')} onclick={() => (selectedLeague = 'all')}>
			Todas las Ligas
		</button>
		{#each leagues as league (league)}
			<button type="button" class={pillClass(league)} onclick={() => (selectedLeague = league)}>
				{league}
			</button>
		{/each}
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
		{#each filtered as game (game.id)}
			<GameCard {game} />
		{:else}
			<p class="theme-text-secondary text-sm">No hay juegos para esta liga.</p>
		{/each}
	</div>
</section>
