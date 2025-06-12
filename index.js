function Book (title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        let readSentence = (this.read == true) ? "already read" : "not read yet";
        return title + " by " + author + ", " + pages + " pages, " + readSentence
    }
}

function createBook (title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function markRead () {
    this.readbook = function () {
        this.read = true;
        displayLibrary();
    }
}

function displayLibrary () {
    document.body.removeChild(library);
    library = document.createElement("div");
    library.setAttribute("class", "library")
    document.body.appendChild(library);

    for (const book of myLibrary) {
        let bookCard = document.createElement("div");
        bookCard.setAttribute("class", "book-card");
        bookCard.textContent = book.info();

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            myLibrary = myLibrary.filter(b => b.id !== book.id);
            displayLibrary();
        });
        bookCard.appendChild(deleteButton);

        
        let readButton = document.createElement("button");
        readButton.textContent = "Mark as Read";
        readButton.addEventListener("click", function () {
            book.read = !book.read;
            bookCard.textContent = book.info();
            displayLibrary();
        });
        bookCard.appendChild(readButton);

        
        library.appendChild(bookCard);
    }
}



let myLibrary = [];
let library = document.body.querySelector(".library");

Object.setPrototypeOf(Book.prototype, markRead.prototype);

createBook("The Hobbit", "J.R.R. Tolkien", "295", true);
createBook("The Lord of the Rings", "J.R.R. Tolkien", "1178", true);
createBook("Yuh", "Brandon", "70", true);
createBook("Nah", "Nodnarb", "69", false);

displayLibrary();

addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(e.target.title.value);
    console.log(e.target);
    console.log(e);
    createBook(
        e.target.title.value,
        e.target.author.value,
        e.target.pages.value,
        e.target.read.checked
    );
    displayLibrary();
})
