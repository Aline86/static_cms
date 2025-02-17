import { useContext, useState } from "react";
import AuthContextProvider from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import s from "./style.module.css";
const Login = () => {
  const { loginAction_starter } = useContext(AuthContextProvider);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmitEvent = async (e: any) => {
    e.preventDefault();

    if (input.email !== "" && input.password !== "") {
      let user_data = await loginAction_starter(input);

      if (user_data !== undefined) {
        sessionStorage.setItem("authToken", user_data.token);
        navigate("/admin");
      }
    }
  };

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmitEvent} className={s.form}>
        <div className={s.form_control}>
          <label htmlFor="user-email">Email:</label>
          <input
            type="email"
            id="user-email"
            name="email"
            placeholder="example@yahoo.com"
            aria-describedby="user-email"
            aria-invalid="false"
            onChange={handleInput}
          />
        </div>
        <div className={s.form_control}>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            aria-describedby="user-password"
            aria-invalid="false"
            onChange={handleInput}
          />
        </div>
        <button className={s.btn_submit}>Envoyer</button>
      </form>
    </div>
  );
};

export default Login;
