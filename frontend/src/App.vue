<template>
  <div id="app">
    <div
      class="navbar"
      :style="`${brightNavbarRoutes.includes($route.path) && 'background: rgba(0, 0, 0, 0.6)'}`"
      id="nav"
    >
      <router-link class="title" to="home">NHL Stats</router-link>

      <div class="items">
        <router-link to="home">Home</router-link>
        <router-link to="demo">Demo</router-link>
        <router-link to="doku">Dokumentation</router-link>
        <a
          target="_blank"
          href="https://github.com/TimoScheuermann/Advanced-DB-Cassandra"
        >GitHub Repo</a>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      brightNavbarRoutes: ["/home", "/doku"]
    };
  },
  mounted() {
    /*document.addEventListener("scroll", function() {
      if (this.brightNavbarRoutes.includes(this.$route.path)) {
        document.getElementById("nav").style.background = `rgba(0,0,0,${
          window.scrollY > 370 ? "0.75" : "0.25"
        }`;
      }
    });*/
  }
};
</script>