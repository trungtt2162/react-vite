import { DeleteOutlined, EditOutlined, TranslationOutlined } from "@ant-design/icons";
import { Popconfirm, Space, Table, Tag, notification } from "antd";
import { React, useState } from 'react';
import UpdateUserModal from "./update.user.modal";
import ViewUserModal from "./view.user.modal";
import { deleteUserAPI } from "../../services/api.service";



const UserTable = (props) => {
    const { fetchAllUser, current, setCurrent, pageSize, setPageSize, total } = (props)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState("");
    const { dataUser } = props;
    const confirmDelete = async (id) => {
        const res = await deleteUserAPI(id);
        if (res.data) {
            notification.success({
                message: "Delete User",
                description: "Xoa user thanh cong"
            })
            await fetchAllUser();
        }
        else {
            notification.error({
                message: "Error Create User",
                description: JSON.stringify(res.message)
            })
        }
    };
    const onChange = (pagination, filters, sorter, extra) => {
        console.log(pagination);
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current);
            }
        }
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize);
            }
        }
    };

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize}
                    </>
                )
            }

        },
        {
            title: 'ID',
            dataIndex: '_id',
            key: 'id',
            onCell: (record) => ({
                onClick: () => {
                    setIsModalViewOpen(true);
                    setDataUpdate(record);
                }
            })
        },
        {
            title: 'FULL NAME',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'PHONE NUMBER',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'ACTION',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <a> <EditOutlined
                        onClick={() => {
                            setIsModalUpdateOpen(true);
                            setDataUpdate(record);
                        }}
                        style={{ cursor: "pointer" }} /></a>
                    <Popconfirm
                        placement="left"
                        title="Delete User"
                        description="Are you sure to delete this user?"
                        onConfirm={() => confirmDelete(record._id)}
                        okText="Yes"
                        cancelText="No">
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },

    ];
    return (
        <>
            <UpdateUserModal
                fetchAllUser={fetchAllUser}
                dataUpdate={dataUpdate}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                setDataUpdate={setDataUpdate}
            />
            <ViewUserModal
                fetchAllUser={fetchAllUser}
                dataUpdate={dataUpdate}
                isModalViewOpen={isModalViewOpen}
                setIsModalViewOpen={setIsModalViewOpen}
                setDataUpdate={setDataUpdate}
            />
            <Table
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,

                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}
                columns={columns}
                dataSource={dataUser}
                rowKey={"_id"} />
        </>
    )
}

export default UserTable;