// This function updates the inspirational quote in .quote
async function fetchQuote() {
  document.querySelector("#displayedQuote").innerText = "";
  const response = await fetch("https://quotable.io/random?tags=inspirational&maxLength=120");
  const data = await response.json();
  document.querySelector("#displayedQuote").innerText = `${data.content} ~ ${data.author}`;
}

// Initialise a quote once page is loaded
fetchQuote();

// Add functionality to the refresh quote button
document.querySelector("#refresh").addEventListener("click", fetchQuote);

// Aad functionality to the add entry button
document.querySelector("#approvePhoto").addEventListener("click", addEntry);

// This function adds a new entry to the to do list
function addEntry() {
  // Select the value the user entered
  let entry = document.querySelector("#userEntry").value;
  // Create a new list item
  const newItem = document.createElement("span");
  newItem.innerText = entry;
  // Add a class to the newly created list element
  newItem.classList.add("listItem");
  // Make the newItem editable
  newItem.setAttribute("contentEditable", "true");
  // Add the new list element to the dom tree
  document.querySelector(".tasks").appendChild(newItem);
  // Add the completed, remove and edit buttons
  const newCompletedButton = document.createElement("img");
  newCompletedButton.classList.add("completedItem", "updateButton");
  newCompletedButton.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/3699/3699516.png");
  document.querySelector(".tasks").appendChild(newCompletedButton);

  const newRemovedButton = document.createElement("img");
  newRemovedButton.classList.add("removeItem", "updateButton");
  newRemovedButton.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/189/189690.png");
  document.querySelector(".tasks").appendChild(newRemovedButton);

  const newEditButton = document.createElement("img");
  newEditButton.classList.add("editItem", "updateButton");
  newEditButton.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/2921/2921222.png");
  document.querySelector(".tasks").appendChild(newEditButton);

  // Clear the input text box
  document.querySelector("#userEntry").value = "";
}

// Add functionality to the completed task buttons
const taskList = document.querySelector(".tasks")
taskList.addEventListener("click", (e) => { // This function will strike through the completed task and change its background color to a greyish color
  if (e.target.classList.contains('completedItem')) {
    const finishedTask = e.target.previousElementSibling;
    finishedTask.classList.toggle("complete");
  } else if (e.target.classList.contains('removeItem')){ // Add functionality to the remove task buttons
    // remove the task
    const finishedTask = e.target.previousElementSibling.previousElementSibling;
    finishedTask.remove();
    // remove the completed task button
    const completion = e.target.previousElementSibling;
    completion.remove();
    // remove the edit button
    const edit = e.target.nextElementSibling;
    edit.remove();
    // remove the remove button
    e.target.remove();
  } else if (e.target.classList.contains('editItem')) { // Add functionality to the edit task buttons
    const task = e.target.previousElementSibling.previousElementSibling.previousElementSibling;
    task.focus();
  }
});

// Add functionality to the remove all task buttons
  const removeAll = document.querySelector(".clearScreen");
  removeAll.addEventListener("click", clear);

  function clear() {
    let result = confirm("Are you sure you want to delete all tasks?");
    if (result === true){
      document.querySelector(".tasks").innerHTML = "";
    }
  }

// Modify background image based on mode selected
const groceries = document.querySelector("#groceriesMode");
groceries.addEventListener("click", ()=>{
  document.querySelector("body").removeAttribute("class");
  document.querySelector("body").classList.add("groceries")
})

const work = document.querySelector("#tasksMode");
work.addEventListener("click", ()=>{
  document.querySelector("body").removeAttribute("class");
  document.querySelector("body").classList.add("focus")
})

const exercise = document.querySelector("#workoutMode");
exercise.addEventListener("click", ()=>{
  document.querySelector("body").removeAttribute("class");
  document.querySelector("body").classList.add("exercise");
})
