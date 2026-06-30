'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Thread } from './ThreadCard';
import { getThreadById } from './threadData';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

/* ── Avatar helpers ── */
const AVATAR_COLORS = [
  '#f7941d',
  '#e05c97',
  '#5c8ae0',
  '#5ce087',
  '#e0c45c',
  '#c45ce0',
  '#5ce0d8',
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

/* ── Icons ── */
const BackArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none">
    {filled ? (
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#e0245e" />
    ) : (
      <path d="M16.5 3C14.76 3 13.09 3.81 12 5.09 10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" fill="currentColor" />
    )}
  </svg>
);

const CommentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RepostIcon = ({ active }: { active?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M17 1l4 4-4 4" stroke={active ? '#00c37d' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4" stroke={active ? '#00c37d' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 13v2a4 4 0 01-4 4H3" stroke={active ? '#00c37d' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="16 6 12 2 8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ImageAttachIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
    <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GifIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
    <text x="12" y="15" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="700" fontFamily="sans-serif">GIF</text>
  </svg>
);

const ExpandIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="5" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="19" r="1.5" fill="currentColor" />
  </svg>
);

/* ── Comment types & mock data ── */
interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  time: string;
  likes: number;
  liked?: boolean;
  emoji?: string;
  translate?: boolean;
}

function generateComments(thread: Thread): Comment[] {
  const pool: Comment[] = [
    { id: 'c1', author: 'skononkhanskononkhan', content: 'Loveyou', time: '2h', likes: 1 },
    { id: 'c2', author: 'mdsaher9', content: 'Nice view', time: '18h', likes: 1, emoji: '💕' },
    { id: 'c3', author: 'mohammadborhanuddinovi', content: 'Mashallah sundor 👋 😊', time: '19h', likes: 1, emoji: '💕', translate: true },
    { id: 'c4', author: 'love_social_39', content: 'Beautiful! ❤️', time: '17h', likes: 3 },
    { id: 'c5', author: 'petlover_bd', content: 'So cute! Where did you get them? 🐾', time: '5h', likes: 7 },
    { id: 'c6', author: 'furry_friends_dhk', content: 'This made my day 😍', time: '12h', likes: 4 },
    { id: 'c7', author: 'animal_rescue_bd', content: "Wonderful! Adopt, don't shop! 🙌", time: '1d', likes: 12 },
    { id: 'c8', author: 'happy_paws_22', content: 'Goals! 🎯✨', time: '8h', likes: 2 },
  ];

  let seed = 0;
  for (let i = 0; i < thread.id.length; i++) seed += thread.id.charCodeAt(i);
  const shuffled = [...pool].sort((a, b) => {
    const ha = (a.id.charCodeAt(1) * seed) % 100;
    const hb = (b.id.charCodeAt(1) * seed) % 100;
    return ha - hb;
  });

  return shuffled.slice(0, Math.min(shuffled.length, Math.max(3, thread.replies % 8 + 3)));
}

