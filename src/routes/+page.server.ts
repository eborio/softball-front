import type { PageServerLoad } from './$types';
import { getPortalData } from '#lib/server/repository';

export const load: PageServerLoad = async ({ url }) => {
	return {
		portal: await getPortalData({
			sport: url.searchParams.get('sport') ?? undefined,
			state: url.searchParams.get('state') ?? undefined
		})
	};
};
