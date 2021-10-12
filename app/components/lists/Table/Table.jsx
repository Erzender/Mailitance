import React from 'react';
import styles from "./Table.module.css";

export const Table = ({ children }) => <table className={styles.table}>{children}</table>