document.addEventListener("DOMContentLoaded",creatorFunc)

 function creatorFunc(){

}

let btn = document.querySelector(".firstBtn");
let form = document.querySelector(".mainForm")
let titleInput = document.querySelector("#title")
let authorInput = document.querySelector("#author")
let pagesInput = document.querySelector("#pages")
let addBtn = document.querySelector(".secbtn");
let showDiv = document.querySelector(".libraryShow");
let myLibrary = [];
let counter = 0;
let radioYes = document.querySelector("#yes");
let radioNo = document.querySelector("#no");
let mainField = document.querySelector(".mainfield");
let mainP = document.querySelector(".main-p")

function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.ReadToggle = function(){
  let c = myLibrary[myLibrary.indexOf(this)]
  console.log(c);
  let radioDiv = document.createElement("div");
  let radioOne = document.createElement("input");
  let radioTwo = document.createElement("input");
  radioDiv.classList.add("radioDiv")
  radioOne.setAttribute("id", "Read")
  radioTwo.setAttribute("id", "Not Read")
  [radioOne,radioTwo].forEach((item, index) =>{
    let label = document.createElement("label");
    item.setAttribute("type", "radio")
    item.setAttribute("name", "read")
    if (index === 0){
      label.setAttribute("for", "Read");
      label.innerText = Read;
      radioDiv.appendChild(label)
    } else{
      label.setAttribute("for", "Not Read")
      label.innerText = "Not Read"
    }
    radioDiv.append(item)
  })
}

// function that allows us to change the values of names.
function changeItemVals(e){
let element = e.target.parentElement.getAttribute("data-id");
let parent = e.target.parentElement;
 let item = myLibrary[element];
 form.classList.add("display");
 mainField.classList.add("dnone");
 mainP.classList.add("dnone")
 if (element){
      counter = 1;
      // functions invoked for ev listeners.
      // title ev
      function ev(e){
       item.title = e.target.value;
       parent.children[0].innerText = e.target.value;
      }
      // author ev
      function aEv(e){
      item.author = e.target.value;
      parent.children[1].innerText = e.target.value;
      }
      // pages ev
      function pEv(e){
        item.pages = e.target.value;
        parent.children[2].innerText = e.target.value;
      }
      // adding ev listeners
      titleInput.addEventListener("input", ev);
      authorInput.addEventListener("input", aEv);
      pagesInput.addEventListener("input", pEv);

      // remove ev listeners
      let remove =()=>{
        titleInput.removeEventListener("input", ev);
       } 
       let authorRemove =()=>{
         authorInput.removeEventListener("input",aEv);
       }
       let pagesRemove = ()=>{
         pagesInput.removeEventListener("input", pEv)
       }
        
      //  passing ev listeners as arguments for btn function.
       btnFunc(item,remove,authorRemove,pagesRemove);
      }
 
}

// this is a function for the edit btn.
function edits(edit){
  edit.classList.add("cardbtn")
  edit.addEventListener("click", function change(e,edit){
    changeItemVals(e,edit);
  });
}

// function that creates and appends the card and its items to the display div
const cardAppender = (item)=>{
    let card = document.createElement("div");
    card.classList.add("card")
    card.setAttribute("data-id", myLibrary.indexOf(item))
    card.classList.add("added")
    let h2 = document.createElement("h1");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    h2.innerText = item.title;
    p1.innerText = item.author;
    p2.innerText = item.pages;
    p3.innerText= item.read;
    let appender = (...items)=>{
        items.forEach(item=> card.appendChild(item))
    }
    appender(h2,p1,p2,p3)
    let edit = document.createElement("button");
    edit.innerText= "Edit";
    // func takes the btn as a parameter so that the it can add ev listeners {it is located above}.
    edits(edit);
    card.appendChild(edit)
    // delete btn 
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delbtn")
    deleteBtn.innerText = "x";
    deleteBtn.addEventListener("click", (e)=>{
      alert("are you sure?")
      let comment = prompt("yes/no");
      if (comment === "yes"){
        let id = e.target.parentElement.getAttribute("data-id");
        myLibrary.splice(id,1)
         e.target.parentElement.remove();
      }
    })
    card.appendChild(deleteBtn)
    showDiv.appendChild(card)
    

}

// checks if book is read or not 
let readChecker;
radioYes.addEventListener("click", ()=>{
  readChecker = true
})
radioNo.addEventListener("click", ()=>{
   readChecker = false
})

// makes the values what we input initially.
let BookAdder= (item)=>{
  item.title = titleInput.value;
  item.author = authorInput.value;
  item.pages = Number(pagesInput.value);
  if (!readChecker){
    item.read = "Not read"
  } else {
    item.read = "Read"
  }
}

// add items function btn. Takes parameters of other functions{ev listeners} that need to be removed at a certain point.
const btnFunc = (item,remove,authorRemove,pagesRemove)=>{
  addBtn.addEventListener("click", (e)=>{
    e.stopImmediatePropagation();
    e.stopPropagation();
    if(counter === 0){
      BookAdder(item);
      if (item.title.length > 0 && item.author.length > 0 && counter === 0){
        myLibrary.push(item);
        cardAppender(item);
      }
     }else if(counter === 1){
       BookAdder(item);
       titleInput.value ="";
       authorInput.value ="";
       pagesInput.value="";
       remove();
       authorRemove();
       pagesRemove();
    }
     form.classList.remove("display")
  },{once:true})
}
// Function that adds bk to library and shows the form. 
function addBookToLibrary(e){
  e.stopImmediatePropagation();
  e.stopPropagation();
    titleInput.value = "";
    authorInput.value="";
    pagesInput.value="";
     form.classList.add("display");
     let item = new Book();
     counter = 0;
     btnFunc(item);
}

btn.addEventListener("click", addBookToLibrary)  