import { Button, Drawer, Image, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateUserAPI } from "../../services/api.service";
import.meta.env.VITE_BACKEND_URL
const ViewUserModal = (props) => {
    const { isModalViewOpen, setIsModalViewOpen, dataUpdate, setDataUpdate, fetchAllUser } = props;
    const [id, setID] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [avatar, setAvatar] = useState("");
    const [selectedFile, setSelectedFile] = useState("")
    const [preview, setPreview] = useState("")
    useEffect(
        () => {
            if (dataUpdate) {
                setID(dataUpdate._id);
                setFullName(dataUpdate.fullName);
                setEmail(dataUpdate.email);
                setPhoneNumber(dataUpdate.phone);
                setAvatar(dataUpdate.avatar);
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
            setPreview(URL.createObjectURL(file))
        }

        // setSelectedFile(event.target.files[0])
    }
    const handleUpdateAvatar = async () => {
        //step 1: upload file
        console.log("check file", selectedFile);
        const res = await handleUploadFile(selectedFile, "avatar");
        if (res.data) {
            const newAvatar = res.data.fileUploaded;

            const resUpdateAvatar = await updateUserAPI(id, fullName, phoneNumber, newAvatar);
            if (resUpdateAvatar.data) {
                await fetchAllUser();
                setSelectedFile(null);
                setPreview(null);
                setDataUpdate(null);
                setIsModalViewOpen(false);
                notification.success({
                    message: "Update avatar success",
                    description: "Cap nhat avatar thanh cong"
                })
            } else {
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }

        } else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(res.message)
            })
            return;
        }
    }


    const resetCloseModal = () => {
        setIsModalViewOpen(false);
        setFullName("");
        setPhoneNumber("");
        setEmail("");
        setID("");
        setDataUpdate(null)
    }
    const handleCancel = () => {
        setIsModalViewOpen(false);
    };
    return (
        <div>
            <Drawer
                width={"40vw"}
                title="Profile User"
                closable={true}
                open={isModalViewOpen}
                onClose={() => handleCancel()}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
                    <div>
                        ID: {id}
                    </div>
                    <div>
                        Full Name: {fullName}
                    </div>
                    <div>
                        Email: {email}
                    </div>
                    <div>
                        Phone Number:{phoneNumber}
                    </div>
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
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${avatar}`} />
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
                                onChange={(event) => handleOnchangeFile(event)} />
                        </label>
                    </div>
                    {preview &&
                        <>
                            <div
                                style={{
                                    marginTop: "10px",
                                    // height: "150px",
                                    width: "150px",
                                }}
                            >
                                <Image
                                    style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    src={preview} />
                            </div>
                            <Button type="primary"
                                style={{ width: "fit-content" }}
                                onClick={() => { handleUpdateAvatar() }}
                            >Save</Button>
                        </>
                    }
                </div>
            </Drawer>
        </div>
    )
}

export default ViewUserModal;