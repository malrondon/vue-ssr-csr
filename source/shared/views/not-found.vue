<template>
  <div>
    <router-link to="/">Go to Home page</router-link>
    <h1>404 page</h1>
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
