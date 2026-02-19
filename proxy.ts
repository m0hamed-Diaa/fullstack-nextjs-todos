// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

// export default clerkMiddleware(async (auth, req) => {
//     if (!isPublicRoute(req)) {
//         await auth.protect()
//     }
// })

// export const config = {
//     matcher: [
//         // Skip Next.js internals and all static files, unless found in search params
//         '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//         // Always run for API routes
//         '/(api|trpc)(.*)',
//     ],
// }
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
    // حماية الـ routes العامة
    if (!isPublicRoute(req)) {
        await auth.protect()
    }

    // حماية مسار الـ Admin
    if (isAdminRoute(req)) {
        const { userId } = await auth()

        // لو مش مسجل دخول
        if (!userId) {
            const signInUrl = new URL('/sign-in', req.url)
            signInUrl.searchParams.set('redirect_url', req.url)
            return NextResponse.redirect(signInUrl)
        }

        // جيب بيانات المستخدم وتحقق من الـ role
        const { clerkClient } = await import('@clerk/nextjs/server')
        const user = await (await clerkClient()).users.getUser(userId)
        const role = user.publicMetadata?.role

        // لو مش admin، ارجعه للـ home
        if (role !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url))
        }
    }
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}