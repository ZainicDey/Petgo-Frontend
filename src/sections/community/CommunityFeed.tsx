'use client';

import React, { useState } from 'react';
import ThreadCard, { Thread } from './ThreadCard';

/* ── Seed Data ── */
const SEED_THREADS: Thread[] = [
  {
    id: '1',
    author: 'Rahul Ahmed',
    handle: 'rahulahmed',
    content:
      '🐾 Just adopted a golden retriever named Mango! He already owns the couch and my heart. Best decision of my life. #PetGo #GoldenRetriever',
    likes: 2481,
    replies: 189,
    reposts: 172,
    time: '2h',
  },
  {
    id: '2',
    author: 'Nadia Islam',
    handle: 'nadiaislam',
    content:
      'Reminder: summer heat is dangerous for pets 🌡️ Keep water accessible at all times, avoid walks during peak hours (12–4pm), and never leave your pet in a parked car. Stay safe everyone! 🐶🐱',
    likes: 1730,
    replies: 94,
    reposts: 445,
    time: '5h',
    liked: true,
  },
  {
    id: '3',
    author: 'Kazi Farhan',
    handle: 'kazifarhan',
    content:
      'My cat Luna has been doing this thing where she just stares at me while I eat. She has her own bowl. She has been fed. She is plotting something.',
    likes: 6120,
    replies: 241,
    reposts: 1830,
    time: '9h',
  },
  {
    id: '4',
    author: 'Sinthia Chowdhury',
    handle: 'sinthiac',
    content:
      "PetGo's new vet-finder feature is a lifesaver! Found a great local vet in under 2 minutes for my rabbit, Biscuit. Highly recommend 🐰✨",
    likes: 892,
    replies: 45,
    reposts: 113,
    time: '12h',
  },
  {
    id: '5',
    author: 'Arif Hossain',
    handle: 'arifhossain',
    content:
      'Hot take: cats are better apartment pets than dogs. Change my mind. (Please, my dog is destroying my couch as I type this 😭)',
    likes: 3400,
    replies: 772,
    reposts: 225,
    time: '1d',
  },
  {
    id: '6',
    author: 'Mehrin Sultana',
    handle: 'mehrins',
    content:
      'Our foster cat Zara had her kittens last night! 🐱🐱🐱 Four little fluffballs, all healthy. Will be posting updates. If anyone in Dhaka is interested in adopting, DM me through PetGo!',
    likes: 5211,
    replies: 388,
    reposts: 894,
    time: '1d',
  },
  {
    id: '7',
    author: 'Tanvir Alam',
    handle: 'tanviralam',
    content:
      "Pro tip for new pet owners: record a short video of your pet every month. You think you'll remember how tiny they were when you first got them but you won't. Future you will thank present you. 🐶❤️",
    likes: 11200,
    replies: 512,
    reposts: 4300,
    time: '2d',
  },
  {
    id: '8',
    author: 'Farzana Begum',
    handle: 'farzanabegum',
    content:
      "Vet bills can be brutal 💸 Is anyone else using a pet health insurance plan? Thinking of signing up for one before my dog Oreo inevitably eats something he shouldn't.",
    likes: 1890,
    replies: 263,
    reposts: 88,
    time: '2d',
  },
];

type FeedTab = 'foryou' | 'following';

export default function CommunityFeed() {
  const [activeTab, setActiveTab] = useState<FeedTab>('foryou');
  const [threads, setThreads] = useState<Thread[]>(SEED_THREADS);

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
            Following
          </button>
        </div>
      </div>

      {/* Main Feed Container */}
      <div className="border border-white/20 rounded-3xl bg-[#101010] overflow-hidden mt-4">
        {/* What's new box */}
        <div
          className="flex items-center gap-3 py-4 px-5 border-b border-white/20 cursor-text"
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
        {threads.map((thread, i) => (
          <ThreadCard
            key={thread.id}
            thread={thread}
            index={i}
            showLine={false}
          />
        ))}
      </div>
    </div>
  );
}
