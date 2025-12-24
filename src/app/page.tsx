"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { CallSantaButton } from "@/components/CallSantaButton";

const CORRECT_PASSWORD = "cestlamerde321";

export default function Home() {
  const [password, setPassword] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showGiftPopup, setShowGiftPopup] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showVolumeInstruction, setShowVolumeInstruction] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (password.trim() === CORRECT_PASSWORD) {
      setRevealed(true);
      setShowGiftPopup(true);
      setShowErrorPopup(false);
    } else {
      setShowErrorPopup(true);
      setShowGiftPopup(false);
      setPassword("");
    }
  };

  // Detect first scroll and show volume instruction
  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 50) {
        setHasScrolled(true);
        setShowVolumeInstruction(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { once: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  // Close popups when clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowErrorPopup(false);
        setShowVolumeInstruction(false);
        if (revealed) {
          setShowGiftPopup(false);
        }
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [revealed]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Full-screen Santa background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/santa.jpg"
          alt="Père Noël"
          fill
          priority
          className="object-cover"
          quality={90}
          style={{ objectPosition: "center" }}
        />
      </div>

      {/* Error Popup */}
      {showErrorPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setShowErrorPopup(false)}
        >
          <div
            className="relative animate-popup-in rounded-3xl border-2 border-red-400/50 bg-red-900/90 p-8 backdrop-blur-xl shadow-2xl sm:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowErrorPopup(false)}
              className="absolute right-4 top-4 text-3xl text-white hover:text-red-200"
            >
              ×
            </button>
            <div className="text-center">
              <div className="mb-4 text-6xl">❌</div>
              <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Oups !
              </h3>
              <p className="text-xl text-white sm:text-2xl">
                Ce n&apos;est pas le bon mot de passe, ho ho ho !
              </p>
              <p className="mt-4 text-lg text-red-200 sm:text-xl">
                Essaie encore ou rappelle le Père Noël pour obtenir le bon mot de
                passe.
              </p>
              <button
                onClick={() => setShowErrorPopup(false)}
                className="mt-6 rounded-2xl bg-white/20 px-8 py-4 text-xl font-semibold text-white backdrop-blur-md hover:bg-white/30"
              >
                D&apos;accord
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Volume Instruction Popup */}
      {showVolumeInstruction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowVolumeInstruction(false)}
        >
          <div
            className="relative animate-popup-in rounded-3xl border-2 border-amber-300/50 bg-red-950/95 p-8 backdrop-blur-xl shadow-2xl sm:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVolumeInstruction(false)}
              className="absolute right-4 top-4 text-3xl text-white hover:text-amber-200 transition-colors"
              aria-label="Fermer"
            >
              ×
            </button>
            <div className="text-center space-y-6">
              <div className="mb-4 text-6xl">🔊</div>
              <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Important !
              </h3>
              <p className="text-xl text-white sm:text-2xl leading-relaxed">
                Veuillez mettre le volume de votre téléphone au maximum pour
                la meilleure expérience
              </p>
              <p className="text-lg text-amber-200 sm:text-xl">
                Augmentez le volume maintenant avant de continuer.
              </p>
              <button
                onClick={() => setShowVolumeInstruction(false)}
                className="mt-6 rounded-2xl bg-amber-400 px-8 py-4 text-xl font-bold text-red-950 shadow-lg hover:bg-amber-300 transition-colors"
              >
                D&apos;accord, j&apos;ai augmenté le volume
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gift Celebration Popup */}
      {showGiftPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setShowGiftPopup(false)}
        >
          {/* Celebration confetti effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                {["🎉", "🎊", "✨", "⭐", "🎁"][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>

          <div
            className="relative animate-popup-in rounded-3xl border-2 border-amber-300/50 bg-gradient-to-br from-amber-900/95 to-red-900/95 p-8 backdrop-blur-xl shadow-2xl sm:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowGiftPopup(false)}
              className="absolute right-4 top-4 text-3xl text-white hover:text-amber-200"
            >
              ×
            </button>
            <div className="text-center">
              <div className="mb-4 animate-bounce text-7xl">🎉</div>
              <h3 className="mb-6 text-4xl font-bold text-white sm:text-5xl animate-pulse">
                Félicitations !
              </h3>
              <div className="space-y-4 rounded-2xl border-2 border-amber-300/50 bg-red-900/80 p-6 backdrop-blur-md sm:p-8">
                <p className="text-2xl font-bold text-amber-200 sm:text-3xl">
                  Ton cadeau de Noël
                </p>
                <p className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  Ton cadeau est une leçon privée de padel avec Nuno
                </p>
                <p className="mx-auto max-w-2xl text-xl text-amber-100 sm:text-2xl">
                  Prépare-toi à transpirer un peu plus qu&apos;à la plage de
                  Unawatuna : une leçon privée de padel avec Nuno t&apos;attend !
                </p>
              </div>
              <button
                onClick={() => setShowGiftPopup(false)}
                className="mt-6 rounded-2xl bg-amber-400 px-8 py-4 text-xl font-bold text-red-950 shadow-lg hover:bg-amber-300"
              >
                Génial ! 🎁
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content with scroll sections */}
      <div className="relative z-10">
        {/* Step 1: Initial Load - Just Image with Text at Bottom */}
        <section className="flex min-h-screen flex-col items-center justify-end px-6 pb-12 text-center sm:px-8 sm:pb-16">
          <div className="mx-auto max-w-4xl space-y-6">
            {/* Greeting at bottom */}
            <div className="rounded-2xl border-2 border-red-300/40 bg-red-950/85 px-8 py-6 backdrop-blur-xl shadow-2xl sm:px-12 sm:py-8">
              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-2xl">
                Joyeux Noël Giuseppe
              </h1>
            </div>
            {/* Scroll indicator */}
            <div className="animate-bounce">
              <div className="text-4xl sm:text-5xl">⬇️</div>
              <p className="mt-2 text-lg text-white sm:text-xl drop-shadow-md">
                Fais défiler pour continuer
              </p>
            </div>
          </div>
        </section>

        {/* Step 2: Call Santa Section */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center sm:px-8">
          <div className="mx-auto max-w-3xl space-y-10 rounded-3xl border-2 border-red-300/40 bg-red-950/85 p-8 backdrop-blur-xl shadow-2xl sm:p-12 md:p-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-2xl">
                Étape 1 : Appelle le Père Noël
              </h2>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white sm:text-2xl md:text-3xl drop-shadow-lg">
                Parle avec le Père Noël en personne pour obtenir{" "}
                <span className="font-bold text-amber-200">
                  ton mot de passe secret
                </span>
                .
              </p>
              <p className="mx-auto max-w-2xl text-lg text-amber-100 sm:text-xl md:text-2xl drop-shadow-md">
                Il t&apos;attendra quelque part entre le Pôle Nord et les
                palmiers du Sri Lanka 🌴
              </p>
            </div>
            <div className="mt-8">
              <CallSantaButton />
            </div>
          </div>
          {/* Scroll indicator after step - hidden when call window is open */}
          <div className="mt-32 mb-16 animate-bounce">
            <div className="text-4xl sm:text-5xl">⬇️</div>
            <p className="mt-2 text-lg text-white sm:text-xl drop-shadow-md">
              Fais défiler pour continuer
            </p>
          </div>
        </section>

        {/* Step 3: Enter Password Section */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center sm:px-8">
          <div className="mx-auto max-w-3xl space-y-10 rounded-3xl border-2 border-red-300/40 bg-red-950/85 p-8 backdrop-blur-xl shadow-2xl sm:p-12 md:p-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-2xl">
                Étape 2 : Déverrouille ton cadeau
              </h2>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white sm:text-2xl md:text-3xl drop-shadow-lg">
                Après ton appel avec le Père Noël, saisis ici le mot de passe
                magique qu&apos;il t&apos;a donné.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-4">
                <label className="block text-xl font-semibold uppercase tracking-wider text-amber-100 sm:text-2xl drop-shadow-md">
                  Mot de passe secret
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border-2 border-red-300/50 bg-red-900/60 px-6 py-5 text-2xl text-white placeholder:text-amber-100/70 backdrop-blur-md focus:border-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-300/50 sm:px-8 sm:py-6 sm:text-3xl"
                  placeholder="Entre le mot de passe ici"
                />
              </div>
              <button
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-amber-400 px-8 py-6 text-2xl font-bold text-red-950 shadow-2xl shadow-amber-900/50 transition-all duration-200 hover:bg-amber-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 sm:px-10 sm:py-7 sm:text-3xl"
              >
                Révéler mon cadeau 🎁
              </button>
            </form>

            {!revealed && (
              <p className="mt-6 text-lg text-amber-100 sm:text-xl md:text-2xl drop-shadow-md">
                Astuce : si tu as oublié le mot de passe, rappelle le Père Noël
                !
              </p>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center">
          <div className="mx-auto max-w-2xl">
            <Image
              src="/matteo.jpg"
              alt="Matteo"
              width={300}
              height={300}
              className="mx-auto rounded-2xl border-2 border-red-300/40 shadow-2xl"
            />
          </div>
        </footer>
      </div>
    </div>
  );
}

