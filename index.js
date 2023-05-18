const openModalBtn = document.querySelector(".add-task-btn");
const closeModal = document.querySelector(".close");
const modal = document.querySelector(".modal");
const myBtn = document.querySelector("#add-task-btn");

const formEl = document.getElementById("add-task-form");

var completedHtml = document.getElementById("completed");
var in_ProgressHtml = document.getElementById("in-progress");
var not_startedHtml = document.getElementById("not-started");

let search = document.getElementById("seach");



openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// three array to  store data
var inProgressArr = [];
var not_startedArr = [];
var completedArr = [];

myBtn.addEventListener("click", (event) => {
    // standard code to prevent your page from reloading
    event.preventDefault();
    // console.log("upper working");

    const taskName = document.getElementById("task-name").value;
    const priority = document.getElementById("priority").value;
    const dueDate = document.getElementById("due-date").value;
    const status = document.getElementById("status").value;

    // if (dueDate == "" || priority == "" || status == "") {
    //     alert( "All fields are mandatory to fill here with atleast 3 characters of taskName");
    //     return;
    // }
    if (taskName.length == 0) {
        alert("atleast 3 characters of taskName mandatory");
        return;
    }

    addTask(taskName, priority, dueDate, status);

    modal.style.display = "none";
    formEl.reset();
});


// -----------------------------------------------------------------------------------------------------------
//Saving the data in local storage and then SHowing the data on UI

function addTask(taskName, priority, dueDate, status) {
    console.log(status);
    if (status == "not-started") {
        // add it in the column of not started
        not_startedArr.push({
            taskName: taskName,
            priority: priority,
            dueDate: dueDate,
            status: status,
        });
        // console.log(not_startedArr);
        localStorage.setItem("not_startedArr", JSON.stringify(not_startedArr));
    } else if (status == "in-progress") {
        //   // add it in the column of in-progress
        inProgressArr.push({
            taskName: taskName,
            priority: priority,
            dueDate: dueDate,
            status: status,
        });
        localStorage.setItem("inProgressArr", JSON.stringify(inProgressArr));
    } else if (status == "completed") {
        //   // add it in the column of completed
        completedArr.push({
            taskName: taskName,
            priority: priority,
            dueDate: dueDate,
            status: status,
        });
        localStorage.setItem("completedArr", JSON.stringify(completedArr));
    }
    ShowingData(status);
}
// ------------------------------------------------------------------------------------
// Showing the data here

