import React from 'react';
import {AccountForm} from "../../../components/forms/AccountForm";
import Head from "next/head";

export const GroupUser = ({ groupId }) =>
  <main>
    <Head>
      <title>Création d'utilisateur | Mailitance</title>
    </Head>
    <h1>Création d'utilisateur</h1>
    <AccountForm />
  </main>