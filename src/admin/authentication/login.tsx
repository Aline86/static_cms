import { useContext, useState } from "react";
import AuthContextProvider from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmitEvent}>
      <div className="form_control">
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
        <div id="user-email" className="sr-only">
          Merci de renseigner un identifiant valide.
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-describedby="user-password"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-password" className="sr-only">
          Votre mot de passe doit contenir plus de 6 caractères.
        </div>
      </div>
      <button className="btn-submit">Envoyer</button>
    </form>
  );
};

export default Login;
