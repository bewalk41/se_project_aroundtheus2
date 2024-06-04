import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import PopupWithProfile from "../components/PopupwithProfile";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { initialCards, validationOptions } from "../utils/constants.js";
import "../pages/index.css"; // Ensure the CSS path is correct

document.addEventListener("DOMContentLoaded", () => {
  const profileEditButton = document.querySelector("#profile-edit-button");
  const addCardButton = document.querySelector("#add-card-button");

  const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    jobSelector: ".profile__description",
  });

  const editFormValidator = new FormValidator(
    validationOptions,
    document.querySelector("#profile-edit-modal .modal__form")
  );
  const addCardFormValidator = new FormValidator(
    validationOptions,
    document.querySelector("#add-card-modal .modal__form")
  );

  editFormValidator.enableValidation();
  addCardFormValidator.enableValidation();

  const handleImageClick = (link, name) => {
    imagePopup.open({ name, link });
  };

  const profileEditPopup = new PopupWithForm(
    "#profile-edit-modal",
    (formData) => {
      userInfo.setUserInfo({
        name: formData.heading,
        job: formData.description,
      });
    }
  );

  const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
    const cardData = { name: formData.heading, link: formData.description };
    const cardElement = getCardElement(cardData);
    section.addItem(cardElement);
  });

  const imagePopup = new PopupWithImage("#image-modal");

  const confirmPopup = new PopupWithConfirm("#confirm-popup", (cardElement) => {
    cardElement.remove();
    confirmPopup.close();
  });

  const profilePopup = new PopupWithProfile("#profile-popup"); // Create an instance of PopupWithProfile

  profileEditPopup.setEventListeners();
  addCardPopup.setEventListeners();
  imagePopup.setEventListeners();
  confirmPopup.setEventListeners();
  profilePopup.setEventListeners(); // Set event listeners for the profile popup

  function getCardElement(data) {
    const card = new Card(
      data,
      "#card-template",
      handleImageClick,
      (cardElement) => {
        confirmPopup.open(cardElement);
      }
    );
    return card.getView();
  }

  const section = new Section(
    {
      items: initialCards,
      renderer: (cardData) => {
        const cardElement = getCardElement(cardData);
        section.addItem(cardElement);
      },
    },
    ".cards__list"
  );

  section.renderItems();

  profileEditButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    profileEditPopup.setInputValues({
      heading: userData.name,
      description: userData.job,
    });
    profileEditPopup.open();
    editFormValidator.resetValidation(); // Reset validation when opening the profile edit form
  });

  addCardButton.addEventListener("click", () => {
    addCardPopup.open();
    addCardFormValidator.toggleButtonState(); // Disable the submit button when opening the add card form
  });
});
