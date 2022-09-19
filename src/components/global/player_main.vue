<template>
    <!-- 播放详情页面 -->
    <div class="player">
        <img class="bg" :src="playlist[playlist_index].picUrl" />
        <!-- 下拉图标/分享 -->
        <div class="header">
            <div class="left_element">
                <svg class="icon" aria-hidden="true" @click="change_show_detail">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
            <div class="right_element">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
            </div>
        </div>
        <!-- 封面 -->
        <div class="middle">
            <img class="cover_art" :src="playlist[playlist_index].picUrl" />
        </div>
        <!-- 歌曲信息和歌词 -->
        <div class="song_info">
            <div class="song_name">
                <span>{{playlist[playlist_index].name}}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-aixin"></use>
                </svg>
            </div>
            <div class="artist_name">
                <span v-for="(singer,j) in playlist[playlist_index].artist">
                    {{singer.name}}
                    <span
                        v-if="playlist[playlist_index].artist.length>1 && j!==playlist[playlist_index].artist.length-1">/
                    </span>
                </span>
            </div>
            <div class="lyrics">
                <span>{{current_lyric}}</span>
            </div>
        </div>
        <!-- 功能按钮 -->
        <div class="func">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yinlechangpian"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao-"></use>
            </svg>
        </div>
        <!-- 进度条 -->
        <div class="progress_bar">
            <van-slider v-model="current_progress" @change="change_progress" bar-height="2px" button-size="10px"
                active-color="#ee0a24" inactive-color="#5F5F5F" />
            <div class="song_time">
                <span>{{current_time.min}}:{{current_time.sec}}</span>
                <span>{{duration.min}}:{{duration.sec}}</span>
            </div>
        </div>
        <!-- 底部功能按钮 -->
        <div class="func_footer">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xunhuan"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="up">
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <svg v-show="!playing" class="icon-play" aria-hidden="true" @click="play_pause">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg v-show="playing" class="icon-play" aria-hidden="true" @click="play_pause">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="next">
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import player_footer from '@/components/global/player_footer.vue'

export default {
    computed: {
        ...mapState(['playlist', 'playlist_index', 'playing', 'show_detail', 'current_lyric', 'current_progress', 'current_time', 'duration'])
    },
    methods: {
        // 是否显示该页面
        change_show_detail: function () {
            this.$store.commit('change_show_detail');
        },
        // 播放/暂停
        play_pause: function () {
            this.$store.commit('change_playing_state');
        },
        // 上一曲
        up: function () {
            this.$store.commit('up');
        },
        // 下一曲
        next: function () {
            this.$store.commit('down');
        },
        // 拖动进度条
        change_progress: function (value) {
            // console.log(value);
            this.$store.commit('change_progress', value);
        }
    }
}
</script>
<style lang="less" scoped>
.player {
    width: 100%;
    height: 100%;
    position: fixed;

    .progress_bar {
        margin-top: 1rem;
        padding-left: 0.7rem;
        padding-right: 0.7rem;

        .song_time {
            display: flex;
            justify-content: space-between;
            font-size: 0.15rem;
            padding-top: 0.1rem;
            filter: invert(0.45);
            mix-blend-mode: difference;
        }
    }

    .func_footer {
        display: flex;
        justify-content: space-around;
        margin-top: 1rem;
        align-items: center;
        filter: invert(0.45);
        mix-blend-mode: difference;

        .icon {
            width: 0.5rem;
            height: 0.5rem;
        }

        .icon-play {
            width: 1rem;
            height: 1rem;
        }
    }

    .func {
        display: flex;
        justify-content: space-around;
        margin-top: 1.2rem;
        filter: invert(0.5);
        mix-blend-mode: difference;

        .icon {
            width: 0.5rem;
            height: 0.5rem;
        }
    }

    .song_info {
        padding-left: 0.72rem;
        width: 100%;
        height: 11%;

        .song_name {
            filter: invert(0.5);
            mix-blend-mode: difference;
            display: flex;
            align-items: center;
            font-weight: 600;
            font-size: 0.35rem;

            span {
                width: 80%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .icon {
                position: fixed;
                margin-left: 5.5rem;
            }
        }

        .artist_name {
            width: 100%;
            margin-top: 0.5rem;
            font-size: 0.25rem;
            mix-blend-mode: difference;
            filter: invert(0.4);
        }

        .lyrics {
            font-size: 0.23rem;
            margin-top: 0.5rem;
            mix-blend-mode: difference;
            filter: invert(0.4);
            display: flex;

            span {
                width: 80%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

    .middle {
        width: 100%;
        display: flex;
        margin-top: 0.5rem;
        margin-bottom: 0.8rem;

        .cover_art {
            width: 6rem;
            height: 6rem;
            border-radius: 5%;
            margin: 0 auto;
        }
    }

    .bg {
        width: 100%;
        height: 100%;
        z-index: -1;
        position: absolute;
        filter: blur(40px);
        transform: scale(4);
        overflow: hidden;
    }

    .header {
        display: flex;
        height: 1.5rem;
        padding-top: 0.2rem;
        padding-left: 0.3rem;
        filter: invert(0.45);
        mix-blend-mode: difference;

        .left_element {
            display: flex;
            width: 100%;

            .icon {
                margin-top: 0.3rem;
                height: 0.45rem;
                transform: rotate(90deg);
                filter: invert(100%);
            }
        }

        .right_element {
            padding-right: 0.5rem;

            .icon {
                margin-top: 0.3rem;
                width: 0.4rem;
            }
        }
    }
}
</style>