/* ── Single comment row ── */
function CommentItem({ comment, index }: { comment: Comment; index: number }) {
  const [liked, setLiked] = useState(comment.liked ?? false);
  const [likes, setLikes] = useState(comment.likes);
  const color = getAvatarColor(comment.author);
  const initials = comment.author[0]?.toUpperCase() ?? '?';

  return (
    <div
      className="flex gap-3 py-4 px-5 border-b border-white/5 animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${color}dd, ${color}88)` }}
        >
          {initials}
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 bg-[#181818] rounded-full flex items-center justify-center w-3.5 h-3.5">
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 fill-white">
            <path d="M8 2a6 6 0 100 12A6 6 0 008 2zM8 1a7 7 0 110 14A7 7 0 018 1zm3 6.5H8.5V4.5a.5.5 0 00-1 0v3H4.5a.5.5 0 000 1h3v3a.5.5 0 001 0v-3h3a.5.5 0 000-1z" fillRule="evenodd" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-baseline gap-2">
            <span className="text-[14px] font-semibold text-white truncate max-w-[180px]">{comment.author}</span>
            <span className="text-[13px] text-white/35">{comment.time}</span>
          </div>
          <div className="flex items-center gap-1">
            {comment.emoji && <span className="text-sm">{comment.emoji}</span>}
            <button className="bg-transparent border-none text-white/30 cursor-pointer p-1 rounded-md transition-colors hover:bg-white/10 hover:text-white/60">
              <MoreIcon />
            </button>
          </div>
        </div>

        <p className="text-[14px] font-light leading-relaxed text-white/90 mb-1.5 break-words">{comment.content}</p>

        {comment.translate && (
          <button className="bg-transparent border-none text-white/40 text-[13px] cursor-pointer p-0 mb-1.5 hover:text-white/60 transition-colors font-inherit">
            Translate
          </button>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3.5 mt-0.5">
          <button
            className={`flex items-center gap-1 bg-transparent border-none cursor-pointer py-0.5 px-1 rounded-md text-xs transition-all font-inherit hover:bg-white/5 ${liked ? 'text-[#e0245e]' : 'text-white/40 hover:text-white/70'}`}
            onClick={() => { setLiked(!liked); setLikes((l) => (!liked ? l + 1 : l - 1)); }}
          >
            <div className="w-4 h-4 shrink-0"><HeartIcon filled={liked} /></div>
            <span className="text-[12px] font-medium">{likes}</span>
          </button>
          <button className="flex items-center bg-transparent border-none text-white/40 cursor-pointer py-0.5 px-1 rounded-md transition-all hover:text-white/70 hover:bg-white/5">
            <div className="w-4 h-4 shrink-0"><CommentIcon /></div>
          </button>
          <button className="flex items-center bg-transparent border-none text-white/40 cursor-pointer py-0.5 px-1 rounded-md transition-all hover:text-white/70 hover:bg-white/5">
            <div className="w-4 h-4 shrink-0"><RepostIcon /></div>
          </button>
          <button className="flex items-center bg-transparent border-none text-white/40 cursor-pointer py-0.5 px-1 rounded-md transition-all hover:text-white/70 hover:bg-white/5">
            <div className="w-4 h-4 shrink-0"><ShareIcon /></div>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ThreadDetailPage — full-page thread view with comments
   ═══════════════════════════════════════════════════════════ */

interface ThreadDetailPageProps {
  threadId: string;
}

export default function ThreadDetailPage({ threadId }: ThreadDetailPageProps) {
  const router = useRouter();
  const thread = getThreadById(threadId);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [reposted, setReposted] = useState(false);
  const [reposts, setReposts] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyText, setReplyText] = useState('');
  const [sortBy, setSortBy] = useState<'top' | 'newest'>('top');
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (thread) {
      setLiked(thread.liked ?? false);
      setLikes(thread.likes);
      setReposted(thread.reposted ?? false);
      setReposts(thread.reposts);
      setComments(generateComments(thread));
    }
  }, [thread]);

  const handlePostReply = () => {
    if (!replyText.trim()) return;
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: 'You',
      content: replyText.trim(),
      time: 'now',
      likes: 0,
    };
    setComments((prev) => [newComment, ...prev]);
    setReplyText('');
  };

  /* 404-style fallback */
  if (!thread) {
    return (
      <div className="max-w-[680px] mx-auto px-4 pt-20 text-center">
        <p className="text-white/50 text-lg">Thread not found.</p>
        <button
          onClick={() => router.back()}
          className="mt-6 bg-white/10 border-none text-white cursor-pointer py-2.5 px-6 rounded-full text-sm font-medium transition-colors hover:bg-white/20 font-inherit"
        >
          Back to Community
        </button>
      </div>
    );
  }

  const avatarColor = getAvatarColor(thread.author);
  const initials = thread.author[0]?.toUpperCase() ?? '?';
  const viewCount = `${((thread.likes * 3.5 + thread.replies * 10) / 1000).toFixed(0)}K views`;

  return (
    <div className="max-w-[680px] mx-auto px-4 pb-20">
        {/* ─── Header ─── */}
        <div className="sticky top-0 z-10 bg-[#101010]/92 backdrop-blur-md pt-3 pb-3 mb-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="bg-transparent border-none text-white cursor-pointer p-2 rounded-full transition-colors hover:bg-white/10"
                aria-label="Back"
              >
                <BackArrowIcon />
              </button>
              <div>
                <h1 className="text-[17px] font-bold text-white m-0 leading-tight">Thread</h1>
                <span className="text-[12px] text-white/40 font-light">{viewCount}</span>
              </div>
            </div>
            <button className="bg-white/8 border-none text-white/60 cursor-pointer p-2.5 rounded-full transition-colors hover:bg-white/15 hover:text-white">
              <MoreIcon />
            </button>
          </div>
        </div>

        {/* ─── Main card ─── */}
        <div className="border border-white/4 rounded-3xl bg-[#181818]/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(255,255,255,0.022)] overflow-hidden mt-2">
          {/* Original post */}
          <div className="px-5 pt-5 pb-2">
            {/* Author row */}
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                {thread.avatar ? (
                  <Image src={thread.avatar} alt={thread.author} width={44} height={44} className="w-11 h-11 rounded-full object-cover" />
                ) : (
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${avatarColor}dd, ${avatarColor}88)` }}
                  >
                    {initials}
                  </div>
                )}
                {thread.author !== 'You' && (
                  <div className="absolute -bottom-1 -right-1 bg-[#181818] rounded-full flex items-center justify-center w-4.5 h-4.5">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 fill-white">
                      <path d="M8 2a6 6 0 100 12A6 6 0 008 2zM8 1a7 7 0 110 14A7 7 0 018 1zm3 6.5H8.5V4.5a.5.5 0 00-1 0v3H4.5a.5.5 0 000 1h3v3a.5.5 0 001 0v-3h3a.5.5 0 000-1z" fillRule="evenodd" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex items-baseline gap-2 flex-1 min-w-0">
                <span className="text-[15px] font-semibold text-white">{thread.author}</span>
                <span className="text-[14px] text-white/35">{thread.time}</span>
              </div>
              <button className="bg-transparent border-none text-white/35 cursor-pointer py-0.5 px-1.5 rounded-md text-lg leading-none transition-colors hover:bg-white/10 hover:text-white/70 font-inherit">
                ···
              </button>
            </div>

            {/* Content */}
            <p className="text-[15px] font-light leading-relaxed text-white/95 mb-3 break-words tracking-wide">
              {thread.content}
            </p>

            {/* Images */}
            {thread.images && thread.images.length > 0 ? (
              <div className="relative mb-3">
                <Carousel
                  setApi={setApi}
                  opts={{ align: 'start', loop: false, dragFree: true }}
                  className="w-full select-none cursor-grab active:cursor-grabbing"
                >
                  <CarouselContent className="-ml-2">
                    {thread.images.map((img, idx) => (
                      <CarouselItem
                        key={idx}
                        className={`pl-2 ${thread.images!.length === 1 ? 'basis-full' : 'basis-[70%] sm:basis-[240px]'}`}
                      >
                        <Image
                          src={img}
                          alt={`Thread media ${idx + 1}`}
                          width={thread.images!.length === 1 ? 600 : 280}
                          height={thread.images!.length === 1 ? 360 : 360}
                          unoptimized
                          draggable={false}
                          className={`rounded-xl object-cover shrink-0 select-none ${thread.images!.length === 1 ? 'w-full max-h-[360px]' : 'w-full h-[300px]'}`}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            ) : thread.image ? (
              <Image
                src={thread.image}
                alt="Thread media"
                width={600}
                height={360}
                unoptimized
                className="w-full rounded-xl max-h-[360px] object-cover mb-3 block"
              />
            ) : null}

            {/* Engagement bar */}
            <div className="flex items-center gap-4 py-2">
              <button
                className={`flex items-center gap-1.5 bg-transparent border-none cursor-pointer py-1 px-1.5 rounded-lg text-sm transition-all font-inherit hover:bg-white/5 ${liked ? 'text-[#e0245e] hover:bg-[#e0245e]/10' : 'text-white/50 hover:text-white/85'}`}
                onClick={() => { setLiked(!liked); setLikes((l) => (!liked ? l + 1 : l - 1)); }}
              >
                <div className="w-5 h-5 shrink-0"><HeartIcon filled={liked} /></div>
                <span className="text-[13px] font-medium">{formatCount(likes)}</span>
              </button>

              <span className="flex items-center gap-1.5 text-white/50 py-1 px-1.5 text-sm">
                <div className="w-5 h-5 shrink-0"><CommentIcon /></div>
                <span className="text-[13px] font-medium">{formatCount(thread.replies)}</span>
              </span>

              <button
                className={`flex items-center gap-1.5 bg-transparent border-none cursor-pointer py-1 px-1.5 rounded-lg text-sm transition-all font-inherit hover:bg-white/5 ${reposted ? 'text-[#00c37d] hover:bg-[#00c37d]/10' : 'text-white/50 hover:text-white/85'}`}
                onClick={() => { setReposted(!reposted); setReposts((r) => (!reposted ? r + 1 : r - 1)); }}
              >
                <div className="w-5 h-5 shrink-0"><RepostIcon active={reposted} /></div>
                <span className="text-[13px] font-medium">{formatCount(reposts)}</span>
              </button>

              <button className="flex items-center gap-1.5 bg-transparent border-none text-white/50 cursor-pointer py-1 px-1.5 rounded-lg text-sm transition-all font-inherit hover:text-white/85 hover:bg-white/5">
                <div className="w-5 h-5 shrink-0"><ShareIcon /></div>
                <span className="text-[13px] font-medium">{thread.reposts > 0 ? formatCount(Math.floor(thread.reposts * 0.3)) : ''}</span>
              </button>
            </div>
          </div>

          {/* Sort + View activity */}
          <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/5">
            <button
              className="flex items-center gap-1.5 bg-transparent border-none text-white/70 cursor-pointer text-sm font-medium transition-colors hover:text-white font-inherit"
              onClick={() => setSortBy((s) => (s === 'top' ? 'newest' : 'top'))}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M7 4v16M7 4l-4 4M7 4l4 4M17 20V4M17 20l-4-4M17 20l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="capitalize">{sortBy === 'top' ? 'Top' : 'Newest'}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="bg-transparent border-none text-white/40 cursor-pointer text-[13px] font-medium transition-colors hover:text-white/70 font-inherit">
              View activity &gt;
            </button>
          </div>

          {/* Reply input */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-t border-b border-white/5">
            <div className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#666]">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handlePostReply(); }}
                placeholder={`Reply to ${thread.author.toLowerCase().replace(/\s/g, '.')}...`}
                className="w-full bg-transparent border-none outline-none text-white/90 text-[14px] font-light placeholder:text-white/30 py-1"
                id="thread-reply-input"
              />
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button className="bg-transparent border-none text-white/30 cursor-pointer p-1.5 rounded-md transition-colors hover:bg-white/10 hover:text-white/50">
                <ImageAttachIcon />
              </button>
              <button className="bg-transparent border-none text-white/30 cursor-pointer p-1.5 rounded-md transition-colors hover:bg-white/10 hover:text-white/50">
                <GifIcon />
              </button>
              <button className="bg-transparent border-none text-white/30 cursor-pointer p-1.5 rounded-md transition-colors hover:bg-white/10 hover:text-white/50">
                <ExpandIcon />
              </button>
            </div>
          </div>

          {/* Comments */}
          {comments.map((comment, idx) => (
            <CommentItem key={comment.id} comment={comment} index={idx} />
          ))}
        </div>
      </div>
  );
}
