import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Table, Tag } from "antd"
import { deleteBookAPI, fetchAllBookAPI } from "../../services/api.service";
import ViewBook from "./view.book.info";
import { useState } from "react";
import ModalUpdateBook from "./book.update.modal";
import ModalUpdateBookUncontrolled from "./book.update.formantd";


const BookTable = (props) => {
    const { dataBook, current, setCurrent, setPageSize, pageSize, total, loadingTable, setLoadingTable, fetchAllBook } = props;
    const [isDrawerViewBookOpen, setIsDrawerViewBookOpen] = useState(false);
    const [dataBookDetail, setDataBookDetail] = useState("");
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState();
    const confirmDelete = async (id) => {
        const res = await deleteBookAPI(id);
        console.log("res delete book", res);
        await fetchAllBook();
    }
    const onChange = (pagination, filters, sorter, extra) => {
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
                    console.log(">>check xiu", record);
                    setIsDrawerViewBookOpen(true);
                    setDataBookDetail(record);
                }
            })
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
            key: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
            align: "right",
            render: (value) =>
                new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(value),

        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            align: "right",
            render: (value) =>
                new Intl.NumberFormat("vi-VN").format(value),

        },
        {
            title: 'Tác giả',
            key: 'author',
            dataIndex: 'author',
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
        }
    ];

    return (
        <>
            <ModalUpdateBookUncontrolled
                fetchAllBook={fetchAllBook}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
            <ViewBook
                isDrawerViewBookOpen={isDrawerViewBookOpen}
                setIsDrawerViewBookOpen={setIsDrawerViewBookOpen}
                setDataBookDetail={setDataBookDetail}
                dataBookDetail={dataBookDetail}
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
                columns={columns}
                onChange={onChange}
                dataSource={dataBook}
                loading={loadingTable}
                rowKey={"_id"}
            />
        </>
    )
}

export default BookTable;