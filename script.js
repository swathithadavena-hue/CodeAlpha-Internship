const songs = [
  {
    title: "Vennelintha",
    artist: "Devi sri Prasad",
    src: "02 - Vennelintha - SenSongsMp3.co.mp3",
    cover: "tulasi.jpg",
  },
  {
    title: "Rai Rai Raa Raa",
    artist: "AR Rahman",
    src: "Rai Rai Raa Raa.mp3",
    cover: "peddi.jpg",
  },
  {
    title: "Vaa Re Vaa",
    artist: "Thaman S",
    src: "Vaa Re Vaa Vaa Re Vaa.mp3",
    cover: "lenin.webp",
  },
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const time = document.getElementById("time");

const playlist = document.getElementById("playlist");

let currentSong = 0;

// Create Playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");

  li.innerHTML = song.title + "<br><small>" + song.artist + "</small>";

  li.addEventListener("click", () => {
    currentSong = index;

    loadSong(currentSong);

    audio.play();

    playBtn.innerHTML = "⏸";
  });

  playlist.appendChild(li);
});

loadSong(currentSong);

function loadSong(index) {
  title.innerHTML = songs[index].title;

  artist.innerHTML = songs[index].artist;

  cover.src = songs[index].cover;

  audio.src = songs[index].src;

  updatePlaylist();
}

// Highlight Current Song
function updatePlaylist() {
  const items = document.querySelectorAll("#playlist li");

  items.forEach((item, index) => {
    if (index === currentSong) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Play / Pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();

    playBtn.innerHTML = "⏸";
  } else {
    audio.pause();

    playBtn.innerHTML = "▶";
  }
});

// Next Song
nextBtn.addEventListener("click", () => {
  currentSong++;

  if (currentSong >= songs.length) {
    currentSong = 0;
  }

  loadSong(currentSong);

  audio.play();

  playBtn.innerHTML = "⏸";
});

// Previous Song
prevBtn.addEventListener("click", () => {
  currentSong--;

  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }

  loadSong(currentSong);

  audio.play();

  playBtn.innerHTML = "⏸";
});

// Display Duration
audio.addEventListener("loadedmetadata", () => {
  time.innerHTML = "0:00 / " + formatTime(audio.duration);
});

// Update Progress
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;

  time.innerHTML =
    formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Autoplay
audio.addEventListener("ended", () => {
  currentSong++;

  if (currentSong >= songs.length) {
    currentSong = 0;
  }

  loadSong(currentSong);

  audio.play();
});

// Format Time
function formatTime(seconds) {
  let min = Math.floor(seconds / 60) || 0;

  let sec = Math.floor(seconds % 60) || 0;

  if (sec < 10) {
    sec = "0" + sec;
  }

  return min + ":" + sec;
}
