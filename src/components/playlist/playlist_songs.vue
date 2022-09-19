<template>
    <!-- 歌单歌曲列表 -->
    <div v-if="playlist_songs.if_show" class="playlist">
        <!-- 顶部功能 -->
        <div class="playlist_top">
            <div class="left_element">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofanganniu"></use>
                </svg>
                <span class="bold">播放全部</span>
                <span class="playlist_count">(共{{playlist_songs.data.length}}首)</span>
            </div>
            <div class="right_element">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao"></use>
                </svg>
                <span>收藏</span>
            </div>
        </div>
        <!-- 歌曲信息 -->
        <div class="playlist_songs">
            <div class="item" v-for="(item,i) in playlist_songs.data">
                <div class="info" @click="playsongs(i)">
                    <div class="left_item">
                        <div class="count">{{i+1}}</div>
                        <div class="song_info">
                            <div class="song_name">{{item.name}}
                            </div>
                            <div class="song_singer">
                                <span v-for="(singer,j) in item.ar">{{singer.name}}
                                    <span v-if="item.ar.length>1 && j!==item.ar.length-1">/ </span></span>
                            </div>
                        </div>
                    </div>
                    <div class="right_item">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-31liebiao"></use>
                        </svg>
                    </div>
                </div>
                <div class="line"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted, reactive } from 'vue'
import { useRoute } from "vue-router"
import _store from '@/store'
import { get_playlist_songs } from '@/requests/request.js'

export default {
    setup() {
        // 路由中获取歌单id
        const id = useRoute().query.id;
        const playlist_songs = reactive({ data: [''], if_show: false });
        onMounted(async () => {
            let res = await get_playlist_songs(id);
            playlist_songs.data = res.data.songs;
            playlist_songs.if_show = true;
        });
        // 点击歌曲播放，获取歌曲信息
        function playsongs(i) {
            let data = [];
            playlist_songs.data.map(item => {
                data.push({
                    artist: item.ar,
                    id: item.id,
                    name: item.name,
                    picUrl: item.al.picUrl
                })
            })
            _store.commit('change_playlist', { playlist: data, index: i });
        }
        // console.log(playlist_songs);
        return { playlist_songs, playsongs };
    }
}

</script>
<style lang="less" scoped>
.playlist {
    width: 100%;
    height: 100%;
    margin-top: 0.3rem;
    border-radius: 0.6rem;
    background-color: white;

    // position: sticky;

    .playlist_songs {
        width: 100%;

        .item {
            width: 100%;

            .info {
                display: flex;
                align-items: center;

                .right_item {
                    display: flex;
                    width: 30%;
                    justify-content: flex-end;
                    position: relative;
                    right: 0.2rem;
                    bottom: 0.05rem;
                    align-items: center;

                    .icon {
                        width: 0.4rem;
                    }
                }

                .left_item {
                    display: flex;
                    align-items: center;
                    padding: 0.1rem;
                    padding-left: 0.08rem;
                    width: 80%;

                    .count {
                        width: 0.4rem;
                        text-align: center;
                        font-size: 0.3rem;
                        color: rgb(111, 111, 111);
                    }

                    .song_info {
                        margin-left: 0.3rem;
                        width: 80%;

                        .song_name {
                            font-size: 0.28rem;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }

                        .song_singer {
                            font-size: 0.2rem;
                            color: #999;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }

            .line {
                margin: 0 auto;
                width: 80%;
                border-top: 0.01rem solid hsla(0, 8%, 65%, 0.3);
            }
        }
    }

    .playlist_top {
        margin-top: 0.15rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.15rem;

        .left_element {
            width: 60%;
            display: flex;
            align-items: center;

            .bold {
                padding-left: 0.3rem;
                font-weight: bold;
            }

            .playlist_count {
                font-size: 0.2rem;
                color: #999;
            }

            .icon {
                fill: black;
            }
        }

        .right_element {
            width: 18%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 0.05rem;
            margin-right: 0.1rem;
            border-radius: 1rem;
            background-color: red;
            color: white;

            .icon {
                width: 0.3rem;
                fill: white;
            }

            span {
                margin-right: 0.1rem;
                font-size: 0.28rem;
            }
        }


    }
}
</style>