import { useEffect, useState } from "react";
import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUserAPI } from "../services/api.service";


const UserPage = () => {
    const [dataUser, setDataUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        fetchAllUser()
    }, [
        // dataUser._id, 
        current, pageSize]
    )
    const fetchAllUser = async () => {
        const res = await fetchAllUserAPI(current, pageSize);
        if (res.data) {
            setDataUser(res.data.result);
            setCurrent(res.data.meta.current);
            setTotal(res.data.meta.total);
            setPageSize(res.data.meta.pageSize);
        }
    }
    console.log("check current", current);
    return (
        <div>
            <UserForm
                fetchAllUser={fetchAllUser}
            />
            <UserTable
                fetchAllUser={fetchAllUser}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                dataUser={dataUser}
            />
        </div>
    )
}

export default UserPage;