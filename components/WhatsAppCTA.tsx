'use client';

import { MessageCircle, Radio } from 'lucide-react';

const WHATSAPP_NUMBER = '2349032047288';
const CHANNEL_URL = 'https://whatsapp.com/channel/0029Vb8vKnGLI8YhD0lAxw47';

interface WhatsAppCTAProps {
  variant: 'top' | 'middle' | 'end';
}

const COPY = {
  top: {
    heading: 'Looking for a budget car right now?',
    body: 'Message us directly or follow our WhatsApp channel — we post budget car deals as we find them.',
  },
  middle: {
    heading: "Don't want to keep searching?",
    body: "Tell us your budget on WhatsApp and we'll help you find a match — or follow our channel for new picks.",
  },
  end: {
    heading: 'Ready to find your car?',
    body: 'Message us your budget and preferences, or follow our channel so you never miss a budget car post.',
  },
} as const;

export function WhatsAppCTA({ variant }: WhatsAppCTAProps) {
  const { heading, body } = COPY[variant];
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi, I'm looking for a budget car. Can you help me find one?"
  )}`;

  return (
    <div className="not-prose my-8 rounded-xl border border-green-200 bg-green-50 p-5">
      <p className="font-semibold text-gray-900 mb-1">{heading}</p>
      <p className="text-sm text-gray-600 mb-4">{body}</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2.5 text-sm transition-colors"
        >
          <MessageCircle className="h-4 w-4" /> Message Us on WhatsApp
        </a>
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-green-600 text-green-700 hover:bg-green-100 font-medium px-4 py-2.5 text-sm transition-colors"
        >
          <Radio className="h-4 w-4" /> Follow Our Channel
        </a>
      </div>
    </div>
  );
}
