export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-300">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <a href="/" className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Go Back Home
      </a>
    </div>
  );
}
