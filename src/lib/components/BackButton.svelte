<script>
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	function goBack() {
		if (history.length > 1) {
			history.back();
		} else {
			goto(resolve('/'));
		}
	}
</script>

<button onclick={goBack} class="hover:text-orange-500 font-bold cursor-pointer">
	← Back
</button>