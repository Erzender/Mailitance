import styles from './AdminNav.module.css';
import React from 'react';
import Link from 'next/link';
import {useRouter} from "next/router";

export const AdminNav = () => {
  const { asPath } = useRouter();
  return <nav className={styles.nav}>
    <ul>
      <li><Link href="/admin/groupes/creer"><a className={asPath === "/admin/groupes/creer" ? 'is-active' : null}>Créer un groupe</a></Link></li>
      <li><Link href="/admin/utilisateurs/creer"><a className={asPath === "/admin/utilisateurs/creer" ? 'is-active' : null}>Créer un utilisateur</a></Link></li>
    </ul>
  </nav>
}