import "../Profile/Profile.css"
import React from "react"
import HeaderMovies from "../Header/HeaderMovies";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Profile({onUpdateUser, isLoading,onSignout}) {
  const currentUser = React.useContext(CurrentUserContext);

    const [userData, setUserData] = React.useState({
        name: {
            value: "",
            isValid: true,
            errorMessage: ""
        },
        email: {
            value: "",
            isValid: true,
            errorMessage: ""
        }
    });

    const isValid = userData.name.isValid && userData.email.isValid;

    const [disabled, setDisabled] = React.useState(false);

    React.useEffect(() => {
        isLoading ? setDisabled(true) : setDisabled(false);
    }, [isLoading]);

    React.useEffect(() => {
        isValid === true ? setDisabled(false) : setDisabled(true);
    }, [isValid]);

    React.useEffect(() => {
        if (
            currentUser.name === userData.name.value &&
            currentUser.email === userData.email.value
        ) {
            setDisabled(true);
        } else if (isValid) {
            setDisabled(false);
        } else if (!isValid) {
            setDisabled(true);
        }
    }, [currentUser, userData, isValid]);

    React.useEffect(() => {
        setUserData({
            name: {
                value: currentUser.name,
                isValid: true,
                errorMessage: ""
            },
            email: {
                value: currentUser.email,
                isValid: true,
                errorMessage: ""
            }
        });
    }, [currentUser]);

    const handleChange = (evt) => {
        const { name, value, validity, validationMessage } = evt.target;

        setUserData((prevState) => ({
            ...prevState,
            [name]: {
                ...userData[name],
                value,
                isValid: validity.valid,
                errorMessage: validationMessage
            }
        }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onUpdateUser({
            name: userData.name.value,
            email: userData.email.value
        });
    }

  return (
    <div>
      <HeaderMovies />
      <main>
        <section className="profile">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <form className="profile__form" onSubmit={handleSubmit}>
            <fieldset className="profile__inputs">
              <div className="profile__field-input">
                <p className="profile__name-input">Имя</p>
                <input className="profile__input" type="name" name="name"  minLength="2" maxLength="40" required 
                value={userData.name.value || ""}
                onChange={handleChange}/>
              </div>
              <p className="profile__error-text">
              {userData.name.errorMessage}
              </p>
              <div className="profile__field-input">
                <p className="profile__name-input">E-mail</p>
                <input className="profile__input" type="email" name="email"  minLength="8" maxLength="40" required 
                value={userData.email.value || ""}
                onChange={handleChange}/>
              </div>
              <p className="profile__error-text">
              {userData.email.errorMessage}
              </p>
            </fieldset>
            <button className={`profile__button-edit ${
              isValid && !isLoading ? "" : "profile__button-submit_disabled"
            }`} type="submit" disabled={disabled}>Редактировать</button>
            <Link to="/" className="profile__link-exit" type="submit" onClick={onSignout}>Выйти из аккаунта</Link>
          </form>
        </section>
      </main>
    </div>
  )
}
export default Profile;