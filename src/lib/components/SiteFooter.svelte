<script lang="ts">
	import { app } from '#lib/stores/app.svelte';
</script>

<footer
	class="theme-surface border-t theme-border mt-12 py-6 px-4 sm:px-6 text-xs theme-text-secondary"
>
	<div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
		<div class="flex items-center gap-2">
			<span class="font-bold text-sm">{app.config.footer}</span>
			<span>•</span>
			<span>Infraestructura abierta para ligas locales</span>
		</div>
		<div class="flex flex-wrap items-center gap-4">
			<span>Softbol • Béisbol • Fútbol Sala • Baloncesto</span>
			<span class="px-2.5 py-1 rounded-lg theme-elevated border theme-border font-semibold">
				Prototipo UI/UX v1.0
			</span>
		</div>
	</div>
</footer>
