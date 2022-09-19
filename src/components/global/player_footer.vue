<template>
    <!-- 下方主播放器 -->
    <div v-show="show_footer" class="player_footer">
        <!-- 封面 名字 -->
        <div class="left_element" @click="change_show_detail">
            <img :src="playlist[playlist_index].picUrl" />
            <div class="song_info">
                <span class="song_name">{{playlist[playlist_index].name}}</span>
                <span> - </span>
                <span class="artist_name" v-for="(singer,j) in playlist[playlist_index].artist">
                    {{singer.name}}
                    <span
                        v-if="playlist[playlist_index].artist.length>1 && j!==playlist[playlist_index].artist.length-1">/
                    </span></span>
            </div>
        </div>
        <!-- 暂停/功能按钮 -->
        <div class="right_element">
            <svg v-show="!playing" class="icon" aria-hidden="true" @click="play_pause">
                <use xlink:href="#icon-bofanganniu"></use>
            </svg>
            <svg v-show="playing" class="icon" aria-hidden="true" @click="play_pause">
                <use xlink:href="#icon-weibiaoti--"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
        <!-- 播放音频 -->
        <audio ref="player"
            :src="`https://music.163.com/song/media/outer/url?id=${playlist[playlist_index].id}.mp3`"></audio>
        <van-popup v-model:show="show_detail" position="bottom" :style="{height:'100%'}">
            <player_main></player_main>
        </van-popup>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import player_main from '@/components/global/player_main.vue'
import { get_lyrics } from '@/requests/request.js'
export default {
    computed: {
        ...mapState(['playlist', 'playlist_index', 'playing', 'show_detail', 'current_progress', 'current_progress_change', 'show_footer']),
    },
    created: function () {
        setInterval(() => {
            this.$store.commit('change_current_time', { time: this.$refs.player.currentTime * 1000, duration: this.$refs.player.duration * 1000 });
        }, 1000);
    },
    methods: {
        // 播放/暂停按钮功能
        play_pause: function () {
            if (this.playing) {
                this.$refs.player.pause();
                this.$store.commit('change_playing_state')
            } else {
                this.$refs.player.play();
                this.$store.commit('change_playing_state')
            }
        },
        change_show_detail: function () {
            this.$store.commit('change_show_detail')
        }
    },
    watch: {
        // 歌单变动，刷新播放器
        playlist: function () {
            this.$refs.player.autoplay = true;
            if (!this.playing) {
                this.$store.commit('change_playing_state')
            }
            // console.log(this.playing);
            // 获取歌词
            get_lyrics(this.playlist[this.playlist_index].id).then(res => {
                // 分句，解析内容
                res = res.data.lrc.lyric.split('\n');
                res = res.splice(0, res.length - 1);
                res = res.map((line) => {
                    // console.log(line);
                    if (line != '') {
                        let temp = line.match(/^\[(\d{2}):(\d{2})\.(\d*)\](.*)/);
                        // console.log(temp);
                        return {
                            time: temp[1] * 60 * 1000 + temp[2] * 1000 + temp[3] * 1,
                            text: temp[4].trim()
                        };
                    }
                });
                this.$store.commit('add_lyrics', res);
            });
        },
        // 播放状态改变，刷新播放器
        playing: function () {
            if (this.playing) {
                this.$refs.player.play();
            } else {
                this.$refs.player.pause();
            }
        },
        // 播放歌曲内容改变，刷新播放器
        playlist_index: function () {
            this.$refs.player.autoplay = true;
            if (!this.playing) {
                this.$store.commit('change_playing_state');
            }
            // 获取歌词
            get_lyrics(this.playlist[this.playlist_index].id).then(res => {
                res = res.data.lrc.lyric.split('\n');
                res = res.splice(0, res.length - 1);
                res = res.map((line) => {
                    // console.log(line);
                    if (line != '') {
                        let temp = line.match(/^\[(\d{2}):(\d{2})\.(\d*)\](.*)/);
                        // console.log(temp);
                        return {
                            time: temp[1] * 60 * 1000 + temp[2] * 1000 + temp[3] * 1,
                            text: temp[4].trim()
                        };
                    }
                });
                this.$store.commit('add_lyrics', res);
            });
        },
        // 检测到进度条拖动
        current_progress_change: function () {
            this.$refs.player.currentTime = this.current_progress * this.$refs.player.duration / 100;
            // console.log(this.$refs.player.currentTime);
        }
    }
}
</script>

<style lang="less" scoped>
.player_footer {
    width: 100%;
    height: 1rem;
    position: fixed;
    border-top: 1px solid rgba(184, 168, 168, 0.6);
    bottom: 0;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem;

    .left_element {
        display: flex;
        align-items: center;
        width: 80%;

        img {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 15%;
            // border: 0.1rem solid black;
        }

        .song_info {
            margin-left: 0.2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;

            .song_name {
                font-size: 0.28rem;
            }

            .artist_name {
                font-size: 0.25rem;
                color: #999;
            }
        }
    }

    .right_element {
        width: 20%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

}
</style>