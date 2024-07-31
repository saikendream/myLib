/* SHELF */

const myLib = [];

/* Book Info */

function Book(title, author, release, length, sinopsis, coverart, progress, rating) {
    this.idNum = `lb${new Date().getTime().toString().slice(-5)}`;
    this.title = title;
    this.author = author;
    this.release = release;
    this.length = length;
    this.sinopsis = sinopsis;
    this.coverart = coverart;
    this.progress = progress;
    this.rating = rating;
}

/* Testing */

const entry1 = new Book("The Hobbit", "J. R. R. Tolkien", "1937-09-21", 95356, "The Hobbit is set in Middle-earth and follows home-loving Bilbo Baggins, the hobbit of the title, who joins the wizard Gandalf and the thirteen dwarves of Thorin's Company, on a quest to reclaim the dwarves' home and treasure from the dragon Smaug. Bilbo's journey takes him from his peaceful rural surroundings into more sinister territory.", "https://m.media-amazon.com/images/I/712cDO7d73L._AC_UF1000,1000_QL80_.jpg", 15, 0);
const entry2 = new Book("Alice's Adventures in Wonderland", "Lewis Carroll", "1865-11-01", 29610, "It details the story of a girl named Alice who falls through a rabbit hole into a fantasy world of anthropomorphic creatures.", "https://ik.imagekit.io/panmac/tr:f-auto,di-placeholder_portrait_aMjPtD9YZ.jpg,w-270/edition/9781447279990.jpg", 65, 4);
const entry3 = new Book("Anne of Green Gables", "L. M. Montgomery", "1908-06-13", 106294, "Set in the late 19th century, the novel recounts the adventures of an 11-year-old orphan girl Anne Shirley sent by mistake to two middle-aged siblings, Matthew and Marilla Cuthbert, who had originally intended to adopt a boy to help them on their farm in the fictional town of Avonlea in Prince Edward Island, Canada.", "https://m.media-amazon.com/images/I/81NDwdjGwSL._AC_UF1000,1000_QL80_.jpg", 100, 5);

/* Add to Lib */

function addToLib(entry) {
    myLib.push(entry);
}

addToLib(entry1);
addToLib(entry2);
addToLib(entry3);

/* Page */

/* SELECTORS */

const shelf = document.querySelector("#container");

/* Putting into the shelves */

function bookDiv(info, divClass, obj, parent) {
    console.log(info);
    info = document.createElement("div");
    console.log(info);
    info.classList.add(divClass);
    console.log(info.classList);
    info.textContent = obj;
    console.log(info.textContent);
    parent.appendChild(info);
}

function cardButtons(parent) {
    const cardOptions = document.createElement("div");
    cardOptions.classList.add("buttons")

    const moreInfo = document.createElement("div");
    moreInfo.classList.add("btn");
    moreInfo.id = "more-btn";
    const editInfo = document.createElement("div");
    editInfo.classList.add("btn");
    editInfo.id = "edit-btn";
    const deleteBook = document.createElement("div");
    deleteBook.classList.add("btn");
    deleteBook.id = "delete-btn";

    moreInfo.innerHTML = '<i class="fa-solid fa-eye"></i>';
    editInfo.innerHTML = '<i class="fa-solid fa-pencil"></i>';
    deleteBook.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    cardOptions.append(deleteBook, editInfo, moreInfo);
    parent.appendChild(cardOptions);
}

for(let i = 0; i < myLib.length; i++) {
    console.log("Loop runing");
    let bookEntry = document.createElement("div");
    bookEntry.id = myLib[i].idNum;
    bookEntry.classList.add("card");
    const bookCover = document.createElement("img");
    bookCover.src = myLib[i].coverart;
    bookEntry.appendChild(bookCover);
    const bookTitle = document.createElement("h2");
    bookTitle.textContent = myLib[i].title;
    bookEntry.appendChild(bookTitle);
    bookDiv("author", "author", myLib[i].author, bookEntry);
    bookDiv("rate", "rate", myLib[i].rating, bookEntry);
    const progress = document.createElement("progress");
    progress.max = 100;
    progress.value = myLib[i].progress;
    progress.classList.add("progress");
    bookEntry.appendChild(progress);
    cardButtons(bookEntry);
    shelf.appendChild(bookEntry);
}