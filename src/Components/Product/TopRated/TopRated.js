import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
export default function TopRated(props) {
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
      className="col-12 border-bottom d-flex align-items-start flex-wrap mb-2"
    >
      <div
        alt=""
        className="col-md-4 col-12"
        style={{
          backgroundImage: `url(${props.img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "170px",
        }}
      ></div>
      <div className="m-1 col-md-7 col-12 rounded p-3 h-100 d-flex flex-column justify-content-between">
        <div>
          <p
            className="text-truncate text-black"
            style={{ fontWeight: "bold" }}
          >
            {props.title}
          </p>
          <p className="text-truncate text-black">{props.description}</p>
        </div>

        <div className="d-flex align-items-center justify-content-between pt-4">
          <div>
            {showGoldStar}
            {showEmptyStar}
            <div className="d-flex align-items-center gap-3">
              <h5 className="m-0 text-primary">{props.discount}SR</h5>
              <h6
                className="m-0"
                style={{ color: "gray", textDecoration: "line-through" }}
              >
                {props.discount !== props.price && props.price + "SR"}
              </h6>
            </div>
          </div>
          <div className="border p-2 rounded">
            <FontAwesomeIcon icon={faCartShopping} size="20" color="black" />
          </div>
        </div>
      </div>
    </NavLink>
  );
}
