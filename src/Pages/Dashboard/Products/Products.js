import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PRO, PROS } from "../../../Api/Api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import TableShow from "../../../Components/Dashboard/Table";

export default function Products() {
  // States

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalData, setTotalData] = useState();
  const [perPage, setPerPage] = useState();
  const [loading, setLoading] = useState(false);

  // Get All Products
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PROS}/?limit=${limit}&page=${page}`)
      .then((data) => {
        setProducts(data.data.data);
        setTotalData(data.data.total);
        setPerPage(data.data.per_page);
      })

      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  const header = [
    { id: "images", name: "Images" },
    { id: "title", name: "Title" },
    { id: "description", name: "Description" },
    { id: "price", name: "Price" },
    { id: "rateing", name: "Rating" },
    { id: "created_at", name: "Created At" },
    { id: "updated_at", name: "Updated At" },
  ];
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${PRO}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1>Products Page</h1>
        <Link to={"/dashboard/product/add"} className="btn btn-primary">
          Add Product
        </Link>
      </div>
      <TableShow
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        header={header}
        data={products}
        delete={handleDelete}
        loading={loading}
        totalData={totalData}
        perPage={perPage}
        search="title"
        searchLink={PRO}
      />
    </div>
  );
}
