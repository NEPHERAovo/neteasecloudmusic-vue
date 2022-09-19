<template>
    <div class="func_list">
        <span class="func_item">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tuijian"></use>
            </svg>
            每日推荐
        </span>
        <span class="func_item">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhibo"></use>
            </svg>
            私人FM
        </span>
        <span class="func_item">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gedan"></use>
            </svg>
            歌单
        </span>
        <span class="func_item">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang"></use>
            </svg>
            排行榜
        </span>
    </div>
</template>

<style lang="less">
.func_list {
    padding: 0.2rem;
    display: flex;
    justify-content: space-around;

    .func_item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon {
            width: 0.6rem;
            height: 0.6rem;
        }
    }
}
</style>