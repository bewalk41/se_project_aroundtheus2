import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

// Initial card data
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const profileEditButton = document.querySelector("#profile-edit-button");
  const profileEditModal = document.querySelector("#profile-edit-modal");
  const profilecloseButton = profileEditModal.querySelector(
    "#profile-close-button"
  );
  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");
  const profileNameInput = document.querySelector("#profile-title-input");
  const profileDescriptionInput = document.querySelector(
    "#profile-description-input"
  );
  const addCardButton = document.querySelector("#add-card-button");
  const addCardModal = document.querySelector("#add-card-modal");
  const addCardForm = document.querySelector("#add-card-form");
  const profileEditForm = profileEditModal.querySelector(".modal__form");
  const cardListEl = document.querySelector(".cards__list");
  const cardTemplate =
    document.querySelector("#card-template").content.firstElementChild;
  const addCardCloseButton = document.querySelector("#add-card-close-button");
  const imageModal = document.querySelector("#image-modal");
  const modalCaption = document.querySelector("#modal-caption");
  const modalImage = document.querySelector("#modal-image");

  // sprint 7 update

  const validationOptions = {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  };
  const editFormValidator = new FormValidator(
    validationOptions,
    profileEditForm
  );
  const addCardFormValidator = new FormValidator(
    validationOptions,
    addCardForm
  );

  editFormValidator.enableValidation();
  addCardFormValidator.enableValidation();

  const cardData = {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  };

  const card = new Card(cardData, "#card-template");
  card.getView();
  // Functions

  function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(profileEditModal);
  }

  const cardTitleInput = document.querySelector("#card-title-input");
  const cardImageInput = document.querySelector("#card-image-input");

  function handleAddCardSubmit(e) {
    e.preventDefault();
    const cardName = cardTitleInput.value;
    const cardImageLink = cardImageInput.value;
    const cardData = { name: cardName, link: cardImageLink };
    const cardElement = getcardElement(cardData);
    cardListEl.prepend(cardElement);
    closeAddCardModal();

    // Clear input fields
    addCardForm.reset();
  }

  const handleDeleteCard = (cardElement) => {
    cardElement.remove();
  };

  function getcardElement(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardHeaderEl = cardElement.querySelector(".card__header");
    const likeButton = cardElement.querySelector(".card__like-button");
    const trashButton = cardElement.querySelector(".card__trash-button");

    // Function to open image modal

    function openImageModal(imageSrc, altText) {
      modalImage.src = imageSrc;
      modalImage.alt = altText;
      modalCaption.textContent = altText;
      openPopup(imageModal);
    }

    // Add event listener to card image
    cardImageEl.addEventListener("click", () => {
      openImageModal(data.link, data.name);
    });

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });

    trashButton.addEventListener("click", () => {
      handleDeleteCard(cardElement);
    });

    cardImageEl.src = data.link;
    cardImageEl.alt = data.name;
    cardHeaderEl.textContent = data.name;

    return cardElement;
  }

  initialCards.forEach((cardData) => {
    const cardElement = getcardElement(cardData);
    cardListEl.append(cardElement);
  });

  function openAddCardModal() {
    openPopup(addCardModal);
  }

  function closeAddCardModal() {
    closePopup(addCardModal);
  }

  function closePopupOnOverlayClick(popupElement) {
    popupElement.addEventListener("mousedown", (event) => {
      if (event.target === popupElement) {
        closePopup(popupElement);
      }
    });
  }
  closePopupOnOverlayClick(profileEditModal);

  closePopupOnOverlayClick(addCardModal);

  closePopupOnOverlayClick(imageModal);

  function openPopup(popupElement) {
    popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", closeOnEscape);
  }

  function closePopup(popupElement) {
    popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", closeOnEscape);
  }

  function closeOnEscape(event) {
    if (event.key === "Escape") {
      const openedModal = document.querySelector(".modal_opened");
      if (openedModal) {
        closePopup(openedModal);
      }
    }
  }

  // Event listeners
  profileEditButton.addEventListener("click", () => {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openPopup(profileEditModal);
  });

  profilecloseButton.addEventListener("click", () => {
    closePopup(profileEditModal);
  });

  const imageModalCloseButton = document.querySelector(
    "#image-modal-close-button"
  );

  imageModalCloseButton.addEventListener("click", () => {
    closePopup(imageModal);
  });

  profileEditForm.addEventListener("submit", handleProfileEditSubmit);
  addCardForm.addEventListener("submit", handleAddCardSubmit);
  addCardButton.addEventListener("click", openAddCardModal);
  addCardCloseButton.addEventListener("click", closeAddCardModal);
});