<script lang="ts">
	import SportIcon from './SportIcon.svelte';
	import type { SportOption, StateOption } from '#lib/types';

	let {
		liveCount,
		selectedSport,
		selectedState,
		sports,
		states
	}: {
		liveCount: number;
		selectedSport: string;
		selectedState: string;
		sports: SportOption[];
		states: StateOption[];
	} = $props();

	const currentSport = $derived(sports.find((sport) => sport.slug === selectedSport) ?? sports[0]);
	const currentState = $derived(states.find((state) => state.code === selectedState) ?? states[0]);
	const heading = $derived(
		`Jornada Oficial • ${currentSport?.name ?? 'Deporte'}${currentState ? ` Estado ${currentState.name}` : ''}`
	);
	const description = $derived(
		currentState?.code !== 'VE-K' || currentSport?.slug !== 'softbol'
			? `Resultados de ${currentSport?.name ?? 'el deporte'} en ${currentState?.name ?? 'Venezuela'} según los filtros seleccionados.`
			: 'Resultados centralizados en tiempo real desde Barquisimeto, Cabudare, Quíbor y Carora.'
	);
</script>

<div class="theme-surface border rounded-2xl p-4 mb-6 flex items-center gap-4">
	<div class="flex items-start sm:items-center gap-3.5">
		<div
			class="w-11 h-11 rounded-xl theme-elevated border theme-border flex items-center justify-center shrink-0"
		>
			<SportIcon sport={currentSport} size="w-6 h-6" />
		</div>
		<div>
			<div class="flex flex-wrap items-center gap-2">
				<h2 class="font-display text-lg sm:text-xl font-bold uppercase tracking-tight">
					{heading}
				</h2>
				<span
					class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full live-badge flex items-center gap-1.5"
				>
					<span class="w-1.5 h-1.5 rounded-full bg-current animate-live-dot"></span>
					{liveCount} Juegos en Curso
				</span>
			</div>
			<p class="text-xs sm:text-sm theme-text-secondary mt-0.5">{description}</p>
		</div>
	</div>
</div>
