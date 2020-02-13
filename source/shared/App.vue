<template>
  <div>
    <div class="links">
      <router-link to="/" class="link">Main</router-link>
      <router-link to="/about" class="link">About</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style>
.links {
  margin: 16px 0 56px;
}
.link {
  border: 1px solid rgba(65, 86, 255, 0.79);
  padding: 8px;
  color: #394fcc;
  text-decoration: none;
}
</style>
