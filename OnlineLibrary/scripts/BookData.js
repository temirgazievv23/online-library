function Book(Title, Author, Category,imgSrc, Date) {
    this.Title = Title;
    this.Author = Author;
    this.imgSrc = imgSrc;
    this.Date = Date;
    this.Category = Category;

    this.getTitle = function() {
        return this.Title;
    }

    this.getAuthor = function() {
        return this.Author;
    }

    this.getImgSrc = function() {
        return this.imgSrc;
    }
    
    this.getDate = function() {
        return this.Date;
    }

    this.getCategory = function(){
        return this.getCategory();
    }

    this.setTitle = function(title) {
         this.Title = title;
    }

    this.setAuthor = function(Author) {
         this.Author = Author;
    }

    this.setImgSrc = function(imgSrc) {
        this.imgSrc = imgSrc;
    }
    
    this.setDate = function(Date) {
        this.Date = Date;
    }
    this.setCategory = function(category){
       this.category = category;
    }
}

function getBookLength(arr){
    return arr.length;
}

function getBook(arr,i) {
    if (i => 0 && i < arr.length){
        return arr[i];
    }
}

function createCarousel(arr,k) {
    Carousel = document.getElementById("CarouselBooks"+k);
    var i;
    for (i=0;i< arr.length;i++){

        let bookDetailsAnchor = document.createElement('a');
        bookDetailsAnchor.setAttribute("href", "Components/bookDetails.html?book=" + arr[i].Title);
        
        
        let CarouselItem = document.createElement('div');
        let CarouselImage = document.createElement('img');
        let CarouselInnerBlock = document.createElement('div');
        let BookTitle = document.createElement('h5');
        let BookAuthor = document.createElement('p');
        let Book = getBook(arr,i);

        BookTitle.style.cssText = "-webkit-text-stroke-width: 0.25px; -webkit-text-stroke-color: black;"
        BookAuthor.style.cssText = "-webkit-text-stroke-width: 0.25px; -webkit-text-stroke-color: black;"
        BookTitle.innerText = Book.Title;
        BookAuthor.innerText = "by " + Book.Author;
        CarouselInnerBlock.append(BookTitle);
        CarouselInnerBlock.append(BookAuthor);
        CarouselInnerBlock.classList.add("carousel-caption");
        CarouselInnerBlock.classList.add("d-none","d-md-block","carousel-caption");
        CarouselItem.append(CarouselInnerBlock);
        
        bookDetailsAnchor.appendChild(CarouselImage)
        CarouselImage.classList.add("d-block","w-100");
        CarouselImage.src = Book.imgSrc;
        CarouselImage.alt = Book.Title;
        CarouselItem.append(bookDetailsAnchor);
       

        if (i == 0){
            CarouselItem.classList.add("carousel-item","active")
        }
        else{
            CarouselItem.classList.add("carousel-item")
        }
        Carousel.append(CarouselItem);
    }
}

function loadBooks(){
    var ALLBooks = JSON.parse(localStorage.getItem("ALLBooks"))

    var commonBooks = []
    var educationalBooks = []
    var newBooks = []
    for(let i = 0; i < ALLBooks.length; i++){
        if (ALLBooks[i].Category === "Common"){
            commonBooks.push(ALLBooks[i]);
        }else if (ALLBooks[i].Category === "New"){
            newBooks.push(ALLBooks[i]);

        }else if (ALLBooks[i].Category === "Educational"){
            educationalBooks.push(ALLBooks[i]);

        }
    }
    createCarousel(commonBooks,1)
    createCarousel(newBooks,2)
    createCarousel(educationalBooks,3)
}

function add_book(){
    let AllBooks = JSON.parse(localStorage.getItem("ALLBooks"))

    let title = document.getElementById('book-title').value
    for(var i = 0 ; i < AllBooks.length; i++){
        if (title === AllBooks[i].Title){
            document.getElementById('CheckBook').style.color = 'red';
            document.getElementById('CheckBook').innerHTML = 'A book with this title already exists';
            return false;
        }
    }

    let author = document.getElementById('book-author').value
    let date = new Date()
    date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    let imgSrc = document.getElementById('cover-link').value
    let category = document.getElementById('book-category').value
    let book = {Title:title, Author:author, Date:date, imgSrc:imgSrc, Category:category}

    AllBooks.push(book)
    localStorage.setItem("ALLBooks", JSON.stringify(AllBooks));

    return true;
}


function remove_book(){
    let bookTitle = decodeURI(location.href.split("=")[1]);
    let AllBooks = JSON.parse(localStorage.getItem("ALLBooks"));
    for (let i = 0; i < AllBooks.length; i++){
        if (AllBooks[i].Title === bookTitle){
            AllBooks.splice(i, 1);
            localStorage.setItem("ALLBooks", JSON.stringify(AllBooks));
            break;
        }
    } 
    window.location.assign('../index.html')
}

