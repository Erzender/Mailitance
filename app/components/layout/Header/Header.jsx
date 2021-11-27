import styles from './Header.module.css';
import React from 'react';
import Link from 'next/link';
import {useDispatch, useSelector} from "react-redux";
import {groupsListSelector, selectedGroupSelector} from "../../../redux/groups/groupsSelectors";
import {
  isAdminSelector,
  militantGroupsSelector,
  operatingGroupsSelector
} from "../../../redux/account/accountSelectors";
import {useRouter} from "next/router";
import {ModalSelectedGroup} from "../../modals/ModalSelectedGroup/ModalSelectedGroup";
import {modalOpen} from "../../../redux/modal/modalActions";

export const Header = () => {
  const selectedGroup = useSelector(selectedGroupSelector);
  const admin = useSelector(isAdminSelector);
  const operatingGroups = useSelector(operatingGroupsSelector);
  const militantGroups = useSelector(militantGroupsSelector);
  const router = useRouter();
  const dispatch = useDispatch();
  return <header id="header" className={styles.header}>
    <Link href="/">
      <img src="/logo.svg" alt=""/>
    </Link>
    <button
      className={styles.group}
      onClick={() => dispatch(modalOpen(ModalSelectedGroup))}>{selectedGroup ? `Groupe: ${selectedGroup.title}` : 'Sélectionner un groupe'}</button>
    <nav>
      <ul>

        {selectedGroup && <>
          <li>
            <Link href={`/groupe/${selectedGroup.id}`}>
              <a className={router.asPath === `/groupe/${selectedGroup.id}` ? 'is-active' : null}>Consulter</a>
            </Link>
          </li>
          {(admin || operatingGroups.includes(selectedGroup.id) || militantGroups.includes(selectedGroup.id)) && <li>
            <Link href={`/groupe/${selectedGroup.id}/contact`}>
              <a className={router.asPath === `/groupe/${selectedGroup.id}/contact` ? 'is-active' : null}>Collecter</a>
            </Link>
          </li>
          }
          {(admin || operatingGroups.includes(selectedGroup.id)) &&
          <li>
            <Link href={`/groupe/${selectedGroup.id}/gestion`}>
              <a className={router.asPath === `/groupe/${selectedGroup.id}/gestion` ? 'is-active' : null}>
                Gestion du groupe
              </a>
            </Link>
          </li>}
        </>}

        {admin && <li>
          <Link href="/admin">
            <a className={router.asPath.startsWith('/admin') ? 'is-active' : null}>Admin</a>
          </Link>
        </li>}

        <li><Link href="/profil"><a className={router.asPath === '/profil' ? 'is-active' : null}>Profil</a></Link></li>
        <li><Link href="/deconnexion"><a className={router.asPath === '/deconnexion' ? 'is-active' : null}>⏻</a></Link></li>
      </ul>
    </nav>
  </header>
}