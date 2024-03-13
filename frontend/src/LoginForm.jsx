export default function LoginForm({
  handleOnSubmit,
  handleOnChange,
  formData,
  buttonText = "Login",
}) {
  return (
    <div className="LoginForm">
      <form action="" onSubmit={handleOnSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleOnChange}
          value={formData.username}
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleOnChange}
          value={formData.password}
          required
        />
        <br />
        <button>{buttonText}</button>
      </form>
    </div>
  );
}
