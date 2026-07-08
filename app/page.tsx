export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-black px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-10%,rgba(252,76,2,0.12),transparent_60%)]"
      />

      <main className="flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        <span className="rounded-full border border-white/15 px-4 py-1 text-sm font-medium text-zinc-400">
          Enduro MTB · IA
        </span>

        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Strava AI Coach
        </h1>

        <p className="max-w-xl text-lg text-zinc-400 sm:text-xl">
          Tu entrenador personal de Enduro MTB con IA
        </p>

        <button
          type="button"
          className="mt-4 flex h-12 items-center justify-center gap-2 rounded-full bg-[#FC4C02] px-8 text-base font-medium text-white transition-colors hover:bg-[#e04502] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC4C02] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Conectar con Strava
        </button>
      </main>
    </div>
  );
}
