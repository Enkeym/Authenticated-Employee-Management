import React from 'react'
import { Layout as AntLayout } from 'antd'
import styles from './layout.module.scss'
import Header from '../header/Header'

type Props = {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.main}>
      <Header />
      <AntLayout.Content style={{ height: '100%' }}>
        {children}
      </AntLayout.Content>
    </div>
  )
}
