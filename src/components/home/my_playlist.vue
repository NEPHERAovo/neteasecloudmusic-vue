<template>
    <div v-if="playlists_info.status" class="playlist">
        <div class="playlist_title">
            <span class="playlist_title_text">收藏歌单</span>
            <!-- <span class="playlist_title_more">更多</span> -->
        </div>
        <div class="playlist_list">
            <van-swipe :loop="false" :width="133" class="playlist_swipe" :show-indicators="false">
                <van-swipe-item v-for="playlist in playlists_info.data">
                    <router-link :to="{path:'/playlist',query:{id:playlist.id}}">
                        <img :src="playlist.coverImgUrl" />
                        <span class="playlist_count">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-24gl-play"></use>
                            </svg>
                            {{playlist.playCount}}
                        </span>
                        <span class="playlist_name">{{playlist.name}}</span>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
import { get_myplaylists } from '@/requests/request.js'
import store from '@/store';
import { onMounted, reactive } from 'vue'
export default {
    setup() {
        const playlists_info = reactive({ data: [''], status: false });
        onMounted(async () => {
            await store.dispatch('check_login');
            playlists_info.status = store.state.is_login;
            // console.log(store.state.userid);
            let res = await get_myplaylists(store.state.userid);
            // console.log(res);
            playlists_info.data = res.data.playlist;
            for (let i = 0; i < playlists_info.data.length; i++) {
                if (playlists_info.data[i].playCount >= 100000000) {
                    playlists_info.data[i].playCount = (playlists_info.data[i].playCount / 100000000).toFixed(1) + '亿';
                } else if (playlists_info.data[i].playCount >= 10000) {
                    playlists_info.data[i].playCount = (playlists_info.data[i].playCount / 10000).toFixed(1) + '万';
                }
            }
        });

        return { playlists_info };
    }
}
</script>
    
<style lang="less" scoped>
.playlist {
    padding: 0.2rem;
    padding-top: 0.1rem;
    width: 100%;
    height: 4rem;

    .playlist_title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 0.2rem;

        .playlist_title_text {
            font-size: 0.4rem;
            font-weight: bold;
        }

        // .playlist_title_more {
        //     font-size: 0.2rem;
        //     border: 0.02rem solid;
        //     border-radius: 0.3rem;
        //     padding: 0rem 0.1rem 0.03rem 0.1rem;
        //     color: #999;
        // }

    }

    .playlist_list {
        width: 100%;
        height: 3rem;

        .playlist_swipe {
            width: 100%;

            .van-swipe-item {
                width: 2rem;
                padding-right: 0.2rem;
            }

            img {
                width: 100%;
                height: 100%;
                border-radius: 0.25rem;
            }

            .playlist_count {
                position: relative;
                bottom: 0.36rem;
                width: 1.35rem;
                color: rgb(79, 77, 77);
                font-size: 0.2rem;
                display: flex;
                align-items: center;
                border-radius: 0.3rem;
                padding: 0.01rem 0.06rem;
                background-color: rgb(234, 239, 193);

                .icon {
                    // position: absolute;
                    width: 0.2rem;
                    height: 0.2rem;
                    margin-right: 0.05rem;
                }
            }

            .playlist_name {
                position: relative;
                bottom: 0.3rem;
                font-size: 0.23rem;
                overflow: hidden;

                text-overflow: ellipsis;

                display: -webkit-box;

                -webkit-box-orient: vertical;

                -webkit-line-clamp: 2;
            }

        }
    }
}
</style>