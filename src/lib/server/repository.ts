import { LARAVEL_API_URL } from '$app/env/private';
import { apiGet } from './api';
import type {
	ApiCollection,
	ApiGame,
	ApiGameTeam,
	ApiPaginated,
	ApiSport,
	ApiStadium,
	ApiStanding,
	ApiState
} from '#lib/api/contract';
import { fallbackSports, sportEmoji } from '#lib/data/sports';
import { fallbackStates } from '#lib/data/states';
import {
	games as placeholderGames,
	standings as placeholderStandings,
	stadiums as placeholderStadiums
} from '#lib/data/placeholders';
import type { Game, PortalData, SportOption, Stadium, StandingRow, StateOption } from '#lib/types';

const TEAM_COLORS = [
	'bg-red-600 text-white',
	'bg-amber-500 text-slate-950',
	'bg-blue-600 text-white',
	'bg-emerald-600 text-white',
	'bg-orange-600 text-white',
	'bg-purple-600 text-white',
	'bg-teal-600 text-white',
	'bg-indigo-600 text-white',
	'bg-sky-600 text-white',
	'bg-pink-600 text-white'
];

const STOPWORDS = new Set(['de', 'del', 'el', 'la', 'las', 'los', 'y']);

const STADIUM_STATUS_COLORS: Record<string, string> = {
	danger: 'bg-red-500/15 text-red-400 border-red-500/30',
	info: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
	neutral: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
	success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
	warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30'
};

const dateFormatter = new Intl.DateTimeFormat('es-VE', {
	day: 'numeric',
	hour: 'numeric',
	minute: '2-digit',
	month: 'short'
});

function placeholders(filters: PortalFilters = {}): PortalData {
	const selectedSport =
		fallbackSports.find((sport) => sport.slug === filters.sport) ?? fallbackSports[0];
	const selectedState =
		fallbackStates.find((state) => state.code === filters.state) ?? fallbackStates[0];

	return {
		games: placeholderGames,
		selectedSport: selectedSport.slug,
		selectedState: selectedState.code,
		sports: fallbackSports,
		standings: placeholderStandings,
		states: fallbackStates,
		stadiums: placeholderStadiums,
		source: 'placeholder'
	};
}

function mapSport(sport: ApiSport): SportOption {
	return {
		emoji: sport.emoji ?? sportEmoji(sport.slug),
		id: sport.id,
		name: sport.name,
		slug: sport.slug
	};
}

function mapState(state: ApiState): StateOption {
	return {
		code: state.code,
		id: state.id,
		name: state.name
	};
}

function teamAbbr(name: string | null): string {
	const words = (name ?? 'Equipo')
		.split(/\s+/)
		.filter((word) => word.length > 0 && !STOPWORDS.has(word.toLowerCase()));

	return (
		words
			.slice(0, 2)
			.map((word) => word[0])
			.join('')
			.toUpperCase() || 'EQ'
	);
}

function teamColor(id: number | null, name: string | null): string {
	const seed = id ?? [...(name ?? 'Equipo')].reduce((total, char) => total + char.charCodeAt(0), 0);

	return TEAM_COLORS[Math.abs(seed) % TEAM_COLORS.length];
}

function mapTeam(team: ApiGameTeam): Game['home'] {
	return {
		name: team.name ?? 'Equipo',
		abbr: teamAbbr(team.name),
		color: teamColor(team.id, team.name),
		r: team.runs,
		h: team.hits,
		e: team.errors
	};
}

function gameStatusText(game: ApiGame): string {
	if (game.status === 'final') {
		return 'Finalizado';
	}

	if (game.status === 'live') {
		if (game.current_inning && game.current_half) {
			const half = game.current_half === 'alta' ? 'Alta' : 'Baja';
			const outs = game.outs === 1 ? 'Out' : 'Outs';

			return `${game.current_inning}to ${half} • ${game.outs} ${outs}`;
		}

		return 'En Vivo';
	}

	return game.starts_at ? dateFormatter.format(new Date(game.starts_at)) : 'Programado';
}

