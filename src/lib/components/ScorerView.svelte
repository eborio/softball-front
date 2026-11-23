<script lang="ts">
	import { app } from '#lib/stores/app.svelte';
	import { toast } from '#lib/stores/toast.svelte';
	import type { BattingSide, Game, ScorerState } from '#lib/types';

	let { game }: { game: Game } = $props();

	let scorer = $state<ScorerState>({
		battingTeam: 'away',
		outs: 1,
		inningNum: 5,
		inningHalf: 'Alta'
	});

	let lastAction = $state('Listo para anotar jugada en el 5to inning...');
	const outsDots = [1, 2, 3];

	function setBattingTeam(side: BattingSide) {
		scorer.battingTeam = side;
	}

	function rowClass(side: BattingSide): string {
		const base = 'flex items-center justify-between p-2 rounded-xl border';
		return scorer.battingTeam === side
			? `${base} border-emerald-500/50 bg-emerald-500/10`
			: `${base} theme-border`;
	}

	function batButtonClass(side: BattingSide): string {
		const base = 'py-2 px-3 rounded-xl text-xs font-bold text-center transition';
		return scorer.battingTeam === side
			? `${base} btn-accent`
			: `${base} theme-elevated border theme-border`;
	}

	function updateStatus() {
		const plural = scorer.outs === 1 ? '' : 's';
		game.statusText = `${scorer.inningNum}to ${scorer.inningHalf} • ${scorer.outs} Out${plural}`;
	}

	function recordPlay(type: 'run' | 'hit' | 'out' | 'error') {
		const team = scorer.battingTeam === 'away' ? game.away : game.home;
		const defense = scorer.battingTeam === 'away' ? game.home : game.away;
		let message: string;

		if (type === 'run') {
			team.r += 1;
			message = `¡Carrera anotada para ${team.name}! (${game.away.r} - ${game.home.r})`;
		} else if (type === 'hit') {
			team.h += 1;
			message = `Hit conectado por ${team.name} (Total: ${team.h} H)`;
		} else if (type === 'error') {
			defense.e += 1;
			message = `Error defensivo cargado a ${defense.name}`;
		} else {
			scorer.outs += 1;
			if (scorer.outs >= 3) {
				scorer.outs = 0;
				if (scorer.inningHalf === 'Alta') {
					scorer.inningHalf = 'Baja';
					scorer.battingTeam = 'home';
				} else {
					scorer.inningHalf = 'Alta';
					scorer.inningNum += 1;
					scorer.battingTeam = 'away';
				}
				message = `¡3 Outs! Cambio al ${scorer.inningNum}to ${scorer.inningHalf}`;
			} else {
				message = `Out #${scorer.outs} registrado`;
			}
		}

		updateStatus();
		lastAction = message;
		toast.show(message);
	}
</script>

