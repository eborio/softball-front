export type ApiGameStatus = 'scheduled' | 'live' | 'final';
export type ApiInningHalf = 'alta' | 'baja';
export type ApiStandingZone = 'playoff' | 'wildcard' | 'out';

export interface ApiCollection<T> {
	data: T[];
}

export interface ApiPaginated<T> {
	data: T[];
	links: {
		first: string | null;
		last: string | null;
		prev: string | null;
		next: string | null;
	};
	meta: {
		current_page: number;
		last_page: number;
		per_page: number;
		total: number;
	};
}

export interface ApiTeamRef {
	id: number | null;
	name: string | null;
}

export interface ApiGameTeam {
	id: number | null;
	name: string | null;
	logo: string | null;
	runs: number;
	hits: number;
	errors: number;
}

export interface ApiGame {
	id: number;
	status: ApiGameStatus;
	starts_at: string | null;
	current_inning: number | null;
	current_half: ApiInningHalf | null;
	outs: number;
	highlight: string | null;
	league: ApiTeamRef;
	tournament: ApiTeamRef;
	stadium: {
		id: number;
		name: string;
		municipality: string | null;
	} | null;
	home: ApiGameTeam;
	visitor: ApiGameTeam;
}

export interface ApiSport {
	id: number;
	name: string;
	slug: string;
	emoji: string | null;
	order: number;
	status: boolean;
}

export interface ApiState {
	id: number;
	code: string;
	name: string;
	status: boolean;
}

export interface ApiStanding {
	pos: number;
	team_id: number;
	team: string;
	municipality: string | null;
	jj: number;
	jg: number;
	jp: number;
	ave: string;
	dif: string;
	streak: string;
	zone: ApiStandingZone;
}

export interface ApiStadium {
	id: number;
	name: string;
	municipality: string | null;
	state: string | null;
	sector: string | null;
	turf: string | null;
	lights: string | null;
	status: {
		id: number;
		slug: string;
		name: string;
		color: string;
	} | null;
	games_today: number;
	next_game_at: string | null;
}
