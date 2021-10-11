import React from 'react';
import {GroupForm} from "../../../components/forms/GroupForm";
import Head from "next/head";

export const AdminGroupsCreate = () =>
  <main id="view-admin-groups-create">
    <Head>
      <title>Création de groupe | Mailitance</title>
    </Head>
    <h1>Création de groupe</h1>
    <GroupForm />
  </main>