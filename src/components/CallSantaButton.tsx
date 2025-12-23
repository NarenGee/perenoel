"use client";

import { useConversation } from "@elevenlabs/react";
import { useCallback, useState } from "react";

export function CallSantaButton() {
  const [hasPermission, setHasPermission] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

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
    } catch (error) {
      console.error("Impossible de démarrer la conversation :", error);
    }
  }, [conversation, hasPermission, requestMicrophonePermission]);

  const endCall = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const isConnected = conversation.status === "connected";

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={isConnected ? endCall : startCall}
        className={`px-6 py-3 rounded-full text-sm sm:text-base font-semibold text-white shadow-lg transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 ${
          isConnected
            ? "bg-red-700 hover:bg-red-800 active:scale-95"
            : "bg-green-600 hover:bg-green-700 active:scale-95"
        }`}
      >
        {isConnected ? "Terminer l'appel" : "Appeler le Père Noël 🎅"}
      </button>
      {isConnected && (
        <p className="text-xs sm:text-sm text-red-50/90">
          {conversation.isSpeaking
            ? "Le Père Noël parle..."
            : "Le Père Noël vous écoute..."}
        </p>
      )}
      {permissionError && (
        <p className="text-xs sm:text-sm text-yellow-100">{permissionError}</p>
      )}
    </div>
  );
}


