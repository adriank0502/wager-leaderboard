import { LeaderboardEntry } from '@/types/leaderboard';
import { BRANDING } from '@/config/branding';
import React, { memo, useEffect, useMemo, useState } from 'react';

interface MikeLeaderboardProps {
  topThree: LeaderboardEntry[];
  entries: LeaderboardEntry[];
  startAt?: string | null;
  endAt?: string | null;
}

const formatValue = (value: string) => {
  const num = parseFloat(value.replace(/,/g, ''));
  if (Number.isNaN(num)) return value;
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Use usernames as provided by API (already obfuscated when required)
const displayUsername = (username: string) => username || '***';

const CurrencyDot = ({ size = 18, color = '#2ecf9a' }: { size?: number; color?: string }) => (
  <span
    className="inline-flex items-center justify-center rounded-full border flex-shrink-0"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      background: '#1a2233',
      borderColor: 'rgba(255,255,255,0.12)',
    }}
  >
    <svg
      width={Math.floor(size * 0.78)}
      height={Math.floor(size * 0.78)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
    >
      <path
        d="M12 6v2m0 8v2m4-7c0-1.105-1.343-2-3-2h-2a2 2 0 1 1 0-4h4M8 13c0 1.105 1.343 2 3 2h2a2 2 0 1 1 0 4H9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export const MikeLeaderboard = memo(function MikeLeaderboard({ topThree, entries, startAt, endAt }: MikeLeaderboardProps) {
  return <_MikeLeaderboardInner topThree={topThree} entries={entries} startAt={startAt} endAt={endAt} />;
}, (prev, next) => {
  // Avoid re-render unless leaderboard props change
  const sameTop =
    prev.topThree.length === next.topThree.length &&
    prev.topThree.every((a, i) => {
      const b = next.topThree[i];
      return a && b && a.rank === b.rank && a.player.uuid === b.player.uuid && a.value === b.value && a.prize?.amount === b.prize?.amount;
    });
  const sameEntries =
    prev.entries.length === next.entries.length &&
    prev.entries.every((a, i) => {
      const b = next.entries[i];
      return a && b && a.rank === b.rank && a.player.uuid === b.player.uuid && a.value === b.value && a.prize?.amount === b.prize?.amount;
    });
  return sameTop && sameEntries && prev.endAt === next.endAt && prev.startAt === next.startAt;
});

