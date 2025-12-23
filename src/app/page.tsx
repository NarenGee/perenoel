"use client";

import Image from "next/image";
import { useState } from "react";
import { CallSantaButton } from "@/components/CallSantaButton";

const CORRECT_PASSWORD = "cestlamerde321";

export default function Home() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [revealed, setRevealed] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (password.trim() === CORRECT_PASSWORD) {
      setRevealed(true);
      setError("");
    } else {
      setRevealed(false);
      setError("Ce n'est pas le bon mot de passe, ho ho ho !");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-red-800 to-amber-900 text-foreground text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6 sm:px-6 sm:py-10">
        <header className="mb-8 flex flex-col items-center justify-between gap-4 sm:mb-10 sm:flex-row">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">
              Noël sous le soleil du Sri Lanka
            </p>
            <h1 className="mt-2 text-center text-2xl font-semibold sm:text-left sm:text-3xl lg:text-4xl">
              Secret Santa 2026 - Giuseppe Zaccaria
            </h1>
          </div>
          <div className="rounded-full border border-amber-300/30 bg-amber-100/10 px-4 py-1 text-xs sm:text-sm">
            🎄{" "}
            <span className="font-medium">
              Une surprise de Noël rien que pour toi
            </span>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-8 lg:flex-row">
          <section className="flex flex-1 flex-col items-center justify-center gap-4 rounded-3xl border border-amber-200/25 bg-gradient-to-br from-red-950/60 via-red-900/60 to-amber-900/60 p-6 shadow-xl shadow-red-950/40 sm:p-8">
            <div className="relative mb-3 h-72 w-56 overflow-hidden rounded-3xl border-2 border-amber-300/60 shadow-2xl shadow-black/50 sm:h-96 sm:w-72">
              <Image
                src="/santa.jpg"
                alt="Père Noël avec un sourire chaleureux"
                fill
                priority
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-amber-100/10" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-amber-100 backdrop-blur">
                En direct du Pôle Nord (avec une touche de Colombo)
              </div>
            </div>
            <p className="max-w-sm text-center text-sm text-amber-100/90 sm:text-base">
              Parle avec le Père Noël en personne pour obtenir{" "}
              <span className="font-semibold">ton mot de passe secret</span>{" "}
              puis reviens ici pour découvrir ton cadeau de Noël.
            </p>
            <CallSantaButton />
          </section>

          <section className="flex flex-1 flex-col justify-center gap-4 rounded-3xl border border-amber-200/25 bg-gradient-to-br from-red-950/50 via-red-900/60 to-amber-800/60 p-6 shadow-xl shadow-red-950/40 sm:p-8">
            <h2 className="text-lg font-semibold sm:text-xl">
              Déverrouille ton cadeau de Noël
            </h2>
            <p className="text-sm text-amber-100/90 sm:text-base">
              Après ton appel avec le Père Noël (Père Noël, Papà Natale ou
              même Père Noël version Sri Lanka 🌴), saisis ici le mot de passe
              magique qu&apos;il t&apos;a murmuré.
            </p>

            <form onSubmit={handleSubmit} className="mt-2 space-y-3">
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-amber-200/80">
                Mot de passe secret
              </label>
              <input
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-full border border-amber-300/40 bg-black/20 px-4 py-2.5 text-sm text-white placeholder:text-amber-100/40 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/60"
                placeholder="Entre le mot de passe que le Père Noël t'a donné"
              />
              {error && (
                <p className="text-sm font-medium text-amber-200">{error}</p>
              )}
              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-red-950 shadow-lg shadow-amber-900/40 transition-transform duration-150 hover:bg-amber-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-300"
              >
                Révéler mon cadeau 🎁
              </button>
            </form>

            {revealed && (
              <div className="mt-4 rounded-2xl border border-amber-200/40 bg-black/25 px-4 py-4 text-sm sm:text-base">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-200/80">
                  Ton cadeau de Noël
                </p>
                <p className="mt-2 text-lg font-semibold text-amber-100">
                  Your gift is a private padel lesson with Nuno
                </p>
                <p className="mt-2 text-sm text-amber-100/90">
                  Prépare-toi à transpirer un peu plus qu&apos;à la plage de
                  Mirissa : une leçon privée de padel avec Nuno t&apos;attend !
                </p>
              </div>
            )}

            {!revealed && (
              <p className="mt-4 text-xs text-amber-100/75">
                Astuce : si tu as oublié le mot de passe, rappelle le Père Noël
                — il est quelque part entre le Pôle Nord et les palmiers du Sri
                Lanka.
              </p>
            )}
          </section>
        </main>

        <footer className="mt-8 flex items-center justify-center text-[10px] text-amber-100/60 sm:text-xs">
          <span>
            Fait avec beaucoup de cannelle, un peu de sable chaud et une grande
            dose de magie de Noël ✨
          </span>
        </footer>
      </div>
    </div>
  );
}

