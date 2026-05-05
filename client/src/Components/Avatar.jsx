import React, { useEffect, useRef, useState } from "react";
import { initAvatar } from "../asl-system/avatarEngine";
import { convertToASL } from "./aslUtils";

export default function Avatar() {
  const mountRef = useRef(null);
  const apiRef = useRef(null);
  const inputRef = useRef(null);

  const [loaded, setLoaded] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [start, setStart] = useState(false);
  const [aslMode, setAslMode] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState("");

  const recognitionRef = useRef(null);
  const isPlayingRef = useRef(false);
  const isRecognitionActiveRef = useRef(false);

  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    if (!mountRef.current) return;

    apiRef.current = initAvatar(
      mountRef.current,
      () => {
        setLoaded(true);
        setTimeout(() => {
          apiRef.current?.focusASL?.();
        }, 200);
      },
      (progress) => setLoadProgress(Math.floor(progress))
    );

    return () => {
      apiRef.current?.dispose?.();
    };
  }, []);

  const playText = async (text) => {
    if (!apiRef.current || isPlayingRef.current) return;

    apiRef.current.clearQueue?.();

    isPlayingRef.current = true;

    const processedText = aslMode ? convertToASL(text) : text;

    const cleaned = processedText
      .toLowerCase()
      .replace(/[.,!?;:()[\]{}"'`]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    const words = cleaned.split(" ");

    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      // Word pause
      if (i > 0) {
        apiRef.current.insertWordPause?.();
      }

      let matched = false;
      let playingText = word;

      // Phrase matching
      for (let len = 3; len > 0; len--) {
        if (i + len > words.length) continue;

        const phrase = words.slice(i, i + len).join(" ");

        if (apiRef.current.playWord?.(phrase)) {
          playingText = phrase;
          i += len - 1;
          matched = true;
          break;
        }
      }
      
      setCurrentPlaying(playingText.toUpperCase());
      if (!matched) {
        // Character spelling
        for (const ch of word) {
          if (ch === "z" || ch === "j") {
            apiRef.current.playWord(ch);
            await apiRef.current.waitForQueue(); 
          } else {
            apiRef.current.playSign(ch);
          }
        }
      }


      // Wait for animation queue
      await apiRef.current.waitForQueue?.();
    }

    setCurrentPlaying("");
    isPlayingRef.current = false;
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    setSpeechSupported(true);

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript;

      playText(transcript);
    };

    recognition.onstart = () => {
      isRecognitionActiveRef.current = true;
    };

    recognition.onend = () => {
      isRecognitionActiveRef.current = false;
      setTimeout(() => {
        setStart(false);
      }, 2000);
    };
  }, []);

  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (start) {
      if (!isRecognitionActiveRef.current) recognition.start();
    } else {
      if (isRecognitionActiveRef.current) recognition.stop();
    }

    return () => {
      if (isRecognitionActiveRef.current) recognition.stop();
    };
  }, [start]);




  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white font-['Inter'] overflow-hidden relative">
      
    
      <div className="absolute top-[10%] left-[10%] w-[50%] h-[50%] bg-cyan-600/25 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-blue-600/25 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div ref={mountRef} className="w-full h-full absolute inset-0 z-0 bg-transparent" />

      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out flex items-center justify-center gap-3 px-6 py-2.5 rounded-full border shadow-2xl backdrop-blur-md ${
          currentPlaying 
            ? 'opacity-100 translate-y-0 bg-cyan-900/40 border-cyan-500/50 scale-100' 
            : 'opacity-0 -translate-y-4 bg-transparent border-transparent scale-95 pointer-events-none'
        }`}
      >
        <span className="text-sm font-semibold tracking-[0.2em] text-cyan-50 uppercase">
          {currentPlaying || "WAITING"}
        </span>
      </div>

  
      <button 
        onClick={() => setAslMode(!aslMode)}
        className={`absolute top-6 left-6 md:top-8 md:left-8 z-50 w-[50px] h-[50px] rounded-full flex flex-col  border-2 border-white/20 items-center justify-center font-bold tracking-wider transition-all duration-300 shadow-xl  backdrop-blur-md ${
          aslMode 
            ? 'bg-red-500/80 text-white  hover:text-gray-300' 
            : 'bg-black/10 text-gray-700  hover:text-gray-300'
        }`}
        
      >
        <span className="text-base">ASL</span>
      </button>

      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]/80 z-50 backdrop-blur-md">
          <div className="text-xl font-semibold tracking-wider text-gray-300 mb-6 animate-pulse uppercase">
            Loading Avatar...
          </div>
          <div className="w-64 h-2 bg-[#111] rounded-full overflow-hidden shadow-inner border border-white/5">
            <div
              className="h-full bg-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            ></div>
          </div>
          <div className="mt-4 text-xs text-gray-500 tracking-widest font-medium">
            {loadProgress}%
          </div>
        </div>
      )}

      <div className="absolute bottom-6 mx-auto z-10 w-[95%] md:w-[90%] max-w-4xl p-6 rounded-[2rem] bg-[#111]/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)] flex flex-col gap-6 transition-all hover:bg-[#111]/90">
        
        <div className="flex flex-col items-center justify-center px-2">
          <button
            disabled={!speechSupported}
            onClick={() => setStart(!start)}
            className={`py-2.5 px-6 text-sm font-semibold tracking-wide rounded-full transition-all duration-300 border disabled:opacity-40 flex items-center justify-center gap-2 ${
              start 
                ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${start ? 'bg-red-500 animate-pulse' : 'bg-cyan-400'}`}></div>
            {start ? "Stop Mic" : "Start Mic"}
          </button>
        </div>

        <div className="flex gap-3 justify-center w-full">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message to sign..."
            className="px-6 py-3.5 rounded-full bg-black/60 border border-white/10 text-gray-200 w-full max-w-md focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder-gray-600 transition-all shadow-inner font-light tracking-wide text-sm md:text-base"
          />
          <button
            onClick={() => playText(inputRef.current.value)}
            className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold tracking-wide rounded-full hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Translate
          </button>
        </div>

      </div>
    </div>
  );
}