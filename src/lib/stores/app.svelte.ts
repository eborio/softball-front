import type { TabId } from '#lib/types';

export interface BrandConfig {
	titleMain: string;
	titleAccent: string;
	subtitle: string;
	footer: string;
	icon: 'pin' | 'roster';
}

export const brand: BrandConfig = {
	titleMain: 'Punto',
	titleAccent: 'Deportivo',
	subtitle: 'Portal Abierto • El Punto de Encuentro del Deporte',
	footer: 'PuntoDeportivo Venezuela',
	icon: 'pin'
};

class AppState {
	activeTab = $state<TabId>('live');

	config = brand;

	switchTab(tab: TabId) {
		this.activeTab = tab;
	}
}

export const app = new AppState();
