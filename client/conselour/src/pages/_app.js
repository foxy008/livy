import Protected from '@/layouts/Protected';
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'jotai'
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }) {
  const clientId = '274735990607-5qb855ni8u2o8d7v18gmjuur2pbsnhbl.apps.googleusercontent.com'
  return (
    <Provider>
      <Protected >
        <GoogleOAuthProvider clientId={clientId} >
          <ToastContainer position="top-right" autoClose={2000} closeOnClick draggable pauseOnHover />
          <Component {...pageProps} />
        </GoogleOAuthProvider>
      </Protected>
    </Provider>
  )
}
