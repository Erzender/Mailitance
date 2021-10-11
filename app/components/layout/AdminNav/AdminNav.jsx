import styles from './AdminNav.module.css';
import React from 'react';
import Link from 'next/link';

export const AdminNav = () => <nav className={styles.nav}>
  <ul>
    <li><Link href="/admin/groupes/creer">Créer un groupe</Link></li>
    <li><Link href="/admin/utilisateurs/creer">Créer un utilisateur</Link></li>
  </ul>
</nav>