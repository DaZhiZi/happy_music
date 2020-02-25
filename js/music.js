const log = function () {
    console.log.apply(console, arguments)
}

const e = function (selector) {
    return document.querySelector(selector)
}

const appendHtml = function (element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

const bindEvent = function (element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const bindAll = function (selector, eventName, callback) {
    let elements = document.querySelectorAll(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

const removeClassAll = function (className) {
    let selector = '.' + className
    let elements = document.querySelectorAll(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        e.classList.remove(className)
    }
}
const config_music = [
    {
        id: 1,
        src: 'mp3/周杰伦 - .爱的飞行日记.mp3',
        name: '爱的飞行日记',
        liked: false,
    },
    {
        id: 2,
        src: 'mp3/周杰伦 - .简单爱.mp3',
        name: '简单爱',
        liked: false,
    },
    {
        id: 3,
        src: 'mp3/周杰伦 - .龙卷风 (Live).mp3',
        name: '龙卷风 (Live)',
        liked: false,
    },
    {
        id: 4,
        src: 'mp3/周杰伦 - .听妈妈的话.mp3',
        name: '听妈妈的话',
        liked: false,
    },
    {
        id: 5,
        src: 'mp3/周杰伦 - .我要夏天.mp3',
        name: '我要夏天',
        liked: false,
    },

]
const find_song = function (index) {
    for (let song of config_music) {
        if (song["id"] == index) {
            return song
        }
    }
    return null
}

const actives = function () {
    if (e('#action').classList.contains('actives')) {
        let className = 'actives'
        removeClassAll(className)
        let c = e('#stop')
        c.classList.add(className)
    } else {
        let className = 'actives'
        removeClassAll(className)
        let c = e('#action')
        c.classList.add(className)
    }
}

//换按钮
const change = function () {
    if (e('#action').classList.contains('actives')) {
        let className = 'actives'
        removeClassAll(className)
        let c = e('#stop')
        c.classList.add(className)
    }
}

//换背景名字
const img = function (newIndex) {
    let i = newIndex
    let song = find_song(i)
    let name = song.name
    let img = e('.img')
    let twoimg = e(".two-img")

    img.src = `img/${name}.jpg`
    twoimg.src = `img/${name}.jpg`

    let h3 = '#name-id-' + String(i)
    let className = 'active'
    removeClassAll(className)

    let c = e(h3)
    c.classList.add(className)

    let h4 = '#songer-id-' + String(newIndex)
    let class_name = 'action'
    removeClassAll(class_name)

    let a = e(h4)
    a.classList.add(class_name)
}

//列表颜色
const color = function () {
    let audio = e('audio')
    let id = parseInt(audio.dataset.now)
    let newId = '#song-id-' + String(id)
    let className = 'yanSe'
    removeClassAll(className)
    let c = e(newId)
    c.classList.add(className)
}
//开始
const bindAction = function () {
    let element = e('#action')
    bindEvent(element, 'click', function () {
        let a = e('#id-audio-player')
        a.play()
        actives()
        color()
    })
}
//暂停
const bindStop = function () {
    let element = e('#stop')
    bindEvent(element, 'click', function () {
        let a = e('#id-audio-player')
        a.pause()
        actives()
        color()
    })
}
//分秒
const rjust = function (str, size, delimeter = '0') {
    let result = str
    while (result.length < size) {
        result = delimeter + result
    }
    return result
}
const formatTime = function (sum) {
    let m = String(Math.floor(sum % 3600 / 60))
    let s = String(Math.floor(sum % 60))
    let time = `${rjust(m, 2)}:${rjust(s, 2)}`
    return time
}

//总时间
const bindTime = function () {
    let a = e('#id-audio-player')
    bindEvent(a, 'canplay', function () {
        let sum = parseInt(a.duration)
        let value = formatTime(sum)
        let time = e('#time')
        time.innerHTML = value
    })
}

const showTime = function (event) {
    let audio = e('#id-audio-player')
    let target = event.target
    let sum = audio.currentTime
    let value = formatTime(sum)
    let now = e('#nowTime')
    now.innerHTML = value
    let input = audio.currentTime / audio.duration * 100
    // console.log('input', input);
    if (Boolean(input) == true) {
        e('.range').value = input
        let b = e('.range').value
        e('.range').style.background = `linear-gradient(90deg, rgba(0, 0, 0, 0.1)${b}%, rgba(255, 255, 255, 1)${b}%)`;
    }
}

//当前时间
const nowtime = function () {
    let audio = e('#id-audio-player')
    audio.addEventListener('timeupdate', showTime)
}

const showHeart = function (now) {
    let i = now
    let music = find_song(i)
    let className = 'pink-heart'
    let a = e('.heart')
    if (music.liked === true) {
        a.classList.add(className)
    } else {
        a.classList.remove(className)
    }
}
//通用
const goIndex = function (newIndex) {
    let i = newIndex
    let audio = e('audio')
    let music = find_song(i)
    audio.src = music.src
    bindEvent(audio, 'canplay', function () {
        audio.play()
        img(i)
        change()
        showHeart(i)
        color()
    })
    audio.dataset.now = i
}
//上一首
const bindPrev = function () {
    let selector = e('#shangSong')
    bindEvent(selector, 'click', function () {
        let audio = e('audio')
        let index = parseInt(audio.dataset.now)
        let len = config_music.length
        let newIndex = (index + len - 1) % len
        if (newIndex == 0) {
            newIndex = 1
        }
        goIndex(newIndex)
    })
}
//下一首
const bindNext = function () {
    let selector = e('#nextSong')
    bindEvent(selector, 'click', function () {
        let audio = e('audio')
        let index = parseInt(audio.dataset.now)
        let len = config_music.length
        let newIndex = (index + 1) % len
        if (newIndex == 0) {
            newIndex = 1
        }
        goIndex(newIndex)
    })
}
// 给 input range 添加拖动事件
const bindRange = function () {
    e('.range').addEventListener('input', function (event) {
        e('#id-audio-player').removeEventListener('timeupdate', showTime)
        let v = this.value
        // console.log('v', v)
        e('#id-audio-player').currentTime = e('#id-audio-player').duration * v / 100
        nowtime()
    })
}
//心
const bindHeart = function () {
    let b = e('.heart')
    let audio = e('audio')
    bindEvent(b, 'click', function () {
        let now = audio.dataset.now
        let music = find_song(now)
        let className = 'pink-heart'
        if (music.liked === true) {
            music.liked = false
            b.classList.remove(className)
        } else {
            music.liked = true
            b.classList.add(className)
        }
    })
}
//列表
const bindList = function () {
    let list = e('.list')
    let a = e('.gray')
    bindEvent(list, 'click', function () {
        let className = 'move'
        removeClassAll(className)
        let classN = 'move-1'
        a.classList.add(classN)
    })
    bindEvent(a, 'click', function () {
        let className = 'move'
        let songList = e('.songList')
        songList.classList.add(className)
        let classN = 'move-1'
        removeClassAll(classN)
    })
}
//列表点歌
const bindClick = function () {
    let selector = '.songtitle'
    bindAll(selector, 'click', function (event) {
        let target = event.target
        let newIndex = parseInt(target.dataset.id)
        goIndex(newIndex)
    })
}
//循环
const bindCycle = function () {
    let selector = e('audio')
    bindEvent(selector, 'ended', function () {
        let audio = e('audio')
        let index = parseInt(audio.dataset.now)
        let len = config_music.length
        let newIndex = (index + 1) % len
        if (newIndex == 0) {
            newIndex = 1
        }
        goIndex(newIndex)
    })
}
const bindAlls = function () {
    bindAction()
    bindStop()
    bindTime()
    bindPrev()
    bindNext()
    bindRange()
    bindHeart()
    bindList()
    bindClick()
    bindCycle()
    nowtime()
}

const __main = function () {
    bindAlls()
}
__main()