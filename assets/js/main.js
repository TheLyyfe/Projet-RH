function openModal(elem) {
    let id = elem.getAttribute("data-employeeId")
    let form = document.getElementById("modal").querySelector("form");
    form.action = "/updateEmployee/" + id
}


let body = document.querySelector("body");
let deleteEmployee = document.querySelectorAll(".deleteEmployee");
let popup;
let button;
let button2;
let popupContainer;

for (let i = 0; i < deleteEmployee.length; i++) {
    deleteEmployee[i].addEventListener("click", (event) => {
        DeleteEmployees(event);
    });
}

function DeleteEmployees(event) {
    let target = event.target;
    popup = document.createElement("div");
    popup.classList.add("popup");
    body.appendChild(popup);
    popupContainer = document.createElement("div");
    popupContainer.classList.add("popupContainer");
    popup.appendChild(popupContainer);
    button = document.createElement("a");
    button.classList.add("paper-btn", "btn-danger");
    button.innerHTML = "Supprimer";
    button.href = `/deleteEmployee/${target.value}`;
    popupContainer.appendChild(button);

    button2 = document.createElement("a");
    button2.classList.add("paper-btn", "btn-success");
    button2.innerHTML = "Annuler";
    button2.href = `/entreprises`;
    popupContainer.appendChild(button2);
}