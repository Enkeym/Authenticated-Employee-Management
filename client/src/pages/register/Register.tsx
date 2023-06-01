import React from 'react'
import { Layout } from '../../components/layout/Layout'
import { Card, Form, Row, Space, Typography } from 'antd'
import { Input } from '../../ui/input/Input'
import { InputPassword } from '../../ui/input/InputPassword'
import { Buttons } from '../../ui/buttons/Buttons'
import { Link } from 'react-router-dom'
import { Paths } from '../../path'
export default function Register() {
  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Зарегистрироваться' style={{ width: '30rem' }}>
          <Form onFinish={() => null}>
            <Input name='name' placeholder='Имя' />
            <Input type='primary' name='email' placeholder='Email' />
            <InputPassword name='password' placeholder='Пароль' />
            <InputPassword
              name='confirmPassword'
              placeholder='Повторите пароль'
            />
            <Buttons type='primary' htmlType='submit'>
              Зарегистрироваться
            </Buttons>
          </Form>
          <Space direction='vertical' size='large'>
            <Typography.Text>
              Есть аккаунт? <Link to={Paths.login}>Войти</Link>{' '}
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}
