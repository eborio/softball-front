<script lang="ts">
	import type { SportOption } from '#lib/types';
	import SportIcon from './SportIcon.svelte';

	let {
		onchange,
		sports,
		value
	}: { onchange: (slug: string) => void; sports: SportOption[]; value: string } = $props();

	let container: HTMLDivElement;
	let open = $state(false);

	const selected = $derived(sports.find((sport) => sport.slug === value) ?? sports[0]);

	function select(slug: string) {
		onchange(slug);
		open = false;
	}

	$effect(() => {
		if (!open) return;

		const onPointerDown = (event: PointerEvent) => {
			if (container && !container.contains(event.target as Node)) {
				open = false;
			}
		};

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				open = false;
			}
		};

		document.addEventListener('pointerdown', onPointerDown);
		document.addEventListener('keydown', onKeyDown);

		return () => {
			document.removeEventListener('pointerdown', onPointerDown);
			document.removeEventListener('keydown', onKeyDown);
		};
	});
</script>

<div class="relative" bind:this={container}>
	<button
		type="button"
		onclick={() => (open = !open)}
		aria-expanded={open}
		aria-haspopup="listbox"
		class="theme-elevated border theme-border rounded-xl pl-2.5 pr-2 py-1.5 text-xs font-semibold flex items-center gap-2 hover:opacity-90 transition"
	>
		<SportIcon sport={selected} size="w-5 h-5" />
		<span>{selected?.name ?? 'Deporte'}</span>
		<svg
			class="w-3.5 h-3.5 theme-text-secondary"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	{#if open}
		<div
			class="absolute left-0 top-full mt-1 z-50 min-w-44 theme-surface border theme-border rounded-xl shadow-xl p-1.5"
		>
			<ul role="listbox" class="space-y-0.5">
				{#each sports as sport (sport.slug)}
					<li>
						<button
							type="button"
							role="option"
							aria-selected={sport.slug === value}
							onclick={() => select(sport.slug)}
							class="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold transition {sport.slug ===
							value
								? 'btn-accent'
								: 'hover:opacity-80'}"
						>
							<SportIcon {sport} size="w-5 h-5" />
							<span>{sport.name}</span>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
