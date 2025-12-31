import { useState } from "react";
import { Play, ExternalLink, Share2, ThumbsUp, ThumbsDown } from "lucide-react";
import HeroSection from "../components/HeroSection";
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
    id: "dQw4w9WgXcQ",
    title: "Rick Astley - Never Gonna Give You Up (Official Video)",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault. jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description:
      "Rick Astley's official music video for 'Never Gonna Give You Up'. A classic that never gets old!  ",
    views: "1.2B",
    uploadedAt: "Oct 25, 2009",
    channel: "Rick Astley",
  },
  {
    id: "9bZkp7q19f0",
    title: "PSY - GANGNAM STYLE(강남스타일) M/V",
    thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    description:
      "PSY - GANGNAM STYLE(강남스타일) M/V @ https://youtu.be/9bZkp7q19f0 The phenomenon, the dance craze, the music video that broke YouTube.",
    views: "4.8B",
    uploadedAt: "Jul 15, 2012",
    channel: "officialpsy",
  },
  {
    id: "jNQXAC9IVRw",
    title: "Me at the zoo",
    thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault. jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    description:
      "The first video ever uploaded to YouTube on April 23, 2005. Me at the zoo.  San Diego Zoo, California.",
    views: "300M",
    uploadedAt: "Apr 23, 2005",
    channel: "jawed",
  },
  {
    id: "OPf0YbXqDm0",
    title: "Justin Bieber - Baby ft. Ludacris",
    thumbnail: "https://img.youtube.com/vi/OPf0YbXqDm0/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=OPf0YbXqDm0",
    description:
      "Baby by Justin Bieber featuring Ludacris. One of the most viewed music videos on YouTube.",
    views: "3.2B",
    uploadedAt: "Feb 19, 2010",
    channel: "JustinBieberVEVO",
  },
  {
    id: "kJQP7kiw9Fk",
    title: "Luis Fonsi - Despacito ft.  Daddy Yankee",
    thumbnail: "https://img.youtube.com/vi/kJQP7kiw9Fk/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=kJQP7kiw9Fk",
    description:
      "Luis Fonsi - Despacito ft. Daddy Yankee. The most viewed video on YouTube (as of 2024).",
    views: "8.3B",
    uploadedAt: "Jan 12, 2017",
    channel: "Luis Fonsi",
  },
  {
    id: "5NV6Rdv1a3I",
    title: "Wiz Khalifa - See You Again ft. Charlie Puth",
    thumbnail: "https://img.youtube.com/vi/5NV6Rdv1a3I/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=5NV6Rdv1a3I",
    description:
      "Wiz Khalifa - See You Again ft. Charlie Puth. Official video from the Furious 7 soundtrack.",
    views: "3.8B",
    uploadedAt: "Mar 30, 2015",
    channel: "Wiz Khalifa",
  },
  {
    id: "9D-QcZUk-XI",
    title: "The Weeknd - Blinding Lights",
    thumbnail: "https://img.youtube.com/vi/9D-QcZUk-XI/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=9D-QcZUk-XI",
    description:
      "The Weeknd - Blinding Lights. Official video for the hit single from the album 'After Hours'.",
    views: "4.2B",
    uploadedAt: "Jan 14, 2020",
    channel: "The Weeknd",
  },
  {
    id: "aqz-KE-bpKQ",
    title: "Adele - Rolling in the Deep",
    thumbnail: "https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    description:
      "Adele - Rolling in the Deep. Official video for the powerful ballad from the album '21'.",
    views: "2.9B",
    uploadedAt: "Nov 29, 2010",
    channel: "Adele",
  },
  {
    id: "vHE7Bqr9Zks",
    title: "Ava Max - Kings & Queens",
    thumbnail: "https://img.youtube.com/vi/vHE7Bqr9Zks/maxresdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=vHE7Bqr9Zks",
    description:
      "Ava Max - Kings & Queens. Official music video for the empowering pop anthem.",
    views: "1.1B",
    uploadedAt: "Sep 4, 2019",
    channel: "Ava Max",
  },
];

