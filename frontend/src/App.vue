<template>
  <div id="app">
    
    <div class="navbar">
        <router-link class="title" onclick="window.location.href='home'">NHL Stats</router-link>
        <div class="items">
            <router-link class="item" to='home' active>Home</router-link>
            <router-link class="item" to='demo'>Demo</router-link>
            <router-link class="item" to='doku'>Doku</router-link>
            <router-link class="item" to='github'>GitHub</router-link>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>