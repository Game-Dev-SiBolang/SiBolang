'use client';

import dynamic from 'next/dynamic';

// ssr:false hanya boleh dipanggil dari Client Component (aturan Next.js versi ini)
const GameClient = dynamic(() => import('@/components/game-client'), { ssr: false });

export default function GameLoader() {
  return <GameClient />;
}
