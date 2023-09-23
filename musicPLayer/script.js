let songName = document.querySelector(".song-name")
let songArtist = document.querySelector(".artist-name")
let progress = document.querySelector("#progress")

let prevIcon = document.querySelector(".prev")
let nextIcon = document.querySelector(".next")
let playPause = document.querySelector("#play-pause")

let audio = document.querySelector("#audio")
let currentDuration = document.querySelector(".current-duration")
let maxDuration = document.querySelector('.max-duration')


let disk = document.querySelector("#disk")

let songList = document.querySelector(".bottom-center-body")

let boxContainer = document.querySelector(".box-container")

let repeatIcon = document.querySelector("#repeat")
let shuffleIcon = document.querySelector("#shuffle")

let songCard = document.getElementById("songCard")
let diskBody = document.getElementById("#disk-body")

let time;
let currentIndex = 1;

let isPlaying = false;


let repeatValue = false;
let repeatCounter = 1;

let shuffleValue = false;
let shufflecounter = 1;

//function for time format
function timeFormat(t) {
   if (t < 10) {
      return `0${t}`
   } else {
      return t
   }
}


//for getting data loaded for min and max duration
audio.onloadedmetadata = () => {
   progress.max = audio.duration;
   // console.log(audio.duration);
   let time = audio.duration;
   let min = timeFormat(Math.floor(time / 60))
   let sec = timeFormat(Math.floor(time % 60))

   maxDuration.innerHTML = `${min}:${sec}`

}

playPause.addEventListener("click", () => {
   if (isPlaying) {
      audio.pause()
      disk.classList.remove('rotate')
      isPlaying = false

      playPause.src = '/images/pause.svg'

      boxContainer.innerHTML = `
      <div class="box "></div>
       <div class="box"></div>
       <div class="box"></div>
       <div class="box"></div>
       <div class="box"></div>
       <div class="box"></div>
       <div class="box"></div>
       <div class="box"></div>
       <div class="box"></div>
       <div class="box"></div>

      `
   }
   else {
      audio.play()
      isPlaying = true
      disk.classList.add('rotate')
      playPause.src = '/images/playicon.svg'

      boxContainer.innerHTML = `<div class="box box1"></div>
         <div class="box box1"></div>
         <div class="box box7"></div>
         <div class="box box1"></div>
         <div class="box box6"></div>
         <div class="box box1"></div>
         <div class="box box7"></div>
         <div class="box box1"></div>
         <div class="box box2"></div>
         <div class="box box1"></div>`
   }
})


const startMusic = (i) => {
   let song = songs[i]
   audio.src = song.src
   progress.value = audio.currentTime
   songName.innerHTML = song.name
   songArtist.innerHTML = song.artist
 }

if (audio.play()) {


   progress.max = audio.duration;


   //for update of progress bar  and 
   //updatetion of song current time
   setInterval(() => {
      progress.value = audio.currentTime

      let time = audio.currentTime;
      let min = timeFormat(Math.floor(time / 60))
      let sec = timeFormat(Math.floor(time % 60))

      currentDuration.innerHTML = `${min}:${sec}`

      if (audio.currentTime == audio.duration) {

         if (repeatValue == true) {
            progress.value = 0
            audio.play()

         } else {
            shuffle(shufflecounter)
         }
      }
   }, 500)
}



//functionality for progresss change
progress.onchange = () => {
   audio.play()
   audio.currentTime = progress.value
   playPause.src = '/images/playicon.svg'
   disk.classList.add('rotate')

   boxContainer.innerHTML = `<div class="box box1"></div>
         <div class="box box1"></div>
         <div class="box box7"></div>
         <div class="box box1"></div>
         <div class="box box6"></div>
         <div class="box box1"></div>
         <div class="box box7"></div>
         <div class="box box1"></div>
         <div class="box box2"></div>
         <div class="box box1"></div>`

}


// functionality for next song  click listner

nextIcon.addEventListener("click", () => {

   if (currentIndex == songs.length) {
      currentIndex = 0;
      startMusic(currentIndex)
      audio.play()
      playPause.src = '/images/playicon.svg'

      if (isPlaying == false) {
         audio.pause()
         disk.classList.remove('rotate')
         playPause.src = '/images/pause.svg'
      }
   }
   else {
      currentIndex++
      startMusic(currentIndex)
      audio.play()

      playPause.src = '/images/playicon.svg'

      if (isPlaying == false) {
         audio.pause()
         isPlaying = false
         disk.classList.remove('rotate')
         playPause.src = '/images/pause.svg'
      }
   }
})



// functionality for prev icon ********

prevIcon.addEventListener("click", () => {

   if (currentIndex == 0) {

      currentIndex = songs.length;
      // console.log(songs.length)
      startMusic(currentIndex)
      audio.play()
      playPause.src = '/images/playicon.svg'

      if (isPlaying == false) {
         audio.pause()
         disk.classList.remove('rotate')
         playPause.src = '/images/pause.svg'
      }
   }
   else {
      currentIndex--;
      startMusic(currentIndex);
      audio.play();
      playPause.src = '/images/playicon.svg';

      if (isPlaying == false) {
         audio.pause()
         disk.classList.remove('rotate')
         playPause.src = '/images/pause.svg'

      }
   }
})


function changeSong(index) {

   startMusic(index)
   // audio.play()
   // audio.pause()
   playPause.src = '/images/pause.svg'
   disk.classList.remove('rotate')


   boxContainer.innerHTML = `
   <div class="box "></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>

   `
}

window.onload = function () {

   songList.innerHTML = songs.map((v, i) => {

      return `
      <div class="song-card" onClick="changeSong(${i})">

           <div><img class="song-card-image" src=${v.img}></div>
            <p class="playlist-artist-name">${v.name}</p>
      </div>
      `
   })

}



// repeat function *********
function repeat(value) {
   if (value % 2 == 0) {

      progress.value = 0;
      startMusic(currentIndex--)
      audio.play()
      repeatValue = true
   }
   else {
      currentIndex++;
      startMusic(currentIndex)
      audio.play()
   }
}
/// shuffle function*************

function shuffle(value) {
   if (value % 2 == 0) {
      let rand = Math.random() * (songs.length - 0) + 0
      let finalRand = Math.floor(rand)
      //   console.log(rand)
      startMusic(finalRand)
      audio.play()
      playPause.src = '/images/playicon.svg'
   }
   else {
      currentIndex++;
      startMusic(currentIndex)
      audio.play()

   }
}

//clickListner on shuffle Icon
shuffleIcon.addEventListener('click', () => {
   shufflecounter++
   // console.log(shufflecounter)
   if (shufflecounter % 2 == 0) {
      shuffleIcon.classList.add("rotateIcon")
   }
   else {
      shuffleIcon.classList.remove("rotateIcon")
   }
})
///clickListner on repeat Icon
repeatIcon.addEventListener('click', () => {
   repeatCounter++
   console.log(repeatCounter)
   if (repeatCounter % 2 == 0) {
      repeatIcon.classList.add("rotateIcon")
      repeatValue = true;
   } else {
      repeatIcon.classList.remove("rotateIcon")
      repeatValue = false;
   }
})


// programme starts from heree...
startMusic(currentIndex)
