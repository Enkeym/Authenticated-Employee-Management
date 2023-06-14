import { Table } from 'antd'
import { Layout } from '../../components/layout/Layout'
import { Buttons } from '../../ui/buttons/Buttons'
import { useGetAllEmployeesQuery } from '../../app/services/employees'
import type { ColumnsType } from 'antd/es/table'
import { Employee } from '@prisma/client'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../path'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { useEffect } from 'react'

const columns: ColumnsType<Employee> = [
  {
    title: 'Имя',
    dataIndex: 'firstName',
    key: 'firstName'
  },
  {
    title: 'Возраст',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    key: 'address'
  }
]

export default function Employees() {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const { data, isLoading } = useGetAllEmployeesQuery()

  useEffect(() => {
    if (!user) {
      navigate(`/login`)
    }
  }, [navigate, user])

  const goToAddUser = () => navigate(Paths.employeeAdd)

  return (
    <Layout>
      <Buttons type='primary' onClick={goToAddUser}>
        Добавить
      </Buttons>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`)
          }
        }}
      />
    </Layout>
  )
}
