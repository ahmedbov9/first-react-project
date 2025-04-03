import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { LASTSALES, TOPRATED } from "../../../Api/Api";
import TopRated from "./TopRated";
import SkeletonComponent from "../../Loading/Skeleton";

export default function ShowTopRated() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${TOPRATED}`)
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false));
  }, []);
  const showProduct = product.map((product, key) => (
    <TopRated
      key={key}
      title={product.title}
      description={product.description}
      img={product.images[0].image}
      sale
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      id={product.id}
    />
  ));
  return (
    <div className="col-md-6 col-12" style={{ border: "2px solid #0D6EfD" }}>
      <h1 className="text-center m-0 p-3 bg-primary text-white">Top Rated</h1>
      <div className="p-5">
        {loading ? (
          <>
            <SkeletonComponent
              height={"500px"}
              length={"4"}
              classes="col-12 "
            />
          </>
        ) : (
          showProduct
        )}
      </div>
    </div>
  );
}
