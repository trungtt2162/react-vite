import { Button, Input, InputNumber, Modal, Select, notification, Image, message, Form } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";
const BookFormUncontrolled = (props) => {
    const { fetchAllBook } = (props)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState("")
    const [preview, setPreview] = useState("")

    const [formCreateBook] = Form.useForm();

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
    const handleClickButton = async (valuesForm) => {
        //step 1: upload file
        if (!selectedFile) {
            notification.error({
                message: "Error upload file",
                description: "Thumbnail can not empty"
            })
            return;
        }

        const res = await handleUploadFile(selectedFile, "book");
        if (res.data) {
            const newThumbnail = res.data.fileUploaded;
            // const valuesForm = await formCreateBook.validateFields();
            const resCreateBook = await createBookAPI(newThumbnail, valuesForm.mainText, valuesForm.author, valuesForm.price, valuesForm.quantity, valuesForm.category);
            console.log(">>check res", resCreateBook)
            if (resCreateBook.data) {
                await fetchAllBook();
                resetCloseModal();
                notification.success({
                    message: "Create Book Success",
                    description: "Tạo mới danh mục sách thành công"
                })
            } else {
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resCreateBook.message)
                })
            }

        } else {
            notification.error({
                message: "Error upload file",
                description: "Thumbnail can not empty"
            })
            return;
        }
    }
    const resetCloseModal = () => {
        formCreateBook.resetFields();
        setSelectedFile(null);
        setPreview(null);
        setIsModalOpen(false);

    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="form-input" style={{ margin: "20px 0", padding: "20px" }} >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button type="primary"
                        onClick={showModal}
                    >Create Book</Button>
                    <Modal
                        // style={{ width: 1 }}
                        title="Create New Book"
                        closable={{ 'aria-label': 'Custom Close Button' }}
                        open={isModalOpen}
                        // onOk={() => handleClickButton()}
                        onOk={() => formCreateBook.submit()}
                        onCancel={() => handleCancel()}
                        maskClosable={false}
                        okText={"Create"}
                    >
                        <Form
                            form={formCreateBook}
                            name="formCreateBook"
                            onFinish={handleClickButton}
                            layout='vertical'>
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
                                    defaultValue="Arts"
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
                        </Form>
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
                                    onChange={(event) => handleOnchangeFile(event)}
                                    onClick={(event) => { event.target.value = null }} />
                            </label>
                        </div>
                        {preview && <div
                            style={{
                                marginTop: "10px",
                                width: "150px",
                            }}
                        >
                            <Image
                                style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={preview} />
                        </div>}

                    </Modal>

                </div >
            </div >
        </>
    )
}

export default BookFormUncontrolled;