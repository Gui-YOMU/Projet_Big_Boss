const giveMission = document.querySelector("#giveMission");
const missionModal = document.querySelector("#missionModal");
const giveCar = document.querySelector("#giveCar");
const carModal = document.querySelector("#carModal");
const closeModalButtons = document.querySelectorAll(".closeModal");

closeModalButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    missionModal.close();
    carModal.close();
  });
});

giveMission.addEventListener("click", (e) => {
  e.preventDefault();
  missionModal.showModal();
});

giveCar.addEventListener("click", (e) => {
  e.preventDefault();
  carModal.showModal();
});