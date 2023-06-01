import { Form, Input as AntInput } from 'antd'
import React from 'react'

// 3:53

type InputType = {
  name: string
  placeholder: string
  type?: string
}

export const Input = ({ name, placeholder, type }: InputType) => {
  return (
    <Form.Item
      rules={[{ required: true, message: 'Обязательное поле' }]}
      name={name}
      shouldUpdate
    >
      <AntInput placeholder={placeholder} type={type} size='large' />
    </Form.Item>
  )
}
