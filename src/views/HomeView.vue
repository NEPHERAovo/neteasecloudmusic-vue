<template>
  <tool_bar />
  <swipe />
  <func_list />
  <playlist />
  <my_playlist />
</template>

<script>
// @ is an alias to /src
import tool_bar from '@/components/home/tool_bar.vue'
import swipe from '@/components/home/swipe.vue'
import func_list from '@/components/home/func_list.vue'
import playlist from '@/components/home/playlist.vue'
import my_playlist from '@/components/home/my_playlist.vue'

export default {
  name: 'HomeView',
  components: {
    tool_bar, swipe, func_list, playlist, my_playlist
  }
}
</script>