export default function VideoPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      setDisliked(false);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      setLiked(false);
    }
  };

  return (
    <>
      <HeroSection />
      <div className="min-h-screen bg-white text-black">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {selectedVideo ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Video Player Section */}
              <div className="lg:col-span-2">
                {/* Video Player Container */}
                <div
                  className={`bg-gray-200 rounded-lg overflow-hidden ${
                    isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""
                  }`}
                >
                  {/* Embed YouTube iframe */}
                  <div
                    className={`relative bg-black ${
                      isFullscreen ? "w-screen h-screen" : "w-full aspect-video"
                    }`}
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${
                        selectedVideo.id
                      }?autoplay=${isPlaying ? 1 : 0}`}
                      title={selectedVideo.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />

                    {/* Custom Controls Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 group hover:opacity-100 opacity-0 transition-opacity duration-300">
                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="w-full bg-gray-600 h-1 rounded cursor-pointer hover:h-2 transition-all">
                          <div
                            className="bg-red-600 h-full rounded"
                            style={{
                              width: `${(currentTime / duration) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="hover:bg-white/20 p-2 rounded transition"
                          >
                            <Play
                              className="w-5 h-5 text-white"
                              fill="currentColor"
                            />
                          </button>

                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="w-20 cursor-pointer"
                          />

                          <span className="text-sm text-white">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={selectedVideo.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:bg-white/20 p-2 rounded transition flex items-center gap-2"
                          >
                            <ExternalLink className="w-5 h-5 text-white" />
                            <span className="text-xs text-white">YouTube</span>
                          </a>

                          <button
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            className="hover:bg-white/20 p-2 rounded transition"
                          >
                            <svg
                              className="w-5 h-5 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Title and Info */}
                <div className="mt-4">
                  <h1 className="text-2xl font-bold mb-4 text-black">
                    {selectedVideo.title}
                  </h1>

                  {/* Channel and Stats */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-black">
                          {selectedVideo.channel}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedVideo.views} views •{" "}
                          {selectedVideo.uploadedAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                          liked
                            ? "bg-gray-300 text-black"
                            : "bg-gray-200 hover:bg-gray-300 text-black"
                        }`}
                      >
                        <ThumbsUp className="w-5 h-5" />
                        <span className="text-sm">Like</span>
                      </button>
                      <button
                        onClick={handleDislike}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                          disliked
                            ? "bg-gray-300 text-black"
                            : "bg-gray-200 hover:bg-gray-300 text-black"
                        }`}
                      >
                        <ThumbsDown className="w-5 h-5" />
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full transition text-black">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-black mb-2">
                      <strong>{selectedVideo.views} views</strong>
                    </p>
                    <p className="text-sm text-gray-800">
                      {selectedVideo.description}
                    </p>
                    <button className="text-blue-600 hover:text-blue-800 text-sm mt-2">
                      Show more
                    </button>
                  </div>

                  {/* Go to YouTube Button */}
                  <div className="mt-4">
                    <a
                      href={selectedVideo.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-semibold transition text-white"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              </div>

              {/* Sidebar - Recommended Videos */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-black">
                  More from this creator
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {VIDEOS.filter((v) => v.id !== selectedVideo.id)
                    .slice(0, 5)
                    .map((video) => (
                      <button
                        key={video.id}
                        onClick={() => setSelectedVideo(video)}
                        className="flex gap-3 hover:opacity-80 transition text-left w-full"
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
                          <p className="text-xs text-gray-600 mt-1">
                            {video.channel}
                          </p>
                          <p className="text-xs text-gray-500">
                            {video.views} views
                          </p>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Header Text */}
              <div className="mb-12 text-center">
                <h1 className="text-5xl font-bold mb-4 text-black">
                  Popular Videos on YouTube
                </h1>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                  Watch the most viewed and iconic videos from YouTube. Click on
                  any video to play it here on our site or visit YouTube
                  directly.
                </p>
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {VIDEOS.map((video) => (
                  <div
                    key={video.id}
                    className="group cursor-pointer"
                    onClick={() => setSelectedVideo(video)}
                  >
                    {/* Thumbnail */}
                    <div className="relative rounded-lg overflow-hidden mb-3 bg-gray-200">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="bg-red-600 rounded-full p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-6 h-6 fill-white" />
                        </div>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div>
                      <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-gray-700 text-black">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {video.channel}
                      </p>
                      <p className="text-sm text-gray-600">
                        {video.views} views • {video.uploadedAt}
                      </p>
                    </div>

                    {/* YouTube Link */}
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
