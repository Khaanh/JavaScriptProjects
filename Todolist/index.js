const inputBox = document.querySelector("#inputBox");
const listContainer = document.querySelector("#listContainer");
const titleEl = document.querySelector("#title");
const btnTask = document.querySelector("#btnTask");

const { animate } = anime;

document.addEventListener("keypress", function (e) {
	if (e.code !== "Enter") return;
	addTask();
});

document.addEventListener("DOMContentLoaded", function (e) {
	inputBox.focus();
});

btnTask.addEventListener("click", addTask);

listContainer.addEventListener(
	"click",
	function (e) {
		if (e.target.tagName === "LI") {
			e.target.classList.toggle("checked");
			saveData();
		} else if (e.target.tagName === "SPAN") {
			animate(e.target.parentElement, {
				x: {
					to: "150px",
					ease: "outCubic",
				},
				delay: 300,
				opacity: 0,
				onComplete: e.target.parentElement.remove(),
			});
			// e.target.parentElement.remove();
			saveData();
			inputBox.focus();
		}
	},
	false,
);

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
	inputBox.focus();
	saveData();
}

function saveData() {
	localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
	listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

animate(titleEl, {
	opacity: { from: 0 },
	translateY: { from: "-50px" },
});

animate(btnTask, {
	opacity: { from: 0 },
	translateX: { from: "150px" },
});

animate(inputBox, {
	translateX: { from: "-150px" },
	opacity: { from: 0 },
});
