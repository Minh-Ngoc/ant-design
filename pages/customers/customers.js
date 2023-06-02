import { useEffect } from 'react';
import { Divider, Table, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image';
import Excel from '@/components/Excel';
import Head from 'next/head';

const Customers = () => {
  const dispatch = useDispatch();
  const usersStore = useSelector((state) => state.users);

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (text) => <Image width={100} height={50} src={text} alt='ErrorImage' />
    },
  ];

  useEffect(() => {
    dispatch.users.fetchUsers();
  }, [])

  return (
    <main>
      <Head>
        <title>Customers page</title>
      </Head>
      <header>
        <h1 style={{fontSize: '22px', fontWeight: 600, lineHeight: '80px'}}>Danh sách khách hàng</h1>
        <Excel
          fileName="export-user"
          data={[
            {
              columns: [
                {
                  title: 'First Name',
                  dataIndex: 'firstName',
                  width: 15,
                },
                {
                  title: 'Last Name',
                  dataIndex: 'lastName',
                  width: 15,
                },
                {
                  title: 'Age',
                  dataIndex: 'age',
                  width: 10,
                },
                {
                  title: 'Gender',
                  dataIndex: 'gender',
                  width: 10,
                },
                {
                  title: 'Email',
                  dataIndex: 'email',
                  width: 30,
                },
                {
                  title: 'Phone Number',
                  dataIndex: 'phone',
                  width: 20,
                },
              ],
              data: usersStore.usersList,
              tabName: "info",
            },
          ]}
        >
          <Button style={{background: '#1677ff', color: '#fff'}}>Export users</Button>
        </Excel>
      </header>
      <div>
        <Divider />
        <Table
          columns={columns}
          dataSource={usersStore.usersList}
        />
      </div>
    </main>
  )
}

export default Customers;