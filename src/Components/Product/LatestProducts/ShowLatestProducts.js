import { useEffect, useState } from "react";
import { LATEST } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import SaleProduct from "../SaleProducts/SaleProducts";
import SkeletonComponent from "../../Loading/Skeleton";

export default function LatestProducts() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${LATEST}`)
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
      col={"6"}
      id={product.id}
    />
  ));

  return (
    <div className="col-md-6 col-12">
      <div className="ms-md-3">
        <h1>latest Products</h1>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap-2 mb-5">
          {loading ? (
            <>
              <SkeletonComponent
                height={"300px"}
                length={"4"}
                classes="col-md-6 col-12 "
              />
            </>
          ) : (
            showProduct
          )}
        </div>
      </div>
    </div>
  );
}
