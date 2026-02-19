const giveEmployee = document.querySelector("#giveEmployee");
const employeeModal = document.querySelector("#employeeModal");
const closeModal = document.querySelector(".closeModal");

giveEmployee.addEventListener("click", (e) => {
  e.preventDefault();
  employeeModal.showModal();
});

closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    employeeModal.close();
})