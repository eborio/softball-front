import type { Game, Stadium, StandingRow, StandingsCategory } from '#lib/types';

/**
 * Datos de ejemplo (placeholders) portados desde el prototipo UI/UX.
 * Se reemplazan por las respuestas de la API Laravel en
 * `$lib/server/repository.ts` sin tocar los componentes.
 */
export const games: Game[] = [
	{
		id: 1,
		league: 'Torneo Nocturno Chino Canónico',
		stadium: "Estadio Daniel 'Chino' Canónico",
		municipality: 'Barquisimeto',
		status: 'live',
		statusText: '5to Alta • 1 Out',
		away: {
			name: 'Cardenales de Bqto',
			abbr: 'CB',
			color: 'bg-red-600 text-white',
			r: 5,
			h: 7,
			e: 1
		},
		home: {
			name: 'Guaros Softbol Club',
			abbr: 'GS',
			color: 'bg-amber-500 text-slate-950',
			r: 4,
			h: 6,
			e: 0
		},
		highlight: 'Al bate: J. Pérez (2-2, HR, 2 CI)'
	},
	{
		id: 2,
		league: 'Liga Libre Fundalara',
		stadium: 'Complejo Fundalara (Campo 1)',
		municipality: 'Barquisimeto',
		status: 'live',
		statusText: '6to Baja • 2 Outs',
		away: {
			name: 'Titanes del Obelisco',
			abbr: 'TO',
			color: 'bg-blue-600 text-white',
			r: 3,
			h: 5,
			e: 2
		},
		home: {
			name: 'Cabudare All-Stars',
			abbr: 'CA',
			color: 'bg-emerald-600 text-white',
			r: 6,
			h: 9,
			e: 1
		},
		highlight: 'Lanzando: M. Rodríguez (5.2 IP, 4 K)'
	},
	{
		id: 3,
		league: 'Copa Carora Master',
		stadium: 'Estadio Antonio Herrera Gutiérrez',
		municipality: 'Carora',
		status: 'live',
		statusText: '4to Alta • 0 Outs',
		away: {
			name: 'Bravos de Carora',
			abbr: 'BC',
			color: 'bg-orange-600 text-white',
			r: 8,
			h: 10,
			e: 0
		},
		home: {
			name: 'Toros de Torres',
			abbr: 'TT',
			color: 'bg-purple-600 text-white',
			r: 7,
			h: 8,
			e: 1
		},
		highlight: 'Duelo de bateo: 18 hits combinados'
	},
	{
		id: 4,
		league: 'Liga Libre Fundalara',
		stadium: 'Campo Softbol UCLA',
		municipality: 'Barquisimeto',
		status: 'final',
		statusText: 'Finalizado (7 Inn)',
		away: {
			name: 'Quíbor Valle BBC',
			abbr: 'QV',
			color: 'bg-teal-600 text-white',
			r: 2,
			h: 4,
			e: 1
		},
		home: {
			name: 'Ingenieros UCLA',
			abbr: 'IU',
			color: 'bg-indigo-600 text-white',
			r: 5,
			h: 8,
			e: 0
		},
		highlight: 'PG: C. Alvarado • PP: R. Mendoza'
	}
];

