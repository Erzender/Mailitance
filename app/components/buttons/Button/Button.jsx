import styles from './Button.module.css'
import React from 'react';
import Link from 'next/link'

export const Button = ({children, className, href, ...rest}) => {

  const Tag = href ? 'a' : 'button';
  const content = <Tag className={styles.button+(className ? ' '+className: '')} {...rest}>{children}</Tag>

  return href ? <Link href={href}>{content}</Link> : content;
}