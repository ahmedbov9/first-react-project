import { Axios } from "../../../Api/axios";
import { useContext, useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { CATS } from "../../../Api/Api";
import "./NavBar.css";

import SkeletonComponent from "../../Loading/Skeleton";
import { Cart } from "../../../Context/CartChangerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PlusMinusBtn from "../PlusMinusBtn";

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { isChange } = useContext(Cart);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(5);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    Axios.get(`${CATS}`)
      .then((res) => setCategories(res.data.slice(-8)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(getProducts);
  }, [isChange]);

  const showCategories = categories.map((category) => (
    <Link
      to={`/category/${category.id}`}
      className="m-0 category-title text-black"
    >
      <p className="m-0 text-truncate">{category.title}</p>
    </Link>
  ));

  const handleDelete = (id) => {
    const filteredProduct = products.filter((product) => product.id !== id);

    setProducts(filteredProduct);
    localStorage.setItem("product", JSON.stringify(filteredProduct));
  };

  const changeCount = (id, btnCount) => {

    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    const findProduct = getProducts.find(product => product.id === id)

    findProduct.count = btnCount;
    localStorage.setItem("product", JSON.stringify(getProducts));


  }
  const showProducts = products?.map((product, key) => (
    <div className="mb-4 position-relative" key={key}>
      <div
        onClick={() => handleDelete(product.id)}
        className="position-absolute top-0 end-0 rounded-circle d-flex align-items-center justify-content-center bg-danger text-white"
        style={{ width: "20px", height: "20px", cursor: "pointer" }}
      >
        <FontAwesomeIcon width={"10px"} icon={faXmark} />
      </div>
      <div className="d-flex align-items-start gap-2 flex-wrap">
        <img
          src={product.images[0].image}
          height={"80px"}
          style={{ objectFit: "cover" }}
          className="rounded col-sm-3 col-12"
          alt="img"
        />
        <div className="col-sm-6 col-12">
          <h6>{product.title}</h6>
          <p className="m-0 text-truncate">{product.description}</p>
          <div className="d-flex align-items-center gap-3">
            <h5 className="m-0 text-primary">{product.discount}$</h5>
            <h6
              className="m-0"
              style={{ color: "gray", textDecoration: "line-through" }}
            >
              {product.price}$
            </h6>
          </div>
        </div>
        <PlusMinusBtn
          id={product.id}
          setCount={setCount}
          count={product.count || 1}
          changeCount={changeCount}
        />
      </div>
    </div>
  ));

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>{showProducts}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Checkout</Button>
        </Modal.Footer>
      </Modal>

      <nav className="py-3">
        <Container>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <Link className="col-3" to={"/"}>
              <img
                width="140"
                src={require("../../../Assets/Blue Modern Cyber Technology Logo.png")}
                alt={"logo"}
                className="icon"
              />
            </Link>
            <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative">
              <Form.Control
                type="search"
                className="form-control custom-search py-3 rounded"
                placeholder="Search For Product..."
              />

              <h3 className="btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded d-flex align-items-center jutsify-content-center">
                Search
              </h3>
            </div>
            <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
              <div onClick={handleShow}>
                <img
                  width={"40"}
                  src={require("../../../Assets/shopping-cart.png")}
                  alt="cart"
                />
              </div>
              <Link to={"/profile"}>
                <img
                  width={"48"}
                  src={require("../../../Assets/profile.png")}
                  alt="profile"
                />
              </Link>
            </div>
          </div>
          <div className="mt-3">
            <div className="d-flex align-items-center justify-content-start gap-5 flex-wrap">
              {loading ? (
                <>
                  <SkeletonComponent
                    height={"30px"}
                    width="80px"
                    length="8"
                    classes="3"
                  />
                </>
              ) : (
                showCategories
              )}
              <Link className="text-black category-title" to={"/categories"}>
                Show All
              </Link>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}
