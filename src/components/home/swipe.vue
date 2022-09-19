<template>
    <div class="swipe">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in images.data">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script>
import axios from 'axios'
import { get_banner } from '@/requests/request.js'
import { onMounted, reactive } from 'vue'
export default {
    setup() {
        const images = reactive({ data: [''] });
        onMounted(async () => {
            let res = await get_banner()
            images.data = res.data.banners
        });
        return { images };
    },
};
</script>
<style lang="less">
.swipe {
    .van-swipe {
        .van-swipe-item {
            padding: 0 0.2rem;

            img {
                width: 100%;
                height: 3rem;
                border-radius: 0.35rem;
            }
        }

        .van-swipe__indicator {
            background-color: rgba(236, 96, 96, 0.893);
        }
    }
}
</style>