import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { CAT, CATS, PRO } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    stock: "",
  });
  const [images, setImages] = useState([]);
  const [imagesFromServer, setImagesFromServer] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idsFromServer, setIdsFromServer] = useState([]);
  const { id } = useParams();
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

  //Get Data
  const { getId } = useParams();
  useEffect(() => {
    Axios.get(`/${PRO}/${id}`)
      .then((data) => {
        setForm(data.data[0]);
        setImagesFromServer(data.data[0].images);
      })
      .catch((err) => console.log(err));
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
      for (let i = 0; i < idsFromServer.length; i++) {
        await Axios.delete(`/product-img/${idsFromServer[i]}`).then((data) =>
          console.log(data)
        );
      }
      await Axios.post(`${PRO}/edit/${id}`, form);
      setLoading(false);
      nav("/dashboard/products");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  // Handle Change

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle Image delete
  async function handleImageDelete(id, file) {
    const findId = ids.current[id];
    try {
      const res = await Axios.delete(`product-img/${findId}`).then((data) =>
        console.log(data)
      );
      setImages((prev) => prev.filter((img) => img !== file));
      ids.current = ids.current.filter((i) => i !== findId);
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

  //Handle Image Delete
  async function handleDeleteImageFromServer(id) {
    setImagesFromServer((prev) => prev.filter((img) => img.id !== id));
    setIdsFromServer((prev) => {
      return [...prev, id];
    });
  }
  // Mapping
  const showCategories = categories.map((category, key) => (
    <option key={key} value={category.id}>
      {category.title}
    </option>
  ));
  const showImages = images.map((image, key) => (
    <div key={key} className="border p-2 w-100">
      <div className="d-flex align-items-center justify-content-start gap-2 ">
        <img alt="" src={URL.createObjectURL(image)} width={"90"} />
        <div>
          <p className="mb-1">{image.name}</p>
          <p className="">
            {image.size / 1024 < 900
              ? (image.size / 1024).toFixed(2) + "KB"
              : (image.size / (1024 * 1024)).toFixed(2) + "MB"}
          </p>
        </div>
      </div>
      <div className="custom-progress mt-3">
        <span
          ref={(e) => (progress.current[key] = e)}
          className="inner-progress"
        ></span>
      </div>
      <Button variant="danger" onClick={() => handleImageDelete(key, image)}>
        Delete
      </Button>
    </div>
  ));
  const showImagesFromServer = imagesFromServer.map((img, key) => (
    <div key={key} className="border p-2 col-2 position-relative">
      <div className="d-flex align-items-center justify-content-start gap-2">
        <img alt="" src={img.image} className="w-100"></img>
      </div>
      <div
        style={{ cursor: "pointer" }}
        className="position-absolute top-0 end-0 bg-danger rounded text-white"
      >
        <p
          className="py-1 px-2 m-0"
          onClick={() => handleDeleteImageFromServer(img.id)}
        >
          X
        </p>
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
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            onChange={handleChange}
            required
            name="stock"
            value={form.stock}
            type="number"
            placeholder="Stock..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control
            hidden
            multiple
            ref={openImage}
            type="file"
            onChange={handleImagesChange}
          />
        </Form.Group>
        <div
          onClick={() => openImage.current.click()}
          className="d-flex align-items-center justify-content-center gap-2 py-3 w-100 rounded mb-2 flex-column"
          style={{
            border: "2px dashed #0086fe",
            cursor: "pointer",
          }}
        >
          <img
            src={require("../../../Assets/upload.webp")}
            alt="Upload Here"
            width={"100"}
          />
          <p className="fw-bold mb-0" style={{ color: "#0086fe" }}>
            Upload Images
          </p>
        </div>
        <div className="d-flex align-items-start flex-wrap gap-2">
          {showImagesFromServer}
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
          {showImages}
        </div>

        <button className="btn btn-primary">Save</button>
      </Form>
    </>
  );
}
