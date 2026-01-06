import { useEffect, useRef, useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import HeroSection from "../components/PodcastHeroSection";
import Footer from "../components/Footer";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  youtubeUrl: string;
  description: string;
  views: string;
  uploadedAt: string;
  channel: string;
}

const VIDEOS: Video[] = [
  {
    // Video replaced with the provided YouTube link
    id: "ptM7VToUWIQ",
    title: "Uju Asumpta — Quiet Beginnings",
    thumbnail: "https://img.youtube.com/vi/ptM7VToUWIQ/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=ptM7VToUWIQ",
    description:
      "A short reflection from Uju Asumpta titled 'Quiet Beginnings' — pause, reflect and root your identity in God as you begin the year.",
    views: "",
    uploadedAt: "",
    channel: "Uju Asumpta",
  },
];

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

export default function VideoPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Transcript open state
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  // For custom progress bar interactions
  const [hoverPercent, setHoverPercent] = useState<number | null>(null);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [isSeeking, setIsSeeking] = useState(false);

  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const updateIntervalRef = useRef<number | null>(null);

  // Load YouTube IFrame API once
  useEffect(() => {
    if ((window as any).YT && (window as any).YT.Player) return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    (window as any).onYouTubeIframeAPIReady = () => {
      // nothing here - player will be created when a video is selected
    };
  }, []);

  // Create / load player when selectedVideo changes
  useEffect(() => {
    if (!selectedVideo) return;

    const createPlayer = () => {
      if (!playerContainerRef.current) return;

      // If we already have a player, load the new video
      if (playerRef.current) {
        try {
          playerRef.current.loadVideoById(selectedVideo.id);
        } catch {
          // fallback: destroy & recreate
          playerRef.current.destroy();
          playerRef.current = null;
        }
      }

      if (!playerRef.current && (window as any).YT) {
        playerRef.current = new (window as any).YT.Player(
          playerContainerRef.current,
          {
            videoId: selectedVideo.id,
            playerVars: {
              rel: 0,
              modestbranding: 1,
              controls: 0, // hide native controls — we use custom controls
              disablekb: 1,
            },
            events: {
              onReady: (e: any) => {
                try {
                  const dur = e.target.getDuration();
                  setDuration(dur || 0);
                  setVolume(100);
                  e.target.setVolume(100);
                } catch {
                  setDuration(0);
                }
              },
              onStateChange: (e: any) => {
                // YT.PlayerState.PLAYING === 1
                if (e.data === 1) {
                  setIsPlaying(true);
                  // start interval to update currentTime
                  if (updateIntervalRef.current) {
                    window.clearInterval(updateIntervalRef.current);
                  }
                  updateIntervalRef.current = window.setInterval(() => {
                    try {
                      const t = playerRef.current.getCurrentTime();
                      setCurrentTime(t);
                      const d = playerRef.current.getDuration();
                      setDuration(d || 0);
                    } catch {
                      /* ignore */
                    }
                  }, 250);
                } else {
                  setIsPlaying(false);
                  if (updateIntervalRef.current) {
                    window.clearInterval(updateIntervalRef.current);
                    updateIntervalRef.current = null;
                  }
                }
              },
            },
          }
        );
      }
    };

    if ((window as any).YT && (window as any).YT.Player) {
      createPlayer();
    } else {
      // wait for API ready
      const handler = () => createPlayer();
      (window as any).onYouTubeIframeAPIReady = handler;
      // also try fallback delay
      const t = window.setTimeout(() => {
        if ((window as any).YT && (window as any).YT.Player) createPlayer();
      }, 1000);
      return () => window.clearTimeout(t);
    }

    return () => {
      // cleanup interval when selecting another video
      if (updateIntervalRef.current) {
        window.clearInterval(updateIntervalRef.current);
        updateIntervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVideo]);

  // Clean up player on unmount
  useEffect(() => {
    return () => {
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      if (updateIntervalRef.current) {
        window.clearInterval(updateIntervalRef.current);
        updateIntervalRef.current = null;
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds) || seconds < 0) return "0:00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    const state = playerRef.current.getPlayerState();
    // playing state === 1
    if (state === 1) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (
      playerRef.current &&
      typeof playerRef.current.setVolume === "function"
    ) {
      playerRef.current.setVolume(value);
    }
  };

  // progress bar interactions — mimic YouTube behavior: preview on hover and seek on click/drag
  const computeTimeFromClientX = (clientX: number) => {
    const bar = progressBarRef.current;
    if (!bar || !duration) return 0;
    const rect = bar.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = x / rect.width;
    return percent * duration;
  };

  const handleProgressMouseMove = (e: React.MouseEvent) => {
    if (!progressBarRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = x / rect.width;
    setHoverPercent(percent);
    setHoverTime(percent * duration);
    if (isSeeking) {
      // update visually while dragging
      setCurrentTime(percent * duration);
    }
  };

  const handleProgressMouseLeave = () => {
    setHoverPercent(null);
    setHoverTime(null);
    if (isSeeking) {
      // keep showing currentTime while dragging
    }
  };

  const handleProgressMouseDown = (e: React.MouseEvent) => {
    if (!duration || !playerRef.current) return;
    setIsSeeking(true);
    const t = computeTimeFromClientX(e.clientX);
    setCurrentTime(t);
  };

  const handleProgressMouseUp = (e: React.MouseEvent) => {
    if (!isSeeking || !playerRef.current) {
      setIsSeeking(false);
      return;
    }
    const t = computeTimeFromClientX(e.clientX);
    playerRef.current.seekTo(t, true);
    setCurrentTime(t);
    setIsSeeking(false);
  };

  const playedPercent = duration ? (currentTime / duration) * 100 : 0;
  const hoverPercentPct = hoverPercent != null ? hoverPercent * 100 : null;

  // Transcript content (from your provided text)
  const TRANSCRIPT = {
    intro:
      "Hello, beautiful souls! Welcome to ‘Quiet Beginnings’ with Uju Asumpta. Today, we pause to welcome the new year and the new light God is bringing into our lives.",
    story:
      "I remember standing by the window on the first day of a year long ago, feeling the crisp morning air and realizing that each day is a blank page. God gives us each year as a gift, a fresh chance to be who He created us to be.",
    reflection:
      "This year, I invite you to root your identity in God, not in achievements or expectations. Let your first step be towards knowing yourself in His light.",
    prompt:
      "Take a deep breath and ask: ‘Lord, show me who You made me to be this year.’ Sit in silence for a moment and listen.",
    monetization:
      "If you’d like to explore these reflections more deeply, our companion journal has prompts to help you capture your journey.",
    closing:
      "Thank you for pausing with me today. May your heart be anchored in peace, and your steps guided by love.",
  };

  return (
    <>
      <HeroSection />
      <div className="min-h-screen bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {selectedVideo ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Player / Main */}
              <div className="lg:col-span-2">
                <div
                  className={`bg-gray-100 rounded-lg overflow-hidden ${
                    isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""
                  }`}
                >
                  <div
                    className={`relative bg-black ${
                      isFullscreen ? "w-screen h-screen" : "w-full aspect-video"
                    }`}
                  >
                    {/* player container where YT.Player mounts */}
                    <div ref={playerContainerRef} className="w-full h-full" />

                    {/* Custom controls overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-auto">
                      {/* Progress bar (custom) */}
                      <div
                        ref={progressBarRef}
                        className="relative h-2 bg-gray-300 rounded cursor-pointer"
                        onMouseMove={handleProgressMouseMove}
                        onMouseLeave={handleProgressMouseLeave}
                        onMouseDown={handleProgressMouseDown}
                        onMouseUp={handleProgressMouseUp}
                      >
                        {/* played portion */}
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-red-600 rounded"
                          style={{ width: `${playedPercent}%` }}
                        />
                        {/* hover preview indicator (thin lighter bar like YouTube) */}
                        {hoverPercentPct != null && (
                          <div
                            className="absolute top-0 bottom-0 rounded pointer-events-none"
                            style={{
                              left: `${hoverPercentPct}%`,
                              width: 2,
                              transform: "translateX(-50%)",
                              background: "rgba(255,255,255,0.9)",
                              height: "10px",
                              marginTop: "-4px",
                            }}
                          />
                        )}
                      </div>

                      {/* Controls row */}
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={togglePlay}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded"
                            aria-label="Play / Pause"
                          >
                            <Play className="w-4 h-4 text-white" />
                          </button>

                          <div className="flex items-center gap-2 text-xs text-white">
                            <span>{formatTime(currentTime)}</span>
                            <span className="text-gray-400">/</span>
                            <span>{formatTime(duration)}</span>
                          </div>

                          <input
                            aria-label="Volume"
                            type="range"
                            min={0}
                            max={100}
                            value={volume}
                            onChange={(e) =>
                              handleVolumeChange(Number(e.target.value))
                            }
                            className="w-24"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={selectedVideo.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-xs text-white rounded"
                          >
                            <ExternalLink className="w-4 h-4" />
                            YouTube
                          </a>
                          <button
                            onClick={() => setIsFullscreen((s) => !s)}
                            className="px-2 py-1 border rounded text-xs"
                          >
                            {isFullscreen ? "Exit" : "Fullscreen"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title + profile picture + transcript button (description removed as requested) */}
                <div className="mt-4">
                  <h1 className="text-2xl font-bold mb-2">
                    {selectedVideo.title}
                  </h1>

                  <div className="flex items-start gap-4">
                    <img
                      src={selectedVideo.thumbnail}
                      alt={selectedVideo.channel}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                      {/* Transcript toggle (now replaces the description paragraph) */}
                      <div className="mt-0">
                        <button
                          onClick={() => setTranscriptOpen((s) => !s)}
                          aria-expanded={transcriptOpen}
                          aria-controls="transcript-panel"
                          className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                        >
                          {transcriptOpen
                            ? "Hide transcript"
                            : "Show transcript"}
                        </button>

                        <div
                          id="transcript-panel"
                          role="region"
                          aria-hidden={!transcriptOpen}
                          className="mt-3 overflow-hidden transition-all duration-300"
                          style={{
                            maxHeight: transcriptOpen ? 1000 : 0,
                          }}
                        >
                          {transcriptOpen && (
                            <div className="text-sm text-gray-800 space-y-3 p-3 bg-gray-50 rounded">
                              <div>
                                <strong>Intro:</strong>
                                <p className="mt-1">{TRANSCRIPT.intro}</p>
                              </div>

                              <div>
                                <strong>Story / Insight:</strong>
                                <p className="mt-1">{TRANSCRIPT.story}</p>
                              </div>

                              <div>
                                <strong>Reflection / Lesson:</strong>
                                <p className="mt-1">{TRANSCRIPT.reflection}</p>
                              </div>

                              <div>
                                <strong>Prompt / Meditation:</strong>
                                <p className="mt-1">{TRANSCRIPT.prompt}</p>
                              </div>

                              <div>
                                <strong>Soft Monetization:</strong>
                                <p className="mt-1">
                                  {TRANSCRIPT.monetization}
                                </p>
                              </div>

                              <div>
                                <strong>Closing:</strong>
                                <p className="mt-1">{TRANSCRIPT.closing}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Watch on YouTube link (transcript appears above this) */}
                      <div className="mt-4">
                        <a
                          href={selectedVideo.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full font-semibold text-white transition"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Watch on YouTube
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - show other videos (thumbnails + title only) */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-black">
                  More videos
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {VIDEOS.filter((v) => v.id !== selectedVideo.id).map(
                    (video) => (
                      <button
                        key={video.id}
                        onClick={() => setSelectedVideo(video)}
                        className="flex gap-3 hover:opacity-90 transition text-left w-full"
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-24 h-14 rounded object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold line-clamp-2 text-black">
                            {video.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            {video.channel}
                          </p>
                        </div>
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Grid of videos (only one entry currently)
            <div>
              <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4 text-black">
                  Popular Videos on YouTube
                </h1>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  Click any video to play it here on the site or open it on
                  YouTube.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {VIDEOS.map((video) => (
                  <div
                    key={video.id}
                    className="group cursor-pointer"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="relative rounded-lg overflow-hidden mb-3 bg-gray-100">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="bg-red-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-5 h-5 fill-white" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold line-clamp-2 mb-1 text-black">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600">{video.channel}</p>
                      <a
                        href={video.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 text-xs mt-2 transition"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Open on YouTube
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
