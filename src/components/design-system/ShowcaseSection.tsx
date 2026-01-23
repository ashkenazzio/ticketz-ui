interface ShowcaseSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ShowcaseSection({
  title,
  description,
  children,
  className = ''
}: ShowcaseSectionProps) {
  return (
    <section className={`mb-20 ${className}`}>
      {/* Section Header */}
      <div className="mb-8 pb-4 border-b border-white/10">
        <h2 className="font-display text-2xl uppercase tracking-tight text-white mb-2">
          {title}
        </h2>
        {description && (
          <p className="text-gray-400 text-sm">{description}</p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
}
