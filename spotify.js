 
    // JavaScript for handling player functionality
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playPauseIcon = document.getElementById('play-pause-icon');
    const nowPlayingTitle = document.getElementById('now-playing-title');
    const nowPlayingArtist = document.getElementById('now-playing-artist');
    const nowPlayingImg = document.getElementById('now-playing-img');
    const seekBar = document.getElementById('seek-bar');
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration');


    let currentTrackIndex = -1;
    let audio = new Audio();

    const tracks = [
      {
        title: "Blue_mountain",
        artist: "cheema y",
        img: "https://i.scdn.co/image/ab67616d0000b2737a7cc8411fe9e9e3ac5487f5",
        audioSrc: "Blue_Mountain.mp3"
      },
      {
        title: "Rail",
        artist: "Sumit Patra",
        img: "https://i.scdn.co/image/ab67616d0000b2730804804d2fe9dcc867a3f3e5",
        audioSrc: "Rail.mp3"
      },
      {
        title: "0008",
        artist: "Sidhu Moose Wala",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0Zk0OMoBAXT3SrSB5HCzBOHBDfD86RV33A&s",
        audioSrc: "SpotiDown.App - 0008 - Sidhu Moose Wala, Jenny Johal, The Kidd.mp3"
      },
      {
        title: "Take notes",
        artist: "Smooth Sounds",
        img: "https://i.scdn.co/image/ab67616d00001e02f259a5eb06f024c71d835190g",
        audioSrc: "SpotiDown.App - Take Notes - Sidhu Moose Wala, Jay B.mp3"
      },
        {
        title: "Teri Main Hogayia",
        artist: "Jass Manak",
        img: "https://a10.gaanacdn.com/gn_img/albums/NOXWVRgWkq/XWVV4L1zWk/size_m_1733477851.jpg",
        audioSrc: "SpotiDown.App - Teri Main Hogayi - From _Tufang_ - Jass Manak.mp3"
      },
      {
        title: "Courtside",
        artist: "Karan Aujla",
        img: "https://i.scdn.co/image/ab67616d0000b273fa5b9459131a25462cead8ae",
        audioSrc: "SpotiDown.App - Courtside - Karan Aujla.mp3"
      }
    ];

    // Function to load a track
    function loadTrack(index) {
      if (index < 0 || index >= tracks.length) return;
      currentTrackIndex = index;
      const track = tracks[index];
      nowPlayingTitle.textContent = track.title;
      nowPlayingArtist.textContent = track.artist;
      nowPlayingImg.src = track.img;
      nowPlayingImg.alt = `Album art for ${track.title}`;
      audio.src = track.audioSrc;
      audio.play();
      playPauseIcon.textContent = 'pause'; // Change icon to pause
    }

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', () => {
      if (currentTrackIndex === -1) {
        loadTrack(0); // Load the first track if none is loaded
      }
      if (audio.paused) {
        audio.play();
        playPauseIcon.textContent = 'pause';
      } else {
        audio.pause();
        playPauseIcon.textContent = 'play_arrow';
      }
    });

    // Load track on playlist card click
    const playlistCards = document.querySelectorAll('.playlist-card');
    playlistCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        loadTrack(index);
      });
    });

    // Next and Previous buttons
    document.getElementById('next-btn').addEventListener('click', () => {
      if (currentTrackIndex < tracks.length - 1) {
        loadTrack(currentTrackIndex + 1);
      } else {
        loadTrack(0); // Loop back to the first track
      }
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
      if (currentTrackIndex > 0) {
        loadTrack(currentTrackIndex - 1);
      } else {
        loadTrack(tracks.length - 1); // Loop back to the last track
      }
    });
    
audio.addEventListener('loadedmetadata', () => {
  seekBar.max = audio.duration;
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  seekBar.value = audio.currentTime;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}
seekBar.addEventListener('input', () => {
  audio.currentTime = seekBar.value;
});