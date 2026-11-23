<script lang="ts">
	import { app, sportEmojis, sportNames } from '#lib/stores/app.svelte';

	let { liveCount }: { liveCount: number } = $props();

	const emoji = $derived(sportEmojis[app.selectedSport]);
	const heading = $derived(
		`Jornada Oficial • ${sportNames[app.selectedSport]} Estado ${app.selectedState}`
	);
	const description = $derived(
		app.selectedState !== 'Lara' || app.selectedSport !== 'Softbol'
			? `Vista escalable demostrativa para ${sportNames[app.selectedSport]} en ${app.selectedState}. Mostrando estructura base con datos piloto de Lara.`
			: 'Resultados centralizados en tiempo real desde Barquisimeto, Cabudare, Quíbor y Carora.'
	);
</script>

<div
	class="theme-surface border rounded-2xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
>
	<div class="flex items-start sm:items-center gap-3.5">
		<div
			class="w-11 h-11 rounded-xl theme-elevated border theme-border flex items-center justify-center text-xl shrink-0"
		>
			{emoji}
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

	<div class="flex items-center gap-2 self-start sm:self-center">
		<span class="text-[11px] theme-text-muted">Concepto visual:</span>
		<span
			class="text-xs font-bold px-3 py-1.5 rounded-xl theme-elevated border theme-border accent-text"
		>
			{app.themeLabel}
		</span>
	</div>
</div>
