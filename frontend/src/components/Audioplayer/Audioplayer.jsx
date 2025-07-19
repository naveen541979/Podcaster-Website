import React, { useEffect, useRef, useState } from 'react';
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { FaPause, FaPlay } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { playerActions } from '../../store/player';

const Audioplayer = () => {
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef();

  const dispatch = useDispatch();
  const playerDivstate = useSelector((state) => state.player.isplayerDiv);
  const songPath = useSelector((state) => state.player.songPath);
  const img = useSelector((state) => state.player.img);

  const closeAudioplayer = (e) => {
    e.preventDefault();
    dispatch(playerActions.closeDiv());
    dispatch(playerActions.changeImage(""));
    dispatch(playerActions.changeSong(""));
    setIsSongPlaying(false);
    setCurrentTime(0);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeupdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedmetadata = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", handleTimeupdate);
    audio.addEventListener("loadedmetadata", handleLoadedmetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeupdate);
      audio.removeEventListener("loadedmetadata", handleLoadedmetadata);
    };
  }, [songPath]);

  const handlePlayPodcast = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isSongPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsSongPlaying(!isSongPlaying);
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const Backward = () => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = Math.max(currentTime - 10, 0);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const Forward = () => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = Math.min(currentTime + 10, duration);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = (e.target.value / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div
      className={`${
        playerDivstate ? "fixed" : "hidden"
      } bottom-0 left-0 w-full bg-zinc-800 text-zinc-300 px-4 py-2 rounded-t-md shadow-md flex items-center gap-2 transition-all duration-300`}
    >
      <div className="hidden md:block w-10">
        <img
          src={img}
          alt="cover"
          className="w-10 h-10 rounded-full object-cover border border-zinc-500"
        />
      </div>

      <div className="w-full md:w-2/3 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3 text-lg">
          <button
            onClick={Backward}
            className="hover:text-white transition-colors duration-200"
          >
            <IoPlaySkipBack />
          </button>
          <button
            onClick={handlePlayPodcast}
            className="text-xl bg-zinc-600 p-1 rounded-full hover:bg-zinc-500 transition"
          >
            {isSongPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button
            onClick={Forward}
            className="hover:text-white transition-colors duration-200"
          >
            <IoPlaySkipForward />
          </button>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={duration ? (currentTime / duration) * 100 : 0}
          className="w-full mt-1 h-1 cursor-pointer accent-zinc-400"
          onChange={handleSeek}
        />

        <div className="w-full flex items-center justify-between text-xs mt-1 px-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="w-1/6 flex items-center justify-end">
        <button
          onClick={closeAudioplayer}
          className="hover:text-red-400 transition-colors duration-200"
        >
          <ImCross />
        </button>
      </div>

      <audio ref={audioRef} src={songPath} />
    </div>
  );
};

export default Audioplayer;
