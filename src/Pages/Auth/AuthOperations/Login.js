import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { LOGIN, REGISTER, baseURL } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
export default function Register() {
  // State
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // Loading
  const [loading, setLoading] = useState(false);

  // Cookies
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
      const res = await axios.post(`${baseURL}/${LOGIN}`, form);
      setLoading(false);
      const token = res.data.token;
      const role = res.data.user.role;
      const direct =
        role === "1995"
          ? "/dashboard/users"
          : role === "1996"
          ? "/dashboard/writer"
          : "/";
      cookie.set("e-commerce", token);
      console.log(role);
      window.location.pathname = `${direct}`;
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err.response.status === 401) {
        setErr("Wrong Email or Password");
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
              <h1>Login</h1>

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
                  ref={focus}
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
                Login
              </button>
              <div className="google-btn">
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
              <div className="mt-3">
                <h3>or</h3>
                <Link to={"/register"}>Create New Account</Link>
              </div>
              {err !== "" && <span className="error">{err}</span>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
