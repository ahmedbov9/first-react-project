import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { CAT, CATS, PRO } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const dummyForm = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: 222,
    discount: 0,
    About: "About",
    stock: 0,
  };
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [send, setSend] = useState(false);
  const [uploading, setUploading] = useState(0);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState();
  const nav = useNavigate();
  // Ref
  const focus = useRef(null);
  const openImage = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);

  //Handle Open Image Input

  function handleOpenImage() {
    openImage.current.click();
  }

  // Handle Focus

  useEffect(() => {
    focus.current.focus();
  }, []);

  useEffect(() => {
    Axios.get(`/${CATS}`)
      .then((data) => setCategories(data.data))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  // Handle Submit
  async function handleEdit(e) {
    setLoading(true);

    e.preventDefault();
    try {
      const res = await Axios.post(`${PRO}/edit/${id}`, form);
      setLoading(false);
      nav("/dashboard/products");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  //Handle Submit Form
  async function handleSubmitForm() {
    setLoading(true);
    try {
      const res = await Axios.post(`${PRO}/add`, dummyForm);
      setId(res.data.id);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  // Handle Change

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSend(1);
    if (send !== 1) {
      handleSubmitForm();
    }
  }

  // Handle Image delete
  async function handleImageDelete(id, img) {
    const getId = ids.current[id];
    try {
      const res = await Axios.delete(`product-img/${getId}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((i) => i !== getId);
      j.current--;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  //Handle Images Change

  const j = useRef(-1);
  async function handleImagesChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesAsFiles = e.target.files;
    const data = new FormData();
    for (let i = 0; i < imagesAsFiles.length; i++) {
      j.current++;
      data.append("image", imagesAsFiles[i]);
      data.append("product_id", id);

      try {
        const res = await Axios.post("/product-img/add", data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 10 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
        ids.current[j.current] = res.data.id;
      } catch (error) {
        console.log(error);
      }
    }
  }
  // Mapping
  const showCategories = categories.map((category, key) => (
    <option key={key} value={category.id}>
      {category.title}
    </option>
  ));
  const showImages = images.map((image, key) => (
    <div key={key} className="border p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start gap-2 ">
          <img src={URL.createObjectURL(image)} width={"90"} />
          <div>
            <p className="mb-1">{image.name}</p>

            <p className="">
              {image.size / 1024 < 900
                ? (image.size / 1024).toFixed(2) + "KB"
                : (image.size / (1024 * 1024)).toFixed(2) + "MB"}
            </p>
          </div>
        </div>
        <Button variant="danger" onClick={() => handleImageDelete(key, image)}>
          Delete
        </Button>
      </div>
      <div className="custom-progress mt-3">
        <span
          ref={(e) => (progress.current[key] = e)}
          className="inner-progress"
        ></span>
      </div>
    </div>
  ));
  return (
    <>
      {loading ? <LoadingSubmit /> : ""}
      <Form className="bg-white w-100" onSubmit={handleEdit}>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select
            onChange={handleChange}
            value={form.category}
            name="category"
            ref={focus}
          >
            <option disabled>Select Category</option>
            {showCategories}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={form.title}
            required
            name="title"
            type="text"
            placeholder="Title..."
            disabled={!send}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={handleChange}
            required
            name="description"
            value={form.description}
            type="text"
            placeholder="Description..."
            disabled={!send}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={handleChange}
            required
            name="price"
            value={form.price}
            type="text"
            placeholder="Price..."
            disabled={!send}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            onChange={handleChange}
            required
            name="discount"
            value={form.discount}
            type="text"
            placeholder="Discount..."
            disabled={!send}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="about">
          <Form.Label>About</Form.Label>
          <Form.Control
            onChange={handleChange}
            required
            name="About"
            value={form.About}
            type="text"
            placeholder="About..."
            disabled={!send}
          />
        </Form.Group>
        <Form.Label>Stock</Form.Label>
        <Form.Control
          onChange={handleChange}
          required
          name="stock"
          value={form.stock}
          type="number"
          placeholder="Stock..."
          disabled={!send}
        />

        <Form.Group className="mb-3" controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control
            hidden
            multiple
            ref={openImage}
            type="file"
            onChange={handleImagesChange}
            disabled={!send}
          />
        </Form.Group>
        <div
          onClick={handleOpenImage}
          className="d-flex align-items-center justify-content-center gap-2 py-3 w-100 rounded mb-2 flex-column"
          style={{
            border: send ? "2px dashed #0086fe" : "2px dashed gray",
            cursor: send ? "pointer" : "auto",
          }}
        >
          <img
            src={require("../../../Assets/upload.webp")}
            alt="Upload Here"
            width={"100"}
            style={{ filter: !send && "grayscale(1)" }}
          />
          <p
            className="fw-bold mb-0"
            style={{ color: send ? "#0086fe" : "gray" }}
          >
            Upload Images
          </p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
          {showImages}
        </div>

        <button className="btn btn-primary" disabled={!send}>
          Save
        </button>
      </Form>
    </>
  );
}