function ShowingData(status) {
    if (status === "not-started") {

        not_startedHtml.innerHTML = "";
        not_startedArr.forEach((eachList, index) => {
            // console.log(eachList.priority);
            not_startedHtml.innerHTML += `
                        <li id=${index} draggable="true"  ondragstart="Startdragging(event)">
                          <p>${eachList.taskName}</p>
                          <p id=priority1${index}>${eachList.priority}</p>
                          <p>${eachList.dueDate}</p>
                          <p id="status1">${eachList.status}</p>
                          
                          <div class="icon">
                          <span class="material-icons" onclick="EditOneList(this)">edit</span>
                          <span class="material-icons" onclick="DeleteOneList(this)" >delete</span>
                         </div>

                        </li>
                      `;

            if (eachList.priority == "low") {
                document.querySelector(`#priority1${index}`).style.backgroundColor =
                    "yellow";
            } else if (eachList.priority == "medium") {
                document.querySelector(`#priority1${index}`).style.backgroundColor =
                    "orange";
            } else {
                document.querySelector(`#priority1${index}`).style.backgroundColor =
                    "red";
            }
        });
    } else if (status == "in-progress") {
        in_ProgressHtml.innerHTML = "";
        inProgressArr.forEach((eachList, index) => {
            in_ProgressHtml.innerHTML += `
      <li id=${index} draggable="true"  ondragstart="Startdragging(event)">
      <p>${eachList.taskName}</p>
      <p id=priority2${index}>${eachList.priority}</p>
      <p>${eachList.dueDate}</p>
      <p id="status2">${eachList.status}</p>
      <div class="icon">
                    <span class="material-icons" onclick="EditOneList(this)">edit</span>
                    <span class="material-icons" onclick="DeleteOneList(this)" >delete</span>
                   </div>
      </li>
      `;

            if (eachList.priority == "low") {
                document.querySelector(`#priority2${index}`).style.backgroundColor =
                    "yellow";
            } else if (eachList.priority == "medium") {
                document.querySelector(`#priority2${index}`).style.backgroundColor =
                    "orange";
            } else {
                document.querySelector(`#priority2${index}`).style.backgroundColor =
                    "red";
            }
        });

    } else if (status == "completed") {

        completedHtml.innerHTML = "";
        completedArr.forEach((eachList, index) => {
            completedHtml.innerHTML += `<li id=${index} draggable="true"  ondragstart="Startdragging(event)">
      <p >${eachList.taskName}</p>
      <p id=priority3${index}>${eachList.priority}</p>
      <p>${eachList.dueDate}</p>
      <p id="status3">${eachList.status}</p>
      <div class="icon">
                    <span class="material-icons" onclick="EditOneList(this)">edit</span>
                    <span class="material-icons" onclick="DeleteOneList(this)" >delete</span>
                   </div>
      </li>`;

            if (eachList.priority == "low") {
                document.querySelector(`#priority3${index}`).style.backgroundColor =
                    "yellow";
            } else if (eachList.priority == "medium") {
                document.querySelector(`#priority3${index}`).style.backgroundColor =
                    "orange";
            } else {
                document.querySelector(`#priority3${index}`).style.backgroundColor =
                    "red";
            }
        });

    }
    console.log("inProgressArr", inProgressArr);
    console.log("not_startedArr", not_startedArr);
    console.log("completedArr", completedArr);
    console.log("-------");

}
// ------------------------------------------------------------------------------------------------
// deleting  work here

function DeleteOneList(e) {
    // checking the status here
    let StatusAll = e.parentElement.parentElement.children[3];

    if (StatusAll.textContent === "completed") {
        e.parentElement.parentElement.remove(); //deleting from UI
        completedArr.splice(e.parentElement.parentElement.id, 1);

        localStorage.setItem("completedArr", JSON.stringify(completedArr));
    } else if (StatusAll.textContent == "in-progress") {
        e.parentElement.parentElement.remove(); //deleting from UI
        inProgressArr.splice(e.parentElement.parentElement.id, 1);

        localStorage.setItem("inProgressArr", JSON.stringify(inProgressArr));
    } else if (StatusAll.textContent == "not-started") {
        e.parentElement.parentElement.remove();
        not_startedArr.splice(e.parentElement.parentElement.id, 1);
        console.log(not_startedArr);
        localStorage.setItem("not_startedArr", JSON.stringify(not_startedArr));
    }
    ShowingData(StatusAll.textContent);
}
// -----------------------------------------------------------------------------------------------
// Editing task here--->

