import { Link } from "react-router-dom";
export default function NotAuthorized() {
  return (
    <div>
      <h1>You are not authorized to visit this page 😕</h1>
      <p>Please login in first!</p>
      <Link to={"/"}>Back to login page</Link>
    </div>
  );
}
