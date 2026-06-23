'use client';

import React, { useState } from 'react';

interface NewThreadModalProps {
  onClose: () => void;
  onPost?: (text: string) => void;
}

const MAX_CHARS = 500;

export default function NewThreadModal({ onClose, onPost }: NewThreadModalProps) {
  const [text, setText] = useState('');

  const handlePost = () => {
    if (!text.trim()) return;
    onPost?.(text.trim());
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const remaining = MAX_CHARS - text.length;

  return (
    <div
      className="fixed inset-0 z-[2000] bg-black/75 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="New thread"
    >
      <div className="bg-[#1e1e1e] rounded-[20px] w-full max-w-[540px] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.6)] border border-white/10 animate-in slide-in-from-bottom-4 zoom-in-95 duration-250">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-base font-semibold text-white">New thread</span>
          <button
            className="bg-transparent border-none text-white/50 cursor-pointer p-1.5 rounded-full flex items-center justify-center transition-colors hover:bg-white/10 hover:text-white font-inherit"
            onClick={onClose}
            aria-label="Close"
            id="community-modal-close-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f7941d] to-[#be1e2d] flex items-center justify-center text-base font-bold text-white shrink-0">Y</div>
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-sm font-semibold text-white">you</span>
            <textarea
              id="community-new-thread-textarea"
              className="w-full bg-transparent border-none outline-none text-white/85 text-[15px] font-light resize-none leading-relaxed min-h-[100px] placeholder:text-white/30"
              placeholder="Start a thread..."
              value={text}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CHARS) setText(e.target.value);
              }}
              autoFocus
              rows={4}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
          <span className="text-xs text-white/30">
            {remaining < 100 ? `${remaining} remaining` : ''}
          </span>
          <button
            id="community-post-thread-btn"
            className="bg-white text-black border-none rounded-full py-2.5 px-5.5 text-sm font-bold cursor-pointer transition-all disabled:opacity-35 disabled:cursor-not-allowed hover:not-disabled:opacity-85 hover:not-disabled:scale-[1.02] font-inherit"
            onClick={handlePost}
            disabled={!text.trim()}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
