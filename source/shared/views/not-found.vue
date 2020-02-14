<template>
  <div>
    <router-link to="/">Home</router-link>
    <h1>404</h1>
  </div>
</template>
<script>
  export default {
    name: 'NotFound',
    metaInfo: {
      title: 'Not Found',
      meta: [
        { name: 'description', content: '404' }
      ]
    },
  };
</script>
