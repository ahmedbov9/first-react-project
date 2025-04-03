import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../Api/axios";
import { USER, baseURL } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // Ref

  const focus = useRef(null);

  // Handle Submit
  async function handleSubmit(e) {
    setLoading(true);

    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/add`, {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      setLoading(false);
      window.location.pathname = "/dashboard/users";
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  // Handle Focus
  useEffect(() => {
    focus.current.focus();
  }, []);
  return (
    <>
      {loading ? <LoadingSubmit /> : ""}
      <Form className="bg-white w-100" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            type="text"
            placeholder="Name..."
            ref={focus}
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            type="password"
            placeholder="Password..."
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlControlInput4"
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
            <option value={"1999"}>Product Manger</option>
            <option value={"2001"}>User</option>
          </Form.Select>
        </Form.Group>
        <button
          disabled={
            name.length > 1 &&
            email.length > 1 &&
            password.length > 6 &&
            role !== ""
              ? false
              : true
          }
          className="btn btn-primary"
        >
          Save
        </button>
      </Form>
    </>
  );
}
