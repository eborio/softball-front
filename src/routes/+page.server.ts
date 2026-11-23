import type { PageServerLoad } from './$types';
import { getPortalData } from '#lib/server/repository';

export const load: PageServerLoad = async () => {
	return { portal: await getPortalData() };
};
