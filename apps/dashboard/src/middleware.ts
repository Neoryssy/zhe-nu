import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  {
    callbacks: {
      authorized: ({ token }) => {
        if (!token) {
          NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`)
          return false
        } else return true
      },
    },
    pages: {
      signIn: '/',
    }
  }
)

export const config = {
  matcher: ['/dashboard/:path*'],
}
