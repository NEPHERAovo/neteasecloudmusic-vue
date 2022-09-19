<template>
    <div class="main_search">
        <div class="top">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <van-search v-model="keywords" @search="on_search" placeholder="请输入搜索关键词" />
        </div>
        <van-tabs v-model:active="active" @change="tab_change" :before-change="beforeChange">
            <van-divider />
            <van-tab title="单曲">
                <div v-if="searched" class="songs">
                    <div class="item" v-for="(item,i) in data">
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
                        <van-divider />
                    </div>
                </div>
            </van-tab>
            <van-tab title="专辑">
                <div v-if="searched" class="albums">
                    <div class="item" v-for="item in data">
                        <div class="album_display">
                            <img :src="item.picUrl" />
                            <div class="album_info">
                                <div class="album_name">{{item.name}}</div>
                                <div class="album_singer">
                                    <span v-for="(singer,j) in item.artists">{{singer.name}}
                                        <span v-if="item.artists.length>1 && j!==item.artists.length-1">/ </span></span>
                                </div>
                            </div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                        <van-divider />
                    </div>
                </div>
            </van-tab>

            <van-tab title="歌手">
                <div v-if="searched" class="singers">
                    <div class="item" v-for="item in data">
                        <div class="singer_display">
                            <img :src="item.picUrl" />
                            <div class="singer_info">
                                <div class="singer_name">{{item.name}}</div>
                            </div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                        <van-divider />
                    </div>
                </div>
            </van-tab>
            <van-tab title="用户">
                <div v-if="searched" class="singers">
                    <div class="item" v-for="item in data">
                        <div class="singer_display">
                            <img :src="item.avatarUrl" />
                            <div class="singer_info">
                                <div class="singer_name">{{item.nickname}}</div>
                            </div>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                        <van-divider />
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>

</template>
<script>
import { get_search_result } from '@/requests/request.js'
import _store from '@/store'
export default {
    // setup() {
    //     var value;
    //     // async function on_search(keywords) {
    //     //     console.log(keywords);
    //     //     let res = await get_search_result(keywords, 1);
    //     // }
    //     const test = (val) => console.log(value);
    //     return { test, value }
    // }
    data() {
        return {
            keywords: '',
            data: [],
            searched: false,
            value_switch: {
                0: 1,
                1: 10,
                2: 100,
                3: 1002
            },
            active: '0'
        }
    },
    methods: {
        beforeChange() {
            this.searched = false;
            return true;
        },
        async on_search(keywords) {
            let res = await get_search_result(keywords, this.value_switch[this.active]);
            if (this.active == 0) {
                this.data = res.data.result.songs;
            } else if (this.active == 1) {
                this.data = res.data.result.albums;
            } else if (this.active == 2) {
                this.data = res.data.result.artists;
                // console.log(this.data);
            } else {
                this.data = res.data.result.userprofiles;
            }
            this.searched = true;
        },
        playsongs(i) {
            let data = [];
            this.data.map(item => {
                data.push({
                    artist: item.ar,
                    id: item.id,
                    name: item.name,
                    picUrl: item.al.picUrl
                })
            })
            _store.commit('change_playlist', { playlist: data, index: i });
        },
        tab_change(value) {
            if (this.keywords) {
                this.on_search(this.keywords);
            }
        }
    }
}
</script>

<style lang="less">
.main_search {
    width: 100%;
    height: 100%;

    .van-tab {
        margin-bottom: 0.2rem;
    }

    .singers {
        width: 100%;
        padding: 0.2rem;

        .singer_display {
            display: flex;
            align-items: center;
            margin-bottom: 0.1rem;
        }

        .item {
            margin-bottom: 0.2rem;

            .singer_info {
                margin-left: 0.3rem;
                width: 70%;
                font-size: 0.28rem;
            }
        }

        img {
            width: 1rem;
            height: 1rem;
            border-radius: 10%;
        }

        .icon {
            filter: invert(0.5);
            height: 0.3rem;
            width: 0.3rem;
        }
    }

    .albums {
        width: 100%;
        padding: 0.2rem;

        img {
            width: 1rem;
            height: 1rem;
            border-radius: 10%;
        }

        .item {
            margin-bottom: 0.2rem;
        }

        .album_display {
            display: flex;
            align-items: center;
            margin-bottom: 0.1rem;

            .icon {
                filter: invert(0.5);
                height: 0.3rem;
                width: 0.3rem;
            }

            .album_info {
                margin-left: 0.3rem;
                width: 70%;

                .album_singer {
                    font-size: 0.2rem;
                    color: #999;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }

    .songs {
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
        }
    }

    .top {
        display: flex;
        align-items: center;
        margin: 0.1rem 0.2rem 0rem 0.3rem;

        .van-search {
            margin-left: 0.1rem;
            flex: 0 0 auto;
            width: 6rem;
        }
    }

    .van-divider {
        margin: 0 0.2rem;
    }
}
</style>