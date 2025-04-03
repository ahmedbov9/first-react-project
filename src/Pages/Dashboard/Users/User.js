import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../Api/axios";
import { USER, baseURL } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [disable, setDisable] = useState(false);
  const nav = useNavigate();

  async function handleSubmit(e) {
    setLoading(true);

    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
      });
      setLoading(false);
      window.location.pathname = "/dashboard/users";
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const { id } = useParams();
  useEffect(() => {
    async function getUser() {
      try {
        const res = await Axios.get(`${USER}/${id}`)
          .then((data) => {
            setName(data.data.name);
            setEmail(data.data.email);
            setRole(data.data.role);
            setLoading(false);
          })
          .then(() => setDisable(false));
      } catch (err) {
        console.log(err);

        setLoading(false);
        if (err) {
          return nav("/page/404", { replace: true });
        }
      }
    }
    getUser();
  }, []);
  return (
    <>
      {loading ? (
        <LoadingSubmit />
      ) : (
        <Form className="bg-white w-100" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              type="text"
              placeholder="Name..."
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlControlInput2"
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              type="email"
              placeholder="Email..."
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlControlInput3"
          >
            <Form.Label>Role</Form.Label>
            <Form.Select
              onChange={(e) => setRole(e.target.value)}
              value={role}
              placeholder="Email..."
            >
              <option disabled value={""}>
                Select Role
              </option>
              <option value={"1995"}>Admin</option>
              <option value={"2001"}>User</option>
              <option value={"1999"}>Prodoct Manger</option>
            </Form.Select>
          </Form.Group>
          <button disabled={disable} className="btn btn-primary">
            Save
          </button>
        </Form>
      )}
    </>
  );
}
