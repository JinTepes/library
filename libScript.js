console.log("Atheneum Script Initialized!");
//
const bksCon = document.querySelector('.bksSubContainer');
let checkboxes = document.querySelectorAll('.readCheckBx');
const logTotalBooks = document.querySelector('#label_Totalbooks');
const logBooksRead = document.querySelector('#label_BooksRead');
const logBooksUnread = document.querySelector('#label_BooksUnread');
//
let Athens = []; //this array will store all the books added.
//
//listeners
document.querySelector('#closeBTN').addEventListener(
    'click', function(){
        document.querySelector('.modalContainer').style = "display: none;"
    }
);

document.querySelector('#BTNaddbook').addEventListener(
    'click', function(){
        document.querySelector('.modalContainer').style = "display: flex;"
        document.querySelector('#inputPages').value=""
        document.querySelector('#inputTitle').value=""
        document.querySelector('#inputAuthor').value=""
        document.querySelector('#readStats').checked=false

    }
);

document.querySelector('#inputSubmitBTN').addEventListener(
    'click', function(){
        valSubmit()
    }
);
//

//constructor
function mkBook(title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}
//----------------------------------------------------//
//Card Making
function addCard(title, author, pages, read){
    let crdContainer = document.createElement('div');
    crdContainer.className = 'cardContainer grcItem';
    bksCon.appendChild(crdContainer);
    //adding delete button on card
    let xdiv = document.createElement('div');
    xdiv.className = "cardCloseBTN";
    xdiv.style = "display: flex; justify-content: right;";
    let xBtn = document.createElement('h4');
    xBtn.style = "rotate: 45deg;"
    xBtn.innerHTML="+";
    xBtn.className="delCardBTN";
    xBtn.id=title.toString();
    xdiv.appendChild(xBtn);
    crdContainer.appendChild(xdiv);
    //adding event listener to the button
    xBtn.addEventListener(
        'click', function(){
            deleteCard(this.id)
        }
    );
    //adding info to the card
    let cardInfo = document.createElement('h4');
    cardInfo.innerHTML = "Title: "+title+"<br>"+"Author: "+author+"<br>"+"Pages: "+pages;
    crdContainer.appendChild(cardInfo);
    //adding a checkbox div
    let checkDiv = document.createElement('div');
    checkDiv.style="paddmodalContainering-top: 20px;display: flex; justify-content: center;";
    crdContainer.appendChild(checkDiv);
    //adding the checkbox
    let checkBX = document.createElement('input');
    checkBX.setAttribute("type","checkbox");
    checkBX.className = "readCheckBx";
    checkDiv.appendChild(checkBX);
    //adding checkbox changed listener
    checkBX.addEventListener(
        'change', function(){
            updateLog();
        }
    );

    if(read === false){
        checkBX.checked = false;
    }
    else{
        checkBX.checked = true;
    }
    //
}

//log modifier
function updateLog(){
    //updating total books
    checkboxes = document.querySelectorAll('.readCheckBx'); //getting all the checkboxes
    logTotalBooks.innerHTML = "Total Books: " + checkboxes.length.toString();
    //Updating read and unread
    let chkd = 0 , unchkd = 0;
    for(let i=0; i < checkboxes.length; i++){
        if(checkboxes[i].checked === true){
            chkd += 1;
        }
        else{
            unchkd += 1;
        }
    }
    logBooksRead.innerHTML = "Books Read: "+chkd.toString();
    logBooksUnread.innerHTML = "Books Unread: "+unchkd.toString();
}

//submit button book adding and validation
function valSubmit(){
    let pages = document.querySelector('#inputPages');
    let bookTitle = document.querySelector('#inputTitle');
    let bookAuthor = document.querySelector('#inputAuthor');
    let readStats = document.querySelector('#readStats');

    if(isNaN(pages.value)===true || bookTitle.value==="" || bookAuthor.value===""){
        alert("Invalid Input!"); pages.value="";
        return;
    }
    else{
        //adding the book to the array
        let bookNFO = new mkBook(bookTitle.value.toString(),
        bookAuthor.value.toString(),
        pages.value.toString(),
        readStats.checked,
        );
        Athens.push(bookNFO)
        //turning the array to cards
        arytoCards();
        //closing the submit form
        document.querySelector('.modalContainer').style = "display: none;"
    }
}

//turning the array into cards
function arytoCards(){
    bksCon.innerHTML="";
    for(let i=0; i<Athens.length; i++){
        addCard(
            Athens[i].title,
            Athens[i].author,
            Athens[i].pages,
            Athens[i].status
        );
    }
    updateLog();
}

//deleting a card
function deleteCard(cardID){
    let index = Athens.findIndex(
        function(book, index){
            return book.title === cardID.toString()
        }
    );
    Athens.splice(index,1);
    arytoCards();
}
//-------------------------------------//