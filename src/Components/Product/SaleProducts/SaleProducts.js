import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
export default function SaleProduct(props) {
  const roundStars = Math.round(props.rating);
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
  return (
    <NavLink
      to={`/product/${props.id}`}
      className={`col-lg-${props.col} col-md-6 col-12`}
    >
      <div className="m-1 border rounded p-3 h-100 d-flex flex-column justify-content-between">
        <div>
          <p
            className="text-truncate text-black"
            style={{ fontWeight: "bold" }}
          >
            {props.title}
          </p>
          <p className="text-truncate text-black">{props.description}</p>
        </div>
        <div className="px-5 py-3 position-relative">
          {props.sale && (
            <p
              className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center"
              style={{ width: "50px", height: "50px", lineHeight: "50px" }}
            >
              Sale
            </p>
          )}
          <div
            className="w-100"
            style={{
              backgroundImage: `url(${props.img})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "200px",
              width: "100%",
            }}
          ></div>
        </div>
        <div className="d-flex align-items-center justify-content-between pt-4 border-top">
          <div>
            {showGoldStar}
            {showEmptyStar}
            <div className="d-flex align-items-center gap-3">
              <h5 className="m-0 text-primary">{props.discount}SR</h5>
              <h6
                className="m-0"
                style={{ color: "gray", textDecoration: "line-through" }}
              >
                {props.price !== props.discount && props.price + "SR"}
              </h6>
            </div>
          </div>
          <div className="border p-2 rounded">
            <FontAwesomeIcon icon={faCartShopping} color="black" size="20" />
          </div>
        </div>
      </div>
    </NavLink>
  );
}
