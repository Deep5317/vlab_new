export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#efeeee] min-h-screen py-12 px-4">
      {children}
    </div>
  )
}