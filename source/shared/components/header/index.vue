<template>
  <header class="header">
    <h3>Header</h3>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} {{ user.lastname }}
      </li>
    </ul>
  </header>
</template>

<script>
  export default {
    name: 'TheHeader',
    props: {
      users: {
        type: Array,
        required: true
      }
    },
  };
</script>
