'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Ocorreu algo inesperado, estamos trabalhando nisso.</h2>
      <button className="flex items-center justify-center gap-2 border border-zinc-700 hover:bg-zinc-900 transition-colors rounded-lg py-3 text-zinc-300" onClick={() => reset()}>
        Tentar novamente
      </button>
    </div>
  );
}
