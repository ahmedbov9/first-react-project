import "./Home.css";
import Landing from "../../../Components/WebSite/Landing/Landing";
import LastSales from "../../../Components/Product/SaleProducts/LastOffers";
import ShowTopRated from "../../../Components/Product/TopRated/ShowTopRated";
import Container from "react-bootstrap/Container";
import LatestProducts from "../../../Components/Product/LatestProducts/ShowLatestProducts";
import Footer from "../../../Components/Footer";
export default function HomePage() {
  return (
    <div>
      <Landing />
      <LastSales />
      <Container>
        <div
          className="w-100 bg-dark d-flex align-items-center justify-content-center "
          style={{ height: "200px" }}
        >
          <h1 className="text-white">Top Rated & Latest Products</h1>
        </div>
        <div className="d-flex align-items-start flex-wrap mt-5">
          <ShowTopRated />
          <LatestProducts />
        </div>
      </Container>
      <Footer />
    </div>
  );
}
