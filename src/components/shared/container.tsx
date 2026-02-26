export function Container({ children }: { children: React.ReactNode}) {
  return (
    <div className="max-w-xl mx-auto px-6 w-full">
      {children}
    </div>
  )
}
