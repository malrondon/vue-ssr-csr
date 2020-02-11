<template lang="html">
	<header class="header">
    <router-link class="header-link" to="/"><img class="header-logo" src="~images/logo.png" alt="Logo" />
      <div class="header-name">
        <h3 class="header-title">Site Name</h3>
        <div class="header-subtitle">$ts("site_subtitle")</div>
      </div>
    </router-link>
  </header>
</template>

<style lang="scss">
.header {
	padding: 1rem;
	font-size: 1.5rem;
	background-color: whitesmoke;
	&-link {
		color: black;
	}
	&-logo {
		vertical-align: middle;
		width: 2.5rem;
		margin-right: 0.5rem;
	}
	&-name,
	&-subtitle {
		display: inline-block;
	}
	&-name {
		vertical-align: middle;
		margin-right: 0.5rem;
	}
	&-title {
		margin-right: 0.5rem;
	}
}
</style>

<script>
export default {
	name: "Header"
}
</script>
