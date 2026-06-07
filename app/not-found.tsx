export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-black text-white px-6 py-20">
      <div className="max-w-xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gold/80">404</p>
        <h1 className="mt-4 text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-sm text-muted">
          The page you were looking for does not exist. Return to the homepage to continue.
        </p>
      </div>
    </div>
  );
}
