<template>
    <playlist_top />
    <!-- <playlist_songs /> -->
</template>

<script>

import playlist_top from '@/components/playlist/playlist_top.vue'
import playlist_songs from '@/components/playlist/playlist_songs.vue'
export default {
    name: 'PlaylistView',
    components: {
        playlist_top, playlist_songs
    }
}
</script>