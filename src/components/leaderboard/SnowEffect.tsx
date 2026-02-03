export function SnowEffect() {
  // Generate random snowflakes with different properties
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100, // Random X position (0-100%)
    delay: Math.random() * 20, // Random delay (0-20s)
    duration: 10 + Math.random() * 20, // Random duration (10-30s)
    size: 2 + Math.random() * 3, // Random size (2-5px)
    opacity: 0.3 + Math.random() * 0.6, // Random opacity (0.3-0.9)
    swing: Math.random() * 30 - 15, // Random horizontal swing (-15 to 15)
  }));

  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Define blur filter for soft snowflakes */}
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
      </defs>

      {snowflakes.map((flake) => (
        <circle
          key={flake.id}
          cx={`${flake.x}%`}
          cy="-20"
          r={flake.size}
          fill="white"
          opacity={flake.opacity}
          filter="url(#blur)"
        >
          {/* Vertical falling animation */}
          <animate
            attributeName="cy"
            from="-20"
            to="110%"
            dur={`${flake.duration}s`}
            begin={`${flake.delay}s`}
            repeatCount="indefinite"
          />
          
          {/* Horizontal swing animation */}
          <animate
            attributeName="cx"
            values={`${flake.x}%;${flake.x + flake.swing}%;${flake.x}%`}
            dur={`${flake.duration / 2}s`}
            begin={`${flake.delay}s`}
            repeatCount="indefinite"
          />
          
          {/* Opacity pulsing for sparkle effect */}
          <animate
            attributeName="opacity"
            values={`${flake.opacity};${flake.opacity * 0.5};${flake.opacity}`}
            dur={`${3 + Math.random() * 3}s`}
            begin={`${flake.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}
