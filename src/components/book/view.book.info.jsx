import { Drawer, Image } from "antd";
import { useState } from "react";



const ViewBook = (props) => {
    const { isDrawerViewBookOpen, setIsDrawerViewBookOpen, dataBookDetail, setDataBookDetail } = props

    const handleCancel = () => {
        setIsDrawerViewBookOpen(false);
        setDataBookDetail(null);
    }
    const formatVND = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };
    return (
        <div>
            <Drawer
                width={"40vw"}
                title="Profile Book"
                closable={true}
                open={isDrawerViewBookOpen}
                onClose={() => handleCancel()}
                cancelButtonProps={{ style: { display: 'none' } }}>
                {dataBookDetail ?
                    <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
                        <div>
                            ID: {dataBookDetail._id}
                        </div>
                        <div>
                            Tiêu đề: {dataBookDetail.mainText}
                        </div>
                        <div>
                            Tác giả: {dataBookDetail.author}
                        </div>
                        <div>
                            Thể loại: {dataBookDetail.category}
                        </div>
                        <div>
                            Giá tiền: {formatVND(dataBookDetail.price)}
                        </div>
                        <div>
                            Số lượng: {dataBookDetail.quantity}
                        </div>
                        <div>
                            Đã bán: {dataBookDetail.sold}
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
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookDetail.thumbnail}`}
                            />
                        </div>
                    </div> : <p> No Information </p>}
            </Drawer>
        </div>
    )
}

export default ViewBook;