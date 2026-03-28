import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-5xl font-extrabold text-primary animate-pulse">404</h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground">
            Oops! The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
