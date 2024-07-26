/* SHELF */

const myLib = [];

/* Book Info */

function Book(title, author, release, length, sinopsis, coverart, progress, rating) {
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

const entry1 = new Book("The Hobbit", "J. R. R. Tolkien", "1937-09-21", 95356, "The Hobbit is set in Middle-earth and follows home-loving Bilbo Baggins, the hobbit of the title, who joins the wizard Gandalf and the thirteen dwarves of Thorin's Company, on a quest to reclaim the dwarves' home and treasure from the dragon Smaug. Bilbo's journey takes him from his peaceful rural surroundings into more sinister territory.", "https://m.media-amazon.com/images/I/712cDO7d73L._AC_UF1000,1000_QL80_.jpg", 95, 0);

const entry2 = new Book("Alice's Adventures in Wonderland", "Lewis Carroll", "1865-11-01", 29610, "It details the story of a girl named Alice who falls through a rabbit hole into a fantasy world of anthropomorphic creatures.", "https://ik.imagekit.io/panmac/tr:f-auto,di-placeholder_portrait_aMjPtD9YZ.jpg,w-270/edition/9781447279990.jpg", 100, 4);

/* Add to Lib */

function addToLib(entry) {
    myLib.push(entry);
}

addToLib(entry1);
addToLib(entry2);

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

for(let i = 0; i < myLib.length; i++) {
    console.log("Loop runing");
    const bookEntry = document.createElement("div");
    bookEntry.classList.add("card");
    const bookCover = document.createElement("img");
    bookCover.src = myLib[i].coverart;
    bookEntry.appendChild(bookCover);
    const bookTitle = document.createElement("h2");
    bookTitle.textContent = myLib[i].title;
    bookEntry.appendChild(bookTitle);
    bookDiv("author", "book-author", myLib[i].author, bookEntry);
    bookDiv("release", "book-release", myLib[i].release, bookEntry);
    bookDiv("length", "book-length", myLib[i].length, bookEntry);
    bookDiv("sinopsis", "book-sino", myLib[i].sinopsis, bookEntry);
    bookDiv("progress", "book-progress", myLib[i].progress, bookEntry);
    bookDiv("rate", "book-rate", myLib[i].rating, bookEntry);
    shelf.appendChild(bookEntry)
}