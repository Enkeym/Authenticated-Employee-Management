import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layout/Layout'
import { Card, Form, Row, Space, Typography } from 'antd'
import { Input } from '../../ui/input/Input'
import { InputPassword } from '../../ui/input/InputPassword'
import { Buttons } from '../../ui/buttons/Buttons'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../path'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { useRegisterMutation } from '../../app/services/auth'
import { User } from '@prisma/client'
import { isErrorWithMessage } from '../../utils/isErrorWithMessage'
import { ErrorMessage } from '../../components/error/ErrorMessage'

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

export default function Register() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();

      navigate("/");
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Зарегистрируйтесь" style={{ width: "30rem" }}>
          <Form onFinish={register}>
            <Input type="text" name="name" placeholder="Имя" />
            <Input type="email" name="email" placeholder="Email" />
            <InputPassword name="password" placeholder="Пароль" />
            <InputPassword name="confirmPassword" placeholder="Пароль" />
            <Buttons type="primary" htmlType="submit">
              Зарегистрироваться
            </Buttons>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Уже зарегистрированы? <Link to={Paths.login}>Войдите</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};