import { Employee } from '@prisma/client'
import { Card, Form, Space } from 'antd'
import { Input } from '../../ui/input/Input'
import { ErrorMessage } from '../error/ErrorMessage'
import { Buttons } from '../../ui/buttons/Buttons'

type FormType<T> = {
  onFinish: (values: T) => void
  btnText: string
  title: string
  error?: string
  employee?: T
}

export const EmployeeForm = ({
  btnText,
  onFinish,
  title,
  employee,
  error
}: FormType<Employee>) => {
  return <Card title={title} style={{width: '30rem'}}>
    <Form name='employee form' onFinish={onFinish} initialValues={employee} >
      <Input type='text' name='firstName' placeholder='Имя' />
      <Input type='text' name='lastName' placeholder='Фамилия' />
      <Input type='number' name='age' placeholder='Возраст' />
      <Input type='text' name='address' placeholder='Адрес' />
      <Space>
        <ErrorMessage message={error} />
        <Buttons htmlType='submit' >{btnText}</Buttons>
      </Space>
    </Form>
  </Card>
}
