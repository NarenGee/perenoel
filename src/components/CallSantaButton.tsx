"use client";

import { useConversation } from "@elevenlabs/react";
import { useCallback, useState } from "react";
import { CallWindow } from "./CallWindow";

export function CallSantaButton() {
  const [hasPermission, setHasPermission] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [showCallWindow, setShowCallWindow] = useState(false);

  const conversation = useConversation();

  const requestMicrophonePermission = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      setPermissionError(null);
      return true;
    } catch {
      setPermissionError("L'accès au microphone est requis pour parler avec le Père Noël.");
      return false;
    }
  }, []);

  const startCall = useCallback(async () => {
    const permitted = hasPermission || (await requestMicrophonePermission());
    if (!permitted) return;

    try {
      await conversation.startSession({
        agentId: "agent_4301kd5ghj1gf3jvyj5tj6778ze9",
        connectionType: "webrtc",
      });
      setShowCallWindow(true);
    } catch (error) {
      console.error("Impossible de démarrer la conversation :", error);
    }
  }, [conversation, hasPermission, requestMicrophonePermission]);

  const endCall = useCallback(async () => {
    await conversation.endSession();
    setShowCallWindow(false);
  }, [conversation]);

  const isConnected = conversation.status === "connected";

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={isConnected ? endCall : startCall}
          className={`group relative flex items-center justify-center gap-4 rounded-2xl px-8 py-6 text-2xl font-bold text-white shadow-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 sm:px-10 sm:py-7 sm:text-3xl ${
            isConnected
              ? "bg-red-700 hover:bg-red-800 active:scale-95"
              : "bg-green-600 hover:bg-green-700 active:scale-95 animate-phone-pulse"
          }`}
        >
          {/* Phone icon with animation */}
          <span
            className={`text-3xl sm:text-4xl ${
              !isConnected ? "animate-phone-shake" : ""
            }`}
          >
            📞
          </span>
          <span>
            {isConnected ? "Terminer l'appel" : "Appeler le Père Noël 🎅"}
          </span>
        </button>
        {isConnected && !showCallWindow && (
          <p className="text-xl font-semibold text-green-100 sm:text-2xl">
            {conversation.isSpeaking
              ? "Le Père Noël parle..."
              : "Le Père Noël vous écoute..."}
          </p>
        )}
        {permissionError && (
          <p className="text-lg font-medium text-yellow-200 sm:text-xl">
            {permissionError}
          </p>
        )}
      </div>
      <CallWindow
        isOpen={showCallWindow && isConnected}
        onClose={() => {
          setShowCallWindow(false);
          endCall();
        }}
      />
    </>
  );
}


