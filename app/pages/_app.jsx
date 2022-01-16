import {Provider, useSelector} from 'react-redux'

import {store} from '../redux/store'
import {isLoggedInSelector, loadedSelector, isAdminSelector} from "../redux/account/accountSelectors";
import {Header} from "../components/layout/Header/Header";
import {useRouter} from "next/router";
import {AdminNav} from "../components/layout/AdminNav/AdminNav";
import {Modal} from "../components/layout/Modal/Modal";
import {setErrors} from 'generic-form';
import {ErrorBoundary} from "../components/layout/ErrorBoundary/ErrorBoundary";

setErrors({mandatory: 'Ce champs est requis'});

const Wrapper = ({children}) => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const admin = useSelector(isAdminSelector);
  const router = useRouter();
  return <ErrorBoundary>{isLoggedIn
    ? <>
      <Header/>
      {router.route.startsWith('/admin') && admin && <AdminNav/>}
      {children}
    </>
    : children}
    <Modal/>

  </ErrorBoundary>;
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