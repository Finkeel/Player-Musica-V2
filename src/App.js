import "./App.css";
import { useRef, useState } from "react";

function App() {
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: "Her Majesty",
    songArtist: "The Beatles",
    songSrc: "./Assets/musicas/9convert.com - Her Majesty Remastered 2009.mp3",
    songAvatar: "./Assets/imagens/Beatles_-_Abbey_Road.jpg",
  });

  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLenght, setMusicTotalLength] = useState("00 : 26");
  const [musicCurrentTime, setMusicCurrentTime] = useState("00 : 00");
  const currentAudio = useRef();
  const [videoIndex, setVideoIndex] = useState(0);

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime =
      (e.target.value * currentAudio.current.duration) / 100;
  };

  let avatarClass = ["objectFitCover", "objectFitContain", "none"];
  const [avatarClassIndex, setAvatarClassIndex] = useState(0);
  const handleAvatar = () => {
    if (avatarClassIndex >= avatarClass.length - 1) {
      setAvatarClassIndex(0);
    } else {
      setAvatarClassIndex(avatarClassIndex + 1);
    }
  };

  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      let musicvol = currentAudio.current;
      musicvol.play();
      musicvol.volume = 0.2;
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const musicAPI = [
    {
      songName: "Her Majesty",
      songArtist: "The Beatles",
      songSrc:
        "./Assets/musicas/9convert.com - Her Majesty Remastered 2009.mp3",
      songAvatar: "./Assets/imagens/Beatles_-_Abbey_Road.jpg",
    },
    {
      songName: "Feel Good Inc",
      songArtist: "Gorillaz",
      songSrc: "./Assets/musicas/9convert.com - Feel Good Inc.mp3",
      songAvatar: "./Assets/imagens/gorillaz-artist-profile.jpg",
    },
    {
      songName:
        "The Girl From Ipanema  Frank Sinatra  Antônio Carlos Jobim  Concert Collection",
      songArtist: "Antonio Carlos Jobim & Frank Sinatra",
      songSrc:
        "./Assets/musicas/9convert.com - The Girl From Ipanema  Frank Sinatra  Antônio Carlos Jobim  Concert Collection.mp3",
      songAvatar: "./Assets/imagens/MI0002918295.jpg",
    },
    {
      songName: "The Perfect Girl",
      songArtist: "Mareux",
      songSrc: "./Assets/musicas/Mareux - The Perfect Girl [V1l6kxQNq54].opus",
      songAvatar: "./Assets/imagens/perfectgirl.jpg",
    },
    {
      songName: "Sweden",
      songArtist: "C418",
      songSrc: "./Assets/musicas/c418-sweden-minecraft-volume-alpha.mp3",
      songAvatar: "./Assets/imagens/c418.jpg",
    },
    {
      songName: "Goodbye To A World",
      songArtist: "Porter Robinson",
      songSrc:
        "./Assets/musicas/Porter Robinson - Goodbye To A World (Official Audio) [W2TE0DjdNqI].mp3",
      songAvatar: "./Assets/imagens/goodbyeworld.jpeg",
    },
    {
      songName: "Travelers",
      songArtist: "Andrew Prahlow",
      songSrc: "./Assets/musicas/Travelers [z34enKCqRGk].mp3",
      songAvatar: "./Assets/imagens/travelers.jpeg",
    },
  ];

  const handleNextSong = () => {
    if (musicIndex >= musicAPI.length - 1) {
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const handlePrevSong = () => {
    if (musicIndex === 0) {
      let setNumber = musicAPI.length - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };

  const updateCurrentMusicDetails = (number) => {
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar,
    });
    setIsAudioPlaying(true);
  };

  const handleAudioUpdate = () => {
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLenght0 = `${minutes < 10 ? `0${minutes}` : minutes} : ${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
    setMusicTotalLength(musicTotalLenght0);

    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${
      currentSec < 10 ? `0${currentSec}` : currentSec
    }`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt(
      (currentAudio.current.currentTime / currentAudio.current.duration) * 100
    );
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  const vidArray = [
    "./Assets/Videos/video2.mp4",
    "./Assets/Videos/video3.mp4",
  ];

  const handleChangeBackground = () => {
    if (videoIndex > vidArray.length - 1) {
      setVideoIndex(0);
    } else {
      setVideoIndex(videoIndex + 1);
    }
  };

  return (
    <>
      <div className="container">
        <audio
          src="./Assets/musicas/9convert.com - Her Majesty Remastered 2009.mp3"
          ref={currentAudio}
          onEnded={handleNextSong}
          onTimeUpdate={handleAudioUpdate}
        ></audio>
        <video
          src={vidArray[videoIndex]}
          loop
          muted
          autoPlay
          className="backgroundVideo"
        ></video>
        <div className="blackScreen"></div>
        <div className="music-Container">
          <p className="musicPlayer">Music Player</p>
          <p className="music-Head-Name">{currentMusicDetails.songName}</p>
          <p className="music-Artist-Name">{currentMusicDetails.songArtist}</p>
          <img
            src={currentMusicDetails.songAvatar}
            className={avatarClass[avatarClassIndex]}
            onClick={handleAvatar}
            alt="song Avatar"
            id="songAvatar"
          ></img>
          <div className="musicTimerDiv">
            <p className="musicCurrentTime">{musicCurrentTime}</p>
            <p className="musicTotalLenght">{musicTotalLenght}</p>
          </div>
          <input
            type="range"
            name="musicProgressBar"
            className="musicProgressBar"
            value={audioProgress}
            onChange={handleMusicProgressBar}
          ></input>
          <div className="musicControlers">
            <i
              className="fa-solid fa-backward musicControler"
              onClick={handlePrevSong}
            ></i>
            <i
              className={`fa-solid ${
                isAudioPlaying ? "fa-pause-circle" : "fa-circle-play"
              } playBtn`}
              onClick={handleAudioPlay}
            ></i>
            <i
              className="fa-solid fa-forward musicControler"
              onClick={handleNextSong}
            ></i>
          </div>
        </div>
        <div className="changeBackBtn" onClick={handleChangeBackground}>
          Change Background
        </div>
      </div>
    </>
  );
}

export default App;