function mapGame(game: ApiGame): Game {
	return {
		id: game.id,
		league: game.league.name ?? game.tournament.name ?? 'Liga',
		stadium: game.stadium?.name ?? 'Por confirmar',
		municipality: game.stadium?.municipality ?? '',
		status: game.status,
		statusText: gameStatusText(game),
		away: mapTeam(game.visitor),
		home: mapTeam(game.home),
		highlight: game.highlight ?? ''
	};
}

function mapStadium(stadium: ApiStadium): Stadium {
	const statusColor =
		STADIUM_STATUS_COLORS[stadium.status?.color ?? 'neutral'] ?? STADIUM_STATUS_COLORS.neutral;

	return {
		name: stadium.name,
		municipality: stadium.municipality ?? '',
		sector: stadium.sector ?? '',
		status: stadium.status?.name ?? 'Sin estado',
		statusColor,
		lights: stadium.lights ?? '',
		turf: stadium.turf ?? '',
		gamesToday: stadium.games_today,
		nextGame: stadium.next_game_at
			? dateFormatter.format(new Date(stadium.next_game_at))
			: 'Sin juegos programados'
	};
}

function mapStanding(standing: ApiStanding): StandingRow {
	return {
		pos: standing.pos,
		team: standing.team,
		muni: standing.municipality ?? '',
		jj: standing.jj,
		jg: standing.jg,
		jp: standing.jp,
		ave: standing.ave,
		dif: standing.dif,
		streak: standing.streak,
		zone: standing.zone
	};
}

export interface PortalFilters {
	sport?: string;
	state?: string;
}

export async function getPortalData(filters: PortalFilters = {}): Promise<PortalData> {
	if (!LARAVEL_API_URL) {
		return placeholders(filters);
	}

	try {
		const [sportsResponse, statesResponse] = await Promise.all([
			apiGet<ApiCollection<ApiSport>>('/v1/sports'),
			apiGet<ApiCollection<ApiState>>('/v1/states')
		]);

		const sports =
			sportsResponse.data.length > 0
				? sportsResponse.data
						.slice()
						.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
						.map(mapSport)
				: fallbackSports;
		const states = statesResponse.data.map(mapState);
		const selectedSport =
			sports.find((sport) => sport.slug === filters.sport) ??
			sports.find((sport) => sport.slug === 'softbol') ??
			sports[0];
		const selectedState =
			states.find((state) => state.code === filters.state) ??
			states.find((state) => state.code === 'VE-K') ??
			states[0];

		const params = new URLSearchParams();

		if (selectedSport) {
			params.set('sport', selectedSport.slug);
		}

		if (selectedState) {
			params.set('state', selectedState.code);
		}

		const stateParams = new URLSearchParams();

		if (selectedState) {
			stateParams.set('state', selectedState.code);
		}

		const query = params.toString();
		const stateQuery = stateParams.toString();

		const [gamesResponse, standingsResponse, stadiumsResponse] = await Promise.all([
			apiGet<ApiPaginated<ApiGame>>(`/v1/games?per_page=50${query ? `&${query}` : ''}`),
			apiGet<ApiCollection<ApiStanding>>(`/v1/standings?${query}`),
			apiGet<ApiCollection<ApiStadium>>(`/v1/stadiums?${stateQuery}`)
		]);

		const standingRows = standingsResponse.data.map(mapStanding);

		return {
			games: gamesResponse.data.map(mapGame),
			selectedSport: selectedSport?.slug ?? '',
			selectedState: selectedState?.code ?? '',
			sports,
			standings: { chata: [], modificado: standingRows },
			states,
			stadiums: stadiumsResponse.data.map(mapStadium),
			source: 'api'
		};
	} catch (error) {
		console.warn('[portal] No se pudo consultar la API Laravel, usando placeholders.', error);
		return placeholders(filters);
	}
}
