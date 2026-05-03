const inputBox = document.querySelector("#inputBox");
const listContainer = document.querySelector("#listContainer");

document.addEventListener("DOMContentLoaded", function (e) {
	inputBox.focus();
});

function addTask() {
	if (inputBox.value === "") {
		alert("You must write something");
	} else {
		let li = document.createElement("li");
		li.innerHTML = inputBox.value;
		listContainer.appendChild(li);
		let span = document.createElement("span");
		span.innerHTML = "\u00d7";
		li.appendChild(span);
	}
	inputBox.value = "";
	saveData();
}

listContainer.addEventListener(
	"click",
	function (e) {
		if (e.target.tagName === "LI") {
			e.target.classList.toggle("checked");
			saveData();
		} else if (e.target.tagName === "SPAN") {
			e.target.parentElement.remove();
			saveData();
		}
	},
	false,
);

function saveData() {
	localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
	listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

document.addEventListener("keypress", function (e) {
	if (e.code !== "Enter") return;
	addTask();
});
