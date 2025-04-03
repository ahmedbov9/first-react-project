import { Link } from "react-router-dom";
import "./404.css"
export default function Err404() {
    return(
    <section>
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div className="col-sm-12 text-center">
                        <div className="four_zero_four_bg">
                            <h1 className="text-center">404</h1>
                        </div>
                        <div className="contant_box_404">
                            <h3 className="h2">Looks like you're lost</h3>
                            <p>the page you are looking for not availble!</p>
                            <Link to={'/'} className="link_404">
                                Go To Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}