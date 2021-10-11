import React from 'react';
import {ContactForm} from "../../../components/forms/ContactForm";
import Head from "next/head";

export const GroupContact = ({ groupId }) =>
  <main>
    <Head>
      <title>Ajout de contact | Mailitance</title>
    </Head>
    <ContactForm groupId={groupId} />
  </main>