function displayBookDetails(){
    bookTitle = decodeURI(location.href.split("=")[1]);
    let AllBooks = JSON.parse(localStorage.getItem("ALLBooks"));
    var selectedBook = null;
    for (const book of AllBooks){
        if (bookTitle == book.Title){
            selectedBook = book;
            break;
        }
    } 
    if (selectedBook == null) {alert("NO BOOK CHOSEN"); return;}
    document.getElementById("cardBookCover").setAttribute("src",  (selectedBook.imgSrc.startsWith("media/")?
     ("../" + selectedBook.imgSrc) : selectedBook.imgSrc))
    document.getElementById("cardBookTitle").innerText = " " + selectedBook.Title;
    document.getElementById("cardBookAuthor").innerText = "Author: " + selectedBook.Author;
    document.getElementById("cardPublishDate").innerText = "Publish Date: " + selectedBook.Date;
    
    //check if an account is logged in and if its role is admin
    if (JSON.parse(localStorage.getItem('LoggedIn')) === "True" && 
        JSON.parse(localStorage.getItem('AccLoggedIn')).role === "Admin"){
        let removeButton = document.createElement("button");
        removeButton.innerText = "Remove Book";
        removeButton.setAttribute("class", "btn btn-outline-danger");
        removeButton.setAttribute("onclick", "remove_book()");
        document.getElementsByClassName("cardBody")[0].appendChild(removeButton);
    }
}


function generateCardsForAllBooks(){
    //get div with id cardsDiv
    let cardsDiv = document.getElementById("cardsDiv");
    //get all books from local storage
    let AllBooks = JSON.parse(localStorage.getItem("ALLBooks"));
    //loop through all books
    for (const book of AllBooks){
        cardsDiv.innerHTML += `
        <div class="card" style="width:16em; height: 35em; margin-top:10px;margin-bottom: 10px;">
        <a href="../Components/bookDetails.html?book=${book.Title}">
        <img id="cardBookCover" style="width=10em;height:20em" class="card-img-top" alt="Card image cap" src="${(book.imgSrc.startsWith("media/")? ("../" + book.imgSrc) : book.imgSrc)}">
        </a>
        <div class="card-body">
            <div style="height:6em;">
                <h5 id="cardBookTitle" style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; line-clamp: 3; -webkit-box-orient: vertical;" class="card-title">${book.Title}</h5>
            </div>
            <div style="height:5em;">
                <h6 id="cardBookAuthor" style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; line-clamp: 3; -webkit-box-orient: vertical;" class="card-subtitle mb-2 text-muted">Author: ${book.Author}</h6>
            </div>
            <p id="cardPublishDate" style="height:4em" class="card-text">Publish Date: ${book.Date}</p>
            <br>
        </div>
      </div>
      `
      
    }
}

function createCarouselOfSearch(arr) {
    let display_div = document.getElementById('display-div')

    display_div.innerHTML = `  <h1 style="text-align: center; margin: 1% 0% 1% 0%; color: white">Search Results</h1>
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner" id="CarouselBooks"></div>
      <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>`

    let Carousel = document.getElementById("CarouselBooks");
    var i;
    for (i=0;i<arr.length;i++){

        let bookDetailsAnchor = document.createElement('a');
        bookDetailsAnchor.setAttribute("href", "bookDetails.html?book=" + arr[i].Title);
        let CarouselItem = document.createElement('div');
        let CarouselImage = document.createElement('img');
        let CarouselInnerBlock = document.createElement('div');
        let BookTitle = document.createElement('h5');
        let BookAuthor = document.createElement('p');
        let Book = arr[i];

        BookTitle.style.cssText = "-webkit-text-stroke-width: 0.25px; -webkit-text-stroke-color: black;"
        BookAuthor.style.cssText = "-webkit-text-stroke-width: 0.25px; -webkit-text-stroke-color: black;"
        BookTitle.innerText = Book.Title;
        BookAuthor.innerText = "by " + Book.Author;
        CarouselInnerBlock.append(BookTitle);
        CarouselInnerBlock.append(BookAuthor);
        CarouselInnerBlock.classList.add("carousel-caption","d-none","d-md-block");
        bookDetailsAnchor.appendChild(CarouselImage)

        CarouselImage.classList.add("d-block","w-100");
        CarouselImage.classList.add("d-block","w-100");
        CarouselImage.src = (Book.imgSrc.startsWith("media/")? ("../" + Book.imgSrc) : Book.imgSrc);
        
        CarouselImage.alt = Book.Title;
        // CarouselItem.append(CarouselImage);
        CarouselItem.append(bookDetailsAnchor);
        CarouselItem.append(CarouselInnerBlock);

        if (i == 0){
            CarouselItem.classList.add("carousel-item","active")
        }
        else{
            CarouselItem.classList.add("carousel-item")
        }
        Carousel.append(CarouselItem);
    }
}

