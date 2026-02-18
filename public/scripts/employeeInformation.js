const giveMission = document.querySelector("#giveMission");
const missionModal = document.querySelector("#missionModal");
const closeModal = document.querySelector(".closeModal");

closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    missionModal.close();
  });

giveMission.addEventListener("click", (e) => {
  e.preventDefault();
  missionModal.showModal();
});