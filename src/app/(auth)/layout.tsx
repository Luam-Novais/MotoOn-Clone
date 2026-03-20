export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full w-full py-8 px-4 flex justify-center items-center">
      <section>{children}</section>
    </main>
  );
}
