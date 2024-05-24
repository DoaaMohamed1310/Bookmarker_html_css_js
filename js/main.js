let bookName=document.querySelector("form input#bookmark")
let bookURL=document.querySelector("form input#url")
let bookBtn=document.querySelector("form div .submit")
let editBtn=document.querySelector("form div .edit")
let bookSearch=document.querySelector(".bookmarker-content .search")
let bookTable=document.querySelector(".bookmarker table tbody")
let divStateName=document.querySelector(".bookmarker-content form #input-control-name")
let divStateURL=document.querySelector(".bookmarker-content form #input-control-url")
let bookArray=[]

if(window.localStorage.getItem("book")){
    bookArray=JSON.parse(window.localStorage.getItem("book"))
}
getItemToLocalStorge()
validation();
bookBtn.addEventListener("click",function(event) {
        if(bookName.value && bookURL.value){
            if(!divStateName.classList.contains("input-error") & !divStateURL.classList.contains("input-error")){
                arrayOfBook(bookName.value,bookURL.value);
                bookName.value=""
                bookURL.value=""
                bookName.classList.remove("box-true")
                bookURL.classList.remove("box-true")
                divStateName.classList.remove("input-true")
                divStateURL.classList.remove("input-true")
            }
        }
        event.preventDefault();
})

// add name and url in bookArray
function arrayOfBook(bookName,bookURL) {
    let books={
        id:Date.now(),
        name:bookName,
        url:bookURL,
    }
// add books to bookArray
    bookArray.push(books)
    creatElement(bookArray)
//   add to localstorage
    addItemToLocalStorge(bookArray)
}
// creat element
function creatElement(bookArray){
    bookTable.innerHTML=""
    let i=0
    bookArray.forEach(element => {
        let box=`
        <tr data-id=${element.id}>
            <td>${++i}</td>
            <td class="name">${element.name}</td>
            <td class="url"><a href="${element.url}">Visit <i class="fa-solid fa-eye"></i></a></td>
            <td><button class="update">update</button></td>
            <td><button class="delete">delete</button></td>
        </tr>`
    bookTable.innerHTML+=box
    });
}
// set books to localstorage
function addItemToLocalStorge(books) {
    let book= JSON.stringify(books)
    window.localStorage.setItem("book",book)
}
// get books from localstorge
function getItemToLocalStorge() {
    let book=window.localStorage.getItem("book")
    if(book){
        book=JSON.parse(book)
        creatElement(book)
    }
}
// edit delete 
bookTable.addEventListener("click",function(event) {
    if(event.target.classList.contains("delete")){
        event.target.parentElement.parentElement.remove()
        deleteElement(event.target.parentElement.parentElement.getAttribute("data-id"))
    }
    if(event.target.classList.contains("update")){
        updateElement(event.target.parentElement.parentElement.getAttribute("data-id"))
    }
})

function deleteElement(id) {
    bookArray=bookArray.filter(element=> element.id != id)
    addItemToLocalStorge(bookArray)
}
function updateElement(id){
    let book=bookArray.filter(element=> element.id == id)
    bookName.value=book[0].name
    bookURL.value=book[0].url
    editBtn.style.display="block"
    bookBtn.style.display="none"
    editBtn.onclick=function(event){
        event.preventDefault();
        console.log(book[0].id)
        update(book[0].id)
        editBtn.style.display="none"
        bookBtn.style.display="block"
        bookName.value=""
        bookURL.value=""
    }
}
function update(id) {
            let book=bookArray.filter(element=> element.id == id)
            book[0].name=bookName.value
            book[0].url=bookURL.value
            bookArray.forEach(element=>{
                if(element.id==book[0].id){
                    element=book
                }
            })
            console.log(book)
            creatElement(bookArray)
            addItemToLocalStorge(bookArray)
}
// search book
function searchElement(term){
    console.log(term)
    bookTable.innerHTML=''

        for (let i = 0; i < bookArray.length; i++) {
            if(bookArray[i].name.toLowerCase().includes(term.toLowerCase())){
                let box=`
                <tr data-id=${bookArray[i].id}>
                    <td>${i}</td>
                    <td class="name">${bookArray[i].name}</td>
                    <td class="url"><a href="${bookArray[i].url}">Visit <i class="fa-solid fa-eye"></i></a></td>
                    <td><button class="update">update</button></td>
                    <td><button class="delete">delete</button></td>
                </tr>`
                bookTable.innerHTML+=box
            }
        }
    
}

// validations
function validation() {
    bookName.addEventListener("keyup",function(){
        let name=bookName.value.trim()
        let regx=/[a-zA-Z]{3}/
        if(regx.test(name)){
            divStateName.className="input-true"
            bookName.className="box-true"
        }else{
            divStateName.className="input-error"
            bookName.className="box-error"
        }
    })
    bookURL.addEventListener("keyup",function(){
        let url=bookURL.value
        let regx=/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/ig;
        if(regx.test(url)){
            divStateURL.className="input-true"
            bookURL.className="box-true"
        }else{
            divStateURL.className="input-error"
            bookURL.className="box-error"
        }
    })
}
