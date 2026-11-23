import { LARAVEL_API_URL } from '$app/env/private';
import { apiGet } from './api';
import {
	games as placeholderGames,
	standings as placeholderStandings,
	stadiums as placeholderStadiums
} from '#lib/data/placeholders';
import type { Game, PortalData, Stadium, StandingRow, StandingsCategory } from '#lib/types';

function placeholders(): PortalData {
	return {
		games: placeholderGames,
		standings: placeholderStandings,
		stadiums: placeholderStadiums,
		source: 'placeholder'
	};
}

/**
 * Punto único de carga de datos del portal.
 *
 * Mientras `LARAVEL_API_URL` no esté definida se devuelven los placeholders del
 * prototipo. Al definirla, se consultan los endpoints de Laravel.
 *
 * TODO: ajustar las rutas y los DTO a los recursos reales de la API Laravel
 * (`/games`, `/standings`, `/stadiums`, etc.) cuando estén disponibles.
 */
export async function getPortalData(): Promise<PortalData> {
	if (!LARAVEL_API_URL) {
		return placeholders();
	}

	try {
		const [games, standings, stadiums] = await Promise.all([
			apiGet<Game[]>('/games'),
			apiGet<Record<StandingsCategory, StandingRow[]>>('/standings'),
			apiGet<Stadium[]>('/stadiums')
		]);

		return { games, standings, stadiums, source: 'api' };
	} catch (error) {
		console.warn('[portal] No se pudo consultar la API Laravel, usando placeholders.', error);
		return placeholders();
	}
}
