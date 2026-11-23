<script lang="ts">
	import {
		app,
		estadoLabels,
		estados,
		sports,
		sportEmojis,
		sportNames
	} from '#lib/stores/app.svelte';
	import { toast } from '#lib/stores/toast.svelte';
	import type { Estado, Sport, TabId } from '#lib/types';

	const tabs: { id: TabId; label: string }[] = [
		{ id: 'live', label: 'En Vivo y Resultados' },
		{ id: 'standings', label: 'Tabla de Posiciones' },
		{ id: 'stadiums', label: 'Directorio de Estadios' },
		{ id: 'scorer', label: 'Modo Anotador (Móvil)' }
	];

	function onStateChange(event: Event) {
		const value = (event.currentTarget as HTMLSelectElement).value as Estado;
		app.setState(value);
		if (value !== 'Lara') {
			toast.show(`Escalabilidad lista: módulo activado para el Estado ${value}.`);
		}
	}

	function onSportChange(event: Event) {
		const value = (event.currentTarget as HTMLSelectElement).value as Sport;
		app.setSport(value);
		if (value !== 'Softbol') {
			toast.show(`Escalabilidad lista: módulo de ${sportNames[value]} activado.`);
		}
	}

	function tabStyle(id: TabId): string {
		return app.activeTab === id
			? 'border-color: var(--accent-primary); color: var(--accent-primary);'
			: 'border-color: transparent; color: var(--text-secondary);';
	}
</script>

<header class="theme-header sticky top-0 z-40 border-b">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
		<div
			class="flex items-center gap-3 cursor-pointer"
			role="button"
			tabindex="0"
			onclick={() => app.switchTab('live')}
			onkeydown={(event) => {
				if (event.key === 'Enter' || event.key === ' ') app.switchTab('live');
			}}
		>
			<div
				class="w-10 h-10 rounded-xl btn-accent flex items-center justify-center shadow-md shrink-0"
			>
				{#if app.config.icon === 'pin'}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
							d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
						/>
						<circle cx="12" cy="11" r="3" stroke-width="2.5" />
					</svg>
				{:else}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
						/>
					</svg>
				{/if}
			</div>
			<div>
				<div class="flex items-center gap-1.5">
					<h1
						class="font-display text-xl sm:text-2xl font-bold tracking-tight uppercase leading-none"
					>
						{app.config.titleMain}<span class="accent-text">{app.config.titleAccent}</span>
					</h1>
					<span
						class="text-[10px] font-bold px-1.5 py-0.5 rounded theme-elevated border theme-border uppercase tracking-wider"
					>
						VE
					</span>
				</div>
				<p class="text-[11px] theme-text-secondary font-medium mt-0.5">{app.config.subtitle}</p>
			</div>
		</div>

		<div class="hidden md:flex items-center gap-2.5">
			<div class="relative">
				<select
					value={app.selectedState}
					onchange={onStateChange}
					class="theme-elevated border theme-border rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none cursor-pointer pr-8 appearance-none"
				>
					{#each estados as estado (estado)}
						<option value={estado}>📍 {estadoLabels[estado]}</option>
					{/each}
				</select>
				<svg
					class="w-3.5 h-3.5 absolute right-2.5 top-2.5 pointer-events-none theme-text-secondary"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</div>

			<div class="relative">
				<select
					value={app.selectedSport}
					onchange={onSportChange}
					class="theme-elevated border theme-border rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none cursor-pointer pr-8 appearance-none"
				>
					{#each sports as sport (sport)}
						<option value={sport}>{sportEmojis[sport]} {sportNames[sport]}</option>
					{/each}
				</select>
				<svg
					class="w-3.5 h-3.5 absolute right-2.5 top-2.5 pointer-events-none theme-text-secondary"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<button
				type="button"
				onclick={() => app.switchTab('scorer')}
				class="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border theme-border theme-elevated text-xs font-semibold hover:opacity-90 transition"
			>
				<span class="w-2 h-2 rounded-full bg-red-500 animate-live-dot"></span>
				<span>Modo Anotador</span>
			</button>
			<button
				type="button"
				onclick={() =>
					toast.show(
						'¡Portal Abierto! Aquí cualquier presidente de liga en Lara o Venezuela podrá registrar su torneo gratis.'
					)}
				class="btn-accent px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2.5"
						d="M12 4v16m8-8H4"
					/>
				</svg>
				<span>Registrar Torneo</span>
			</button>
		</div>
	</div>

	<div class="md:hidden px-4 pb-2.5 flex items-center gap-2">
		<select
			value={app.selectedState}
			onchange={onStateChange}
			class="w-1/2 theme-elevated border theme-border rounded-xl px-3 py-1.5 text-xs font-semibold"
		>
			{#each estados as estado (estado)}
				<option value={estado}>📍 {estado}</option>
			{/each}
		</select>
		<select
			value={app.selectedSport}
			onchange={onSportChange}
			class="w-1/2 theme-elevated border theme-border rounded-xl px-3 py-1.5 text-xs font-semibold"
		>
			{#each sports as sport (sport)}
				<option value={sport}>{sportEmojis[sport]} {sportNames[sport]}</option>
			{/each}
		</select>
	</div>

	<nav
		class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar border-t theme-border"
	>
		{#each tabs as tab (tab.id)}
			<button
				type="button"
				onclick={() => app.switchTab(tab.id)}
				class="nav-tab flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap"
				style={tabStyle(tab.id)}
			>
				{#if tab.id === 'live'}
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 10V3L4 14h7v7l9-11h-7z"
						/>
					</svg>
				{:else if tab.id === 'standings'}
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
						/>
					</svg>
				{:else if tab.id === 'stadiums'}
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				{:else}
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
						/>
					</svg>
				{/if}
				<span>{tab.label}</span>
			</button>
		{/each}
	</nav>
</header>
