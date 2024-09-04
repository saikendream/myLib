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

const entry1 = new Book("The Hobbit", "J. R. R. Tolkien", new Date("1937-09-21"), 95356, "The Hobbit is set in Middle-earth and follows home-loving Bilbo Baggins, the hobbit of the title, who joins the wizard Gandalf and the thirteen dwarves of Thorin's Company, on a quest to reclaim the dwarves' home and treasure from the dragon Smaug. Bilbo's journey takes him from his peaceful rural surroundings into more sinister territory.", "https://m.media-amazon.com/images/I/712cDO7d73L._AC_UF1000,1000_QL80_.jpg", 15, 0);
entry1.idNum = "entry1";

const entry2 = new Book("Alice's Adventures in Wonderland", "Lewis Carroll", new Date("1865-11-01"), 29610, "It details the story of a girl named Alice who falls through a rabbit hole into a fantasy world of anthropomorphic creatures.", "https://ik.imagekit.io/panmac/tr:f-auto,di-placeholder_portrait_aMjPtD9YZ.jpg,w-270/edition/9781447279990.jpg", 65, 4);
entry2.idNum = "entry2";

const entry3 = new Book("Anne of Green Gables", "L. M. Montgomery", new Date("1908-06-13"), 106294, "Set in the late 19th century, the novel recounts the adventures of an 11-year-old orphan girl Anne Shirley sent by mistake to two middle-aged siblings, Matthew and Marilla Cuthbert, who had originally intended to adopt a boy to help them on their farm in the fictional town of Avonlea in Prince Edward Island, Canada.", "https://m.media-amazon.com/images/I/81NDwdjGwSL._AC_UF1000,1000_QL80_.jpg", 100, 5);
entry3.idNum = "entry3";

/* Add to Lib */

function addToLib(entry) {
    myLib.push(entry);
}

/* Page */

/* SELECTORS */

const shelf = document.querySelector("#container");
const userInput = document.querySelector("#add-book");
    const inputForm = document.querySelector("#user-input");
    const inputClose = document.querySelector("#input-close");
    const inputDone = document.querySelector("#input-submit");
    const clear = document.querySelector("#input-clear");

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
    };
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
            };
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

let isEditing = false;
    let currentEdit = "";

inputDone.addEventListener("click", () => {
    if(document.querySelector("#user-input form").checkValidity()) {
        if(isEditing) {
            currentEdit.title = document.querySelector("#book-title").value;
            currentEdit.release = document.querySelector("#book-release").value;
            currentEdit.length = document.querySelector("#book-length").value;
            currentEdit.progress = document.querySelector("#book-progress").value;
            currentEdit.sinopsis = document.querySelector("#book-sinopsis").value;
            currentEdit.rating = inputRate;
            currentEdit.author = document.querySelector("#book-author").value;

            if(formURL.value == "") { formURL.value = "/src/no_cover.png" };

            putOnShelf();
        } else {
                console.log("A new book was added!");
                const formTitle = document.querySelector("#book-title").value;
                const formRelease = document.querySelector("#book-release").valueAsDate;
                const formWords = document.querySelector("#book-length").value;
                const formProgress = document.querySelector("#book-progress").value;
                const formSinopsis = document.querySelector("#book-sinopsis").value;
                const formRating = inputRate;
                const formAuthor = document.querySelector("#book-author").value;

                if(formURL.value == "") { formURL.value = "/src/no_cover.png" };
        
            let entry = new Book(formTitle, formAuthor, formRelease, formWords, formSinopsis, formURL.value, formProgress, formRating);
            addToLib(entry);
            bookCard(entry);
            inputForm.close();
        };}
    
    document.querySelector("#user-input form").reset();
    inputForm.querySelectorAll("input").forEach(function(elem) {
        elem.classList.remove("filled")
    });
});

/* Putting into the shelves */

function bookDiv(info, divClass, obj, parent, bookElem) {
    if(bookElem == undefined) {
        info = document.createElement("div");
    } else { info = document.createElement(bookElem); };
    info.classList.add(divClass);
    info.textContent = obj;
    parent.appendChild(info);
}

