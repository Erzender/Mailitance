import React, {useEffect} from 'react';
import {LoginForm} from "../../components/forms/LoginForm";
import {connect, useSelector} from "react-redux";
import {isLoggedInSelector} from "../../redux/account/accountSelectors";
import {useRouter} from "next/router";
import Head from "next/head";

export const Login = () => {
  const { push } = useRouter();
  const isLoggedIn = useSelector(isLoggedInSelector);

  useEffect(() => {
    if (isLoggedIn)
      push('/');
  }, [isLoggedIn]);
  return <main id="view-login">
    <Head>
      <title>Mailitance | Connexion</title>
    </Head>
    <LoginForm />
  </main>
}