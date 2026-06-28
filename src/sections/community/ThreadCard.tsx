'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

const AVATAR_COLORS = [
  '#f7941d',
  '#e05c97',
  '#5c8ae0',
  '#5ce087',
  '#e0c45c',
  '#c45ce0',
  '#5ce0d8',
];

export interface Thread {
  id: string;
  author: string;
  handle: string;
  avatar?: string;
  content: string;
  image?: string;
  images?: string[];
  likes: number;
  replies: number;
  reposts: number;
  time: string;
  liked?: boolean;
  reposted?: boolean;
}

interface ThreadCardProps {
  thread: Thread;
  index?: number;
  showLine?: boolean;
}

/* ── Action Icons ── */
const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none">
    {filled ? (
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="#e0245e"
      />
    ) : (
      <path
        d="M16.5 3C14.76 3 13.09 3.81 12 5.09 10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
        fill="currentColor"
      />
    )}
  </svg>
);

const CommentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RepostIcon = ({ active }: { active?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M17 1l4 4-4 4"
      stroke={active ? '#00c37d' : 'currentColor'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4"
      stroke={active ? '#00c37d' : 'currentColor'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 13v2a4 4 0 01-4 4H3"
      stroke={active ? '#00c37d' : 'currentColor'}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="16 6 12 2 8 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="12"
      y1="2"
      x2="12"
      y2="15"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function ThreadCard({
  thread,
  index = 0,
  showLine = false,
}: ThreadCardProps) {
  const router = useRouter();
  const [liked, setLiked] = useState(thread.liked ?? false);
  const [likes, setLikes] = useState(thread.likes);
  const [reposted, setReposted] = useState(thread.reposted ?? false);
  const [reposts, setReposts] = useState(thread.reposts);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleLike = () => {
    const next = !liked;
    setLiked(next);
    setLikes((l) => (next ? l + 1 : l - 1));
  };

  const handleRepost = () => {
    const next = !reposted;
    setReposted(next);
    setReposts((r) => (next ? r + 1 : r - 1));
  };

  const initials = thread.author[0]?.toUpperCase() ?? '?';
  const avatarColor = getAvatarColor(thread.author);
  const animationDelay = `${index * 60}ms`;

  return (
    <article
      className="py-4 px-5 border-b border-white/5 flex gap-3 animate-fade-in-up last:border-b-0"
      style={{ animationDelay }}
      id={`thread-${thread.id}`}
    >
      {/* Avatar column */}
      <div className="flex flex-col items-center gap-0 shrink-0">
        <div className="relative flex">
          {thread.avatar ? (
            <Image
              src={thread.avatar}
              alt={thread.author}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover block"
            />
          ) : (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold text-white shrink-0"
              style={{
                background: `linear-gradient(135deg, ${avatarColor}dd, ${avatarColor}88)`,
              }}
              aria-label={thread.author}
            >
              {initials}
            </div>
          )}
          {thread.author !== 'You' && (
            <div className="absolute -bottom-1 -right-1 bg-[#101010] rounded-full flex items-center justify-center w-4 h-4">
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-3.5 h-3.5 fill-white"
              >
                <path
                  d="M8 2a6 6 0 100 12A6 6 0 008 2zM8 1a7 7 0 110 14A7 7 0 018 1zm3 6.5H8.5V4.5a.5.5 0 00-1 0v3H4.5a.5.5 0 000 1h3v3a.5.5 0 001 0v-3h3a.5.5 0 000-1z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        {showLine && (
          <div className="w-[2px] flex-1 min-h-[24px] bg-white/10 rounded-sm mt-1.5" />
        )}
      </div>

      {/* Thread body */}
      <div className="flex-1 min-w-0">
        {/* Meta row */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-[15px] font-semibold text-white">
            {thread.author}
          </span>
          {/* <span className="text-sm text-white/40">@{thread.handle}</span> */}
          <span className="text-[15px] text-white/35">{thread.time}</span>
          <button className="bg-transparent border-none ml-auto text-white/35 cursor-pointer py-0.5 px-1.5 rounded-md text-lg leading-none transition-colors hover:bg-white/10 hover:text-white/70 font-inherit">
            ···
          </button>
        </div>

        {/* Content */}
        <p className="text-base font-extralight leading-relaxed text-white/95 mb-2.5 break-words tracking-wide cursor-pointer">
          {thread.content}
        </p>

        {/* Optional images */}
        {thread.images && thread.images.length > 0 ? (
          <div className="relative group mb-2.5">
            <Carousel
              setApi={setApi}
              opts={{
                align: 'start',
                loop: false,
                dragFree: true,
              }}
              className="w-full select-none cursor-grab active:cursor-grabbing"
            >
              <CarouselContent className="-ml-2">
                {thread.images.map((img, idx) => (
                  <CarouselItem
                    key={idx}
                    className={`pl-2 ${
                      thread.images!.length === 1
                        ? 'basis-full'
                        : 'basis-[75%] sm:basis-[240px]'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thread media ${idx + 1}`}
                      width={thread.images!.length === 1 ? 680 : 300}
                      height={thread.images!.length === 1 ? 380 : 400}
                      priority={index < 2}
                      unoptimized
                      draggable={false}
                      onClick={() => {
                        if (api && (api as any).clickAllowed && !(api as any).clickAllowed()) {
                          return;
                        }
                        setSelectedImage(img);
                      }}
                      className={`rounded-xl object-cover shrink-0 select-none ${
                        thread.images!.length === 1
                          ? 'w-full max-h-[380px]'
                          : 'w-full h-[320px]'
                      }`}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Cursor point indicator dots */}
            {/* {count > 1 && (
              <div className="flex justify-center gap-1.5 mt-3 mb-1">
                {Array.from({ length: count }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => api?.scrollTo(idx)}
                    className={`w-1.5 h-1.5 rounded-full p-0 border-none transition-all duration-200 cursor-pointer ${
                      current === idx ? 'bg-[#F7941D] scale-125' : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )} */}
          </div>
        ) : thread.image ? (
          <Image
            src={thread.image}
            alt="Thread media"
            width={680}
            height={380}
            priority={index < 2}
            unoptimized
            onClick={() => setSelectedImage(thread.image!)}
            className="w-full rounded-xl max-h-[380px] object-cover mb-2.5 block"
          />
        ) : null}

        {/* Actions */}
        <div className="flex items-center gap-4 mt-1">
          <button
            className={`flex items-center gap-1.5 bg-transparent border-none cursor-pointer py-1 px-1.5 rounded-lg text-sm transition-all font-inherit hover:bg-white/5 ${liked ? 'text-[#e0245e] hover:bg-[#e0245e]/10' : 'text-white/50 hover:text-white/85'}`}
            onClick={handleLike}
            aria-label={liked ? 'Unlike' : 'Like'}
            id={`thread-like-${thread.id}`}
          >
            <div className="w-5 h-5 shrink-0">
              <HeartIcon filled={liked} />
            </div>
            <span className="text-[13px] font-medium">
              {formatCount(likes)}
            </span>
          </button>

          <button
            className="flex items-center gap-1.5 bg-transparent border-none text-white/50 cursor-pointer py-1 px-1.5 rounded-lg text-sm transition-all font-inherit hover:text-white/85 hover:bg-white/5"
            aria-label="Reply"
            id={`thread-reply-${thread.id}`}
          >
            <div className="w-5 h-5 shrink-0">
              <CommentIcon />
            </div>
            <span className="text-[13px] font-medium">
              {formatCount(thread.replies)}
            </span>
          </button>

          <button
            className={`flex items-center gap-1.5 bg-transparent border-none cursor-pointer py-1 px-1.5 rounded-lg text-sm transition-all font-inherit hover:bg-white/5 ${reposted ? 'text-[#00c37d] hover:bg-[#00c37d]/10' : 'text-white/50 hover:text-white/85'}`}
            onClick={handleRepost}
            aria-label={reposted ? 'Undo repost' : 'Repost'}
            id={`thread-repost-${thread.id}`}
          >
            <div className="w-5 h-5 shrink-0">
              <RepostIcon active={reposted} />
            </div>
            <span className="text-[13px] font-medium">
              {formatCount(reposts)}
            </span>
          </button>

          <button
            className="flex items-center gap-1.5 bg-transparent border-none text-white/50 cursor-pointer py-1 px-1.5 rounded-lg text-sm transition-all font-inherit hover:text-white/85 hover:bg-white/5"
            aria-label="Share"
            id={`thread-share-${thread.id}`}
          >
            <div className="w-5 h-5 shrink-0">
              <ShareIcon />
            </div>
          </button>
        </div>
      </div>

      {mounted && selectedImage && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 border-none text-white cursor-pointer p-3 rounded-full flex items-center justify-center transition-all z-[10000]"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <img
            src={selectedImage}
            alt="Media"
            className="max-w-[95vw] max-h-[95vh] object-contain cursor-default"
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </article>
  );
}
