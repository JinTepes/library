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
//constructor
function mkBook(title, author, pages){
    this.title = title;
    this.author = author;
    this.pages = pages;
}

//Card Making
function addCard(title, author, pages, read){
    let crdContainer = document.createElement('div');
    crdContainer.className = 'cardContainer grcItem';
    bksCon.appendChild(crdContainer);
    //adding info to the card
    let cardInfo = document.createElement('h4');
    cardInfo.innerHTML = "Title: "+title+"<br>"+"Author: "+author+"<br>"+"Pages: "+pages;
    crdContainer.appendChild(cardInfo);
    //adding a checkbox div
    let checkDiv = document.createElement('div');
    checkDiv.style="padding-top: 20px;display: flex; justify-content: center;";
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

//testing
let bookNFO = new mkBook("The Alchemist", "Paulo Coelho", "197");
Athens.push(bookNFO)

addCard(Athens[0].title,Athens[0].author,Athens[0].pages,true);

updateLog();

/*
let cCard = document.createElement('div');
cCard.className = 'cardContainer grcItem'
bksCon.appendChild(cCard);
let cNFO = document.createElement('h4');
cNFO.innerHTML = "Title: <br>Author: <br>Pages: ";
cCard.appendChild(cNFO)
*/

//-------------------------------------//