import { createStore } from 'vuex'
import { login_via_phone } from '@/requests/request';

export default createStore({
  state: {
    playlist: [{
      id: '1806834924', name: '入梦', picUrl: 'https://p2.music.126.net/xVmejcYYP00pXRgBD1JVCg==/109951165565323641.jpg', artist: [{ alias: [], id: '12521780', name: '云霄', tns: [] }]
    }
    ],
    playlist_index: 0,
    playing: false,
    show_detail: false,
    lyrics: [],
    current_lyric: '纯音乐，请欣赏',
    current_lyric_index: 0,
    current_progress: 0,
    duration: 0,
    current_time: 0,
    current_progress_change: 1,
    duration_ori: 0,
    is_login: false,
    show_footer: true
  },
  getters: {
  },
  mutations: {
    // 改变播放状态
    change_playing_state: function (state) {
      if (state.playing == false) {
        state.playing = true;
      } else {
        state.playing = false;
      }
    },
    // 改变当前播放列表
    change_playlist: function (state, data) {
      state.playlist = data.playlist
      state.playlist_index = data.index;
    },
    // 是否显示播放详情
    change_show_detail: function (state) {
      state.show_detail = !state.show_detail;
    },
    // 上一曲
    up: function (state) {
      state.playlist_index = state.playlist_index - 1;
      if (state.playlist_index < 0) {
        state.playlist_index = state.playlist.length - 1;
      }
    },
    // 下一曲
    down: function (state) {
      // if (state.playlist.length == 1) {
      //   state.playlist.push(state.playlist[0]);
      // }
      state.playlist_index = state.playlist_index + 1;
      if (state.playlist_index == state.playlist.length) {
        state.playlist_index = 0;
      }
    },
    // 更新歌词
    add_lyrics: function (state, data) {
      state.lyrics = data;
      // state.duration = data.duration;
      // console.log(state.lyrics);
      state.current_lyric_index = 0;
      state.current_lyric = state.lyrics[state.current_lyric_index].text;
    },
    // 更新播放进度
    change_current_time: function (state, data) {
      // for (let i = 0; i < state.lyrics.length; i++) {
      //   if (state.lyrics[i].time >= data) {
      //     state.current_lyric = state.lyrics[i].text;
      //     break;
      //   }
      // }
      // 判断是否要跳转到下一句歌词
      if (state.current_lyric_index + 1 < state.lyrics.length) {
        if (state.lyrics[state.current_lyric_index + 1].time < data.time) {
          state.current_lyric_index++;
          state.current_lyric = state.lyrics[state.current_lyric_index].text;
        }
      }
      // 格式化进度
      function formatZero(num, len) {
        if (String(num).length > len) {
          return num;
        }
        return (Array(len).join(0) + num).slice(-len);
      }
      state.current_progress = data.time / data.duration * 100;
      // console.log(state.current_progress);
      // 播放完后下一曲
      if (state.current_progress == 100) {
        this.commit('down');
      }
      state.duration_ori = data.duration;
      state.duration = { min: parseInt(data.duration / 1000 / 60), sec: formatZero(parseInt(data.duration / 1000 % 60), 2) };
      state.current_time = { min: parseInt(data.time / 1000 / 60), sec: formatZero(parseInt(data.time / 1000 % 60), 2) };
    },
    // 改变播放进度
    change_progress: function (state, data) {
      // 找到对应进度的歌词
      for (let i = 0; i < state.lyrics.length; i++) {
        if (state.lyrics[i].time >= data / 100 * state.duration_ori) {
          state.current_lyric = state.lyrics[i].text;
          state.current_lyric_index = i;
          break;
        }
      }
      state.current_progress_change = !state.current_progress_change;
      state.current_progress = data;

      // console.log(state.current_progress);
    }
  },
  actions: {
    login_func: async function (phone, password) {
      return await login_via_phone(phone, password);
    }
  },
  modules: {
  }
})
