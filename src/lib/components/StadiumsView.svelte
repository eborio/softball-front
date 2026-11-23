<script lang="ts">
	import type { Stadium } from '#lib/types';
	import { toast } from '#lib/stores/toast.svelte';

	let { stadiums }: { stadiums: Stadium[] } = $props();

	let selectedMunicipality = $state('all');

	const municipalityLabels: Record<string, string> = {
		Iribarren: 'Iribarren (Barquisimeto)',
		Palavecino: 'Palavecino (Cabudare)',
		Torres: 'Torres (Carora)'
	};

	const municipalities = $derived([...new Set(stadiums.map((stadium) => stadium.municipality))]);

	const filtered = $derived(
		selectedMunicipality === 'all'
			? stadiums
			: stadiums.filter((stadium) => stadium.municipality === selectedMunicipality)
	);

	function pillClass(municipality: string): string {
		const base = 'muni-pill px-3.5 py-1.5 rounded-xl text-xs whitespace-nowrap transition';
		return selectedMunicipality === municipality
			? `${base} font-bold btn-accent`
			: `${base} font-semibold theme-surface border theme-border hover:opacity-80`;
	}

	function label(municipality: string): string {
		return municipalityLabels[municipality] ?? municipality;
	}
</script>

<section class="space-y-5">
	<div class="flex flex-wrap items-center justify-between gap-3">
		<div class="flex items-center gap-2 overflow-x-auto no-scrollbar">
			<button type="button" class={pillClass('all')} onclick={() => (selectedMunicipality = 'all')}>
				Todos los Municipios
			</button>
			{#each municipalities as municipality (municipality)}
				<button
					type="button"
					class={pillClass(municipality)}
					onclick={() => (selectedMunicipality = municipality)}
				>
					{label(municipality)}
				</button>
			{/each}
		</div>
		<span class="text-xs theme-text-secondary font-medium">
			Reporte de terrenos actualizado por delegados
		</span>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
		{#each filtered as stadium (stadium.name)}
			<div class="theme-surface border rounded-2xl p-5 flex flex-col justify-between">
				<div>
					<div class="flex items-start justify-between gap-2 mb-3">
						<span class="text-[11px] font-bold uppercase tracking-wider theme-text-secondary">
							Municipio {stadium.municipality}
						</span>
						<span
							class="px-2.5 py-0.5 rounded-full text-[11px] font-bold border {stadium.statusColor}"
						>
							{stadium.status}
						</span>
					</div>
					<h4 class="font-display text-lg font-bold leading-snug mb-1">{stadium.name}</h4>
					<p class="text-xs theme-text-secondary mb-4">📍 {stadium.sector}</p>

					<div class="space-y-2 text-xs theme-elevated border theme-border rounded-xl p-3">
						<div class="flex items-center justify-between">
							<span class="theme-text-secondary">Terreno:</span>
							<span class="font-semibold">{stadium.turf}</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="theme-text-secondary">Iluminación:</span>
							<span class="font-semibold">{stadium.lights}</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="theme-text-secondary">Juegos Hoy:</span>
							<span class="font-bold accent-text">{stadium.gamesToday} encuentros</span>
						</div>
					</div>
				</div>

				<div class="mt-4 pt-3 border-t theme-border flex items-center justify-between text-xs">
					<span class="font-medium truncate pr-2">🕒 {stadium.nextGame}</span>
					<button
						type="button"
						onclick={() =>
							toast.show(`Abriendo ubicación GPS de ${stadium.name} en Google Maps...`)}
						class="font-bold accent-text hover:underline shrink-0"
					>
						Cómo llegar
					</button>
				</div>
			</div>
		{:else}
			<p class="theme-text-secondary text-sm">No hay estadios para este municipio.</p>
		{/each}
	</div>
</section>
