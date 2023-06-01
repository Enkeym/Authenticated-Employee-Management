import { Form, Input as AntInput } from 'antd'
import { NamePath } from 'antd/es/form/interface'

type PasswordType = {
  name: string
  placeholder: string
  dependencies?: NamePath[] | undefined

}

//4:09

export const InputPassword = ({
  name,
  placeholder,
  dependencies
}: PasswordType) => {
  return (
    <Form.Item
      dependencies={dependencies}
      hasFeedback
      name={name}
      rules={[
        { required: true, message: 'Обязательное поле' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve()
            }

            if (name === 'confirmPassword') {
              if (!value || getFieldValue('password') === 'value') {
                return Promise.resolve()
              }

              return Promise.reject(new Error('Пароль должен совпадать'))
            } else {
              if (value.length < 6) {
                return Promise.reject(
                  new Error('Пароль должен быть длиннее 6-ти символов')
                )
              }
              return Promise.resolve()
            }
          }
        })
      ]}
    >
      <AntInput.Password placeholder={placeholder} size='large' />
    </Form.Item>
  )
}