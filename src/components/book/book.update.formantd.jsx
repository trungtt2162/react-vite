import { Button, Input, InputNumber, Modal, Select, notification, Image, message, Form } from "antd";
import { useState, useEffect } from "react";
import { createBookAPI, handleUploadFile, updateBookAPI } from "../../services/api.service";
const ModalUpdateBookUncontrolled = (props) => {
    const { fetchAllBook, isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate } = (props)

    const [thumbnail, setThumbnail] = useState("")
    const [selectedFile, setSelectedFile] = useState("")
    const [preview, setPreview] = useState("")

    const [formUpdateUnco] = Form.useForm();
    useEffect(
        () => {
            console.log(dataUpdate);
            if (dataUpdate && dataUpdate._id) {
                formUpdateUnco.resetFields();
                formUpdateUnco.setFieldsValue({
                    _id: dataUpdate._id,
                    mainText: dataUpdate.mainText,
                    author: dataUpdate.author,
                    price: dataUpdate.price,
                    quantity: dataUpdate.quantity,
                    category: dataUpdate.category,
                    thumbnail: dataUpdate.thumbnail
                })
                setThumbnail(dataUpdate.thumbnail);
            }
        }, [dataUpdate]
    )
    const handleOnchangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            console.log("check file", file);
            setPreview(URL.createObjectURL(file))
        }

        // setSelectedFile(event.target.files[0])
    }
    const handleClickButton = async (values) => {
        //step 1: upload file
        if (!selectedFile && !thumbnail) {
            message.error({
                message: "Please upload thumbnail",

            })
            return;
        }
        if (!selectedFile && thumbnail) {
            const resUpdateBook = await updateBookAPI(values._id, thumbnail, values.mainText, values.author, values.price, values.quantity, values.category);
            console.log(">>>check update book", resUpdateBook);
            if (resUpdateBook.data) {
                await fetchAllBook();
                resetCloseModal();
                notification.success({
                    message: "Update Book Success",
                    description: "Cập nhật danh mục sách thành công"
                })
            } else {
                notification.error({
                    message: "Upload fail",
                    description: JSON.stringify(resUpdateBook.message)
                })
            }
        } else {
            const res = await handleUploadFile(selectedFile, "book");
            console.log(">>check file anh da up", res)

            if (res.data) {
                const newThumbnail = res.data.fileUploaded;
                const resUpdateBook = await updateBookAPI(values._id, newThumbnail, values.mainText, values.author, values.price, values.quantity, values.category);
                console.log(">>>check update book", resUpdateBook);
                if (resUpdateBook.data) {
                    await fetchAllBook();
                    resetCloseModal();
                    notification.success({
                        message: "Update Book Success",
                        description: "Cập nhật danh mục sách thành công"
                    })
                } else {
                    notification.error({
                        message: "Update fail",
                        description: JSON.stringify(resUpdateBook.message)
                    })
                }

            } else {
                notification.error({
                    message: "Upload fail",
                    description: JSON.stringify(resUpdateBook.message)
                })
            }
        }

    }
    const resetCloseModal = () => {
        setDataUpdate(null);
        setSelectedFile(null);
        setPreview(null);
        setIsModalUpdateOpen(false);

    }



    const handleCancel = () => {
        setIsModalUpdateOpen(false);
    };
    return (

        <div>
            <Modal
                title="Update Book"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalUpdateOpen}
                onOk={() => formUpdateUnco.submit()}
                onCancel={() => handleCancel()}
                maskClosable={false}
                okText={"Update"}
            >
                <Form
                    form={formUpdateUnco}
                    onFinish={handleClickButton}
                    layout='vertical'>
                    <Form.Item
                        label="ID"
                        name="_id"
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Tiêu đề"
                        name="mainText"
                        rules={[{ required: true, message: 'Please input main text of book!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tác giả"
                        name="author"
                        rules={[{ required: true, message: 'Please input the author!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Giá tiền"
                        name="price"
                        rules={[{ required: true, message: 'Please input price!' }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            addonAfter={"đ"}
                            formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                            }
                            parser={(value) => value.replace(/\./g, "")}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[{ required: true, message: 'Please input the quantity!' }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Thể loại"
                        name="category"
                        rules={[{ required: true, message: 'Please input the category!' }]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },

                            ]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <div
                            style={{
                                display: "flex",
                                gap: "20px",
                                justifyContent: "center"
                            }}
                        >
                            <div
                                style={{
                                    marginTop: "10px",
                                    height: "150px",
                                    width: "150px",
                                    border: "1px solid #ccc"
                                }}
                            >
                                <Image
                                    style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${thumbnail}`}
                                />
                            </div>
                            {preview && <div
                                style={{
                                    marginTop: "10px",
                                    height: "150px",
                                    width: "150px",
                                    border: "1px solid #ccc"
                                }}
                            >
                                <Image
                                    style={{ height: "100%", width: "100%", objectFit: "contain", objectPosition: "center" }}
                                    src={preview} />
                            </div>}
                        </div>
                        <div>
                            <label htmlFor="btnUploadAva"
                                style={{
                                    display: "block",
                                    width: "fit-content",
                                    marginTop: "15px",
                                    padding: "5px 10px",
                                    background: "#ccc",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >
                                Upload Avatar
                                <input type="file" hidden id='btnUploadAva'
                                    style={{ display: "none" }}
                                    onChange={(event) => handleOnchangeFile(event)}
                                    onClick={(event) => { event.target.value = null }} />
                            </label>
                        </div>
                    </Form.Item>
                </Form>



            </Modal>

        </div >
    )
}

export default ModalUpdateBookUncontrolled;