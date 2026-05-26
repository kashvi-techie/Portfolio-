export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#c9a227]/25 bg-[#c9a227]/5 px-3 py-1 text-[0.68rem] font-medium tracking-wide text-[#e8d48b]/90">
      {children}
    </span>
  );
}
