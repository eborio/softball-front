import type { SportOption } from '#lib/types';

const SPORT_EMOJIS: Record<string, string> = {
	baloncesto: '🏀',
	beisbol: '⚾',
	futsal: '⚽',
	softbol: '🥎'
};

export function sportEmoji(slug: string): string {
	return SPORT_EMOJIS[slug] ?? '🏅';
}

export const fallbackSports: SportOption[] = [
	{ emoji: sportEmoji('softbol'), id: 1, name: 'Softbol', slug: 'softbol' },
	{ emoji: sportEmoji('beisbol'), id: 2, name: 'Béisbol', slug: 'beisbol' },
	{ emoji: sportEmoji('futsal'), id: 3, name: 'Fútbol Sala', slug: 'futsal' },
	{ emoji: sportEmoji('baloncesto'), id: 4, name: 'Baloncesto', slug: 'baloncesto' }
];
