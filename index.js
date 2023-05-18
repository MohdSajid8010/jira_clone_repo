const openModalBtn = document.querySelector(".add-task-btn");
const closeModal = document.querySelector(".close");
const modal = document.querySelector(".modal");
const myBtn = document.querySelector("#add-task-btn");

const formEl = document.getElementById("add-task-form");

var complete_container = document.getElementById("completed");
var inprogress_container = document.getElementById("in-progress");
var notstarted_container = document.getElementById("not-started");




openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    myBtn.innerHTML = "Add Task"
    formEl.reset();
});

// three array to  store data
var inProgress_arr = [];
var notStarted_arr = [];
var completed_arr = [];

let taskName_El = document.getElementById("task-name");
let priority_El = document.getElementById("priority");
let dueDate_El = document.getElementById("due-date");
let status_El = document.getElementById("status");

myBtn.addEventListener("click", (event) => {

    event.preventDefault();

    let taskName = taskName_El.value;
    let priority = priority_El.value;
    let dueDate = dueDate_El.value;
    let status = status_El.value;

    if (dueDate == "" || priority == "" || status == "") {
        alert( "All fields are mandatory to fill here.");
        return;
    }
    if (taskName.length <3) {
        alert("atleast 3 characters of taskName mandatory");
        return;
    }

    addTask(taskName, priority, dueDate, status);

    modal.style.display = "none";
    formEl.reset();
});


//Saving the data in local storage and then SHowing the data on UI

function addTask(taskName, priority, dueDate, status) {
    if (status == "not-started") {
        // add it in the  not started arr
        notStarted_arr.push({
            taskName: taskName,
            priority: priority,
            dueDate: dueDate,
            status: status,
        });

        localStorage.setItem("notStarted_arr", JSON.stringify(notStarted_arr));

    } else if (status == "in-progress") {
         // add it in the arr of in-progress
        inProgress_arr.push({
            taskName: taskName,
            priority: priority,
            dueDate: dueDate,
            status: status,
        });
        localStorage.setItem("inProgress_arr", JSON.stringify(inProgress_arr));
    } else if (status == "completed") {
        // add it in the arr of completed
        completed_arr.push({
            taskName: taskName,
            priority: priority,
            dueDate: dueDate,
            status: status,
        });
        localStorage.setItem("completed_arr", JSON.stringify(completed_arr));
    }
 showData(status);
}


//showDataHelperFunc the data here
function showDataHelperFunc(container, arr) {
    console.log(container, arr);

    container.innerHTML = "";
    arr.forEach((obj, index) => {
        container.innerHTML += `
                    <div id=${index} draggable="true"  ondragstart="Startdragging(event)">
                      <p>${obj.taskName}</p>
                      <p class=prt-${obj.priority}>${obj.priority}</p>
                      <p>${obj.dueDate}</p>
                      <p id="status1">${obj.status}</p>
                      
                      <div class="icon">
                      <span class="material-icons" onclick="editTask(this)">edit</span>
                      <span class="material-icons" onclick="deleteData(this)" >delete</span>
                     </div>

                    </div>
                  `;
    })
}
function showData(status) {
    if (status === "not-started") {

    showDataHelperFunc(notstarted_container, notStarted_arr);

       

    } else if (status == "in-progress") {
    showDataHelperFunc(inprogress_container, inProgress_arr);

      

    } else if (status == "completed") {

    showDataHelperFunc(complete_container, completed_arr);

      

    }
    // console.log("inProgress_arr", inProgress_arr);
    // console.log("notStarted_arr", notStarted_arr);
    // console.log("completed_arr", completed_arr);
    // console.log("-------");

}



