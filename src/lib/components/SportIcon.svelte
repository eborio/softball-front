<script lang="ts">
	import type { SportOption } from '#lib/types';

	let { size = 'w-6 h-6', sport }: { size?: string; sport?: SportOption } = $props();
</script>

<span class="leading-none {size === 'w-6 h-6' ? 'text-xl' : 'text-base'}">
	{sport?.emoji ?? '🏅'}
</span>
