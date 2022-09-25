<template>
    <div class="user_page">
        <div class="top_toolbar">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
        </div>
        <div v-if="!user_info.loading" class="user">
            <div class="user_info">
                <div class="user_info_avatar">
                    <img :src="user_info.data.profile.avatarUrl" alt="">
                </div>
                <div class="user_info_name">
                    <span>{{user_info.data.profile.nickname}}</span>
                </div>
            </div>
        </div>
        <div class="logout">
            <van-button round type="primary" @click="logout_func">退出</van-button>
        </div>
    </div>

</template>

<script>
import { get_user_info, logout } from "@/requests/request";
import router from "@/router";
import store from "@/store";
import { onMounted, reactive } from "vue";
export default {
    setup() {
        const user_info = reactive({ data: [''], loading: true });
        onMounted(async () => {
            let res = await get_user_info();
            user_info.data = res.data;
            user_info.loading = false;
        });
        async function logout_func() {
            await store.dispatch('logout');
            router.push('/login');
        }
        return { user_info, logout_func };
    }
}
</script>

<style lang="less" scoped>
.top_toolbar {
    width: 100%;
    height: 0.5rem;
    padding-left: 0.2rem;
    padding-top: 0.2rem;

}

.user {
    width: 100%;
    height: 6rem;
    margin-top: 2.5rem;

    .user_info {
        width: 60%;
        height: 3rem;
        padding: 0.2rem;
        margin: 0 auto;

        .user_info_avatar {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 auto;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .user_info_name {
            width: 100%;
            height: 1rem;
            text-align: center;
            line-height: 1rem;
            font-size: 0.4rem;
        }
    }
}

.user_page {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>