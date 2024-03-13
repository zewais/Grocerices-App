import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function InventoryForm() {
  const [postResponse, setPostResponse] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    brand: "",
    quantity: "",
    image: "",
    price: "",
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setFormData(location.state.product), []);
  const { id } = formData;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: id
      ? formData
      : {
          id: "Default",
          productName: "Default",
          brand: "Default",
          quantity: "Default",
          image: "Default",
          price: "Default",
        },
  });

  // const handlePostDB = async (product) => {
  //   const postData = {
  //     id: crypto.randomUUID(),
  //     productName: product.productName,
  //     brand: product.brand,
  //     quantity: product.quantity,
  //     image: product.image,
  //     price: product.price,
  //   };

  //   await axios.post("http://localhost:3000/submitProduct", postData);
  //   // .then((response) => setPostResponse(<p>{response.data}</p>));
  // };

  const handleOnChange = (evt) => {
    const fieldName = evt.target.name;
    const fieldValue = evt.target.value;
    console.log(fieldName);
    setFormData((prevData) => {
      return {
        ...prevData,
        id: crypto.randomUUID(),
        [fieldName]: fieldValue,
      };
    });
  };
  const handleOnSubmit = (evt) => {
    evt.preventDefault;
    // addToInventory(formData);
    handleEditProduct(formData);
    // setFormData({
    //   id: "",
    //   productName: "",
    //   brand: "",
    //   quantity: "",
    //   image: "",
    //   price: "",
    // });
    // console.log("Here!");
  };

  const handleEditProduct = async (product) => {
    const id = product._id;
    const postData = {
      id: product._id,
      productName: product.productName,
      brand: product.brand,
      quantity: product.quantity,
      image: product.image,
      price: product.price,
    };
    await axios
      .patch(`http://localhost:3000/products/${id}`, postData)
      .then((response) => setPostResponse(<p>{response.data}</p>));
    // .then(setToggleEdit(false));
  };

  console.log(errors);

  return (
    <div className="Form-Container HomePageLogin">
      <form action="" onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="Input-Container">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            {...register("productName", {
              required: "Please provide a product name",
            })}
            id="productName"
            onChange={handleOnChange}
            value={formData.productName}
          />
          <p>{errors.productName?.message}</p>
        </div>
        <div className="Input-Container">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            {...register("brand", {
              required: "Please provide a brand name",
            })}
            id="brand"
            onChange={handleOnChange}
            value={formData.brand}
          />
          <p>{errors.brand?.message}</p>
        </div>
        <div className="Input-Container">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            {...register("quantity", {
              required: "Please provide a quantity",
            })}
            id="quantity"
            onChange={handleOnChange}
            value={formData.quantity}
          />
          <p>{errors.quantity?.message}</p>
        </div>
        <div className="Input-Container">
          <label htmlFor="image">Image Link</label>
          <input
            type="text"
            {...register("image", {
              required: "Please provide a image URL",
            })}
            id="image"
            onChange={handleOnChange}
            value={formData.image}
          />
          <p>{errors.image?.message}</p>
        </div>
        <div className="Input-Container">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            {...register("price", {
              required: "Please provide a price",
            })}
            id="price"
            onChange={handleOnChange}
            value={formData.price}
          />
          <p>{errors.price?.message}</p>
        </div>

        <button>{"Edit Product"}</button>
      </form>
      {postResponse}
      <br />
      <button onClick={() => navigate("/main")}>Back to Inventory</button>
    </div>
  );
}
