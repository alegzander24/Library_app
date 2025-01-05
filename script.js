const container = document.querySelector(".container");

const myLibrary = [];

// Functions

function Book(name, author, pages) {
	(this.name = name), (this.author = author), (this.pages = pages);
}

function addBookToLibrary(name, author, pages) {
	myLibrary.push(new Book(name, author, pages));
}

addBookToLibrary("The hobbit", "John ronald", 1000);
addBookToLibrary("Dark matter", "Blake Crouch", 500);
addBookToLibrary("the road ahead book", "Bill gates", 400);
addBookToLibrary("Atomic habits", "James clear", 350);

function displayBooks() {
	myLibrary.forEach((book) => {
		createBookCard(book);
	});
}

// Create the book card

function createBookCard(book) {
	const cardDiv = document.createElement("div");
	cardDiv.classList.add("card");

	const buttonsDiv = document.createElement("div");

	buttonsDiv.classList.add("buttons");
	buttonsDiv.innerHTML = `<button class="edit"><i class="fa-solid fa-pen"></i></button>
						<button class="remove"><i class="fa-solid fa-x"></i></button>
						<button class="state">read</button>`;

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

// Event listeners
document.addEventListener("DOMContentLoaded", displayBooks);
