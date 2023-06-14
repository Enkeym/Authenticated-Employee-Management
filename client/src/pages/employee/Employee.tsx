import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  useGetEmployeeByIdQuery,
  useRemoveEmployeeMutation
} from '../../app/services/employees'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { Layout } from '../../components/layout/Layout'
import { Descriptions, Divider, Modal, Space } from 'antd'
import { Buttons } from '../../ui/buttons/Buttons'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ErrorMessage } from '../../components/error/ErrorMessage'
import { Paths } from '../../path'
import { isErrorWithMessage } from '../../utils/isErrorWithMessage'

export default function Employee() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const params = useParams<{ id: string }>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data, isLoading } = useGetEmployeeByIdQuery(params.id || '')
  const [removeEmployees] = useRemoveEmployeeMutation()
  const user = useSelector(selectUser)

  if (isLoading) {
    return <span>Загрузка...</span>
  }

  if (!data) {
    return <Navigate to='/' />
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const hideModal = () => {
    setIsModalOpen(false)
  }

  const handleDeleteUser = async () => {
    hideModal()

    try {
      await removeEmployees(data.id).unwrap()

      navigate(`${Paths.status}/deleted`)
    } catch (error) {
      const mayBeError = isErrorWithMessage(error)

      if(mayBeError) {
        setError(error.data.message)
      } else {
        setError('Неизвестная ошибка')
      }
    }
  }

  return (
    <Layout>
      <Descriptions title='Информация о сотруднике' bordered>
        <Descriptions.Item
          label='Имя'
          span={3}
        >{`${data.firstName} ${data.lastName}`}</Descriptions.Item>
        <Descriptions.Item label='Возраст' span={3}>
          {`${data.age}`}
        </Descriptions.Item>
        <Descriptions.Item label='Адрес' span={3}>
          {`${data.address}`}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation='left'>Действия</Divider>
          <Space>
            <Link to={`/employee/edit/${data.id}`}>
              <Buttons shape='round' type='default' icon={<EditOutlined />}>
                Редактировать
              </Buttons>
            </Link>
            <Buttons
              shape='round'
              danger
              onClick={showModal}
              icon={<DeleteOutlined />}
            >
              Удалить
            </Buttons>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title='Подтвердите удаление'
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText='Подтвердить'
        cancelText='Отменить'
      >
        Вы действительно хотите удалить?
      </Modal>
    </Layout>
  )
}
