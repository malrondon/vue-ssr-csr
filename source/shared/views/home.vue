<template>
  <div>
    <router-link to="/about">Go to About page</router-link>
    <the-header :users="users" />
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import TheHeader from '../components/header/index.vue';

  export default {
    name: 'Home',
    metaInfo: {
      title: 'Vue SSR Simple Setup Home',
      meta: [
        { name: 'description', content: 'Home page description' }
      ]
    },
    components: {
      TheHeader,
    },
    computed: {
      ...mapGetters({
        users: 'users',
      })
    },
    serverPrefetch () {
      return this.getUsers();
    },
    mounted () {
      if (!this.users.length) {
        this.getUsers();
      }
    },
    methods: {
      getUsers () {
        return this.$store.dispatch('getUsers');
      }
    }
  };
</script>
