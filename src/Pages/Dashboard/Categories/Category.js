import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../Api/axios";
import { CAT, USER, baseURL } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function Category() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [disable, setDisable] = useState(false);
  const nav = useNavigate();

  async function handleSubmit(e) {
    setLoading(true);

    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${CAT}/edit/${id}`, form);
      setLoading(false);
      window.location.pathname = "/dashboard/categories";
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const { id } = useParams();

  useEffect(() => {
    async function getUser() {
      try {
        const res = await Axios.get(`${CAT}/${id}`)
          .then((data) => {
            setTitle(data.data.title);

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
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
              type="text"
              placeholder="Title..."
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

          <button disabled={disable} className="btn btn-primary">
            Save
          </button>
        </Form>
      )}
    </>
  );
}
