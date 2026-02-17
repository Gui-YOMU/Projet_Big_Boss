const addEmployee = document.querySelector("#addEmployee");
const employeeModal = document.querySelector("#employeeModal");
const addCar = document.querySelector("#addCar");
const carModal = document.querySelector("#carModal");
const closeModalButtons = document.querySelectorAll(".closeModal");

closeModalButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    employeeModal.close();
    carModal.close();
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
