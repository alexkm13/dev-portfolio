'use client';

import { useEffect, useState } from 'react';

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progressMs?: number;
  durationMs?: number;
}

function SoundBars() {
  return (
    <div className="flex items-center gap-[2px] h-3">
      <div className="w-[2px] bg-[var(--foreground)] animate-sound-wave-1" style={{ animationDelay: '0ms' }} />
      <div className="w-[2px] bg-[var(--foreground)] animate-sound-wave-2" style={{ animationDelay: '150ms' }} />
      <div className="w-[2px] bg-[var(--foreground)] animate-sound-wave-3" style={{ animationDelay: '300ms' }} />
      <div className="w-[2px] bg-[var(--foreground)] animate-sound-wave-1" style={{ animationDelay: '450ms' }} />
    </div>
  );
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function NowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [localProgress, setLocalProgress] = useState(0);
  const [currentSongUrl, setCurrentSongUrl] = useState('');
  const [lastIsPlaying, setLastIsPlaying] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/spotify/now-playing', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        const spotifyData = await response.json();

        // Check if song changed
        const songChanged = spotifyData.songUrl && spotifyData.songUrl !== currentSongUrl;

        // Check if play/pause state changed
        const playStateChanged = spotifyData.isPlaying !== lastIsPlaying;

        // Check for drift (allow 2 seconds of tolerance)
        const drift = Math.abs((spotifyData.progressMs || 0) - localProgress);
        const significantDrift = drift > 2000;

        // Sync if: song changed, play state changed, or significant drift
        const needsSync = songChanged || playStateChanged || significantDrift;

        setData(spotifyData);

        if (needsSync && spotifyData.progressMs !== undefined) {
          setLocalProgress(spotifyData.progressMs);
        }

        if (songChanged && spotifyData.songUrl) {
          setCurrentSongUrl(spotifyData.songUrl);
        }

        if (playStateChanged) {
          setLastIsPlaying(spotifyData.isPlaying);
        }
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
        setData({ isPlaying: false });
      }
    };

    // Fetch from Spotify every 2 seconds for faster sync
    fetchNowPlaying();
    const fetchInterval = setInterval(fetchNowPlaying, 2000);

    return () => clearInterval(fetchInterval);
  }, [currentSongUrl, localProgress, lastIsPlaying]);

  // Update local progress every second
  useEffect(() => {
    if (!data?.isPlaying) return;

    const progressInterval = setInterval(() => {
      setLocalProgress((prev) => prev + 1000);
    }, 1000);

    return () => clearInterval(progressInterval);
  }, [data?.isPlaying]);

  if (!data) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[var(--muted)] animate-pulse" />
        <div className="flex-1">
          <div className="h-3 bg-[var(--muted)] w-3/4 mb-2 animate-pulse" />
          <div className="h-2 bg-[var(--muted)] w-1/2 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!data?.isPlaying) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[var(--muted)] flex items-center justify-center">
          <svg className="w-5 h-5 text-[var(--muted-foreground)]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm text-[var(--foreground)]">not playing</p>
          <p className="text-xs text-[var(--muted-foreground)]">spotify</p>
        </div>
      </div>
    );
  }

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 bg-[var(--card)] border border-[var(--border)] backdrop-blur-sm group hover:border-[var(--foreground)] transition-colors"
    >
      <div className="relative w-12 h-12 flex-shrink-0">
        {data.albumImageUrl && (
          <img
            src={data.albumImageUrl}
            alt={data.album}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <SoundBars />
          <span className="text-[10px] text-[var(--muted-foreground)] font-mono">
            {formatTime(localProgress)}
          </span>
        </div>
        <p className="text-sm text-[var(--foreground)] truncate group-hover:text-[var(--link-hover)] transition-colors">
          {data.title}
        </p>
        <p className="text-xs text-[var(--muted-foreground)] truncate">
          {data.artist}
        </p>
      </div>
      <div className="flex-shrink-0">
        <svg className="w-3 h-3 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </a>
  );
}
