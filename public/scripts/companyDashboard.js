const addEmployee = document.querySelector("#addEmployee");
const employeeModal = document.querySelector("#employeeModal");
const addCar = document.querySelector("#addCar");
const carModal = document.querySelector("#carModal");
const addPatient = document.querySelector("#addPatient");
const patientModal = document.querySelector("#patientModal");
const createTour = document.querySelector("#createTour");
const tourModal = document.querySelector("#tourModal");
const closeModalButtons = document.querySelectorAll(".closeModal");

closeModalButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    employeeModal.close();
    carModal.close();
    patientModal.close();
    tourModal.close();
  });
});

addEmployee.addEventListener("click", (e) => {
  e.preventDefault();
  employeeModal.showModal();
});

addCar.addEventListener("click", (e) => {
  e.preventDefault();
  carModal.showModal();
});

addPatient.addEventListener("click", (e) => {
  e.preventDefault();
  patientModal.showModal();
});

createTour.addEventListener("click", (e) => {
  e.preventDefault();
  tourModal.showModal();
});
