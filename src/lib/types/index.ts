export type TabId = 'live' | 'standings' | 'stadiums' | 'scorer';

export interface StateOption {
	id: number;
	code: string;
	name: string;
}

export interface SportOption {
	id: number;
	name: string;
	slug: string;
	emoji: string;
}

export type GameStatus = 'live' | 'final' | 'scheduled';

export interface TeamScore {
	name: string;
	abbr: string;
	/** Tailwind classes for the team badge, e.g. `bg-red-600 text-white`. */
	color: string;
	/** Runs (carreras). */
	r: number;
	/** Hits (imparables). */
	h: number;
	/** Errors (pifias). */
	e: number;
}

export interface Game {
	id: number;
	league: string;
	stadium: string;
	municipality: string;
	status: GameStatus;
	statusText: string;
	away: TeamScore;
	home: TeamScore;
	highlight: string;
}

export type StandingsCategory = 'modificado' | 'chata';
export type StandingZone = 'playoff' | 'wildcard' | 'out';

export interface StandingRow {
	pos: number;
	team: string;
	muni: string;
	/** Juegos jugados. */
	jj: number;
	/** Juegos ganados. */
	jg: number;
	/** Juegos perdidos. */
	jp: number;
	/** Porcentaje de victorias, e.g. `.833`. */
	ave: string;
	/** Diferencia (juegos de diferencia). */
	dif: string;
	/** Racha, e.g. `G4` or `P1`. */
	streak: string;
	zone: StandingZone;
}

export interface Stadium {
	name: string;
	municipality: string;
	sector: string;
	status: string;
	/** Tailwind classes for the status pill. */
	statusColor: string;
	lights: string;
	turf: string;
	gamesToday: number;
	nextGame: string;
}

export type InningHalf = 'Alta' | 'Baja';
export type BattingSide = 'away' | 'home';

export interface ScorerState {
	battingTeam: BattingSide;
	outs: number;
	inningNum: number;
	inningHalf: InningHalf;
}

/**
 * Shape returned by the SvelteKit load function. Swap `source` to `'api'`
 * once the Laravel endpoints are wired in `$lib/server/repository.ts`.
 */
export interface PortalData {
	games: Game[];
	standings: Record<StandingsCategory, StandingRow[]>;
	stadiums: Stadium[];
	sports: SportOption[];
	states: StateOption[];
	selectedSport: string;
	selectedState: string;
	source: 'placeholder' | 'api';
}
