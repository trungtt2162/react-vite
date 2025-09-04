import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { fetchAllBookAPI } from "../services/api.service";
import BookFormUncontrolled from "../components/book/book.form.antd";


const BookPage = () => {
    const [dataBook, setDataBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingTable, setLoadingTable] = useState(false);

    useEffect(() => {
        fetchAllBook()
    }, [current, pageSize])
    const fetchAllBook = async () => {
        setLoadingTable(true);
        const resAllBook = await fetchAllBookAPI(current, pageSize);
        console.log(">>check data book part 1", resAllBook)
        if (resAllBook.data) {
            setDataBook(resAllBook.data.result);
            setCurrent(resAllBook.data.meta.current);
            setTotal(resAllBook.data.meta.total);
            setPageSize(resAllBook.data.meta.pageSize);
        }
        setLoadingTable(false);
    }
    return (
        <div>
            <BookFormUncontrolled
                fetchAllBook={fetchAllBook}
            />
            <BookTable
                loadingTable={loadingTable}
                setLoadingTable={setLoadingTable}
                fetchAllBook={fetchAllBook}
                dataBook={dataBook}
                current={current}
                pageSize={pageSize}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                total={total}
                setTotal={setTotal}
            />
        </div>
    )
}

export default BookPage;