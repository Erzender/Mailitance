import styles from './StyledFormField.module.css'
import React from 'react';
import  { GenericFormField } from 'generic-form';
export const StyledFormField = ({className, ...props}) => <GenericFormField {...props} className={styles.field+(className ? ' '+className : '')} />