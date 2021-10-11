import {Provider, useSelector} from 'react-redux'

import {store} from '../redux/store'
import {isLoggedInSelector} from "../redux/account/accountSelectors";
import {Header} from "../components/layout/Header/Header";
import {useRouter} from "next/router";
import {AdminNav} from "../components/layout/AdminNav/AdminNav";
import {Modal} from "../components/layout/Modal/Modal";
import { setErrors } from 'generic-form';

setErrors({ mandatory: 'Ce champs est requis' });

const Wrapper = ({children}) => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const router = useRouter();
  return <>{isLoggedIn
    ? <>
      <Header/>
      {router.route.startsWith('/admin') && <AdminNav/>}
      {children}
    </>
    : children }
    <Modal/>
  </>;
  }

    export default function App({Component, pageProps}) {
      return (
      <Provider store={store}>
      <Wrapper>
      <Component {...pageProps} />
      </Wrapper>
      </Provider>
      )
    }