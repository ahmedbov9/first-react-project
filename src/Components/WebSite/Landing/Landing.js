import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap hand">
      <Container>
        <div className="col-lg-5 col-md-8 col-12 text-md-start text-center">
          <h1 className="display-2 text-white fw-bold">TekShop</h1>
          <h5 style={{ color: "white" }} className="fw-normal">
            Tek Store You Can Buy any Computer Part From Here
          </h5>
          <Link
            to={"/shop"}
            className="btn btn-primary mt-3 py-3 px-4 fw-bold text-light"
          >
            Shop Now
          </Link>
        </div>
      </Container>
    </div>
  );
}
