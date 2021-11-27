import styles from "./Logout.module.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Button } from "../../components/buttons/Button/Button";
import { accountLogout } from "../../redux/account/accountActions";
import Head from "next/head";

export const Logout = () => {
  const dispatch = useDispatch();
  return (
    <main id="view-login">
      <Head>
        <title>Mailitance | Déconnexion</title>
      </Head>
      <div className={styles.logout}>
        Vous allez vous déconnecter
        <Button onClick={() => dispatch(accountLogout())}>Confirmer</Button>
      </div>
    </main>
  );
};
