import { Button, Input, InputNumber, Modal, Select, notification, Image, message } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";
const BookForm = (props) => {
    const { fetchAllBook } = (props)
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("Arts")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState("")
    const [preview, setPreview] = useState("")


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
    const handleClickButton = async () => {
        //step 1: upload file
        if (!selectedFile) {
            notification.error({
                message: "Error upload file",
                description: "Thumbnail can not empty"
            })
            return;
        }

        const res = await handleUploadFile(selectedFile, "book");
        console.log(">>check file anh da up", res)

        if (res.data) {
            const newThumbnail = res.data.fileUploaded;
            const resCreateBook = await createBookAPI(newThumbnail, mainText, author, price, quantity, category);
            console.log(">>>check create book", resCreateBook);
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
        setSelectedFile(null);
        setPreview(null);
        setIsModalOpen(false);
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("Arts");
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (

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
                    onOk={() => handleClickButton()}
                    onCancel={() => handleCancel()}
                    maskClosable={false}
                    okText={"Create"}
                >
                    <div style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
                        <span> Tiêu đề:</span>
                        <div>
                            <Input value={mainText}
                                onChange={(event) => { setMainText(event.target.value) }} />
                        </div>
                        <span>Tác giả:</span>
                        <div>
                            <Input value={author}
                                onChange={(event) => { setAuthor(event.target.value) }} />
                        </div>
                        <span>Giá tiền:</span>
                        <div>
                            <InputNumber
                                style={{ width: "100%" }}
                                value={price}
                                addonAfter={"đ"}
                                formatter={(value) =>
                                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                                }
                                parser={(value) => value.replace(/\./g, "")}
                                onChange={(event) => { setPrice(event) }} />
                        </div>
                        <span>Số lượng:</span>
                        <div>
                            <InputNumber
                                style={{ width: "100%" }}
                                value={quantity}
                                onChange={(event) => { setQuantity(event) }} />
                        </div>
                        <span>Thể loại:</span>
                        <div>
                            <Select
                                style={{ width: "100%" }}
                                defaultValue="Arts"
                                onChange={(event) => { setCategory(event) }}
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
                                    onChange={(event) => handleOnchangeFile(event)}
                                    onClick={(event) => { event.target.value = null }} />
                            </label>
                        </div>
                        {preview && <div
                            style={{
                                marginTop: "10px",
                                // height: "150px",
                                width: "150px",
                            }}
                        >
                            <Image
                                style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={preview} />
                        </div>}
                    </div>

                </Modal>

            </div >
        </div >
    )
}

export default BookForm;