import { useEffect, useState } from "react";
import { USER, USERS } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import LoadingSubmit from "../../../Components/Loading/Loading";
import TableShow from "../../../Components/Dashboard/Table";
export default function Users() {
  // States
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState();
  const [limit, setLimit] = useState(4);
  const [perPage, setPerPage] = useState();

  const [runState] = useState(0);

  // Get Current User
  useEffect(() => {
    setLoading(true);
    Axios.get(`${USER}`)
      .then((data) => setCurrentUser(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);
  // Get All Users
  useEffect(() => {
    Axios.get(`/${USERS}?page${page}&limit=${limit}`)
      .then((data) => {
        setUsers(data.data.data);
        setPerPage(data.data.per_page);
        setTotalData(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [runState]);
  const header = [
    {
      id: "name",
      name: "Username",
    },
    {
      id: "email",
      name: "Email",
    },
    {
      id: "role",
      name: "Role",
    },
    { id: "created_at", name: "Created At" },
    { id: "updated_at", name: "Updated At" },
  ];

  //Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {loading ? (
        <LoadingSubmit />
      ) : (
        <div className="bg-white w-100 px-4 py-3 rounded shadow-sm">
          <div className="d-flex align-items-center justify-content-between">
            <h1>Users Page</h1>
            <Link to={"/dashboard/user/add"} className="btn btn-primary">
              Add User
            </Link>
          </div>
          <TableShow
            header={header}
            data={users}
            currentUser={currentUser}
            delete={handleDelete}
            limit={limit}
            setLimit={setLimit}
            page={page}
            setPage={setPage}
            loading={loading}
            totalData={totalData}
            perPage={perPage}
            search="name"
            searchLink={USER}
          />
        </div>
      )}
    </>
  );
}
