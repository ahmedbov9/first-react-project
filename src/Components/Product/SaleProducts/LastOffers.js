import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { LASTSALES } from "../../../Api/Api";
import Container from "react-bootstrap/Container";
import SkeletonComponent from "../../Loading/Skeleton";
import SaleProduct from "./SaleProducts";
export default function LastOffers() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${LASTSALES}`)
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false));
  }, []);
  const showProduct = product.map((product) => (
    <SaleProduct
      title={product.title}
      description={product.description}
      img={product.images[0].image}
      sale
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      col={"3"}
      id={product.id}
    />
  ));

  return (
    <Container>
      <h1 className="mt-5">latest Offers</h1>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap-2 mb-5">
        {loading ? (
          <>
            <SkeletonComponent
              height={"300px"}
              length={"4"}
              classes="col-lg-3 col-md-6 col-12 "
            />
          </>
        ) : (
          showProduct
        )}
      </div>
    </Container>
  );
}
