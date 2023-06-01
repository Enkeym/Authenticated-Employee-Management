import React from 'react'
import { Button, Form } from 'antd'

type ButtonType = {
  children: React.ReactNode
  htmlType?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
  type?:
    | 'link'
    | 'text'
    | 'ghost'
    | 'default'
    | 'primary'
    | 'dashed'
    | undefined
  danger?: boolean | undefined
  loading?:
    | boolean
    | {
        delay?: number | undefined
      }
    | undefined
  shape?: 'default' | 'circle' | 'round' | undefined
  icon?: React.ReactNode
}

export const Buttons = ({
  children,
  htmlType,
  type,
  onClick,
  danger,
  loading,
  shape,
  icon
}: ButtonType) => {
  return (
    <Form.Item>
      <Button
        icon={icon}
        shape={shape}
        loading={loading}
        danger={danger}
        htmlType={htmlType}
        type={type}
        onClick={onClick}
      >
        {children}
      </Button>
    </Form.Item>
  )
}
