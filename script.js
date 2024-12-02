// const notesContainer = document.querySelector(".notes-container");
// const createBtn = document.querySelector(".btn");

// let notes = document.querySelectorAll(".input-box");
// function updateStorage() {
//   localStorage.setItem("notes", notesContainer.innerHTML);
// }

// function showNotes() {
//   notesContainer.innerHTML = localStorage.getItem("notes");

// }

// showNotes();

// createBtn.addEventListener("click", () => {
//   let inputbox = document.createElement("p");
//   let img = document.createElement("img");
//   inputbox.className = "input-box";
//   inputbox.setAttribute("contenteditable", "true");
//   img.src = "img/delete.png";
//   notesContainer.appendChild(inputbox).appendChild(img);
// })


// notesContainer.addEventListener("click", (e) => {
//   if (e.target.tagName === "IMG") {
//     e.target.parentElement.remove();
//     updateStorage();
//   }
//   else if (e.target.tagName === "p") {
//     notes = document.querySelectorAll(".input-box");
//     notes.forEach(nt => {
//       nt.onkeyup = function () {
//         updateStorage();
//       }
//     })
//   }
// })

// document.addEventListener("keydown", event => {
//   if (event.key === "Enter") {
//     document.execCommand("insertLineBreak");
//     event.preventDefault();
//   }
// })



const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Load notes from localStorage
function loadNotes() {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    notesContainer.innerHTML = storedNotes;

    // Reattach event listeners to dynamically recreated elements
    const deleteBtns = notesContainer.querySelectorAll(".delete-btn");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.parentElement.remove();
        updateStorage();
      });
    });

    const inputBoxes = notesContainer.querySelectorAll(".input-box");
    inputBoxes.forEach((box) => {
      box.addEventListener("keyup", updateStorage);
    });
  }
}

// Save notes to localStorage
function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

// Event listener for the create button
createBtn.addEventListener("click", () => {
  const inputBox = document.createElement("p");
  const deleteBtn = document.createElement("img");

  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  deleteBtn.src = "img/delete.png";
  deleteBtn.classList.add("delete-btn");

  // Add event listener to the delete button
  deleteBtn.addEventListener("click", () => {
    inputBox.remove();
    updateStorage();
  });

  // Save content on edit
  inputBox.addEventListener("keyup", updateStorage);

  notesContainer.appendChild(inputBox);
  inputBox.appendChild(deleteBtn);
  updateStorage();
});

// Prevent "Enter" from creating a new line in contenteditable
document.addEventListener("keydown", (event) => {
  if (event.target.classList.contains("input-box") && event.key === "Enter") {
    event.preventDefault();
    document.execCommand("insertLineBreak");
  }
});

// Load saved notes on page load
loadNotes();
