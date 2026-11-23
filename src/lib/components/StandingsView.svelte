<script lang="ts">
	import type { StandingsCategory, StandingRow } from '#lib/types';

	let { standings }: { standings: Record<StandingsCategory, StandingRow[]> } = $props();

	let category = $state<StandingsCategory>('modificado');
	const rows = $derived(standings[category]);

	const categories: { id: StandingsCategory; label: string }[] = [
		{ id: 'modificado', label: 'Lanzamiento Modificado' },
		{ id: 'chata', label: 'Bola Chata / Recreativo' }
	];

	function indicatorColor(zone: StandingRow['zone']): string {
		if (zone === 'playoff') return 'bg-emerald-500';
		if (zone === 'wildcard') return 'bg-amber-500';
		return 'bg-transparent';
	}

	function streakClass(streak: string): string {
		return streak.startsWith('G')
			? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
			: 'bg-red-500/15 text-red-400 border-red-500/30';
	}
</script>

<section class="space-y-5">
	<div class="theme-surface border rounded-2xl overflow-hidden">
		<div
			class="p-4 sm:p-5 border-b theme-border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
		>
			<div>
				<span class="text-[11px] font-bold uppercase tracking-wider accent-text">
					Torneo Apertura 2026
				</span>
				<h3 class="font-display text-xl font-bold uppercase">
					Liga Libre de Softbol • Sede Fundalara
				</h3>
			</div>
			<div class="flex items-center gap-2">
				<span class="text-xs theme-text-secondary">Categoría:</span>
				<select
					value={category}
					onchange={(event) => (category = event.currentTarget.value as StandingsCategory)}
					class="theme-elevated border theme-border rounded-xl px-3 py-1.5 text-xs font-bold"
				>
					{#each categories as cat (cat.id)}
						<option value={cat.id}>{cat.label}</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="overflow-x-auto">
			<table class="w-full text-left border-collapse">
				<thead>
					<tr
						class="theme-elevated border-b theme-border text-[11px] font-bold uppercase tracking-wider theme-text-secondary"
					>
						<th class="py-3.5 pl-4 pr-2 w-10 text-center">#</th>
						<th class="py-3.5 px-3">Equipo / Municipio</th>
						<th class="py-3.5 px-2.5 text-center" title="Juegos Jugados">JJ</th>
						<th class="py-3.5 px-2.5 text-center" title="Juegos Ganados">JG</th>
						<th class="py-3.5 px-2.5 text-center" title="Juegos Perdidos">JP</th>
						<th class="py-3.5 px-3 text-center" title="Porcentaje de Victorias">AVE</th>
						<th class="py-3.5 px-2.5 text-center" title="Juegos de Diferencia">DIF</th>
						<th class="py-3.5 pl-2.5 pr-4 text-center">Racha</th>
					</tr>
				</thead>
				<tbody class="divide-y theme-border text-xs sm:text-sm">
					{#each rows as row (row.team)}
						<tr class="hover:opacity-90 transition">
							<td class="py-3.5 pl-4 pr-2 text-center font-bold relative">
								<span
									class="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r {indicatorColor(
										row.zone
									)}"
								></span>
								{row.pos}
							</td>
							<td class="py-3.5 px-3">
								<div class="font-bold">{row.team}</div>
								<div class="text-[11px] theme-text-secondary">{row.muni}</div>
							</td>
							<td class="py-3.5 px-2.5 text-center font-medium">{row.jj}</td>
							<td class="py-3.5 px-2.5 text-center font-bold text-emerald-400">{row.jg}</td>
							<td class="py-3.5 px-2.5 text-center font-medium theme-text-secondary">{row.jp}</td>
							<td class="py-3.5 px-3 text-center font-mono font-bold accent-text">{row.ave}</td>
							<td class="py-3.5 px-2.5 text-center font-medium theme-text-secondary">{row.dif}</td>
							<td class="py-3.5 pl-2.5 pr-4 text-center">
								<span
									class="px-2 py-0.5 rounded-md text-[11px] font-bold border {streakClass(
										row.streak
									)}"
								>
									{row.streak}
								</span>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="8" class="py-6 text-center theme-text-secondary">
								No hay posiciones para esta categoría.
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div
			class="p-3.5 theme-elevated border-t theme-border flex flex-wrap items-center justify-between gap-2 text-[11px] theme-text-secondary"
		>
			<div class="flex items-center gap-4">
				<span class="flex items-center gap-1.5">
					<span class="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Clasifica a Semifinales (Top 4)
				</span>
				<span class="flex items-center gap-1.5">
					<span class="w-2.5 h-2.5 rounded-sm bg-amber-500"></span> Comodín / Play-In
				</span>
			</div>
		</div>
	</div>
</section>
