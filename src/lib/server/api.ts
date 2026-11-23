import { LARAVEL_API_URL } from '$app/env/private';

export { LARAVEL_API_URL };

export class ApiError extends Error {
	constructor(
		public status: number,
		public payload: unknown
	) {
		super(`API respondió con ${status}`);
		this.name = 'ApiError';
	}
}

/**
 * Fetch tipado hacia la API Laravel. Solo se usa en el servidor, por lo que
 * puedes enviar tokens privados sin exponerlos al navegador.
 */
export async function apiGet<T>(path: string, token?: string): Promise<T> {
	const response = await fetch(`${LARAVEL_API_URL}${path}`, {
		headers: {
			Accept: 'application/json',
			...(token ? { Authorization: `Bearer ${token}` } : {})
		}
	});

	const isJson = response.headers.get('content-type')?.includes('application/json');
	const payload: unknown = isJson ? ((await response.json()) as unknown) : await response.text();

	if (!response.ok) {
		throw new ApiError(response.status, payload);
	}

	return payload as T;
}
