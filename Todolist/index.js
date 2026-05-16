const inputBox = document.querySelector("#inputBox");
const listContainer = document.querySelector("#listContainer");
const titleEl = document.querySelector("#title");
const btnTask = document.querySelector("#btnTask");
const progressBar = document.querySelector("#progressBar");
const progressIcon = document.querySelector("[data-js='progressIcon']");

const { animate } = anime;
let parentAnimEl;
let progressScore = 0;

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
			parentAnimEl = e.target.parentElement;
			animate(parentAnimEl, {
				opacity: 0,
				x: "20rem",
				delay: 200,
				duration: 550,
				onComplete: (self) => {
					parentAnimEl.remove();
					saveData();

					console.log(self);
				},
			});

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

progressBar.addEventListener("click", function (e) {
	let { max: maxValue, value } = e.target;

	if (value >= maxValue) return;

	value = e.target.value += 10;
	progressIcon.style.left = `${value}%`;
	progressIcon.style.transform = "translateX(-17px)";

	console.log(maxValue);
	console.log(value);
});

//Animation
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
