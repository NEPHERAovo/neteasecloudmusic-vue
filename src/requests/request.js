import axios from 'axios'
let service = axios.create({
    // baseURL: "http://192.168.1.9:3000/",
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export function get_banner() {
    return service({
        method: "GET",
        url: "/banner?type=2"
    })
}

export function get_playlists() {
    return service({
        method: "GET",
        url: "/personalized?limit=12"
    })
}

export function get_myplaylists(uid) {
    return service({
        method: "GET",
        url: "/user/playlist?uid=" + uid
    })
}

export function get_playlist_info(id) {
    return service({
        method: "GET",
        url: "/playlist/detail?id=" + id
    })
}

export function get_playlist_songs(id) {
    return service({
        method: "GET",
        url: "/playlist/track/all?id=" + id + '&limit=200'
    })
}

export function get_lyrics(id) {
    return service({
        method: "GET",
        url: "/lyric?id=" + id
    })
}

export function get_search_result(keywords, type) {
    return service({
        method: "GET",
        url: "/search?keywords=" + keywords + "&limit=30" + "&type=" + type
    })
}

export function login_via_phone(phone, password) {
    return service({
        method: "GET",
        url: "/login/cellphone",
        params: { phone: phone, password: password }
    })
}

export function check_login_status() {
    return service({
        method: "GET",
        url: "/login/status"
    })
}

export function get_user_info() {
    return service({
        method: "GET",
        url: "/user/account"
    })
}

export function logout() {
    return service({
        method: "GET",
        url: "/logout"
    })
}