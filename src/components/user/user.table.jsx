import { DeleteOutlined, EditOutlined, TranslationOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
import { React } from 'react';



const UserTable = (props) => {

    const { dataUser } = props;
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: 'id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <a> <EditOutlined style={{ cursor: "pointer" }} /></a>
                    <a> <DeleteOutlined style={{ cursor: "pointer", color: "red" }} /></a>
                </div>
            ),
        },

    ];
    return (
        <Table columns={columns} dataSource={dataUser} rowKey={"_id"} />
    )
}

export default UserTable;