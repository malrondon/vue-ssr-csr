<template lang="html">
	<main class="view--notFound">
    <h1>404</h1>
    <p>Check the console: this page will return 404 if it is requested from the server</p>
    <router-link to="/">Go back to the homepage</router-link>
  </main>
</template>

<script>
export default {
	name: "NotFound",
	meta() {
		return {
			title: "Not Found",
			description: "Page was not found",
			httpStatusCode: 404
		}
	}
}
</script>