function EditOneList(e) {
    modal.style.display = "block";
    let statusAll = e.parentElement.parentElement.children[3];

    if (statusAll.textContent == "completed") {
        let targetList = completedArr[e.parentElement.parentElement.id];

        document.getElementById("task-name").value = targetList.taskName;
        document.getElementById("priority").value = targetList.priority;
        document.getElementById("due-date").value = targetList.dueDate;
        document.getElementById("status").value = targetList.status;
    } else if (statusAll.textContent == "not-started") {
        let targetList = not_startedArr[e.parentElement.parentElement.id];
        document.getElementById("task-name").value = targetList.taskName;
        document.getElementById("priority").value = targetList.priority;
        document.getElementById("due-date").value = targetList.dueDate;
        document.getElementById("status").value = targetList.status;
    } else if (statusAll.textContent == "in-progress") {
        let targetList = inProgressArr[e.parentElement.parentElement.id];
        document.getElementById("task-name").value = targetList.taskName;
        document.getElementById("priority").value = targetList.priority;
        document.getElementById("due-date").value = targetList.dueDate;
        document.getElementById("status").value = targetList.status;
    }

    myBtn.onclick = function myFunc() {

        if (statusAll.textContent == "completed") {
            let targetList = completedArr[e.parentElement.parentElement.id];
            targetList.taskName = document.getElementById("task-name").value;
            targetList.priority = document.getElementById("priority").value;
            targetList.dueDate = document.getElementById("due-date").value;
            targetList.status = document.getElementById("status").value;
            localStorage.setItem("completedArr", JSON.stringify(completedArr));
        } else if (statusAll.textContent == "not-started") {
            let targetList = not_startedArr[e.parentElement.parentElement.id];
            targetList.taskName = document.getElementById("task-name").value;
            targetList.priority = document.getElementById("priority").value;
            targetList.dueDate = document.getElementById("due-date").value;
            targetList.status = document.getElementById("status").value;
            localStorage.setItem("not_startedArr", JSON.stringify(not_startedArr));
        } else if (statusAll.textContent == "in-progress") {
            let targetList = inProgressArr[e.parentElement.parentElement.id];
            targetList.taskName = document.getElementById("task-name").value;
            targetList.priority = document.getElementById("priority").value;
            targetList.dueDate = document.getElementById("due-date").value;
            targetList.status = document.getElementById("status").value;
            localStorage.setItem("inProgressArr", JSON.stringify(inProgressArr));
        }
        DeleteOneList(e);
    };
}

// --------------------------------------------------------------------------------------------------
//--->seraching task has been done here--->

function searchTask(e) {
    let enteredValue = e.value.toLowerCase();
    let AllLiNotStarted = not_startedHtml.getElementsByTagName("li");
    let AllLiCompleted = completedHtml.getElementsByTagName("li");
    let AllLiInProgress = in_ProgressHtml.getElementsByTagName("li");

    let notStar = Array.from(AllLiNotStarted);
    let InProg = Array.from(AllLiInProgress);
    let complete = Array.from(AllLiCompleted);

    let comboOfAllLis = notStar.concat(InProg, complete);

    console.log(comboOfAllLis);
    // searching
    for (let i = 0; i < comboOfAllLis.length; i++) {
    console.log(comboOfAllLis[i]);

        let allParaEle = comboOfAllLis[i].getElementsByTagName("p");

        let taskName = allParaEle[0].textContent.toLowerCase();
        let priority = allParaEle[1].textContent.toLowerCase();
        let dueDate = allParaEle[2].textContent.toLowerCase();
        let status = allParaEle[3].textContent.toLowerCase();
        if (
            taskName.includes(enteredValue) ||
            priority.includes(enteredValue) ||
            status.includes(enteredValue) ||
            dueDate.includes(enteredValue)
        ) {
            comboOfAllLis[i].style.display = "";
        } else {
            comboOfAllLis[i].style.display = "none";
        }
    }
}
// ---------------------------------------------------------------------------------------------------------------
//Dragging functionality embeded there
// let draggedLiChild;
// function Startdragging(event) {
//   let draggedLi = event.target;
//   draggedLiChild = draggedLi.children[1];
//   console.log(draggedLiChild.id);
// }
// function allowDrop(event) {
//   event.preventDefault();
// }
// function acceptDroped(event) {
//   event.preventDefault();

//   console.log(event.target);
//   event.target.appendChild(document.getElementById(draggedLiChild));
// }



window.onload = () => {
    not_startedArr = JSON.parse(localStorage.getItem("not_startedArr")) || [];
    inProgressArr = JSON.parse(localStorage.getItem("inProgressArr")) || [];
    completedArr = JSON.parse(localStorage.getItem("completedArr")) || [];

    if (inProgressArr.length != 0) {
        ShowingData(inProgressArr[0].status);
    }
    if (not_startedArr.length != 0) {
        ShowingData(not_startedArr[0].status);
    }
    if (completedArr.length != 0) {
        ShowingData(completedArr[0].status);
    }
}


window.onbeforeunload = (e) => {
    localStorage.setItem("not_startedArr", JSON.stringify(not_startedArr));
    localStorage.setItem("inProgressArr", JSON.stringify(inProgressArr));
    localStorage.setItem("completedArr", JSON.stringify(completedArr));
};