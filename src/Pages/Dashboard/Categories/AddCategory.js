import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../Api/axios";
import { CAT } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  // Ref

  const focus = useRef(null);

  // Handle Focus

  useEffect(() => {
    focus.current.focus();
  }, []);

  // Handle Submit
  async function handleSubmit(e) {
    setLoading(true);

    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${CAT}/add`, form);
      setLoading(false);
      window.location.pathname = "/dashboard/categories";
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  console.log(image);

  return (
    <>
      {loading ? <LoadingSubmit /> : ""}
      <Form className="bg-white w-100" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            type="text"
            placeholder="Title..."
            ref={focus}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Image</Form.Label>
          <Form.Control
            onChange={(e) => setImage(e.target.files.item(0))}
            required
            type="file"
            placeholder="Title..."
          />
        </Form.Group>

        <button
          disabled={title.length < 1 ? true : false}
          className="btn btn-primary"
        >
          Save
        </button>
      </Form>
    </>
  );
}