export const standings: Record<StandingsCategory, StandingRow[]> = {
	modificado: [
		{
			pos: 1,
			team: 'Cardenales de Bqto',
			muni: 'Iribarren',
			jj: 12,
			jg: 10,
			jp: 2,
			ave: '.833',
			dif: '-',
			streak: 'G4',
			zone: 'playoff'
		},
		{
			pos: 2,
			team: 'Cabudare All-Stars',
			muni: 'Palavecino',
			jj: 12,
			jg: 9,
			jp: 3,
			ave: '.750',
			dif: '1.0',
			streak: 'G2',
			zone: 'playoff'
		},
		{
			pos: 3,
			team: 'Guaros Softbol Club',
			muni: 'Iribarren',
			jj: 12,
			jg: 8,
			jp: 4,
			ave: '.667',
			dif: '2.0',
			streak: 'P1',
			zone: 'playoff'
		},
		{
			pos: 4,
			team: 'Bravos de Carora',
			muni: 'Torres',
			jj: 11,
			jg: 6,
			jp: 5,
			ave: '.545',
			dif: '3.5',
			streak: 'G1',
			zone: 'playoff'
		},
		{
			pos: 5,
			team: 'Ingenieros UCLA',
			muni: 'Iribarren',
			jj: 12,
			jg: 5,
			jp: 7,
			ave: '.417',
			dif: '5.0',
			streak: 'P2',
			zone: 'wildcard'
		},
		{
			pos: 6,
			team: 'Titanes del Obelisco',
			muni: 'Iribarren',
			jj: 11,
			jg: 3,
			jp: 8,
			ave: '.273',
			dif: '6.5',
			streak: 'P3',
			zone: 'out'
		},
		{
			pos: 7,
			team: 'Quíbor Valle BBC',
			muni: 'Jiménez',
			jj: 12,
			jg: 2,
			jp: 10,
			ave: '.167',
			dif: '8.0',
			streak: 'P4',
			zone: 'out'
		}
	],
	chata: [
		{
			pos: 1,
			team: 'Los Panas del Este',
			muni: 'Iribarren',
			jj: 10,
			jg: 9,
			jp: 1,
			ave: '.900',
			dif: '-',
			streak: 'G6',
			zone: 'playoff'
		},
		{
			pos: 2,
			team: 'Deportivo La Piedad',
			muni: 'Palavecino',
			jj: 10,
			jg: 7,
			jp: 3,
			ave: '.700',
			dif: '2.0',
			streak: 'G1',
			zone: 'playoff'
		},
		{
			pos: 3,
			team: 'Repuestos Lara Soft',
			muni: 'Iribarren',
			jj: 10,
			jg: 6,
			jp: 4,
			ave: '.600',
			dif: '3.0',
			streak: 'P1',
			zone: 'playoff'
		},
		{
			pos: 4,
			team: 'Atlético El Obelisco',
			muni: 'Iribarren',
			jj: 10,
			jg: 5,
			jp: 5,
			ave: '.500',
			dif: '4.0',
			streak: 'G2',
			zone: 'playoff'
		},
		{
			pos: 5,
			team: 'Unión Tamaca',
			muni: 'Iribarren',
			jj: 10,
			jg: 2,
			jp: 8,
			ave: '.200',
			dif: '7.0',
			streak: 'P5',
			zone: 'out'
		}
	]
};

export const stadiums: Stadium[] = [
	{
		name: "Estadio Daniel 'Chino' Canónico",
		municipality: 'Iribarren',
		sector: 'Av. Libertador, Barquisimeto',
		status: 'Óptimo',
		statusColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
		lights: 'Torres LED Nocturnas Activas',
		turf: 'Grama Natural / Arcilla',
		gamesToday: 3,
		nextGame: 'Hoy 8:30 PM • Final Nocturno'
	},
	{
		name: 'Complejo Deportivo Fundalara',
		municipality: 'Iribarren',
		sector: 'Urbanización Fundalara, Este',
		status: 'Óptimo',
		statusColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
		lights: 'Iluminación Operativa (3 Campos)',
		turf: 'Grama Natural',
		gamesToday: 5,
		nextGame: 'Hoy 7:45 PM • Liga Libre'
	},
	{
		name: 'Estadio de Softbol El Obelisco',
		municipality: 'Iribarren',
		sector: 'Redoma El Obelisco, Oeste',
		status: 'En Mantenimiento',
		statusColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
		lights: 'Iluminación Parcial',
		turf: 'Tierra / Arcilla Nivelada',
		gamesToday: 0,
		nextGame: 'Sábado 9:00 AM • Copa Oeste'
	},
	{
		name: 'Estadio Municipal de Cabudare',
		municipality: 'Palavecino',
		sector: 'Casco Central, Cabudare',
		status: 'Óptimo',
		statusColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
		lights: 'Iluminación Nocturna Activa',
		turf: 'Grama Natural',
		gamesToday: 2,
		nextGame: 'Hoy 8:00 PM • Torneo Palavecino'
	},
	{
		name: 'Complejo Deportivo Carora',
		municipality: 'Torres',
		sector: 'Zona Industrial, Carora',
		status: 'Lluvia Reciente',
		statusColor: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
		lights: 'Torres Activas',
		turf: 'Drenaje en revisión (Infield húmedo)',
		gamesToday: 2,
		nextGame: 'En curso (Demora de 15 min)'
	},
	{
		name: 'Campo Deportivo UCLA (Decanato)',
		municipality: 'Iribarren',
		sector: 'Av. Las Industrias, Barquisimeto',
		status: 'Óptimo',
		statusColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
		lights: 'Solo Juegos Diurnos / Vespertinos',
		turf: 'Grama Natural',
		gamesToday: 2,
		nextGame: 'Mañana 2:00 PM • Liga Universitaria'
	}
];
