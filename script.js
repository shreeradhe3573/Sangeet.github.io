let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = document.getElementsByClassName('songItem');
let volume = document.getElementById('volume');
let volumeIcon = document.getElementById('volumeIcon');
let currentVolume;
let slash = document.getElementById('slash');
let trackCurrentTime = document.getElementById('currentTime');
let trackDuration = document.getElementById('durationTime');
let songs = [
    { songName: "Careless", filePath: "songs/1.mp3" },
    { songName: "On & On", filePath: "songs/2.mp3" },
    { songName: "Castle", filePath: "songs/3.mp3" },
    { songName: "Elektronomia", filePath: "songs/4.mp3" },
    { songName: "Fearless", filePath: "songs/5.mp3" },
    { songName: "Fight Back", filePath: "songs/6.mp3" },

]
volume.addEventListener('change', (e) => {
    currentVolume = e.currentTarget.value / 100;
    audioElement.volume = currentVolume;
    if (currentVolume <= 0) {
        volumeIcon.classList.remove('fa-volume-high');
        volumeIcon.classList.add('fa-volume-xmark');
    } else {
        volumeIcon.classList.remove('fa-volume-xmark');
        volumeIcon.classList.add('fa-volume-high');
    }

})
volumeIcon.addEventListener('click', () => {
    if (audioElement.volume > 0) {
        audioElement.volume = 0;
        volumeIcon.classList.remove('fa-volume-high');
        volumeIcon.classList.add('fa-volume-xmark');
    } else {
        audioElement.volume = currentVolume;
        volumeIcon.classList.remove('fa-volume-xmark');
        volumeIcon.classList.add('fa-volume-high');
    }
})

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        if (audioElement.src.includes('songs/1.mp3')) {

            document.getElementById('0').classList.remove('fa-play-circle');
            document.getElementById('0').classList.add('fa-pause-circle');
        } else if (audioElement.src.includes('songs/2.mp3')) {
            document.getElementById('1').classList.remove('fa-play-circle');
            document.getElementById('1').classList.add('fa-pause-circle');
        } else if (audioElement.src.includes('songs/3.mp3')) {
            document.getElementById('2').classList.remove('fa-play-circle');
            document.getElementById('2').classList.add('fa-pause-circle');
        } else if (audioElement.src.includes('songs/4.mp3')) {
            document.getElementById('3').classList.remove('fa-play-circle');
            document.getElementById('3').classList.add('fa-pause-circle');
        } else if (audioElement.src.includes('songs/5.mp3')) {
            document.getElementById('4').classList.remove('fa-play-circle');
            document.getElementById('4').classList.add('fa-pause-circle');
        } else {
            document.getElementById('5').classList.remove('fa-play-circle');
            document.getElementById('5').classList.add('fa-pause-circle');
        }

        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        })


        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
audioElement.addEventListener('timeupdate', () => {
    slash.innerHTML = "/";
    songTimeUpdate();
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;


    if (progress >= 100) {
        if (songIndex >= 5) {
            songIndex = 0;
        } else {
            songIndex += 1;
        }
        Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        })
        document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
        document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
})
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})
const makeAllPlays = () => {

    Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    })
});
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 5) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
})

function songTimeUpdate() {
    if (audioElement.duration) {
        let curmins = Math.floor(audioElement.currentTime / 60);
        let cursecs = Math.floor(audioElement.currentTime - curmins * 60);
        let durmins = Math.floor(audioElement.duration / 60);
        let dursecs = Math.floor(audioElement.duration - durmins * 60);
        if (dursecs < 10) {
            dursecs = "0" + dursecs;
        }
        if (durmins < 10) {
            durmins = "0" + durmins;
        }
        if (curmins < 10) {
            curmins = "0" + curmins;
        }
        if (cursecs < 10) {
            cursecs = "0" + cursecs;
        }
        trackCurrentTime.innerHTML = curmins + ":" + cursecs;
        trackDuration.innerHTML = durmins + ":" + dursecs;
    } else {
        trackCurrentTime.innerHTML = "00" + ":" + "00";
        trackDuration.innerHTML = "00" + ":" + "00";
    }

}