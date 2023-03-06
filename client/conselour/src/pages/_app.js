import Protected from '@/layouts/Protected';
import '@/styles/globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'jotai'

export default function App({ Component, pageProps }) {
  const clientId = '338857378147-i9iovlptidjlqpfc0pn3cfdg2dnpf6uo.apps.googleusercontent.com'
  return (
    <Provider>
      <Protected >
        <GoogleOAuthProvider clientId={clientId} >
          <Component {...pageProps} />
        </GoogleOAuthProvider>
      </Protected>
    </Provider>
  )
}
