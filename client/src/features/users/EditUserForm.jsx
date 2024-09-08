import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PasswordMessage from "./PasswordMessage";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { ROLES } from "../../config/roles";

const EditUserForm = ({ user }) => {
  const { firstName, lastName, phone, email, username, roles, active, id } =
    user;
  const navigate = useNavigate();

  const [editFirstName, setEditFirstName] = useState(firstName);
  const [editLastName, setEditLastName] = useState(lastName);
  const [editPhone, setEditPhone] = useState(phone);
  const [editEmail, setEditEmail] = useState(email);
  const [editUsername, setEditUsername] = useState(username);
  const [editPassword, setEditPassword] = useState("");
  const [editRoles, setEditRoles] = useState(roles);
  const [editActive, setEditActive] = useState(active);
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validPhone, setValidPhone] = useState(false);

  const [updateUser, { isError, isLoading, isSuccess, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isLoading: isDelLoading, isSuccess: isDelSuccess, error: delError },
  ] = useDeleteUserMutation();

  const USER_REGEX = /^[A-z]{1,20}(\d{1,}\s?)?$/g;
  const PHONE_REGEX = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g;
  const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()<>,.])[A-Za-z\d!@#$%^&*()<>,.]{4,20}$/g;

  useEffect(() => {
    setValidUsername(USER_REGEX.test(editUsername));
  }, [editUsername]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(editPassword));
  }, [editPassword]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(editPhone));
  }, [editPhone]);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setEditRoles(values);
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  let canSave;
  if (editPassword) {
    canSave =
      [roles.length, validUsername, validPassword, validPhone].every(Boolean) &&
      !isLoading;
  } else {
    canSave =
      [roles.length, validUsername, validPhone].every(Boolean) && !isLoading;
  }

  const handleFirstNameChanged = (e) => setEditFirstName(e.target.value);
  const handleLastNameChanged = (e) => setEditLastName(e.target.value);
  const handlePhoneChanged = (e) => setEditPhone(e.target.value);
  const handleEmailChanged = (e) => setEditEmail(e.target.value);
  const handleUsernameChanged = (e) => setEditUsername(e.target.value);
  const handlePasswordChanged = (e) => setEditPassword(e.target.value);
  const onActiveChanged = () => setEditActive((prev) => !prev);

  const handleSaveUser = async (e) => {
    e.preventDefault();
    if (canSave) {
      if (editPassword) {
        await updateUser({
          id,
          firstName: editFirstName,
          lastName: editLastName,
          phone: editPhone,
          email: editEmail,
          username: editUsername,
          password: editPassword,
          roles: editRoles,
          active: editActive,
        });
      } else {
        await updateUser({
          id,
          firstName: editFirstName,
          lastName: editLastName,
          phone: editPhone,
          email: editEmail,
          username: editUsername,
          roles: editRoles,
          active: editActive,
        });
      }
      return navigate("/admin/users");
    }
    return alert("Please check to make sure all fields are entered!");
  };

  const handleDeleteUSer = async () => {
    const result = confirm(`Are you sure you want to delete ${username}`);
    if (result) {
      await deleteUser({ id });
      return navigate("/admin/users");
    }
    return;
  };

  return (
    <form onSubmit={handleSaveUser}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={editFirstName}
          onChange={handleFirstNameChanged}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={editLastName}
          onChange={handleLastNameChanged}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          value={editPhone}
          onChange={handlePhoneChanged}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={editEmail}
          onChange={handleEmailChanged}
          required
        />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={editUsername}
          onChange={handleUsernameChanged}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={editPassword}
          onChange={handlePasswordChanged}
        />
        {editPassword ? (
          <PasswordMessage
            password={editPassword}
            setValidPassword={setValidPassword}
          />
        ) : null}
      </div>
      <div>
        <label className="form__label" htmlFor="roles">
          Assigned Roles:
        </label>
        <select
          id="roles"
          name="roles"
          multiple={true}
          size="3"
          value={editRoles}
          onChange={onRolesChanged}
        >
          {options}
        </select>
      </div>
      <div>
        <input
          type="checkbox"
          name="active"
          id="active"
          checked={editActive}
          onChange={onActiveChanged}
        />
        <label htmlFor="active"> Active</label>
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={handleDeleteUSer}>
        Delete
      </button>
    </form>
  );
};

export default EditUserForm;
