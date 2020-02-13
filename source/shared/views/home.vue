<template>
  <div>
    <router-link to="/about">Go to About page</router-link>
    <header :users="users"></header>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Header from '../components/header/index.vue';

  export default {
    name: 'Home',
    metaInfo: {
      title: 'Vue SSR Simple Setup Home',
      meta: [
        { name: 'description', content: 'Home page description' }
      ]
    },
    components: {
      Header,
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
