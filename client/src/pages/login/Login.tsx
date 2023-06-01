import React from 'react'
import { Layout } from '../../components/layout/Layout'
import { Card, Form, Row, Space, Typography } from 'antd'
import { Input } from '../../ui/input/Input'
import { InputPassword } from '../../ui/input/InputPassword'
import { Buttons } from '../../ui/buttons/Buttons'
import { Link } from 'react-router-dom'
import { Paths } from '../../path'

export default function Login() {
  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Войдите' style={{ width: '30rem' }}>
          <Form onFinish={() => null}>
            <Input type='primary' name='email' placeholder='Email' />
            <InputPassword name='password' placeholder='Пароль' />
            <Buttons type='primary' htmlType='submit'>
              Войти
            </Buttons>
          </Form>
          <Space direction='vertical' size='large'>
            <Typography.Text>
              Нет аккаунта? <Link to={Paths.register}>Зарегистрироваться</Link>{' '}
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}
