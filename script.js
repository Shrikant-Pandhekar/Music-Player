const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nxtBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')
const ctime = document.querySelector('#ctime')
const ttime = document.querySelector('#ttime')
const vol = document.querySelector('#volume-control');
const icon = document.querySelector('#sp');


// Songs Tittle

const songs = ['1','2','3']

//keep track of song
let songIndex = 0

//load indo of DOM
loadSong(songs[songIndex])

//update info
function loadSong(song)
{
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `img/${song}.JPG`
}

function playSong()
{
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

function pauseSong()
{
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    audio.pause()
    
}

function prevSong()
{
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length -1
    }
    loadSong(songs[songIndex])
    playSong()
}

function nextSong() 
{
    songIndex++
    if (songIndex > songs.length -1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}


function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
    var s = parseInt(currentTime % 60);
    var m = parseInt((currentTime / 60) % 60);
    var s1 = parseInt(duration % 60);
    var m1 = parseInt((duration / 60) % 60);
    ctime.innerText = m + ':' + s
    ttime.innerText = m1 + ':' + s1

}

function setProgress(e) {
    const width = this.clientWidth
    const ClickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (ClickX / width) * duration
}




//event functions

playBtn.addEventListener('click',()=>{
    const isplay = musicContainer.classList.contains('play')

    if (isplay) {
        pauseSong()
    } else {
        playSong()
        
    }
})

prevBtn.addEventListener('click', prevSong)
nxtBtn.addEventListener('click',nextSong)

audio.addEventListener('timeupdate',updateProgress)

progressContainer.addEventListener('click',setProgress)

audio.addEventListener('ended',nextSong)

icon.addEventListener('click', () =>{
    audio.volume = 0
})
 
vol.addEventListener('change', () => {
    setVol = vol.value/100;
    console.log(setVol)
    audio.volume = setVol
})