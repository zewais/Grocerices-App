import LoginForm from "../LoginForm";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";

export default function HomePage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);

  const navigate = useNavigate();
  //   const Cookies = new Cookies();

  const login = (jwtToken) => {
    Cookies.set("jwt_authorization", jwtToken);
    setIsLoggedin(true);
  };

  const handleOnChange = (evt) => {
    const { name, value } = evt.target;
    console.log(document.cookie);
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const postLogin = async (user) => {
    const postUser = { ...user };
    await axios
      .post("http://localhost:3000/login", postUser)
      .then((response) => {
        setPostResponse(response.data.message);
        if (response.data.message == "success") {
          login(response.data.token);
          navigate("/main", { state: { isLoggedin } });
        } else {
          setIsLoggedin(false);
        }
      })

      .catch((error) => console.log(error));
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    postLogin(formData);
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <>
      <div className="HomePageLogin">
        <h1>Groceries App</h1>

        <LoginForm
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          formData={formData}
          postResponse={postResponse}
        />
        <p>
          not a member yet? click <Link to={"/create-user"}>here</Link> to join
        </p>
        <span>{postResponse}</span>
      </div>
    </>
  );
}
