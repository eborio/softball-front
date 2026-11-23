<script lang="ts">
	import type { Game } from '#lib/types';
	import { toast } from '#lib/stores/toast.svelte';

	let { game }: { game: Game } = $props();
</script>

<div
	class="theme-surface border rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-opacity-80 transition"
>
	<div>
		<div class="flex items-center justify-between gap-2 pb-3 mb-3 border-b theme-border">
			<div class="truncate">
				<span class="text-[11px] font-bold uppercase tracking-wider accent-text block truncate">
					{game.league}
				</span>
				<span class="text-[11px] theme-text-secondary flex items-center gap-1 mt-0.5 truncate">
					📍 {game.stadium} ({game.municipality})
				</span>
			</div>
			{#if game.status === 'live'}
				<span
					class="live-badge px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 shrink-0"
				>
					<span class="w-1.5 h-1.5 rounded-full bg-current animate-live-dot"></span>
					{game.statusText}
				</span>
			{:else}
				<span
					class="theme-elevated border theme-border px-2.5 py-1 rounded-lg text-[11px] font-semibold theme-text-secondary shrink-0"
				>
					{game.statusText}
				</span>
			{/if}
		</div>

		<div class="grid grid-cols-12 text-[10px] font-bold uppercase theme-text-muted mb-2 px-1">
			<div class="col-span-8">Equipo</div>
			<div class="col-span-4 grid grid-cols-3 text-center">
				<span>C</span>
				<span>H</span>
				<span>E</span>
			</div>
		</div>

		<div class="grid grid-cols-12 items-center py-1.5 px-1 rounded-xl">
			<div class="col-span-8 flex items-center gap-2.5 pr-2">
				<span
					class="w-7 h-7 rounded-lg {game.away
						.color} font-display font-bold text-xs flex items-center justify-center shrink-0"
				>
					{game.away.abbr}
				</span>
				<span class="font-bold text-sm truncate">{game.away.name}</span>
			</div>
			<div class="col-span-4 grid grid-cols-3 text-center font-display text-lg">
				<span class="font-bold {game.away.r > game.home.r ? 'accent-text' : ''}">
					{game.away.r}
				</span>
				<span class="theme-text-secondary text-base">{game.away.h}</span>
				<span class="theme-text-muted text-base">{game.away.e}</span>
			</div>
		</div>

		<div class="grid grid-cols-12 items-center py-1.5 px-1 rounded-xl mt-1">
			<div class="col-span-8 flex items-center gap-2.5 pr-2">
				<span
					class="w-7 h-7 rounded-lg {game.home
						.color} font-display font-bold text-xs flex items-center justify-center shrink-0"
				>
					{game.home.abbr}
				</span>
				<span class="font-bold text-sm truncate">{game.home.name}</span>
			</div>
			<div class="col-span-4 grid grid-cols-3 text-center font-display text-lg">
				<span class="font-bold {game.home.r > game.away.r ? 'accent-text' : ''}">
					{game.home.r}
				</span>
				<span class="theme-text-secondary text-base">{game.home.h}</span>
				<span class="theme-text-muted text-base">{game.home.e}</span>
			</div>
		</div>
	</div>

	<div class="mt-4 pt-3 border-t theme-border flex items-center justify-between text-xs">
		<span class="theme-text-secondary font-medium truncate pr-2">⚡ {game.highlight}</span>
		<button
			type="button"
			onclick={() => toast.show('Abriendo Box Score detallado jugador por jugador...')}
			class="font-bold accent-text hover:underline shrink-0"
		>
			Box Score
		</button>
	</div>
</div>
