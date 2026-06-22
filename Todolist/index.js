const { animate, splitText, stagger, utils } = anime;
const inputBox = document.querySelector("#inputBox");
const inputMaxValue = Number(inputBox.max);
const listContainer = document.querySelector("#listContainer");
const titleEl = document.querySelector("#title");
const btnTask = document.querySelector("#btnTask");
const progressBar = document.querySelector("#progressBar");
const progressIcon = document.querySelector("[data-js='progressIcon']");
// const textAnimation = document.querySelector("#textAnimation");
// const splitText = textAnimation.innerHTML.split("");
const { chars } = splitText("#textAnimation", { words: false, chars: true });

let parentEl;
let progressScore = 0;
let steps = 0;

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
			parentEl = e.target.parentElement;
			animate(parentEl, {
				opacity: 0,
				x: "20rem",
				delay: 200,
				duration: 550,
				onComplete: (self) => {
					parentEl.remove();
					saveData();

					// console.log(self);
				},
			});
			// console.log(e.target.parentElement);
			if (parentEl.classList.contains("checked")) {
				moveSnail(Boolean(parentEl));
			}
			saveData();
			// getData();
			inputBox.focus();
		}
	},
	false,
);

function addTask() {
	// console.log(typeof inputBox.max);

	if (listContainer.querySelectorAll("li").length >= inputMaxValue) {
		btnTask.setAttribute("disabled", true);
		inputBox.setAttribute("disabled", true);
		getData();
		// notificationError();
		notificationError.play();
		inputBox.value = "";
		return;
	}

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
	// let tasks = listContainer.querySelectorAll("li").length;
	// steps = getStep(tasks);
}

function getData() {
	let tasks = listContainer.querySelectorAll("li");
	console.log("tasks:", tasks);

	steps = getStep(tasks);
}

function showTask() {
	listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

function getStep(taskCount) {
	console.log(100 / taskCount);

	return 100 / taskCount;
}

function moveSnail(isCompleted) {
	// console.log("isCompleted:", isCompleted);
	if (!isCompleted) return;

	progressBar.value = 50;
	progressIcon.style.left = `${progressBar.value}%`;
	progressIcon.style.transform = "translateX(-17px)";
}

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

// function animFunc() {
const notificationError = animate(chars, {
	y: [
		{ to: "-35px", ease: "outExpo", duration: 600 },
		{ to: 0, ease: "outBounce", duration: 800, delay: 100 },
	],
	rotate: {
		from: "-1turn",
		delay: 0,
	},
	opacity: { from: 0 },
	delay: stagger(50),
	ease: "inOutCirc",
	loopDelay: 1000,
	autoplay: false,
	// loop: true,
	//
	// loop: true,
});
// const notificationError = () => errorText.play();

// notificationError();
// }
// const anim = () => textAnimation.play();

// const [$test] = utils.$(".test");
// const animTe = aim.play();

// $test.addEventListener("click", animTe);

// console.log(aim);
