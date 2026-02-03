const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '7️⃣', '🎰'];

export function SlotReelBackground() {
  // Create 6 columns with staggered animations
  const columns = Array.from({ length: 6 }, (_, i) => ({
    left: `${10 + i * 16}%`,
    delay: i * 2,
    speed: 15 + (i % 3) * 5,
    direction: i % 2 === 0 ? 1 : -1,
  }));

  return (
    <div className="slot-reel-bg">
      {columns.map((col, colIndex) => (
        <div
          key={colIndex}
          className="slot-column"
          style={{
            left: col.left,
            animationDuration: `${col.speed}s`,
            animationDelay: `-${col.delay}s`,
            animationDirection: col.direction === 1 ? 'normal' : 'reverse',
          }}
        >
          {/* Duplicate symbols for seamless loop */}
          {[...symbols, ...symbols, ...symbols, ...symbols].map((symbol, i) => (
            <div key={i} className="slot-symbol">
              {symbol}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
