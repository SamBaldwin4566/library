//Create an empty array to store the books entered
let books = [];

//Function to check whether or not it is the first time loading the page
function myLoad() {

    if (sessionStorage.getItem("hasCodeRunBefore") === null) {
        sessionStorage.setItem("new", JSON.stringify(books));
        sessionStorage.setItem("hasCodeRunBefore", true);
    } else {
        books = JSON.parse(sessionStorage.getItem("new"));
        createList();
        
    };
};

// Create variables of the main sections of the page
let list = document.querySelector("#bookshelf");
let bookInfo = document.querySelector("#bookInfo");

// Function to populate the sections of the html with the list of books and their information
function createList() {
    for (i=0;i<books.length;i++) {
        //Create elements to add books to the book shelf using the book title add an on click event to call edit book
        let item = document.createElement("p");
        let book = books[i];
        item.innerHTML = books[i].title;
        list.appendChild(item);
        item.className = books[i].genre;
        item.id = "book" + (i+1);
        item.addEventListener('click', () => {
            editBook(book);
        });
        
        //Create elements to add the information to the table rows
        let newRow = document.createElement("tr");
        newRow.id = "row" + (i+1);
        for (x in book) {
            let details = document.createElement("td");
            details.innerHTML = book[x];
            newRow.appendChild(details);
        };
        //Add remove button to the end of row with on click event to call removeBook
        let remove = document.createElement("td");
        remove.innerHTML = '<button type="submit">Remove</button>';
        remove.addEventListener('click', () => {
            removeBook(book.title);
        });
        newRow.appendChild(remove);
        bookInfo.appendChild(newRow);
    };
};

// Function to create a new Object
function Book(author, title, genre, review) {
    this.author = author;
    this.title = title;
    this.genre = genre;
    this.review = review;
};

// Function to add a new book to the array
function addBook(){
    books = JSON.parse(sessionStorage.getItem("new"));
    let newBook = new Book(
        document.getElementById("author").value,
        document.getElementById("title").value,
        document.getElementById("genre").value,
        document.getElementById("review").value
    );
    books.push(newBook);
    sessionStorage.setItem("new", JSON.stringify(books));
    
    for (x in newBook) {
        console.log(newBook[x]);
    };
};


// Function to edit a books details moves all book info back to the form and changes colour, changes button from add book to update
function editBook(book){
    author = document.getElementById("author");
    title = document.getElementById("title");
    genre = document.getElementById("genre");
    review = document.getElementById("review");
    author.value = book.author;
    title.value = book.title;
    genre.value = book.genre;
    review.value = book.review;

    //Change the format of the form to make it obvious this is where you edit the book
    let form = document.querySelector(".form");
    form.className = "editForm";

    //Add a new button to update the information give the button a on click event
    let button2 = document.querySelector("#update");
    console.log(button2);
    button2.className = "appear";
    button2.addEventListener('click', () => {
        updateBook(book);
    });

};

//Function to remove book from array
function removeBook(value) {
    //Call information from session storage and change to object
    books = JSON.parse(sessionStorage.getItem("new"));
    
    for (i=0;i<books.length;i++){
        if (value === books[i].title){
        books.splice(i,1);
        console.log(books);
        location.reload();
        };
    };
    //Send new information to session storage as a string
    sessionStorage.setItem("new", JSON.stringify(books));
}

//Function to update book with changes made to form
function updateBook(book){
    for (let i=0; i<books.length;i++) {
        if (books[i] == book) {
        let updateBook = new Book(
            document.getElementById("author").value,
            document.getElementById("title").value,
            document.getElementById("genre").value,
            document.getElementById("review").value
        );
        books[i] = updateBook;
        sessionStorage.setItem("new", JSON.stringify(books));
        };
    };
};