<section>
	<div class="max-w-md mx-auto">
		<div class="text-center mb-4">
			<span class="text-[11px] font-bold uppercase tracking-wider accent-text">
				Herramienta de Campo (PWA Offline-Ready)
			</span>
			<h3 class="font-display text-xl font-bold uppercase">Anotador Rápido en Vivo</h3>
			<p class="text-xs theme-text-secondary mt-1">
				Diseñado para una sola mano. Registra carreras, hits y outs sin distraerte del partido.
			</p>
		</div>

		<div
			class="theme-surface border-2 theme-border rounded-[2rem] p-4 sm:p-5 shadow-2xl relative overflow-hidden"
		>
			<div
				class="flex items-center justify-between text-[11px] theme-text-secondary pb-3 mb-3 border-b theme-border"
			>
				<span class="font-semibold flex items-center gap-1.5">
					<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
					{game.league}
				</span>
				<span class="font-mono font-bold">{game.stadium}</span>
			</div>

			<div class="theme-elevated border theme-border rounded-2xl p-3.5 mb-4">
				<div class="flex items-center justify-between text-xs font-bold mb-2">
					<span class="live-badge px-2 py-0.5 rounded-md uppercase text-[10px]">
						En Vivo • {scorer.inningNum}to {scorer.inningHalf}
					</span>
					<div class="flex items-center gap-1.5">
						<span class="theme-text-secondary">OUTS:</span>
						<div class="flex gap-1">
							{#each outsDots as dot (dot)}
								<span
									class="w-2.5 h-2.5 rounded-full {dot <= scorer.outs
										? 'bg-red-500'
										: 'bg-slate-600/40 border border-slate-500'}"
								></span>
							{/each}
						</div>
					</div>
				</div>

				<div class="space-y-2.5 mt-3">
					<div class={rowClass('away')}>
						<div class="flex items-center gap-2.5">
							<span
								class="w-7 h-7 rounded-lg {game.away
									.color} font-display font-bold text-xs flex items-center justify-center"
							>
								{game.away.abbr}
							</span>
							<div>
								<p class="text-xs font-bold leading-tight">{game.away.name}</p>
								<p class="text-[10px] theme-text-secondary">
									Visitante • <span class="font-bold">{game.away.h}</span> Hits
								</p>
							</div>
						</div>
						<span class="font-display text-2xl font-bold px-2">{game.away.r}</span>
					</div>

					<div class={rowClass('home')}>
						<div class="flex items-center gap-2.5">
							<span
								class="w-7 h-7 rounded-lg {game.home
									.color} font-display font-bold text-xs flex items-center justify-center"
							>
								{game.home.abbr}
							</span>
							<div>
								<p class="text-xs font-bold leading-tight">{game.home.name}</p>
								<p class="text-[10px] theme-text-secondary">
									Home Club • <span class="font-bold">{game.home.h}</span> Hits
								</p>
							</div>
						</div>
						<span class="font-display text-2xl font-bold px-2">{game.home.r}</span>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-2 mb-4">
				<button type="button" onclick={() => setBattingTeam('away')} class={batButtonClass('away')}>
					Batea {game.away.abbr}
				</button>
				<button type="button" onclick={() => setBattingTeam('home')} class={batButtonClass('home')}>
					Batea {game.home.abbr}
				</button>
			</div>

			<div class="grid grid-cols-2 gap-2.5 mb-4">
				<button
					type="button"
					onclick={() => recordPlay('run')}
					class="p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold flex flex-col items-center justify-center gap-1 shadow-md transition"
				>
					<span class="font-display text-2xl leading-none">+1 CARRERA</span>
					<span class="text-[10px] opacity-90 font-medium">Anotada en Home</span>
				</button>
				<button
					type="button"
					onclick={() => recordPlay('hit')}
					class="p-4 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold flex flex-col items-center justify-center gap-1 shadow-md transition"
				>
					<span class="font-display text-2xl leading-none">+1 HIT</span>
					<span class="text-[10px] opacity-90 font-medium">Imparable conectado</span>
				</button>
				<button
					type="button"
					onclick={() => recordPlay('out')}
					class="p-4 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold flex flex-col items-center justify-center gap-1 shadow-md transition"
				>
					<span class="font-display text-2xl leading-none">+1 OUT</span>
					<span class="text-[10px] font-semibold opacity-80">3 Outs cambian inning</span>
				</button>
				<button
					type="button"
					onclick={() => recordPlay('error')}
					class="p-4 rounded-2xl theme-elevated border theme-border hover:opacity-80 active:scale-95 font-bold flex flex-col items-center justify-center gap-1 transition"
				>
					<span class="font-display text-2xl leading-none">+1 ERROR</span>
					<span class="text-[10px] theme-text-secondary font-medium">Pifia a la defensiva</span>
				</button>
			</div>

			<div
				class="theme-elevated border theme-border rounded-xl p-3 flex items-center justify-between text-xs"
			>
				<span class="theme-text-secondary truncate pr-2">{lastAction}</span>
				<button
					type="button"
					onclick={() => app.switchTab('live')}
					class="font-bold accent-text whitespace-nowrap hover:underline"
				>
					Ver en Portal →
				</button>
			</div>
		</div>
	</div>
</section>
