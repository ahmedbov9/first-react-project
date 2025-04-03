import ImageGallery from "react-image-gallery";
import Container from "react-bootstrap/Container";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { CART, PRO } from "../../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import {
  faCartShopping,
  faStar as solid,
} from "@fortawesome/free-solid-svg-icons";
import SkeletonComponent from "../../../Components/Loading/Skeleton";
import { Cart } from "../../../Context/CartChangerContext";
import PlusMinusBtb from "../../../Components/WebSite/PlusMinusBtn";
export default function SingleProduct() {
  const [product, setProduct] = useState([]);
  const [productImg, setProductImg] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setIsChange } = useContext(Cart);
  const [error, setError] = useState("")
  const [loadingCart, setLoadingCart] = useState(false);
  const [count, setCount] = useState();
  const { id } = useParams();
  const roundStars = Math.round(product.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStar = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon color="#DE7920" key={index} icon={solid} />
  ));
  const showEmptyStar = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon
      style={{ color: "black" }}
      key={index}
      icon={regularStar}
    />
  ));

  useEffect(() => {
    Axios.get(`${PRO}/${id}`)
      .then((res) => {
        setProductImg(
          res.data[0].images.map((img, key) => {
            return {
              original: img.image,
              thumbnail: img.image,
            };
          })
        );
        setProduct(res.data[0]);
      })
      .finally(() => setLoading(false));
  }, []);
  const checkStock = async () => {
    setLoadingCart(true)
    try {
      const getItem = JSON.parse(localStorage.getItem("product")) || [];
      const productCount = getItem.filter((item) => item.id == id)?.[0]?.count;
      console.log(count);

      await Axios.post(`${CART}/check`, {
        product_id: product.id,
        count: count + (productCount ? productCount : 0),

      })


      return true;

    } catch (error) {

      return false;

    } finally {
      setLoadingCart(false)
    }
  }
  const handleSave = async () => {
    const check = await checkStock()
    if (check) {





      const getItems = JSON.parse(localStorage.getItem("product")) || [];
      const productExist = getItems.findIndex((pro) => pro.id == id);
      if (productExist !== -1) {
        if (getItems[productExist].count) {
          getItems[productExist].count += count;
        } else {
          getItems[productExist].count = count;
        }
      } else {
        if (count > 1) {
          product.count = count;
        }
        getItems.push(product);
      }

      localStorage.setItem("product", JSON.stringify(getItems));
      setIsChange((prev) => !prev);
    }
  };
  return (
    <Container className="mt-5">
      <div className="d-flex align-items-start flex-warp row-gap-5">
        {loading ? (
          <>
            <div className={"col-lg-4 col-md-6 col-12"}>
              <SkeletonComponent
                height={"250px"}
                classes={"col-12"}
                length={"1"}
              />
              <div className="col-12 d-flex mt-1">
                <SkeletonComponent
                  className={"w-100"}
                  height={"100px"}
                  classes={"col-4"}
                  length={"1"}
                />
                <SkeletonComponent
                  className={"w-100"}
                  height={"100px"}
                  classes={"col-4"}
                  length={"1"}
                />
                <SkeletonComponent
                  className={"w-100"}
                  height={"100px"}
                  classes={"col-4"}
                  length={"1"}
                />
              </div>
            </div>
            <div className="col-lg-8 col-md-6 col-12">
              <div className="ms-lg-5">
                <SkeletonComponent
                  className={"w-100"}
                  height={"20px"}
                  classes={"col-lg-8 col-12"}
                  length={"1"}
                />
                <SkeletonComponent
                  className={"w-100"}
                  height={"210px"}
                  classes={"col-lg-8 col-12 mt-2"}
                  length={"1"}
                />
                <hr className="col-lg-8 col-12" />
                <div className="d-flex align-items-center justify-content-between col-lg-8 col-12">
                  <SkeletonComponent
                    className={"w-100"}
                    height={"20px"}
                    classes={"col-4 mt-2"}
                    length={"1"}
                  />
                  <SkeletonComponent
                    className={"w-100"}
                    height={"20px"}
                    classes={"col-4 mt-2"}
                    length={"1"}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-lg-4 col-md-6 col-12">
              <ImageGallery items={productImg} />
            </div>
            <div className="col-lg-8 col-md-6 col-12">
              <div className="ms-5">
                <h1>{product.title} </h1>
                <p style={{ color: "grey" }}>{product.About}</p>
                <h3 className="fw-normal">{product.description}</h3>
                <div className="d-flex align-items-center justify-content-between pt-4 border-top">
                  <div>
                    {product.stock <= 5 && (
                      <p className="text-danger">there is only {product.stock} left</p>
                    )}

                    {showGoldStar}
                    {showEmptyStar}
                    <div className="d-flex align-items-center gap-3">
                      <h5 className="m-0 text-primary">{product.discount}SR</h5>

                      <h6
                        className="m-0"
                        style={{
                          color: "gray",
                          textDecoration: "line-through",
                        }}
                      >
                        {product.discount !== product.price &&
                          product.price + "SR"}
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-4">
                    <PlusMinusBtb setCount={(data) => setCount(data)} />

                    <div onClick={handleSave} className="border p-2 rounded">
                      {loadingCart ? "Loading" :
                        <FontAwesomeIcon
                          icon={faCartShopping}
                          color="black"
                          size="20"
                        />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