export function _MikeLeaderboardInner({ topThree, entries, startAt, endAt }: MikeLeaderboardProps) {
  const first = topThree.find(e => e.rank === 1);
  const second = topThree.find(e => e.rank === 2);
  const third = topThree.find(e => e.rank === 3);

  const podium = [second, first, third].filter(Boolean) as LeaderboardEntry[];
  const getVipIcon = (e: LeaderboardEntry) =>
    (e.player?.vip as any)?.cms_property?.icon?.path as string | undefined;

  return (
    <div className="max-w-[1080px] mx-auto px-4">
      {/* Title */}
      <div className="flex justify-center mt-4">
        <img
          src="/mike-assets/images/Leaderboard sign.png"
          alt="Leaderboard"
          className="w-full max-w-[540px] h-auto drop-shadow-[0_0_24px_rgba(255,160,0,0.35)]"
        />
      </div>

      {/* Top 3 */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 items-stretch justify-center max-w-[828px] mx-auto mt-8 mb-8 sm:mb-12">
        {podium.map((p) => (
          <article
            key={p.rank}
            className={`relative rounded-[18px] p-4 pt-6 flex flex-col items-center gap-2 w-full sm:w-[260px] min-h-[240px] sm:min-h-[260px] border`}
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(12,14,24,0.28) 0%, rgba(12,14,24,0.62) 100%), url('/mike-assets/images/bg-rank.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderColor: 'rgba(255,255,255,0.08)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
              transform: p.rank === 1 ? 'translateY(-8px)' : undefined,
            }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-[6px] rounded-t-[18px]"
              style={{
                background:
                  p.rank === 1
                    ? 'linear-gradient(90deg, #ffe27a, #ffd257)'
                    : p.rank === 2
                    ? 'linear-gradient(90deg, #9dc1ff, #6aa7ff)'
                    : 'linear-gradient(90deg, #f2b484, #df915f)',
              }}
            />

            {/* Ribbon */}
            <img
              className="absolute top-[10px] left-[10px] w-[56px] h-[56px] select-none pointer-events-none"
              src={`/mike-assets/images/rank-${p.rank}.png`}
              alt={`${p.rank} ribbon`}
              onError={(e) => {
                // fallback silently
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />

            {/* Static avatar (as requested) */}
            <div
              className="w-16 h-16 sm:w-[64px] sm:h-[64px] rounded-[10px] overflow-hidden mt-1"
              style={{
                border: '2px solid #f1c24f',
                background: '#0c1019',
                boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.04)',
              }}
            >
              <img
                src="/mike-assets/images/Wager_Avatar 2.png"
                alt={`Top ${p.rank}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Username row */}
            <div className="inline-flex items-center gap-1.5 mt-1">
              {getVipIcon(p) && (
                <img
                  src={getVipIcon(p)}
                  alt="VIP"
                  className="w-4 h-4 object-contain"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              )}
              <div className="font-extrabold text-sm">{displayUsername(p.player.username)}</div>
            </div>

            {/* Meta */}
            <div className="text-[#aab2c4] text-xs mt-1">Wager</div>

            {/* Amount */}
            <div className="font-extrabold text-sm">
              <span className="inline-flex items-center gap-1.5">
                <CurrencyDot size={24} color="#2ecf9a" />
                {formatValue(p.value)}
              </span>
            </div>

            {/* Prize bar */}
            <div
              className="mt-auto w-full rounded-[10px] px-3 py-2 flex items-center justify-center gap-2 border"
              style={{ background: '#232837', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <CurrencyDot size={24} color="#2ecf9a" />
              <span className="text-lg font-black">
                {formatValue(p.prize?.amount ?? '0')}
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* Total Wager + live timer section */}
      <section
        className="w-full max-w-[828px] mx-auto mt-4 mb-6 flex items-center justify-between gap-4 rounded-[10px] border px-4 py-3"
        style={{ background: '#0d111b', borderColor: 'rgba(255,255,255,0.10)' }}
      >
        <div className="flex items-center gap-3">
          <img
            className="w-9 h-9 rounded-full object-contain"
            src="https://cdn-cms.wgrcsnapi.com/rb-4x.png"
            alt="Total wager"
          />
          <div>
            <div className="text-white text-lg font-extrabold leading-tight">Total Wager</div>
            <div className="text-[#d0d2db] text-xs font-medium leading-snug">
              Wager to climb the leaderboard for your shot at a $50,000 top prize!
            </div>
          </div>
        </div>

        <LiveTimer endAt={endAt} />
      </section>
      
      {/* Notice box (below table) */}
      <section
        className="w-full max-w-[828px] mx-auto mt-6 mb-12 rounded-[12px] border px-4 py-4"
        style={{ background: '#0d111b', borderColor: 'rgba(255,159,67,0.35)' }}
      >
        <div className="text-[#FF9F43] font-black tracking-wide mb-1">NOTICE</div>
        <p className="text-[#d0d2db] text-sm leading-relaxed">
          After Discussing With Wager.com Management, They Allowed Me To Combine My LB With A Private Invite Only LB
          They Were Running Internally. I Strive To Give My Players The Best Rewards, And Based On The Volumes on the
          LB, I felt this Solution is Fair, and More Rewarding for Players, Good Luck
        </p>
      </section>

      {/* Table */}
      <section
        className="w-full max-w-[828px] mx-auto rounded-[12px] overflow-hidden border"
        style={{ background: '#060b14', borderColor: 'rgba(120,140,180,0.22)' }}
      >
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-[#070d1a] border-b" style={{ borderColor: 'rgba(120,140,180,0.2)' }}>
              <th className="text-left text-[#8fa2c5] font-bold text-xs p-[10px_14px] w-[60px]">Rank</th>
              <th className="text-left text-[#8fa2c5] font-bold text-xs p-[10px_14px]">Player</th>
              <th className="text-left text-[#8fa2c5] font-bold text-xs p-[10px_14px]">Wager</th>
              <th className="text-right text-[#8fa2c5] font-bold text-xs p-[10px_14px]">Prize</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <Row key={e.player.uuid} entry={e} />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

const Row = memo(function Row({ entry }: { entry: LeaderboardEntry }) {
  const getVipIcon = (e: LeaderboardEntry) =>
    (e.player?.vip as any)?.cms_property?.icon?.path as string | undefined;
  return (
    <tr
      className="transition-colors"
      style={{
        background: entry.rank % 2 === 0 ? '#0a0f1a' : '#0c1120',
      }}
    >
      <td className="p-[8px_14px] border-b font-black text-white" style={{ borderColor: 'rgba(120,140,180,0.16)' }}>{entry.rank}.</td>
      <td className="p-[8px_14px] border-b" style={{ borderColor: 'rgba(120,140,180,0.16)' }}>
        <div className="flex items-center gap-2">
          {getVipIcon(entry) && (
            <div className="w-[18px] h-[18px] rounded-full overflow-hidden border flex-shrink-0 bg-[#0e1422]" style={{ borderColor: 'rgba(255,255,255,0.14)' }}>
              <img
                src={getVipIcon(entry)}
                alt="VIP"
                className="w-full h-full object-contain"
                onError={(ev) => { (ev.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
          )}
          <span className="font-extrabold text-white text-sm sm:text-base leading-tight">{displayUsername(entry.player.username)}</span>
        </div>
      </td>
      <td className="p-[8px_14px] border-b" style={{ borderColor: 'rgba(120,140,180,0.16)' }}>
        <span className="inline-flex items-center gap-2">
          <CurrencyDot size={18} color="#2ecf9a" />
          <span className="font-extrabold text-white text-sm sm:text-base leading-tight">{formatValue(entry.value)}</span>
        </span>
      </td>
      <td className="p-[8px_14px] border-b text-right" style={{ borderColor: 'rgba(120,140,180,0.16)' }}>
        <span className="inline-flex items-center gap-2 justify-end w-full">
          <CurrencyDot size={18} color="#2ecf9a" />
          <span className="font-extrabold text-white text-sm sm:text-base leading-tight">
            {formatValue(entry.prize?.amount ?? '0')}
          </span>
        </span>
      </td>
    </tr>
  );
}, (prev, next) => {
  const a = prev.entry;
  const b = next.entry;
  return (
    a.rank === b.rank &&
    a.value === b.value &&
    a.prize?.amount === b.prize?.amount &&
    a.player?.uuid === b.player?.uuid &&
    a.player?.username === b.player?.username
  );
});

function LiveTimer({ endAt }: { endAt?: string | null }) {
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const countdown = useMemo(() => {
    const endMs = endAt ? new Date(endAt).getTime() : null;
    if (!endMs) return { d: '00', h: '00', m: '00', s: '00' };
    const diff = Math.max(0, endMs - now);
    const total = Math.floor(diff / 1000);
    const d = Math.floor(total / 86400);
    const h = Math.floor((total % 86400) / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    return { d: pad(d), h: pad(h), m: pad(m), s: pad(s) };
  }, [endAt, now]);
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto">
      {[`${countdown.d}d`, `${countdown.h}h`, `${countdown.m}m`, `${countdown.s}s`].map((pill) => (
        <div
          key={pill}
          className="min-w-[66px] text-center rounded-[8px] px-2 py-2 font-extrabold text-base"
          style={{ background: '#23273a', border: '1px solid rgba(255,255,255,0.04)', color: '#f4f7ff' }}
        >
          {pill}
        </div>
      ))}
    </div>
  );
}
