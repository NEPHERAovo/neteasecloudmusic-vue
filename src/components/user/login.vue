<template>
    <img class="bg" :src="'http://p1.music.126.net/rB3qY_pk9GHhZ_DgZn55Zw==/109951165817088639.jpg'" />
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <div class="login_page">
        <div class="login_phone">
            <img :src="'http://p1.music.126.net/rB3qY_pk9GHhZ_DgZn55Zw==/109951165817088639.jpg'" />
            <div class="greetings">Welcome back</div>
            <div class="login_content">
                <van-field v-model="tel" type="tel" label="手机号" label-width="50" />
                <van-field v-model="password" type="password" label="密码" label-width="50" />
            </div>
            <div class="login_btn">
                <van-button round type="primary" @click="login_func">登陆</van-button>
            </div>

        </div>
        <!-- <div class="login_qrcode">
            qr
        </div> -->
    </div>
</template>

<script>
import { ref } from 'vue'
import _store from '@/store'
export default {
    setup() {
        const tel = ref('');
        const password = ref('')
        async function login_func() {
            let res = await _store.dispatch('login_func', { tel: tel.value, password: password.value });
            console.log(res);
        }
        return {
            tel,
            password,
            login_func
        }
    }
}
</script>

<style lang="less" scoped>
.icon {
    margin: 0.3rem;
}

.bg {
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
    filter: blur(200px);
    transform: scale(1);
    overflow: hidden;
}

.login_page {
    background-color: rgb(243, 235, 235);
    border-radius: 5%;
    width: 90%;
    height: 9rem;
    margin: auto;
    margin-top: 1rem;

    .login_phone {
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        .login_btn {
            margin-top: 1rem;
        }

        .login_content {
            width: 70%;
            margin-top: 0.5rem;
        }

        .greetings {
            font-size: 0.6rem;
        }

        img {
            margin: 1rem;
            display: flex;
            width: 1.8rem;
            height: 1.8rem;
            border-radius: 50%;
        }
    }
}
</style>