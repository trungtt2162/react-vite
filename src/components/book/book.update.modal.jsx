import { Button, Input, InputNumber, Modal, Select, notification, Image, message } from "antd";
import { useState, useEffect } from "react";
import { createBookAPI, handleUploadFile, updateBookAPI } from "../../services/api.service";
const ModalUpdateBook = (props) => {
    const { fetchAllBook, isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate } = (props)
    const [id, setID] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("Arts")
    const [thumbnail, setThumbnail] = useState("")
    const [selectedFile, setSelectedFile] = useState("")
    const [preview, setPreview] = useState("")

    useEffect(
        () => {
            if (dataUpdate && dataUpdate._id) {
                setID(dataUpdate._id);
                setMainText(dataUpdate.mainText);
                setAuthor(dataUpdate.author);
                setPrice(dataUpdate.price);
                setQuantity(dataUpdate.quantity);
                setCategory(dataUpdate.category);
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
    const handleClickButton = async () => {
        //step 1: upload file
        if (!selectedFile && !thumbnail) {
            message.error({
                message: "Please upload thumbnail",

            })
            return;
        }
        if (!selectedFile && thumbnail) {
            const resUpdateBook = await updateBookAPI(id, thumbnail, mainText, author, price, quantity, category);
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
                const resUpdateBook = await updateBookAPI(id, newThumbnail, mainText, author, price, quantity, category);
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
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setThumbnail("")
        setCategory("Arts");
        setID("");
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
                onOk={() => handleClickButton()}
                onCancel={() => handleCancel()}
                maskClosable={false}
                okText={"Update"}
            >
                <div style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
                    <span> ID :</span>
                    <div>
                        <Input value={id}
                            disabled
                            onChange={(event) => { setMainText(event.target.value) }} />
                    </div>
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
                            value={category}
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
                                onChange={(event) => handleOnchangeFile(event)}
                                onClick={(event) => { event.target.value = null }} />
                        </label>
                    </div>

                </div>

            </Modal>

        </div >
    )
}

export default ModalUpdateBook;