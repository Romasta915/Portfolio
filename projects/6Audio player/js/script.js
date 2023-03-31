
// play()
// pause()
// paused(false, true)
// currentTime(sec)
// duration(sec)
// currentSrc
// muted(true, false)
// audioPlayer.volume = 0.1

// player
let audioTeg = document.getElementById('audioTeg')
let songPoster = document.getElementById('songPoster')
let btnPlay = document.getElementById('btnPlay')
let btnPrev = document.getElementById('btnPrev')
let btnNext = document.getElementById('btnNext')
let currentDuration = document.getElementById('currentDuration')
let allDuration = document.getElementById('allDuration')
let durationRange = document.getElementById('durationRange')
let volumeRange = document.getElementById('volumeRange')
let songTitle = document.getElementById('songTitle')
let songwriter = document.getElementById('songwriter')
let intervalId // сет інтервал для обновлення ренджа, часу

let currentIndex = 0

let songsArr = [
    '1 Karna_-_Vtrolom_(musmore.com).mp3',
    '2 thousand_foot_krutch_-_we_are_(zvukoff.ru).mp3',
    '3 Twenty One Pilots - Lane Boy.mp3',
    '4 Ai Mori Teardrops (Bring Me The Horizon cover)_(allmp3.su).mp3',
    '5 disturbed_-_decadance_(zvukoff.ru).mp3',
    '6 Elvis Presley - jailhouse rock.mp3',
    '7 FACE_-_YUmorist_(musmore.com).mp3',
    '8 Rammstein_-_Du_Hast_(musmore.com).mp3',
]
let postersArr = [
    '1 karna.jpg',
    '2 we are.jpg',
    '3 Twenty One Pilots - Lane Boy.jpeg',
    '4 bring me the horizon.jpg',
    '5 decadance.jpg',
    '6 Elvis.jpg',
    '7 face.jpg',
    '8 rammstain.jpg',
]
let songTitleArr = [
    'Гуцул метал',
    'We are',
    'Lane boy',
    'Teardrops',
    'Dacadane',
    'Jailhouse rock',
    'Юморист',
    'Du hast',
]
let songWriterArr = [
    'Карна',
    'Thousand foot krutch',
    'Twenty one pisots',
    'Bring me the horizon (Ai mori cover)',
    'Distributed',
    'Elvis presley',
    'FACE',
    'Rammstain',
]

function nextGroup() {
    currentIndex++
    if (currentIndex > postersArr.length - 1) {
        currentIndex = 0
    }
    songPoster.src = `./img/${postersArr[currentIndex]}`
    songTitle.innerText = songTitleArr[currentIndex]
    songwriter.innerText = songWriterArr[currentIndex]
    audioTeg.src = `./songs/${songsArr[currentIndex]}`

    if (audioTeg.paused) {
        audioTeg.play()
        songPoster.style.animation = 'rotateDisk 7.5s 0.25s linear infinite'
        intervalId = setInterval(() => {
            currentDuration.innerText = splitTime(audioTeg.currentTime)
            durationRange.value = audioTeg.currentTime
        }
            , 1000)
        btnPlay.style.backgroundImage = 'url(./icons/pause.png)'
    }
}

function prevGroup() {
    currentIndex--
    if (currentIndex < 0) {
        currentIndex = postersArr.length - 1
    }
    songPoster.src = `./img/${postersArr[currentIndex]}`
    songTitle.innerText = postersArr[currentIndex]
    songwriter.innerText = songWriterArr[currentIndex]
    audioTeg.src = `./songs/${songsArr[currentIndex]}`

    if (audioTeg.paused) {
        audioTeg.play()
        songPoster.style.animation = 'rotateDisk 7.5s 0.25s linear infinite'
        intervalId = setInterval(() => {
            currentDuration.innerText = splitTime(audioTeg.currentTime)
            durationRange.value = audioTeg.currentTime
        }
            , 1000)
        btnPlay.style.backgroundImage = 'url(./icons/pause.png)'
    }
}

btnNext.addEventListener('click', nextGroup)
btnPrev.addEventListener('click', prevGroup)

function splitTime(sec) {
    seconds = Math.floor(sec % 60)
    if (seconds < 10) {
        seconds = `0${Math.floor(sec % 60)}`
    }
    return `${Math.floor(sec / 60)}:${seconds}`
}

currentDuration.innerText = splitTime(audioTeg.currentTime)
if (allDuration.duration) {
    durationСheck()
} else {
    audioTeg.onloadedmetadata = durationСheck
}
function durationСheck() {
    allDuration.innerText = splitTime(audioTeg.duration)
    durationRange.min = 0
    durationRange.max = audioTeg.duration
}

durationRange.addEventListener('input', () => {
    audioTeg.currentTime = durationRange.value
    currentDuration.innerText = splitTime(audioTeg.currentTime)
})

btnPlay.addEventListener('click', () => {
    if (audioTeg.paused) {
        audioTeg.play()
        btnPlay.style.backgroundImage = 'url(./icons/pause.png)'
        songPoster.style.animation = 'rotateDisk 7.5s 0.25s linear infinite'
        intervalId = setInterval(() => {
            currentDuration.innerText = splitTime(audioTeg.currentTime)
            durationRange.value = audioTeg.currentTime
        }
            , 1000)
    } else {
        audioTeg.pause()
        btnPlay.style.backgroundImage = 'url(./icons/play.png)'
        clearInterval(intervalId)
        songPoster.style.animation = 'none'
    }
})

volumeRange.min = 0
volumeRange.max = 1
volumeRange.addEventListener('input', () => {
    audioTeg.volume = volumeRange.value
})

audioTeg.addEventListener('ended', nextGroup)


// menu
let contMenu = document.getElementById('contMenu')
contMenu.style.padding = '10px'

for (let i = 0; i < songsArr.length; i++) {
    let item = document.createElement('div')
    contMenu.appendChild(item)
    item.setAttribute('class', 'items')
    let items = document.getElementsByClassName('items')
    item.style.display = 'flex'
    item.style.margin = '10px 0'
    item.style.padding = '10px'
    item.style.borderRadius = '10px'
    item.style.background = 'linear-gradient(to right, #240b36, #c31432)'

    let imgSection = document.createElement('div')
    item.appendChild(imgSection)
    imgSection.style.width = '40px'
    imgSection.style.height = '40px'
    let imgLine = document.createElement('img')

    imgSection.appendChild(imgLine)
    imgLine.src = `./img/${postersArr[i]}`
    imgLine.style.width = '40px'
    imgLine.style.height = '40px'

    let itemTitle = document.createElement('div')
    item.appendChild(itemTitle)
    itemTitle.innerText = songTitleArr[i]
    itemTitle.style.fontSize = '20px' 
    itemTitle.style.marginLeft = '20px'
    itemTitle.style.display = 'flex'
    itemTitle.style.alignItems = 'center'
    itemTitle.style.fontWeight = 'bold'

    let itemSongwriter = document.createElement('marquee')
    item.appendChild(itemSongwriter)
    itemSongwriter.innerText = songWriterArr[i]
    itemSongwriter.style.fontSize = '20px' 
    itemSongwriter.style.marginLeft = '20px'
    itemSongwriter.style.display = 'flex'
    itemSongwriter.style.alignItems = 'center'
    itemSongwriter.style.fontWeight = 'bold'

}






