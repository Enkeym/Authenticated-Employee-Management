import React from 'react'
import styles from './header.module.scss'
import { LoginOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons'
import { Layout, Space, Typography } from 'antd'
import { Buttons } from '../../ui/buttons/Buttons'
import { Link } from 'react-router-dom'
import { Paths } from './../../path'

export default function Header() {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <Buttons type='ghost'>
            <Typography.Title level={1}>Сотрудники</Typography.Title>
          </Buttons>
        </Link>
      </Space>
      <Space>
        <Link to={Paths.login}>
          <Buttons type='ghost' icon={<LoginOutlined/>}>Войти</Buttons>
        </Link>
        <Link to={Paths.register}>
          <Buttons type='ghost' icon={<UserAddOutlined/>} >Зарегистрироваться</Buttons>
        </Link>
      </Space>
    </Layout.Header>
  )
}
