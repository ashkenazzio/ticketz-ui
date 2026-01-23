const colors = [
  { name: 'dark', value: '#0d1216', textLight: true },
  { name: 'darker', value: '#0a0a0c', textLight: true },
  { name: 'surface', value: '#18191b', textLight: true },
  { name: 'surface-highlight', value: '#1f2124', textLight: true },
  { name: 'lime', value: '#a7f175', textLight: false },
  { name: 'limehover', value: '#96d969', textLight: false },
];

const grays = [
  { name: 'gray-100', value: '#f3f4f6' },
  { name: 'gray-200', value: '#e5e7eb' },
  { name: 'gray-300', value: '#d1d5db' },
  { name: 'gray-400', value: '#9ca3af' },
  { name: 'gray-500', value: '#6b7280' },
  { name: 'gray-600', value: '#4b5563' },
  { name: 'gray-700', value: '#374151' },
  { name: 'gray-800', value: '#1f2937' },
  { name: 'gray-900', value: '#111827' },
];

const typography = [
  { name: 'Sans (Manrope)', family: 'font-sans', sample: 'The quick brown fox jumps over the lazy dog', weights: ['400', '500', '600', '700'] },
  { name: 'Serif (DM Serif Display)', family: 'font-serif', sample: 'Electric Garden Festival', weights: ['400'] },
  { name: 'Mono (JetBrains Mono)', family: 'font-mono', sample: 'TICKET-001-XYZ-ABC', weights: ['400', '500', '700'] },
];

const shadows = [
  { name: 'float', value: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', class: 'shadow-float' },
  { name: 'glow-lime', value: '0 0 30px rgba(167, 241, 117, 0.1)', class: 'shadow-glow-lime' },
];

export function ColorTokens() {
  return (
    <div className="space-y-8">
      {/* Brand Colors */}
      <div>
        <h4 className="text-xs font-mono text-gray-500 uppercase mb-4">Brand Colors</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {colors.map((color) => (
            <div key={color.name} className="space-y-2">
              <div
                className="w-full h-20 rounded-sm border border-white/10"
                style={{ backgroundColor: color.value }}
              />
              <div>
                <div className="text-sm font-mono text-white">{color.name}</div>
                <div className="text-xs font-mono text-gray-500">{color.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gray Scale */}
      <div>
        <h4 className="text-xs font-mono text-gray-500 uppercase mb-4">Gray Scale</h4>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
          {grays.map((color) => (
            <div key={color.name} className="space-y-2">
              <div
                className="w-full h-16 rounded-sm border border-white/10"
                style={{ backgroundColor: color.value }}
              />
              <div>
                <div className="text-xs font-mono text-white">{color.name.replace('gray-', '')}</div>
                <div className="text-[10px] font-mono text-gray-500">{color.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TypographyTokens() {
  return (
    <div className="space-y-8">
      {typography.map((type) => (
        <div key={type.name} className="space-y-4">
          <div className="text-xs font-mono text-lime uppercase tracking-wider">{type.name}</div>

          {/* Sample at different sizes */}
          <div className="space-y-3">
            <div className={`${type.family} text-5xl text-white`}>{type.sample}</div>
            <div className={`${type.family} text-3xl text-white`}>{type.sample}</div>
            <div className={`${type.family} text-xl text-white`}>{type.sample}</div>
            <div className={`${type.family} text-base text-white`}>{type.sample}</div>
            <div className={`${type.family} text-sm text-gray-400`}>{type.sample}</div>
          </div>

          {/* Weights */}
          <div className="flex flex-wrap gap-4 pt-2 border-t border-white/5">
            {type.weights.map((weight) => (
              <div key={weight} className={`${type.family} text-lg text-gray-300`} style={{ fontWeight: parseInt(weight) }}>
                {weight} - Aa Bb Cc
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ShadowTokens() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {shadows.map((shadow) => (
        <div key={shadow.name} className="space-y-3">
          <div className="text-xs font-mono text-lime uppercase tracking-wider">{shadow.name}</div>
          <div
            className={`w-full h-32 bg-surface rounded-sm ${shadow.class} flex items-center justify-center`}
          >
            <span className="text-gray-400 text-sm font-mono">{shadow.class}</span>
          </div>
          <div className="text-xs font-mono text-gray-500 break-all">{shadow.value}</div>
        </div>
      ))}
    </div>
  );
}

export function SpacingTokens() {
  const spacings = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];

  return (
    <div className="space-y-2">
      {spacings.map((space) => (
        <div key={space} className="flex items-center gap-4">
          <div className="w-12 text-xs font-mono text-gray-500 text-right">{space}</div>
          <div
            className="h-4 bg-lime/30 rounded-sm"
            style={{ width: `${space * 4}px` }}
          />
          <div className="text-xs font-mono text-gray-400">{space * 4}px / {space * 0.25}rem</div>
        </div>
      ))}
    </div>
  );
}
