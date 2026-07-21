type SectionSkeletonProps = {
  label: string;
  minHeight?: string;
};

export default function SectionSkeleton({ label, minHeight = '100svh' }: SectionSkeletonProps) {
  return (
    <section className="section-skeleton" aria-label={`${label} loading`} style={{ minHeight }}>
      <div className="skeleton-inner">
        <div className="skeleton-kicker" />
        <div className="skeleton-title" />
        <div className="skeleton-title short" />
        <div className="skeleton-grid">
          <div />
          <div />
          <div />
        </div>
      </div>

      <style jsx>{`
        .section-skeleton {
          display: flex;
          align-items: center;
          padding: clamp(4rem, 8vw, 7rem) clamp(1.25rem, 4vw, 2rem);
          background: linear-gradient(180deg, #0e1b15 0%, #13261d 100%);
          content-visibility: auto;
          contain-intrinsic-size: 900px;
        }
        .skeleton-inner {
          width: min(1120px, 100%);
          margin: 0 auto;
        }
        .skeleton-kicker,
        .skeleton-title,
        .skeleton-grid div {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          background: rgba(251, 247, 240, 0.07);
        }
        .skeleton-kicker::after,
        .skeleton-title::after,
        .skeleton-grid div::after {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(90deg, transparent, rgba(233, 196, 106, 0.08), transparent);
          animation: skeletonSweep 1.4s ease-in-out infinite;
        }
        .skeleton-kicker {
          width: 180px;
          height: 12px;
          margin-bottom: 1.4rem;
        }
        .skeleton-title {
          width: min(620px, 88vw);
          height: clamp(36px, 6vw, 58px);
          margin-bottom: 0.75rem;
        }
        .skeleton-title.short {
          width: min(420px, 70vw);
          margin-bottom: 2rem;
        }
        .skeleton-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }
        .skeleton-grid div {
          height: 170px;
        }
        @keyframes skeletonSweep {
          to { transform: translateX(100%); }
        }
        @media (max-width: 760px) {
          .section-skeleton { min-height: 720px !important; }
          .skeleton-grid { grid-template-columns: 1fr; }
          .skeleton-grid div { height: 118px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .skeleton-kicker::after,
          .skeleton-title::after,
          .skeleton-grid div::after { animation: none; }
        }
      `}</style>
    </section>
  );
}
