import React from 'react'
import styles from './header.module.scss'
import { LoginOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons'
import { Layout, Space, Typography } from 'antd'
import { Buttons } from '../../ui/buttons/Buttons'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from './../../path'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../../features/auth/authSlice'

export default function Header() {
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogoutClick = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate(`/login`)
  }

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
      {user ? (
        <Buttons type='ghost' icon={<LoginOutlined />} onClick={onLogoutClick}>
          Выйти
        </Buttons>
      ) : (
        <Space>
          <Link to={Paths.login}>
            <Buttons type='ghost' icon={<LoginOutlined />}>
              Войти
            </Buttons>
          </Link>
          <Link to={Paths.register}>
            <Buttons type='ghost' icon={<UserAddOutlined />}>
              Зарегистрироваться
            </Buttons>
          </Link>
        </Space>
      )}
    </Layout.Header>
  )
}
