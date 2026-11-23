import type { Brand, Estado, Sport, TabId, Theme } from '#lib/types';

export const sports: Sport[] = ['Softbol', 'Beisbol', 'Futsal', 'Baloncesto'];
export const estados: Estado[] = ['Lara', 'Zulia', 'Carabobo'];

export const sportEmojis: Record<Sport, string> = {
	Softbol: '🥎',
	Beisbol: '⚾',
	Futsal: '⚽',
	Baloncesto: '🏀'
};

export const sportNames: Record<Sport, string> = {
	Softbol: 'Softbol',
	Beisbol: 'Béisbol',
	Futsal: 'Fútbol Sala',
	Baloncesto: 'Baloncesto'
};

export const estadoLabels: Record<Estado, string> = {
	Lara: 'Estado Lara',
	Zulia: 'Estado Zulia (Próximamente)',
	Carabobo: 'Estado Carabobo (Próximamente)'
};

export interface BrandConfig {
	titleMain: string;
	titleAccent: string;
	subtitle: string;
	footer: string;
	icon: 'pin' | 'roster';
}

export const brandConfig: Record<Brand, BrandConfig> = {
	punto: {
		titleMain: 'Punto',
		titleAccent: 'Deportivo',
		subtitle: 'Portal Abierto • El Punto de Encuentro del Deporte',
		footer: 'PuntoDeportivo Venezuela',
		icon: 'pin'
	},
	roster: {
		titleMain: 'Roster',
		titleAccent: 'Deportivo',
		subtitle: 'Gestión Inteligente de Ligas, Equipos y Estadísticas',
		footer: 'RosterDeportivo SaaS Venezuela',
		icon: 'roster'
	}
};

export const themeNames: Record<Theme, string> = {
	stadium: 'Noche de Estadio (Dark)',
	saas: 'SaaS Profesional (Light)',
	guaro: 'Guaro Sport (Atardecer Lara)'
};

class AppState {
	brand = $state<Brand>('punto');
	theme = $state<Theme>('stadium');
	activeTab = $state<TabId>('live');
	selectedState = $state<Estado>('Lara');
	selectedSport = $state<Sport>('Softbol');

	config = $derived(brandConfig[this.brand]);
	themeLabel = $derived(themeNames[this.theme]);

	setBrand(brand: Brand) {
		this.brand = brand;
	}

	setTheme(theme: Theme) {
		this.theme = theme;
	}

	switchTab(tab: TabId) {
		this.activeTab = tab;
	}

	setState(estado: Estado) {
		this.selectedState = estado;
	}

	setSport(sport: Sport) {
		this.selectedSport = sport;
	}
}

export const app = new AppState();
