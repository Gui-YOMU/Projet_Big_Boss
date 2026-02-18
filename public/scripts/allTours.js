const createTour = document.querySelector("#createTour");
const tourModal = document.querySelector("#tourModal");
const closeModal = document.querySelector(".closeModal");

createTour.addEventListener("click", (e) => {
  e.preventDefault();
  tourModal.showModal();
});

closeModal.addEventListener("click", (e) => {
  e.preventDefault();
  tourModal.close();
});
