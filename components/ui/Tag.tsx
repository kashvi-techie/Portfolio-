export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gold/25 bg-gold/5 px-3 py-1 text-[0.68rem] font-medium tracking-wide text-gold-light/90">
      {children}
    </span>
  );
}
