import Header from '@/components/dashboard/header/header'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="">
        <div className="mx-auto max-w-4xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}

export default AuthLayout