function deleteData(e) {
    let statusEl = e.parentElement.parentElement.children[3];
    
    // checking the status 
    if (statusEl.textContent === "completed") {
        e.parentElement.parentElement.remove(); //deleting from UI
        completed_arr.splice(e.parentElement.parentElement.id, 1);//deleting from arr

        localStorage.setItem("completed_arr", JSON.stringify(completed_arr));//set in localstorage the update one
    } else if (statusEl.textContent == "in-progress") {
        e.parentElement.parentElement.remove();
        inProgress_arr.splice(e.parentElement.parentElement.id, 1);

        localStorage.setItem("inProgress_arr", JSON.stringify(inProgress_arr));
    } else if (statusEl.textContent == "not-started") {
        e.parentElement.parentElement.remove();
        notStarted_arr.splice(e.parentElement.parentElement.id, 1);
        localStorage.setItem("notStarted_arr", JSON.stringify(notStarted_arr));
    }
 showData(statusEl.textContent);
}


// Editing task here--->
function editTaskHelperFunc(arr, idx, e) {
    let obj = arr[idx];
    taskName_El.value = obj["taskName"];
    priority_El.value = obj["priority"]
    dueDate_El.value = obj["dueDate"];
    status_El.value = obj["status"];
    myBtn.onclick = function myFunc() {

        obj["taskName"] = taskName_El.value
        obj["priority"] = priority_El.value
        obj["dueDate"] = dueDate_El.value
        obj["status"] = status_El.value
        // localStorage.setItem(`${arr}`, JSON.stringify(arr));
        if (obj["status"] === "completed") {
            localStorage.setItem("completed_arr", JSON.stringify(completed_arr));

        } else if (obj["status"] === "not-started") {
            localStorage.setItem("notStarted_arr", JSON.stringify(notStarted_arr));

        } else if (obj["status"] === "in-progress") {
            localStorage.setItem("inProgress_arr", JSON.stringify(inProgress_arr));

        }
        myBtn.innerHTML = "Add Task"
        deleteData(e);
    }
}
function editTask(e) {
    modal.style.display = "block";
    myBtn.innerHTML = "Edit Task"
    let statusEl = e.parentElement.parentElement.children[3];
    let idx = e.parentElement.parentElement.id;

    if (statusEl.textContent == "completed") {
        editTaskHelperFunc(completed_arr, idx, e)


    } else if (statusEl.textContent == "not-started") {
        editTaskHelperFunc(notStarted_arr, idx, e)


    } else if (statusEl.textContent == "in-progress") {
        editTaskHelperFunc(inProgress_arr, idx, e)


    }


}

//--->seraching task has been done here--->

function searchTask(e) {
    let enteredValue = e.value.toLowerCase();
    let AllLiNotStarted = notstarted_container.getElementsByTagName("li");
    let AllLiCompleted = complete_container.getElementsByTagName("li");
    let AllLiInProgress = inprogress_container.getElementsByTagName("li");

    let notStar = Array.from(AllLiNotStarted);
    let InProg = Array.from(AllLiInProgress);
    let complete = Array.from(AllLiCompleted);

    let all_lis = notStar.concat(InProg, complete);// li elemets of all3 containers


    for (let i = 0; i < all_lis.length; i++) {
        console.log(all_lis[i]);

        let allParaEle = all_lis[i].getElementsByTagName("p");

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
            all_lis[i].style.display = "";
        } else {
            all_lis[i].style.display = "none";
        }
    }
}




window.onload = () => {
    notStarted_arr = JSON.parse(localStorage.getItem("notStarted_arr")) || [];
    inProgress_arr = JSON.parse(localStorage.getItem("inProgress_arr")) || [];
    completed_arr = JSON.parse(localStorage.getItem("completed_arr")) || [];

    if (inProgress_arr.length != 0) {
     showData(inProgress_arr[0].status);
    }
    if (notStarted_arr.length != 0) {
     showData(notStarted_arr[0].status);
    }
    if (completed_arr.length != 0) {
     showData(completed_arr[0].status);
    }
    // localStorage.removeItem(completed_arr);
}


window.onbeforeunload = (e) => {
    localStorage.setItem("notStarted_arr", JSON.stringify(notStarted_arr));
    localStorage.setItem("inProgress_arr", JSON.stringify(inProgress_arr));
    localStorage.setItem("completed_arr", JSON.stringify(completed_arr));
};