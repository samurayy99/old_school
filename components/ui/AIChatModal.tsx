"use client";

import { cn } from '@/lib/utils';
import { useChat } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Textarea from 'react-textarea-autosize';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIChatModal({ isOpen, onClose }: AIChatModalProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading 
  } = useChat({
    api: '/api/chat',
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-2 sm:inset-4 z-50 mx-auto my-4 sm:my-8 max-w-2xl"
          >
            <div className="flex h-full flex-col rounded-2xl border border-charcoal/20 dark:border-ivory/20 bg-ivory/95 dark:bg-charcoal/95 backdrop-blur-xl shadow-2xl">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-charcoal/10 dark:border-ivory/10 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-brand animate-pulse" />
                  <div>
                    <h2 className="font-lora text-xl font-medium text-charcoal dark:text-ivory">
                      Old School AI Assistant
                    </h2>
                    <p className="text-sm text-charcoal/60 dark:text-ivory/60 font-mono">
                      Ready to help with website feedback
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-charcoal/60 dark:text-ivory/60 hover:bg-charcoal/10 dark:hover:bg-ivory/10 hover:text-charcoal dark:hover:text-ivory transition-colors"
                  aria-label="Close AI Assistant"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Chat Messages */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4"
              >
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand/10 flex items-center justify-center">
                      <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-charcoal/70 dark:text-ivory/70 font-lora text-lg">
                      Hi Bernd! 👋
                    </p>
                    <p className="text-charcoal/60 dark:text-ivory/60 text-sm mt-2">
                      Tell me what you&apos;d like to change about the website.
                    </p>
                  </div>
                )}
                
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3 max-w-[85%]",
                      message.role === 'user' ? "ml-auto" : ""
                    )}
                  >
                    {message.role === 'assistant' && (
                      <div className="h-8 w-8 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="h-3 w-3 rounded-full bg-brand" />
                      </div>
                    )}
                    
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                        message.role === 'user' 
                          ? "bg-charcoal dark:bg-charcoal text-ivory ml-auto font-medium" 
                          : "bg-charcoal/5 dark:bg-ivory/5 text-charcoal dark:text-ivory"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="h-3 w-3 rounded-full bg-brand animate-pulse" />
                    </div>
                    <div className="bg-charcoal/5 dark:bg-ivory/5 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-charcoal/30 dark:bg-ivory/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="h-2 w-2 rounded-full bg-charcoal/30 dark:bg-ivory/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="h-2 w-2 rounded-full bg-charcoal/30 dark:bg-ivory/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <div className="border-t border-charcoal/10 dark:border-ivory/10 p-4 sm:p-6">
                <form 
                  onSubmit={handleSubmit} 
                  className="flex items-end gap-3"
                >
                  <Textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                    placeholder="What would you like to change? (Shift+Enter for new line)"
                    disabled={isLoading}
                    rows={1}
                    maxRows={5}
                    className="flex-1 resize-none rounded-xl border border-charcoal/20 dark:border-ivory/20 bg-white/60 dark:bg-white/5 px-4 py-3 text-sm text-charcoal dark:text-ivory placeholder:text-charcoal/50 dark:placeholder:text-ivory/50 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-white hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  </button>
                </form>
                
                <p className="mt-3 text-xs text-charcoal/50 dark:text-ivory/50 text-center font-mono">
                  Press ESC to close • Powered by Old School AI
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 