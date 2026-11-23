<script lang="ts">
	import { toast } from '#lib/stores/toast.svelte';
</script>

<div
	class="fixed bottom-5 right-5 z-50 transform transition-all duration-300 pointer-events-none max-w-sm {toast.visible
		? 'translate-y-0 opacity-100'
		: 'translate-y-24 opacity-0'}"
>
	<div
		class="bg-slate-900 text-white border border-slate-700 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-medium"
	>
		<span class="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"></span>
		<p>{toast.message}</p>
	</div>
</div>
