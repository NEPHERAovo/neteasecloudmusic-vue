<template>
  <router-view />
  <router-view name="playlist_songs" />
  <player_footer />
</template>
<script>
import player_footer from '@/components/global/player_footer.vue'
export default {
  components: {
    player_footer
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.icon {
  width: 0.5rem;
  height: 0.5rem;
}

a {
  text-decoration: none;
  color: black;
}
</style>
