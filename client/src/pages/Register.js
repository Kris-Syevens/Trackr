import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert, registerUser, user, loginUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, isMember } = values;
    if (
      !email ||
      !password ||
      (!isMember && !firstName) ||
      (!isMember && !lastName)
    ) {
      displayAlert();
      return;
    }
    const currentUser = { firstName, lastName, email, password };

    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* Name input */}
        {!values.isMember && (
          <>
            <FormRow
              labelText="first name"
              type="text"
              name="firstName"
              value={values.firstName}
              handleChange={handleChange}
            />

            <FormRow
              labelText="last name"
              type="text"
              name="lastName"
              value={values.lastName}
              handleChange={handleChange}
            />
          </>
        )}

        {/* Email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* Password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            loginUser({
              name: "testUser",
              email: "testuser@gmail.com",
              password: "password123",
            });
          }}
        >
          {isLoading ? "Loading..." : "Demo App"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
