import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useEditEmployeeMutation,
  useGetEmployeeByIdQuery
} from '../../app/services/employees'
import { Layout } from '../../components/layout/Layout'
import { Row } from 'antd'
import { EmployeeForm } from '../../components/form/EmployeeForm'
import { Employee } from '@prisma/client'
import { Paths } from '../../path'
import { isErrorWithMessage } from '../../utils/isErrorWithMessage'

export default function EditEmployees() {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const [error, setError] = useState('')
  const { data, isLoading } = useGetEmployeeByIdQuery(params.id || '')
  const [editEmployee] = useEditEmployeeMutation()

  if (isLoading) {
    return <span>Загрузка...</span>
  }

  const handleEditUser = async (employee: Employee) => {
    try {
      const editedEmployees = {
        ...data,
        ...employee
      }

      await editEmployee(editedEmployees).unwrap()

      navigate(`${Paths.status}/updated`)
    } catch (error) {
      const mayBeError = isErrorWithMessage(error)

      if (mayBeError) {
        setError(error.data.message)
      } else {
        setError('Неизвестная ошибка')
      }
    }
  }

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <EmployeeForm
          title='Редактировать сотрудника'
          btnText='Редактировать'
          error={error}
          employee={data}
          onFinish={handleEditUser}
        />
      </Row>
    </Layout>
  )
}
