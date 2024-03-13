import LoginForm from "../LoginForm";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function CreateUser() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [postResponse, setPostResponse] = useState("");
  // const [isCreated, setIsCreated] = useState(false);
  const handleOnChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    await axios
      .post("http://localhost:3000/register", formData)
      .then((response) => {
        setPostResponse(<p>{response.data.message}</p>);
        // setIsCreated(response.data.isCreated);
      })
      .then(
        setFormData({
          username: "",
          password: "",
        })
      );
  };
  return (
    <div className="HomePageLogin">
      <h3>Create a new user</h3>
      <LoginForm
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        formData={formData}
        buttonText="Create User"
        postResponse={postResponse}
      />
      {postResponse}
      <Link to={"/"}>Back to login page</Link>
    </div>
  );
}
