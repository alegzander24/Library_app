const container = document.querySelector(".container");
const dialog = document.querySelector("dialog");
const closeBtn = document.getElementById("close");
const bookForm = document.getElementById("bookForm");

const addBtn = document.querySelector(".add");

let myLibrary = [];

// Functions

function Book(name, author, pages, status) {
	(this.name = name),
		(this.author = author),
		(this.pages = pages),
		(this.status = status);
}

function addBookToLibrary(name, author, pages, status) {
	myLibrary.push(new Book(name, author, pages, status));
}

addBookToLibrary("The hobbit", "John ronald", 1000, false);
addBookToLibrary("Dark matter", "Blake Crouch", 500, true);
addBookToLibrary("The road ahead book", "Bill gates", 400, false);
addBookToLibrary("Atomic habits", "James clear", 350, true);

function displayBooks() {
	myLibrary.forEach((book, index) => {
		createBookCard(book, index);
	});
}

// Create the book card

function createBookCard(book, index) {
	const cardDiv = document.createElement("div");
	// add the book name as a data attribute to the card
	cardDiv.dataset.name = book.name;
	cardDiv.classList.add("card");

	const buttonsDiv = document.createElement("div");

	buttonsDiv.classList.add("buttons");

	buttonsDiv.innerHTML = `<button class="edit"><i class="fa-solid fa-pen"></i></button>
						<button class="remove"><i class="fa-solid fa-x"></i></button>
						<button class="state">${book.status ? "Read" : "Not Read"}</button>`;

	const infoDiv = document.createElement("div");
	const name = document.createElement("p");
	name.textContent = book.name;
	const author = document.createElement("p");
	author.textContent = `By ${book.author}`;
	const pages = document.createElement("p");
	pages.textContent = `${book.pages} pages`;

	infoDiv.append(name, author, pages);

	cardDiv.append(infoDiv, buttonsDiv);

	container.appendChild(cardDiv);
}

// Remove element from DOM

function onCardClick(e) {
	if (e.target.className === "remove") {
		const bookName = e.target.parentElement.parentElement.dataset.name;

		removeFromLibrary(bookName);

		e.target.parentElement.parentElement.remove();
	} else if (e.target.className === "fa-solid fa-x") {
		// remove element from myLibrary using index
		const bookName =
			e.target.parentElement.parentElement.parentElement.dataset.name;

		removeFromLibrary(bookName);
		e.target.parentElement.parentElement.parentElement.remove();
	} else if (e.target.className === "state") {
		toggleStatus(e.target);
	} else {
		return;
	}
}

function removeFromLibrary(name) {
	console.log(name);

	myLibrary = myLibrary.filter((book) => book.name !== name);
	console.log(myLibrary);
}

function showBookForm(e) {
	e.preventDefault();

	// Get form values

	const bookName = document.getElementById("name").value;
	const author = document.getElementById("author").value;
	const pages = document.getElementById("pages").value;
	const status = document.getElementById("status").checked;

	const index = myLibrary.length;
	console.log(index);
	addBookToLibrary(bookName, author, pages, status);

	// get length of myLibrary and set it as value for data-index
	const book = new Book(bookName, author, pages, status);
	createBookCard(book, index);

	bookForm.reset();
	dialog.close();
}

function toggleStatus(button) {
	const bookName = button.closest("[data-name]").dataset.name;
	const book = myLibrary.find((book) => book.name === bookName);

	if (book) {
		console.log(book.status);
		book.status = !book.status;
		button.textContent = book.status ? "Read" : "Not Read";
		console.log(book.status);
	}
}

// Event listeners
document.addEventListener("DOMContentLoaded", displayBooks);

addBtn.addEventListener("click", (e) => {
	dialog.showModal();
});
closeBtn.addEventListener("click", (e) => {
	dialog.close();
});

container.addEventListener("click", onCardClick);

bookForm.addEventListener("submit", showBookForm);
