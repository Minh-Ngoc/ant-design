import '@/styles/globals.css'
import Layout from '@/components/LayoutAdmin'

export default function App({ Component, pageProps }) {
  const renderWithLayout = Component.getLayout || 
    function(page) {
      return <Layout>{page}</Layout>;
    }
  return renderWithLayout(<Component {...pageProps} />);
}
