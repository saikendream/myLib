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
const userInput = document.querySelector("#add-book");
    const inputForm = document.querySelector("#user-input");
    const inputClose = document.querySelector("#input-close");
    const inputDone = document.querySelector("#input-submit");
    const clear = document.querySelector("#input-clear")

/* DIALOG CONTROLS */

userInput.addEventListener("click", () => {
    inputForm.showModal(); // Displays the selected dialog
});

inputClose.addEventListener("click", () => {
    inputForm.close(); // Closes respective dialog
})

/* INPUT STYLING */

inputForm.addEventListener("input", function(e) {
    let input = e.target.closest("input");

    if(input.value != '') {
        input.classList.add("filled");
    } else {
        input.classList.remove("filled");
    }
});

clear.addEventListener("click", function(e) {
    inputForm.querySelectorAll("input").forEach(function(elem) {
        elem.classList.remove("filled")
    });
});

/* Receiving a new book */

    /* Variables */
    const formURL = document.querySelector("#img-input input");
        const formCover = document.querySelector("form img");
    const userStars = inputForm.getElementsByClassName("fa-star");

formURL.addEventListener("input", () => {
    console.log("Link input is happening")
    formCover.src = formURL.value;
});

    /* Star rating */

    let inputRate = 0;

    function starsReset() {
        if(inputRate != 0) {} else {
            let i = 0;
            while(i < 5) {
                if(userStars[i].className === "fa-solid fa-star active") {} else {
                    userStars[i].className = "fa-regular fa-star";
                };
                i++
            }
        };
    };

    function formStarsHover(n) {
        starsReset();
        for(let i = 0; i < n; i++) {
            userStars[i].className = "fa-solid fa-star"
        }
    };

    function formStarsConfirm(n) {
        starsReset();
        for(let i = 0; i < n; i++) {
            userStars[i].className = "fa-solid fa-star active"
        };
        inputRate = n;
    };

inputDone.addEventListener("click", () => {
    console.log("A new book was added!");
        const formTitle = document.querySelector("#book-title").value;
        const formRelease = document.querySelector("#book-release").value;
        const formWords = document.querySelector("#book-length").value;
        const formProgress = document.querySelector("#book-progress").value;
        const formSinopsis = document.querySelector("#book-sinopsis").value;
        const formRating = inputRate;
        const formAuthor = document.querySelector("#book-author").value;

        if(formURL.value == "") { formURL.value = "/src/no_cover.png" };
    
    let entry = new Book(formTitle, formAuthor, formRelease, formWords, formSinopsis, formURL.value, formProgress, formRating);
    addToLib(entry);
    putOnShelf(entry);
    document.querySelector("#user-input form").reset();
    inputForm.querySelectorAll("input").forEach(function(elem) {
        elem.classList.remove("filled")
    });
})



/* Putting into the shelves */

function bookDiv(info, divClass, obj, parent) {
    info = document.createElement("div");
    info.classList.add(divClass);
    info.textContent = obj;
    parent.appendChild(info);
}

function cardButtons(progress, parent) {
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

    cardOptions.append(progress, deleteBook, editInfo, moreInfo);
    parent.appendChild(cardOptions);
}

function cardRating(rate, parent) {
    let rateMax = 5;
    
    const userRate = document.createElement("div");
    userRate.classList.add("rating");

    const ratingStar = document.createElement("i");
    ratingStar.className = "fa-solid fa-star";

    for(let i = 1; i <= rate; i++) {
        let currentLoop = ratingStar.cloneNode(true);
        userRate.appendChild(currentLoop);
    };

    if(rate < rateMax) {
        console.log("Rate is less than max");
        let rateDiff = (rate - rateMax) * (-1);
        console.log(rateDiff);
        ratingStar.className = "fa-regular fa-star";

        for(let j = 1; j <= rateDiff; j++) {
            let currentLoop = ratingStar.cloneNode(true);
            userRate.appendChild(currentLoop);
        }
    }

    parent.appendChild(userRate);
}

function putOnShelf(el) {
    let bookEntry = document.createElement("div");
    bookEntry.setAttribute("data-id", el.idNum);
    bookEntry.classList.add("card");
    const bookCover = document.createElement("img");
    bookCover.src = el.coverart;
    bookEntry.appendChild(bookCover);
    const bookTitle = document.createElement("h2");
    bookTitle.textContent = el.title;
    bookEntry.appendChild(bookTitle);
    bookDiv("author", "author", el.author, bookEntry);
    cardRating(el.rating, bookEntry);
    const progress = document.createElement("progress");
    progress.max = 100;
    progress.value = el.progress;
    bookEntry.appendChild(progress);
    cardButtons(progress, bookEntry);
    shelf.appendChild(bookEntry);
}

for(let i = 0; i < myLib.length; i++) {
    putOnShelf(myLib[i]);
}

/* CARD BUTTONS */

/* DELETE */

function deleteEntry(el) {
    let shelfEl = document.querySelector(`data-id="${el}"`);
    shelfEl.remove();

    const elIndex = myLib.findIndex(Object => {
        return Object.idNum === "el";
    });
    myLib.splice(elIndex, 1);
}