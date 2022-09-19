<template>
    <!-- 首页顶部导航栏 -->
    <div class="tool_bar">
        <div class="settings">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>

        <div class="top_nav">
            <span @click="$router.push('/user')">我的</span>
            <span>发现</span>
            <span>云村</span>
            <span>视频</span>
        </div>
        <div class="search">
            <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>

    </div>
</template>

<style lang="less" scoped>
.tool_bar {
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .top_nav {
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: space-between;
    }
}
</style>