<script lang="ts">
	import { app } from '#lib/stores/app.svelte';
	import type { Brand, Theme } from '#lib/types';

	const brands: { id: Brand; label: string }[] = [
		{ id: 'punto', label: 'PuntoDeportivo' },
		{ id: 'roster', label: 'RosterDeportivo' }
	];

	const themes: { id: Theme; label: string; dot: string }[] = [
		{ id: 'stadium', label: 'Noche de Estadio', dot: 'bg-emerald-400' },
		{ id: 'saas', label: 'SaaS Profesional', dot: 'bg-blue-500' },
		{ id: 'guaro', label: 'Guaro Sport', dot: 'bg-orange-500' }
	];

	function brandClass(id: Brand): string {
		const base = 'px-3 py-1.5 rounded-lg font-semibold transition-all';
		return id === app.brand
			? `${base} bg-indigo-600 text-white shadow`
			: `${base} text-slate-400 hover:text-white`;
	}

	function themeClass(id: Theme): string {
		const base = 'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all';
		return id === app.theme
			? `${base} font-bold bg-slate-800 text-white border border-slate-600 shadow-sm`
			: `${base} font-medium text-slate-400 hover:text-white`;
	}
</script>

<div class="bg-slate-950 text-white border-b border-slate-800 px-3 py-2.5 text-xs">
	<div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
		<div class="flex items-center gap-2">
			<span
				class="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold tracking-wide uppercase text-[10px]"
			>
				Laboratorio UI/UX
			</span>
			<span class="text-slate-300 font-medium hidden sm:inline">
				Compara marca y estilo visual en tiempo real:
			</span>
		</div>

		<div class="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
			<div class="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
				<span class="text-slate-400 pl-2 pr-1 font-medium">Marca:</span>
				{#each brands as brand (brand.id)}
					<button type="button" class={brandClass(brand.id)} onclick={() => app.setBrand(brand.id)}>
						{brand.label}
					</button>
				{/each}
			</div>

			<div class="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
				<span class="text-slate-400 pl-2 pr-1 font-medium hidden sm:inline">Estilo:</span>
				{#each themes as theme (theme.id)}
					<button type="button" class={themeClass(theme.id)} onclick={() => app.setTheme(theme.id)}>
						<span class="w-2.5 h-2.5 rounded-full {theme.dot}"></span>
						{theme.label}
					</button>
				{/each}
			</div>
		</div>
	</div>
</div>
