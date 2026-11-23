import { defineEnvVars } from '@sveltejs/kit/env';

/**
 * Variables de entorno tipadas del portal.
 *
 * Se leen en el servidor desde `$app/env/private` y en el navegador desde
 * `$app/env/public`. Ver `.env.example`.
 */
export const variables = defineEnvVars({
	LARAVEL_API_URL: {
		description: 'Base URL de la API Laravel usada en el servidor (ej. http://localhost:8000/api).',
		schema: (value) => value ?? ''
	},
	PUBLIC_API_BASE_URL: {
		public: true,
		description: 'Base URL pública de la API Laravel para llamadas desde el navegador.',
		schema: (value) => value ?? ''
	}
});
