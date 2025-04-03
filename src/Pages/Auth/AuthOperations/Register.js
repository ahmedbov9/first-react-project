import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { REGISTER, baseURL } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  // State
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Loading

  const [loading, setLoading] = useState(false);
  //Cookies

  const cookie = Cookie();

  // Err
  const [err, setErr] = useState("");
  // Ref

  const focus = useRef(null);
  // Handle Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  // Handle Focus
  useEffect(() => {
    focus.current.focus();
  }, []);

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      setLoading(false);
      const token = res.data.token;
      cookie.set("e-commerce", token);
      navigate("/dashboard/users", { replace: true });
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response.status === 422) {
        setErr("Email is already been taken");
      } else {
        setErr("Internal Server Error");
      }
    }
  }

  return (
    <>
      {loading && <LoadingSubmit />}
      <div className="container">
        <div className="row" style={{ height: "100vh" }}>
          <Form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1>Register Now</h1>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  ref={focus}
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                  placeholder="Enter Your Name.."
                  required
                />
                <Form.Label>Name:</Form.Label>
              </Form.Group>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="Enter Your Email.."
                  required
                />
                <Form.Label>Email:</Form.Label>
              </Form.Group>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="Enter Your Password.."
                  minLength={"6"}
                  required
                />
                <Form.Label>Password:</Form.Label>
              </Form.Group>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
              <div className="mt- mb-2">
                <Link to={"/login"} className="d-block">
                  You Have Already Account ?
                </Link>
              </div>
              <div className="google-btn m-0">
                <a href={"http://127.0.0.1:8000/login-google"}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-1024.png"
                      alt="sign in with google"
                    />
                  </div>
                  <p className="btn-text">
                    <b>Sign in with google</b>
                  </p>
                </a>
              </div>
              {err !== "" && <span className="error">{err}</span>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
