import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Axios } from "../../Api/axios";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import PaginatedItems from "./Pagination/Pagination";
import LoadingSubmit from "../Loading/Loading";
import TransformDate from "../../helpers/TransformDate";
export default function TableShow(props) {
  const currentUser = props.currentUser || {
    name: "",
  };
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [filteredData, setFilterdData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const filteredDataByDate =
    date.length !== 0
      ? props.data.filter((item) => TransformDate(item.created_at) === date)
      : props.data;

  const filterSearchByDate =
    date.length !== 0
      ? filteredData.filter((item) => TransformDate(item.created_at) === date)
      : filteredData;

  let showWitchData =
    search.length > 0 ? filterSearchByDate : filteredDataByDate;

  useEffect(() => {
    const deb = setTimeout(() => {
      {
        search.length > 0 ? getSearchedData() : setSearchLoading(false);
      }
    }, 500);

    return () => clearTimeout(deb);
  }, [search]);

  async function getSearchedData() {
    try {
      const res = await Axios.post(
        `${props.searchLink}/search?title=${search}`
      );
      setFilterdData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }

  const headerShow = props.header.map((item, key) => (
    <th key={key}>{item.name}</th>
  ));
  // Body Show

  const showData = showWitchData.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>
      {props.header.map((item2, key2) => (
        <td key={key2}>
          {item2.id === "image" ? (
            <img src={item[item2.id]} width={"55"} alt="" />
          ) : item2.id === "images" ? (
            item[item2.id].map((img) => (
              <div className="d-flex align-items-center justify-content-start gap-2 flex-wrap">
                <img width={"50"} src={img.image} alt="" />
              </div>
            ))
          ) : item[item2.id] === "1995" ? (
            "Admin"
          ) : item[item2.id] === "2001" ? (
            "User"
          ) : item[item2.id] === "1996" ? (
            "Writer"
          ) : item[item2.id] === "1999" ? (
            "Product Manger"
          ) : item2.id === "updated_at" || item2.id === "created_at" ? (
            TransformDate(item[item2.id])
          ) : (
            item[item2.id]
          )}

          {currentUser && item[item2.id] === currentUser.name && (
            <font color="green"> ( You )</font>
          )}
        </td>
      ))}
      <td>
        <div className="d-flex align-items-center gap-3">
          {}

          <Link to={`${item.id}`}>
            <FontAwesomeIcon fontSize={"19px"} icon={faPen} />
          </Link>

          {currentUser.name !== item.name && (
            <FontAwesomeIcon
              cursor={"pointer"}
              onClick={() => props.delete(item.id)}
              fontSize={"19px"}
              color="red"
              icon={faTrash}
            />
          )}
        </div>
      </td>
    </tr>
  ));

  // Return Data

  return (
    <>
      <div className="col-3">
        <Form.Control
          type="search"
          placeholder="search..."
          className="my-2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLoading(true);
          }}
        />
      </div>
      <div className="col-5">
        <Form.Control
          type="date"
          placeholder="search..."
          className="my-2"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </div>
      <Table striped bordered hover className="trans ">
        <thead>
          <tr>
            <th>id</th>
            {headerShow}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.loading ? (
            <tr>
              <td colSpan={12} className="text-center">
                Loading...
              </td>
            </tr>
          ) : searchLoading ? (
            <tr>
              <td colSpan={12} className="text-center">
                Searching...
              </td>
            </tr>
          ) : (
            showData
          )}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end align-items-center flex-wrap">
        <div className="col-1">
          <Form.Select
            onChange={(e) => props.setLimit(e.target.value)}
            aria-label="Default select example"
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>
        </div>
        <PaginatedItems
          setPage={props.setPage}
          itemsPerPage={props.limit}
          data={props.data}
          page={props.page}
          totalData={props.totalData}
          perPage={props.perPage}
        />
      </div>
    </>
  );
}
