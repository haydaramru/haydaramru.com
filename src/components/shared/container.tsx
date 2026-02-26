export function Container({ children }: { children: React.ReactNode}) {
  return (
    <div className="max-w-2xl mx-auto px-6 w-full">
      {children}
    </div>
  )
}