function browseSearchResults(){
    let search_results = JSON.parse(sessionStorage.getItem(window.location.href.split("=")[1]));
    if (search_results.length != 0){
        createCarouselOfSearch(search_results);
    }
    else{
        let display_div = document.getElementById('display-div');
        display_div.style.height = "100%";
        display_div.innerHTML = '<h1 style="vertical-align:middle;text-align:center; color:white; margin-top:20%;">No Results Found</h1>';
    }
}

if (localStorage.getItem("ALLBooks") === null)
{
    var ALLBooks = [
        new Book("The Lord Of The Rings, The Fellowship of The Ring","J.R.R. Tolkein","Common","media/LORD OF THE RINGS - PART 1.png","29/07/1954"),
        new Book("The Lord Of The Rings, The Two Towers","J.R.R. Tolkein","Common","media/LORD OF THE RINGS - PART 2.png","11/11/1954"),
        new Book("The Lord Of The Rings, The Return of The King","J.R.R. Tolkein","Common","media/LORD OF THE RINGS - PART 3.jpg","20/10/1955"),
        new Book("HARRY POTTER and the PHILOSPHER'S STONE","J.K. ROWLING", "Common","media/Harry Potter and the Philsopher's Stone.jpg","26/06/1997"),
        new Book("HARRY POTTER and the CHAMBER of SECRETS","J.K. ROWLING", "Common", "media/Harry Potter and the Chamber of Secrets.jpg","02/07/1998"),
        new Book("HARRY POTTER and the PRISONER of AZAKBAN","J.K. ROWLING", "Common","media/Harry Potter and the Prisoner of Azakaban.jpg","08/07/1999"),
        new Book("University Physics Volume 3","Samuel J. Ling","Educational","media/University Physics Vol3.png","29/09/2016"),
        new Book("Python Object-Oriented Programming: Build robust and maintainable object-oriented Python applications and libraries, 4th Edition","Dusty PhillipsI","Educational","media/Python OOP.png","29/06/2021"),
        new Book("MANGA IN THEORY AND PRACTICE THE CRAFT OF CREATING MANGA","HIROHIKO ARAKI","Common","media/MANGA IN THEORY AND PRACTICE.png","13/06/2017"),
        new Book("DEEP LEARNING","Ian Goodfellow, Yousha Bengio, and Aaron Courville","Educational","media/Deep Learning by Ian ,Yousha,& Aaron.jpg","18/07/2017"),
        new Book("DEEP LEARNING with Python","Francois Chollet", "Educational", "media/DEEP LEARNING with Python.jpg","01/11/2017"), 
        new Book("The Power of One More: The Ultimate Guide to Happiness and Success", "Ed Mylett", "Common","media/The Power of One more.jpg","01/11/2017"),
        new Book("JavaScript: The Definitive Guide: Master the World's Most-Used Programming Language", "David Flanagan", "Educational", "media/JavaScript - The Definitive Guide.png","01/11/2017"),  
        new Book("Educated", "Tara Westover", "Educational", "media/Educated.jpg","18/02/2018"),
        new Book("Restart", "Gordon Korman", "Common", "media/Restart.jpg","27/03/2018"),
        new Book("React Cookbook: Recipes for Mastering the React Framework 1st Edition","Dawn Griffiths","Educational","media/React Cookbook.png","01/05/2018"),
        new Book("Angular Development with TypeScript 2nd Edition"," Yakov Fain","Educational","media/Angular Development with TypeScript.png","01/12/2018"),
        new Book("Essential Cell Biology / Edition 5","by Bruce Alberts, Karen Hopkin, Alexander Johnson, David Morgan, Martin Raff","Educational","media/ESSENTIAL CELL BIOLOGY.png","07/01/2019"),
        new Book("Zachary Ying and the Dragon Emperor", "Xiran Jay Zhao", "New", "media/Zachary Ying and the Dragon Emperor.png","10/05/2022"),
        new Book("DEEP LEARNING COOKBOOK","Douwe Osinga", "Educational", "media/Deep Learning Cookbook.png","01/06/2018"),
        new Book("Vue.js 3 Cookbook: Discover actionable solutions for building modern web apps with the latest Vue features and TypeScript","Heitor Ramon Ribeiro","Educational","media/Vue js3 Cookbook.png","18/09/2020"),
        new Book("The Escape Artist","Jonathan Freedland", "New", "media/The Escape Artist.jpg","09/06/2022"),            
        new Book("HOW TO RAISE AN ANTIRACIST","IBRAM X. KENDI", "New", "media/HOW TO RAISE AN ANTIRACIST.jpg","14/06/2022"),
        new Book("Building a Second Brain","TIAGO FORTE", "New", "media/Building a Second Brain.jpg","14/06/2022"),
        new Book("Battle for the American Mind: Uprooting a Century of Miseducation", "David Goodwin", "New", "media/Battle for the American Mind.png","14/05/2022"), 
    ]

    localStorage.setItem("ALLBooks", JSON.stringify(ALLBooks))
}