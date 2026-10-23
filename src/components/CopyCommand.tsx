'use client';

import { useEffect, useRef, useState } from 'react';

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    },
    [],
  );

  async function handleCopy() {
    try {
      await copyText(command);
      setCopied(true);
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="command-block">
      <code>{command}</code>
      <button type="button" className="command-copy" onClick={handleCopy}>
        {copied ? 'Copied' : 'Copy'}
      </button>
      <span className="visually-hidden" role="status" aria-live="polite">
        {copied ? 'Command copied to clipboard' : ''}
      </span>
    </div>
  );
}
