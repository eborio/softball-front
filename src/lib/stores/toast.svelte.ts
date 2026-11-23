class ToastStore {
	message = $state('');
	visible = $state(false);

	#timer: ReturnType<typeof setTimeout> | undefined;

	show(message: string, duration = 3200) {
		this.message = message;
		this.visible = true;
		clearTimeout(this.#timer);
		this.#timer = setTimeout(() => {
			this.visible = false;
		}, duration);
	}
}

export const toast = new ToastStore();
