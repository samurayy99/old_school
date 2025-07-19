"use client";

import { TypewriterEffect } from "../ui/typewriter-effect";

export function HeroSection() {
  // THE MANIFEST - Single powerful headline
  const manifestWords = [
    { text: "Pioneering" },
    { text: "the" },
    { text: "decentralized", className: "text-terminal-green" },
    { text: "world" },
    { text: "with" },
    { text: "strategic", className: "text-blueprint-blue" },
    { text: "clarity.", className: "text-accent-gold" },
  ];

  return (
    <section className="min-h-screen bg-charcoal flex items-center justify-center p-4 relative">
      {/* Verstecktes H1 für SEO */}
      <h1 className="sr-only">
        Old School GmbH: Pioneering the decentralized world with strategic clarity from Crypto Valley
      </h1>
      
      {/* Das Manifest Terminal */}
      <div className="w-full max-w-4xl mx-auto">
        {/* Terminal Header */}
        <div className="bg-black/50 rounded-t-lg p-4 border border-terminal-green/30">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-amber"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
            <span className="ml-4 text-terminal-green/70 text-sm font-mono">root@crypto-valley ~ #</span>
          </div>
        </div>
        
        {/* Terminal Content */}
        <div className="bg-black/90 rounded-b-lg p-8 lg:p-12 border-x border-b border-terminal-green/30">
          
          {/* System-Start Block */}
          <div className="space-y-4 mb-16">
            {/* Initiate Command */}
            <div className="flex items-center font-mono">
              <span className="text-terminal-green mr-2">$</span>
              <span className="text-ivory">initiate --protocol 'OldSchool'</span>
            </div>
            
            {/* ASCII Art Logo */}
            <div className="my-8">
              <pre className="text-terminal-green text-sm sm:text-base lg:text-lg leading-tight font-mono">
{`   ___  ____  
  / _ \\/ ___| 
 | | | \\___ \\ 
 | |_| |___) |
  \\___/|____/ `}
              </pre>
            </div>

            {/* System Status Messages */}
            <div className="space-y-2 font-mono text-sm">
              <p className="text-terminal-green">
                <span className="text-accent-gold">[ OK ]</span> System "Old School GmbH" loaded.
              </p>
              <p className="text-terminal-green">
                <span className="text-blueprint-blue">[ INFO ]</span> Location: Zug, Switzerland - Crypto Valley
              </p>
              <p className="text-terminal-green">
                <span className="text-blueprint-blue">[ INFO ]</span> Slogan: NEW TECH | TRADITIONAL VALUES
              </p>
              <p className="text-terminal-green">
                <span className="text-terminal-amber">[ READY ]</span> Boutique advisory services online.
              </p>
            </div>
          </div>

          {/* Philosophy Loading */}
          <div className="mb-8">
            <p className="font-mono text-terminal-green text-sm">
              [ EXTRACTING PHILOSOPHY... ]
            </p>
          </div>

          {/* THE MANIFEST - Animated Headline */}
          <div className="text-center mb-16">
            <TypewriterEffect 
              words={manifestWords} 
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-sans font-medium text-ivory leading-relaxed" 
              cursorClassName="bg-accent-gold"
            />
          </div>

          {/* Final Terminal Prompt */}
          <div className="flex items-center font-mono">
            <span className="text-terminal-green mr-2">$</span>
            <span className="text-ivory animate-pulse">_</span>
          </div>
        </div>
      </div>

      {/* Elegant Scroll-Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 animate-pulse">
          <span className="text-accent-gold text-xs font-mono uppercase tracking-widest">
            Explore
          </span>
          <svg 
            className="w-6 h-6 text-accent-gold animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </section>
  );
} 