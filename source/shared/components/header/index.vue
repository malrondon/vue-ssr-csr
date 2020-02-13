<template>
  <header class="header">
    <router-link class="header-link" to="/"><img class="header-logo" src="~images/logo.png" alt="Logo" />
      <div class="header-name">
        <h3 class="header-title">Site Name</h3>
        <div class="header-subtitle">$ts("site_subtitle")</div>
      </div>
    </router-link>
     <ul>
      <li v-for="user in users" :key="user.id">{{user.name}} {{user.lastname}}</li>
    </ul>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      users: {
        type: Array,
        required: true
      }
    },
  };
</script>
