import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { CATS } from "../../../Api/Api";
import Container from "react-bootstrap/Container";
import SkeletonComponent from "../../../Components/Loading/Skeleton";
export default function WebsiteCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${CATS}`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  const showCategories = categories.map((category) => (
    <div className="col-lg-2 col-md-6 col-12 bg-transparent border-0">
      <div className="m-1 bg-white border d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100">
        <img className="ms-3" width={"50"} src={category.image} alt="img" />
        <p className="m-0 text-truncate">{category.title}</p>
      </div>
    </div>
  ));
  return (
    <>
      <div className="bg-secondary py-5">
        <Container>
          <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2">
            {loading ? (
              <SkeletonComponent
                length={"15"}
                height={"70px"}
                baseColor="white"
                classes="col-lg-2 col-md-6 col-12"
              />
            ) : (
              showCategories
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
