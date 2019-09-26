<template>
  <div id="app">
    <div class="navbar" id="nav">
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