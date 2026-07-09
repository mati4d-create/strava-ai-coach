"use client";

import { useRef, useState } from "react";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [question, setQuestion] = useState("");

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : null);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!question.trim()) return;
    setQuestion("");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 py-16 text-white">
      <div className="flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-12">
        <EnduroLogo />

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-[#101010] p-3 transition-colors focus-within:border-white/20">
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  handleSubmit(event);
                }
              }}
              placeholder="Pregúntame sobre tu entrenamiento..."
              rows={1}
              className="max-h-40 w-full resize-none bg-transparent px-2 py-1 text-base text-white placeholder:text-zinc-500 focus:outline-none"
            />

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-white/25 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <UploadIcon />
                Subir archivo FIT
              </button>

              <button
                type="submit"
                disabled={!question.trim()}
                aria-label="Enviar pregunta"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-opacity disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <SendIcon />
              </button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".fit"
            onChange={handleFileChange}
            className="hidden"
          />

          {fileName && (
            <p className="mt-3 px-2 text-xs text-zinc-500">
              Archivo cargado: <span className="text-zinc-300">{fileName}</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

function EnduroLogo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden
        className="text-white"
      >
        <path
          d="M3 26L13 10L18 19L22 13L33 26"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-xl font-semibold tracking-tight text-white">
        Enduro Coach
      </span>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 10.5V2M8 2L5 5M8 2l3 3M3 11v1.5A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
