"use client";

import { useState } from "react";
import { useConversation } from "@elevenlabs/react";
import Image from "next/image";

interface CallWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CallWindow({ isOpen, onClose }: CallWindowProps) {
  const conversation = useConversation();
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  if (!isOpen) return null;

  const handleEndCall = () => {
    conversation.endSession();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* iPhone-style call screen */}
      <div className="relative w-full max-w-md mx-auto flex flex-col items-center justify-between min-h-screen p-8">
        {/* Top status bar area */}
        <div className="w-full flex justify-center pt-4">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                conversation.status === "connected"
                  ? "bg-green-500 animate-pulse"
                  : "bg-gray-500"
              }`}
            />
            <span className="text-sm text-white/80">
              {conversation.status === "connected" ? "En appel" : "Connexion..."}
            </span>
          </div>
        </div>

        {/* Contact info section */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 mt-12">
          {/* Contact photo */}
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
            <Image
              src="/santa.jpg"
              alt="Père Noël"
              fill
              className="object-cover"
            />
          </div>

          {/* Contact name */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-light text-white">Père Noël</h2>
            <p className="text-lg text-white/70">
              {conversation.isSpeaking
                ? "Parle..."
                : conversation.status === "connected"
                ? "En appel"
                : "Connexion..."}
            </p>
          </div>
        </div>

        {/* Call controls - iPhone style */}
        <div className="w-full pb-20 space-y-8">
          {/* Top row buttons */}
          <div className="flex justify-center gap-8">
            {/* Mute button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                isMuted
                  ? "bg-white text-gray-900"
                  : "bg-white/20 text-white backdrop-blur-md"
              }`}
              aria-label={isMuted ? "Activer le micro" : "Désactiver le micro"}
            >
              <span className="text-2xl">{isMuted ? "🔇" : "🎤"}</span>
            </button>

            {/* Speaker button */}
            <button
              onClick={() => setIsSpeaker(!isSpeaker)}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                isSpeaker
                  ? "bg-white text-gray-900"
                  : "bg-white/20 text-white backdrop-blur-md"
              }`}
              aria-label={isSpeaker ? "Haut-parleur désactivé" : "Haut-parleur activé"}
            >
              <span className="text-2xl">{isSpeaker ? "📢" : "🔊"}</span>
            </button>
          </div>

          {/* End call button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleEndCall}
              className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:bg-red-700 active:scale-95 transition-all"
              aria-label="Terminer l'appel"
            >
              <span className="text-3xl">📞</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

