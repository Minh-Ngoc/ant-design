import '@/styles/globals.css';
import Layout from '@/components/layout';
import { Provider } from 'react-redux';
import store from '../store';

export default function App({ Component, pageProps }) {
  const renderWithLayout = Component.getLayout || 
    function(page) {
      return (
        <Provider store={store}>
          <Layout>{page}</Layout>;
        </Provider>
      )
    }
  return renderWithLayout(<Component {...pageProps} />);
}
