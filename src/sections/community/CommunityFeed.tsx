'use client';

import React, { useState, useEffect } from 'react';
import ThreadCard, { Thread } from './ThreadCard';
import ThreadFeedSkeleton from './ThreadSkeleton';
import SEED_THREADS from './threadData';

type FeedTab = 'foryou' | 'following';

export default function CommunityFeed() {
  const [activeTab, setActiveTab] = useState<FeedTab>('foryou');
  const [threads, setThreads] = useState<Thread[]>(SEED_THREADS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Collect all unique images from SEED_THREADS to preload
    const imageUrls: string[] = [];
    SEED_THREADS.forEach((t) => {
      if (t.images) {
        t.images.forEach((img) => {
          if (!imageUrls.includes(img)) imageUrls.push(img);
        });
      }
      if (t.image && !imageUrls.includes(t.image)) {
        imageUrls.push(t.image);
      }
      if (t.avatar && !imageUrls.includes(t.avatar)) {
        imageUrls.push(t.avatar);
      }
    });

    const preloadAll = async () => {
      // 1. Minimum 1.2s skeleton display duration to make it look smooth and deliberate
      const delayPromise = new Promise((resolve) => setTimeout(resolve, 1200));

      // 2. Preload images
      const imagePromises = imageUrls.map((url) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Resolve anyway to avoid blocking on bad URLs
        });
      });

      await Promise.all([...imagePromises, delayPromise]);

      if (isMounted) {
        setIsLoading(false);
      }
    };

    preloadAll();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleNewThread = (content: string) => {
    const newThread: Thread = {
      id: Date.now().toString(),
      author: 'You',
      handle: 'you',
      content,
      likes: 0,
      replies: 0,
      reposts: 0,
      time: 'now',
    };
    setThreads((prev) => [newThread, ...prev]);
  };

  return (
    <div className="max-w-[680px] mx-auto px-4 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#101010]/92 backdrop-blur-md pt-5 mb-1">
        <div className="flex mb-5">
          <button
            id="community-tab-foryou"
            className={`flex-1 py-3 px-4 bg-transparent border-none text-[15px] font-medium cursor-pointer relative transition-colors hover:text-[#ffe1bd] font-inherit ${activeTab === 'foryou' ? "text-[#ffe1bd] font-semibold after:content-[''] after:absolute after:-bottom-px after:left-6 after:right-6 after:h-[1px] after:bg-[#F7941D] after:rounded-t-sm" : 'text-white/40'}`}
            onClick={() => setActiveTab('foryou')}
          >
            For you
          </button>
          <button
            id="community-tab-following"
            className={`flex-1 py-3 px-4 bg-transparent border-none text-[15px] font-medium cursor-pointer relative transition-colors hover:text-[#ffe1bd] font-inherit ${activeTab === 'following' ? "text-[#ffe1bd] font-semibold after:content-[''] after:absolute after:-bottom-px after:left-6 after:right-6 after:h-[1px] after:bg-[#F7941D] after:rounded-t-sm" : 'text-white/40'}`}
            onClick={() => setActiveTab('following')}
          >
            Liked
          </button>
        </div>
      </div>

      {/* Main Feed Container */}
      <div className="border-1 border-white/4 rounded-3xl bg-[#181818]/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(255,255,255,0.022)] overflow-hidden mt-4">
        {/* What's new box */}
        <div
          className="flex items-center gap-3 py-4 px-5 border-b border-white/5 cursor-text"
          onClick={() => document.getElementById('whats-new-input')?.focus()}
        >
          <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center shrink-0 text-white">
            <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 fill-[#888]">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <input
            id="whats-new-input"
            className="flex-1 bg-transparent border-none outline-none text-white text-base font-light placeholder:text-white/35"
            placeholder="What's new?"
            type="text"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value) {
                handleNewThread(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
          <button
            className="bg-transparent text-white border border-white/20 rounded-full py-1.5 px-4 text-sm font-semibold cursor-pointer transition-colors hover:bg-white/5 hover:border-white/40"
            onClick={() => {
              const input = document.getElementById(
                'whats-new-input'
              ) as HTMLInputElement;
              if (input && input.value) {
                handleNewThread(input.value);
                input.value = '';
              }
            }}
          >
            Post
          </button>
        </div>

        {/* Thread List */}
        {isLoading ? (
          <ThreadFeedSkeleton />
        ) : (
          threads.map((thread, i) => (
            <ThreadCard
              key={thread.id}
              thread={thread}
              index={i}
              showLine={false}
            />
          ))
        )}
      </div>
    </div>
  );
}