function cardButtons(progress, parent, thisInd) {
    const cardOptions = document.createElement("div");
    cardOptions.classList.add("buttons");

    const moreInfo = document.createElement("div");
    moreInfo.classList.add("btn");
    moreInfo.id = "more-btn";
    moreInfo.onclick = function() { seeMore(); };
    const editInfo = document.createElement("div");
    editInfo.classList.add("btn");
    editInfo.id = "edit-btn";
    editInfo.onclick = function() { editEntry(); };
    const deleteBook = document.createElement("div");
    deleteBook.classList.add("btn");
    deleteBook.id = "delete-btn";
    deleteBook.onclick = function() { deleteEntry(); };

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

function bookCard(el) {
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

    cardButtons(progress, bookEntry, (myLib.length - 1));
    shelf.appendChild(bookEntry);

    /* CARD BUTTONS */

    let thisEl = "";

    function cardIdentifier() {
        thisEl = event.target.parentNode.parentNode.parentNode.dataset.id;
        if(thisEl === undefined) {
            thisEl = event.target.parentNode.parentNode.dataset.id;
        }
        console.log(`"thisEl" is ${thisEl}`);
    }

    /* DELETE */

    this.deleteEntry = function() {
        cardIdentifier();

        const elIndex = myLib.findIndex((Object) => Object.idNum === thisEl);
        console.log(`index is ${elIndex}`);
        myLib.splice(elIndex, 1);

        putOnShelf();
    }

    /* EDIT */

    this.editEntry = function() {
        cardIdentifier();
        const elIndex = myLib.findIndex((Object) => Object.idNum === thisEl);

        document.querySelector("#img-input input").value = myLib[elIndex].coverart;
            formCover.src = myLib[elIndex].coverart;
        document.querySelector("#book-title").value = myLib[elIndex].title;
            document.querySelector("#book-title").classList.add("filled");
        document.querySelector("#book-release").value = myLib[elIndex].release;
            document.querySelector("#book-release").classList.add("filled");
        document.querySelector("#book-length").value = myLib[elIndex].length;
            document.querySelector("#book-length").classList.add("filled");
        document.querySelector("#book-progress").value = myLib[elIndex].progress;
            document.querySelector("#book-progress").classList.add("filled");
        document.querySelector("#book-sinopsis").value = myLib[elIndex].sinopsis;
        const formRating = inputRate;
        document.querySelector("#book-author").value = myLib[elIndex].author;
            document.querySelector("#book-author").classList.add("filled");

        inputForm.showModal();
        currentEdit = myLib[elIndex];
        isEditing = true;

        inputForm.onclose = () => {
            document.querySelector("#user-input form").reset();
            inputForm.querySelectorAll("input").forEach(function(elem) {
                elem.classList.remove("filled"); 
            });
            formCover.src = "/src/no_cover.png";
            isEditing = false;
        }; 
    }

    /* SEE MORE */

    this.seeMore = function() {
        cardIdentifier();
        const elIndex = myLib.findIndex((Object) => Object.idNum === thisEl);

        let bookModal = document.createElement("dialog");
        bookModal.classList.add("more-info");

        const modalClose = document.createElement("button");
        modalClose.id = "bmodal-close";
        modalClose.innerHTML = '<i class="fa-solid fa-x"></i>';
        modalClose.onclick = () => {
            bookModal.close();
        };
        bookModal.appendChild(modalClose);

        const modalGrid = document.createElement("div");
        const modalRow1 = document.createElement("div");
        modalGrid.appendChild(modalRow1);

        const bmCover = document.createElement("img");
        bmCover.src = myLib[elIndex].coverart;
        modalRow1.appendChild(bmCover);

        const bmTitle = document.createElement("h2");
        bmTitle.classList.add("book-title");
        bmTitle.textContent = myLib[elIndex].title;
        modalGrid.appendChild(bmTitle);
        bookDiv("author", "book-author", myLib[elIndex].author, modalGrid, "h3");
            const releaseDay = myLib[elIndex].release.getDate();
            const releaseMonth = myLib[elIndex].release.toLocaleString("default", { month: "long" });
            const releaseYear = myLib[elIndex].release.getFullYear();
            const releaseDate = `${releaseMonth} ${releaseDay}, ${releaseYear}`;
        bookDiv("release", "book-release", releaseDate, modalGrid);
        bookDiv("length", "book-length", `${myLib[elIndex].length} words`, modalGrid);
        cardRating(myLib[elIndex].rating, modalGrid);
        bookDiv("sinopsis", "book-sinopsis", myLib[elIndex].sinopsis, modalGrid);

        const progress = document.createElement("progress");
        progress.max = 100;
        progress.value = myLib[elIndex].progress;
        progress.classList.add("book-progress");
        modalGrid.appendChild(progress);

        bookModal.appendChild(modalGrid);
        shelf.appendChild(bookModal);

        bookModal.showModal();

        bookModal.onclose = () => {
            bookModal.remove();
        };
    };
}

function putOnShelf() {
    shelf.textContent = "";
    for(let i = 0; i < myLib.length; i++) {
        bookCard(myLib[i]);
    }
}

/*
function addSamples() {
    console.log("addSamples rodando");
    let index = 0;

    for(i = 0; i < 4; i++) {
        console.log(i);
        if(i == 3) {
            console.log("i = 4");
            putOnShelf()
        } else {
        if(i == 0) index = entry1;
        if(i == 1) index = entry2;
        if(i == 2) index = entry3;

        setTimeout(addToLib(index), 1000);}
    }
}

addSamples();
*/

addToLib(entry1);
addToLib(entry2);
addToLib(entry3);

putOnShelf();