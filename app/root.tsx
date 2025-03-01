import { Toaster } from 'react-hot-toast'
import {
  Links,
  LinksFunction,
  LiveReload,
  LoaderFunction,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  useCatch,
  useLoaderData,
} from 'remix'
import { authenticator } from './auth/auth.server'
import { Navigation } from './components/Navigation'
import { toastOptions } from './lib/toast'
import openBookImg from './assets/open-book.png'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: '/tailwindcss' }]
}

export const meta: MetaFunction = () => {
  const description =
    'Become better than your past by assessing yourself regularly and holding yourself accountable!'
  return {
    title: 'Shisui',
    description,
    keywords:
      'Shisui,self-improvement,discipline,productivity,remix,assessment',
    'twitter:image': openBookImg,
    'twitter:card': 'summary',
    'twitter:creator': '@TAbrodi',
    'twitter:site': '@TAbrodi',
    'twitter:title': 'Shisui',
    'twitter:description': description,
    'og:image': openBookImg,
    'og:title': 'Shisui',
    'og:description': description,
  }
}

type LoaderData = {
  isAuthenticated: boolean
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)

  return { isAuthenticated: Boolean(user) }
}

export default function App() {
  const { isAuthenticated } = useLoaderData<LoaderData>()

  return (
    <Document>
      <Toaster
        position="top-center"
        toastOptions={toastOptions}
        containerStyle={{ top: 50 }}
      />
      {isAuthenticated && <Navigation />}
      <Outlet />
    </Document>
  )
}

function Document({
  children,
  title = 'Shisui',
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
  return (
    <Document title="Error!">
      <div>
        <h1>There was an error</h1>
        <p>{error.message}</p>
        <hr />
        <p>
          Hey, developer, you should replace this with what you want your users
          to see.
        </p>
      </div>
    </Document>
  )
}

export function CatchBoundary() {
  let caught = useCatch()

  let message
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      )
      break
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      )
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <h1>
        {caught.status}: {caught.statusText}
      </h1>
      {message}
    </Document>
  )
}
