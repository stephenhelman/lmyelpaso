import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyPhoneNumber, verifyUsername } from "../../helper/usersHelper";
import PasswordMessage from "./PasswordMessage";
import { useAddNewUserMutation } from "./usersApiSlice";
import { ROLES } from "../../config/roles";
import useAuth from "../../hooks/useAuth";

const NewUser = () => {
  const navigate = useNavigate();
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const { isAdmin } = useAuth();
  const { pathname } = useLocation();
  const ADMIN_REGEX = /^\/admin\/users\/new(\/)?$/;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState(["Employee"]);
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validPhone, setValidPhone] = useState(false);

  const USER_REGEX = /^[A-z]{1,20}(\d{1,}\s?)?$/g;
  const PHONE_REGEX = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g;
  const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()<>,.])[A-Za-z\d!@#$%^&*()<>,.]{4,20}$/g;

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      if (ADMIN_REGEX.test(pathname)) {
        return navigate("/admin/users");
      }
      navigate("/home");
    }
  }, [isSuccess, navigate]);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  let rolesSelect = null;
  if (isAdmin) {
    rolesSelect = (
      <div>
        <label className="form__label" htmlFor="roles">
          Assigned Roles:
        </label>
        <select
          id="roles"
          name="roles"
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>
      </div>
    );
  }

  const canSave =
    [roles.length, validUsername, validPassword, validPhone].every(Boolean) &&
    !isLoading;

  const handleFirstNameChanged = (e) => setFirstName(e.target.value);
  const handleLastNameChanged = (e) => setLastName(e.target.value);
  const handlePhoneChanged = (e) => setPhone(e.target.value);
  const handleEmailChanged = (e) => setEmail(e.target.value);
  const handleUsernameChanged = (e) => setUsername(e.target.value);
  const handlePasswordChanged = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({
        firstName,
        lastName,
        phone,
        email,
        username,
        password,
        roles,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleFirstNameChanged}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleLastNameChanged}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={handlePhoneChanged}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChanged}
          required
        />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChanged}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChanged}
        />
        {password ? (
          <PasswordMessage
            password={password}
            setValidPassword={setValidPassword}
          />
        ) : null}
      </div>
      {rolesSelect}
      <button type="submit">Save</button>
    </form>
  );
};

export default NewUser;
