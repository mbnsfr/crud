import React from 'react';
import { Layout, Table, Divider, Button, Input, Icon, Row, Col } from 'antd';
import tableController from './tableController';

const TableView = () => {
  const {
    data,
    addPerson,
    setPersonName,
    deletePerson,
    editPerson,
    confirmEdit,
    onSearch,
  } = tableController();

  const { Content } = Layout;

  const columns = [
    {
      title: 'objectId',
      dataIndex: 'objectId',
      key: 'objectId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'updatedAt',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Icon type="delete" key="delete" onClick={() => deletePerson(record.key)}></Icon>
          <Divider type="vertical" />
          <Icon type="edit" key="edit" onClick={() => editPerson(record.key)}></Icon>
        </span>
      ),
    },
  ];

  const dataSource = data.personsList.map((item, key) => {
    return {
      ...item.toJSON(),
      key,
    }
  })

  const { Search } = Input;

  return (
    <Layout>
      <Content style={{ padding: 24, minHeight: 280 }}>
        <div style={{ padding: 24 }}>
          <Search
            placeholder="input search text"
            onSearch={(value) => onSearch(value)}
            style={{ width: 200 }}
          />
          <Row>
            <Col span={8}>
              {data.editing &&
                <h1>Edit Mode</h1>
              }
              <Input placeholder="name" value={data.personName} onChange={(e) => setPersonName(e.target.value)} />
            </Col>
            <Col span={8}>
              {!data.editing &&
                <Button onClick={() => addPerson()}>add</Button>
              }
              {data.editing &&
                <Button onClick={() => confirmEdit()}>confirm edit</Button>
              }
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Table style={{ padding: 24 }} columns={columns} dataSource={dataSource} />
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default TableView;
