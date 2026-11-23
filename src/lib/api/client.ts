import { PUBLIC_API_BASE_URL } from '$app/env/public';

/**
 * Cliente HTTP para consumir la API Laravel desde el navegador.
 * Configura `PUBLIC_API_BASE_URL` en tu `.env` (por ejemplo
 * `http://localhost:8000/api`) para apuntar al backend.
 */
export const API_BASE_URL = PUBLIC_API_BASE_URL;

export class ApiError extends Error {
	constructor(
		public status: number,
		public payload: unknown
	) {
		super(`API respondió con ${status}`);
		this.name = 'ApiError';
	}
}

export interface ApiRequestOptions extends RequestInit {
	token?: string;
}

export async function apiFetch<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
	const { token, headers, ...rest } = options;
	const response = await fetch(`${API_BASE_URL}${path}`, {
		...rest,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...headers
		}
	});

	const isJson = response.headers.get('content-type')?.includes('application/json');
	const payload: unknown = isJson ? ((await response.json()) as unknown) : await response.text();

	if (!response.ok) {
		throw new ApiError(response.status, payload);
	}

	return payload as T;
}
