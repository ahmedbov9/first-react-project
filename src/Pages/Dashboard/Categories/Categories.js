import { CAT, CATS } from "../../../Api/Api";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import TableShow from "../../../Components/Dashboard/Table";

export default function Categories() {
  // States

  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalData, setTotalData] = useState();
  const [perPage, setPerPage] = useState();
  const [loading, setLoading] = useState(false);

  // Get All Categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CATS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setTotalData(data.data.total);
        setPerPage(data.data.per_page);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  const header = [
    { id: "title", name: "Title" },
    { id: "image", name: "Image" },
    { id: "created_at", name: "Created At" },
    { id: "updated_at", name: "Updated At" },
  ];
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${CAT}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1>Users Page</h1>
        <Link to={"/dashboard/category/add"} className="btn btn-primary">
          Add Category
        </Link>
      </div>

      <TableShow
        limit={limit}
        setLimit={setLimit}
        page={page}
        header={header}
        data={categories}
        delete={handleDelete}
        setPage={setPage}
        totalData={totalData}
        loading={loading}
        perPage={perPage}
        search="title"
        searchLink={CAT}
      />
    </div>
  );
}
