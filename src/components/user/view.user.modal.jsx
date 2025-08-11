import { Button, Drawer, Image, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/api.service";
import.meta.env.VITE_BACKEND_URL
const ViewUserModal = (props) => {
    const { isModalViewOpen, setIsModalViewOpen, dataUpdate, setDataUpdate, fetchAllUser } = props;
    const [id, setID] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [avatar, setAvatar] = useState("");
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
                    <div>
                        <Image
                            height={400} width={400}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${avatar}`} />
                    </div>
                    <Button type="primary" style={{ width: "200px" }}>
                        Upload Avatar
                    </Button>
                </div>
            </Drawer>
        </div>
    )
}

export default ViewUserModal;