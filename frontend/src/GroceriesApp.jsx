///////Componants
import InventoryCard from "./InventoryCard";
import CartList from "./CartList";
import NavBar from "./NavBar";
///////Packages
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function GroceriesApp() {
  const [cartList, setCartList] = useState([]);
  const [products, setProducts] = useState([]);
  const [postResponse, setPostResponse] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  const navigate = useNavigate();
  const cookieToken = Cookies.get("jwt_authorization");
  const decodeToken = (jwtToken) => {
    const decoded = jwtDecode(jwtToken);
    return decoded;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    handleFindDB();
  }, [postResponse]);

  useEffect(() => {
    handleFindDB();
    setCurrentUser(decodeToken(cookieToken).id);
  }, []);
  async function handleFindDB() {
    const response = await fetch("http://localhost:3000/products");
    const products = await response.json();
    setProducts(products);
  }

  const logout = () => {
    Cookies.remove("jwt_authorization");
    setCurrentUser("");
    navigate("/");
  };

  const handleAddToCart = (item) => {
    setCartList((prevList) => {
      return [...prevList, { ...item, id: crypto.randomUUID() }];
    });
  };

  const handleEmptyCart = () => {
    setCartList([]);
  };

  const handleRemoveItem = (id) => {
    setCartList((prevList) => {
      return prevList.filter((i) => i.id !== id);
    });
  };

  const handleToggleEdit = (product) => {
    navigate("/edit-product", { state: { product, state: "edit" } });
  };

  const handleProductDelete = async (product) => {
    const id = product._id;
    await axios
      .delete(`http://localhost:3000/products/${id}`)
      .then((response) => setPostResponse(<p>{response.data}</p>));
  };

  const handleEmptyProduct = () => {
    navigate("/add-product", {
      state: {
        product: {
          id: "",
          productName: "",
          brand: "",
          quantity: "",
          image: "",
          price: "",
        },
        state: "add",
      },
    });
  };

  return (
    <>
      <NavBar username={currentUser} logout={logout} />
      <h1>Groceries App</h1>
      {currentUser ? (
        <div>
          <button onClick={handleEmptyProduct}>Add new product</button>
          <div>{postResponse}</div>
          <div className="GroceriesApp-Container">
            <InventoryCard
              list={products}
              onClick={handleAddToCart}
              handleToggleEdit={handleToggleEdit}
              handleProductDelete={handleProductDelete}
            />
            <CartList
              cartList={cartList}
              onClickEmpty={handleEmptyCart}
              onClickRemove={handleRemoveItem}
            />
          </div>
        </div>
      ) : (
        <div className="GroceriesApp-Container">
          <Link to={"/"}>Back to login page</Link>
        </div>
      )}
    </>
  );
}
