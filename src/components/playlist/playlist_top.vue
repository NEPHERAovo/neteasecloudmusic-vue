<template>
    <!-- 歌单上部 -->
    <div class="playlist_top">
        <img :src="playlist_info.data.coverImgUrl" />
        <!-- 返回按钮和"歌单" -->
        <div class="left_element">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>歌单</span>
        </div>
        <!-- 搜索和功能图标 -->
        <div class="right_element">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>
    </div>
    <!-- 歌单详情 -->
    <div class="playlist_infos">
        <img :src="playlist_info.data.coverImgUrl" class="cover_img" />
        <div class="right_elements">
            <div class="playlist_name">{{playlist_info.data.name}}</div>
            <div v-if="playlist_info.data.creator" class="playlist_creator">
                <img :src="playlist_info.data.creator.avatarUrl" />
                <span>{{playlist_info.data.creator.nickname}}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
            <div class="playlist_desc">
                <span class="playlist_desc_text">{{playlist_info.data.description}}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
        </div>
    </div>
    <div class="playlist_tools">
        <div class="playlist_tool">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
            </svg>
            <span>{{playlist_info.data.commentCount}}</span>
        </div>
        <div class="playlist_tool">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
            <span>{{playlist_info.data.shareCount}}</span>
        </div>
        <div class="playlist_tool">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
            </svg>
            <span>下载</span>
        </div>
        <div class="playlist_tool">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-show_duoxuan"></use>
            </svg>
            <span>多选</span>
        </div>
    </div>

</template>
<script>
import { onMounted, reactive } from 'vue'
import { useRoute } from "vue-router"
import { get_playlist_info } from '@/requests/request.js'
export default {
    setup() {
        // 从路由中获取歌单id
        const id = useRoute().query.id;
        const playlist_info = reactive({ data: [''] });
        onMounted(async () => {
            let res = await get_playlist_info(id);
            playlist_info.data = res.data.playlist;
        });
        // console.log(playlist_info);
        return { playlist_info };
    }
}
</script>
<style lang="less" scoped>
.playlist_tools {
    width: 100%;
    margin-top: 0.4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;

    .icon {
        fill: white;
    }

    // :not(img) {
    //     filter: invert(0.5);
    //     mix-blend-mode: difference;
    // }

    .playlist_tool {
        display: flex;
        flex-direction: column;
        align-items: center;

        span {
            font-size: 0.25rem;
            margin-top: 0.1rem;
        }
    }

}

.playlist_infos {
    width: 100%;
    margin-top: 0.3rem;
    display: flex;
    flex-direction: row;

    .icon {
        height: 0.3rem;
    }

    .playlist_name {
        width: 4.5rem;
        padding-left: 0.2rem;
        margin-top: 0.1rem;
        color: white;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .playlist_creator {
        padding-left: 0.2rem;
        padding-top: 0.6rem;
        display: flex;
        align-items: center;

        .playlist_name {
            color: white;
        }

        img {
            width: 0.5rem;
            border-radius: 3rem;
        }

        span {
            display: flex;
            align-items: center;
            padding-left: 0.1rem;
            color: white;

        }

    }

    .playlist_desc {
        display: flex;
        align-items: center;
        margin-top: 0.1rem;

        .playlist_desc_text {
            width: 90%;
            padding-top: 0.1rem;
            padding-left: 0.2rem;
            color: rgb(249, 249, 249);
            font-size: 0.2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }

    }

    .cover_img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.2rem;
        margin-left: 0.4rem;
    }
}

.playlist_top {
    display: flex;
    justify-content: space-between;
    width: 100%;

    img {
        width: 100%;
        height: 6rem;
        z-index: -1;
        position: fixed;
        filter: blur(30px);
        transform: scale(1.5);
        overflow: hidden;
    }


    .left_element {
        padding: 0.2rem;
        display: flex;
        width: 23%;
        align-items: center;
        justify-content: space-between;
        color: white;

        .icon {
            fill: white;
        }
    }

    .right_element {
        padding: 0.2rem;
        display: flex;
        width: 23%;
        justify-content: space-between;
        align-items: center;

        .icon {
            height: 0.4rem;
            fill: white;
        }
    }

}
</style>