"use client";

import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const waNumber = SITE_CONFIG.contact.whatsapp;
  
  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center justify-end">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            className="mr-4 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 px-5 py-2.5 rounded-2xl shadow-2xl"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black dark:text-white whitespace-nowrap">
              Chat with us
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center"
      >
        {/* Pulsing Attention Ring */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-zinc-400 dark:bg-zinc-600 rounded-full"
        />

        <div className="relative w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10">
          <MessageCircle size={28} fill="currentColor" strokeWidth={1.5} />
          
          {/* Status Indicator */}
          <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 border-4 border-black dark:border-white rounded-full" />
        </div>
      </motion.a>
    </div>
  );
}
