function rem_size() {
    //get device width 获取设备显示宽度
    var device_width = document.documentElement.clientWidth || window.innerWidth;
    if (device_width >= 750) {
        device_width = 750
    }
    else if (device_width <= 320) {
        device_width = 320
    }
    // 750px -> 1 rem = 100 px; 375px -> 1 rem = 50px;
    document.documentElement.style.fontSize = (device_width / 7.5) + 'px'
    document.querySelector('body').style.fontSize = 0.3 + 'rem'
}
rem_size()
window.onresize = function () {
    rem_size()
}