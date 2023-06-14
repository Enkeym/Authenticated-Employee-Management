import { useState } from 'react'
import { Layout } from '../../components/layout/Layout'
import { Card, Form, Row, Space, Typography } from 'antd'
import { Input } from '../../ui/input/Input'
import { InputPassword } from '../../ui/input/InputPassword'
import { Buttons } from '../../ui/buttons/Buttons'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../path'
import { UserData, useLoginMutation } from '../../app/services/auth'
import { isErrorWithMessage } from '../../utils/isErrorWithMessage'
import { ErrorMessage } from '../../components/error/ErrorMessage'

export default function Login() {
  const navigate = useNavigate()
  const [loginUser, loginUserResult] = useLoginMutation()
  const [error, setError] = useState('')

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap()
      navigate('/')
    } catch (error) {
      const maybeError = isErrorWithMessage(error)

      if (maybeError) {
        setError(error.data.message)
      } else {
        setError('Неизвестная ошибка')
      }
    }
  }

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Войдите' style={{ width: '30rem' }}>
          <Form onFinish={login}>
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
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}
