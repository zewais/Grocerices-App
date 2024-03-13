export default function NavBar({ username, logout }) {
  return (
    <div className="NavBar">
      <h3>welcome {username}</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
