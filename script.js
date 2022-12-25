const moviecards = document.querySelector("#moviecards");
const newmovieBtn = document.querySelector("#newmovie");
const addBtn = document.querySelector(".btn");
const deleteBtn = document.getElementsByClassName("delbtn");
const readButton = document.getElementsByClassName("readbtn");
let btnArray = [];
let readArray = [];
let myLibrary = [];

addBtn.addEventListener("click", () => {
  const titleValue = document.querySelector("#title").value;
  const rateValue = document.querySelector("#rate").value;
  const lengtheValue = document.querySelector("#length").value;
  const watchedValue = document.querySelector(
    'input[name="watched"]:checked'
  ).value;
  addmovieToLibrary(
    createNewmovie(titleValue, rateValue, lengtheValue, watchedValue)
  );

  document.querySelector(".form-container").reset();
  closeForm();
});
newmovieBtn.addEventListener("click", () => {
  openForm();
});

function createNewmovie(movieTitle, movierate, movielength, movieRaed) {
  newmovie = new Movie(movieTitle, movierate, movielength, movieRaed);
  myLibrary[myLibrary.length] = newmovie;
  return myLibrary;
}

function addmovieToLibrary(libraray) {
  const delBtn = document.createElement("button");
  const readBtn = document.createElement("button");
  const div = document.createElement("div");
  const titleh3 = document.createElement("h3");
  const ratep = document.createElement("p");
  const lengthp = document.createElement("p");
  const watchedp = document.createElement("p");

  const title = libraray[libraray.length - 1].title;
  titleh3.textContent = title;
  titleh3.classList.add("title");
  div.appendChild(titleh3);

  const rate = libraray[libraray.length - 1].rate;
  ratep.textContent = `Rate: ${rate}`;
  ratep.classList.add("rate");
  div.appendChild(ratep);

  const length = libraray[libraray.length - 1].length;
  lengthp.textContent = `Length: ${length}`;
  lengthp.classList.add("length");
  div.appendChild(lengthp);

  const watched = libraray[libraray.length - 1].watched;
  watchedp.textContent = `Watched: ${watched}`;
  watchedp.classList.add("watched");
  watchedp.classList.add(`num${libraray.length - 1}`);
  div.appendChild(watchedp);

  readBtn.setAttribute("data", libraray.length - 1);
  readBtn.setAttribute("type", "button");
  readBtn.innerHTML = "Watched";
  readBtn.classList.add("readbtn");
  readBtn.classList.add("w3-button");
  readBtn.classList.add("w3-border");
  readBtn.classList.add("w3-border-red");
  readBtn.classList.add("w3-round-large");
  div.appendChild(readBtn);
  readArray.push(readBtn);

  delBtn.setAttribute("data", libraray.length - 1);
  delBtn.setAttribute("type", "button");
  delBtn.innerHTML = "Remove";
  delBtn.classList.add("delbtn");
  delBtn.classList.add("w3-button");
  delBtn.classList.add("w3-border");
  delBtn.classList.add("w3-border-red");
  delBtn.classList.add("w3-round-large");
  div.appendChild(delBtn);
  btnArray.push(delBtn);

  div.classList.add("card");
  div.classList.add(`num${libraray.length - 1}`);

  randomColor(div);
  div.setAttribute("data", libraray.length - 1);
  moviecards.appendChild(div);

  for (let i = 0; i < btnArray.length; i++) {
    btnArray[i].addEventListener("click", () => {
      const btndata = btnArray[i].getAttribute("data");
      document.querySelector(`.card.num${btndata}`).remove();
      delete myLibrary[btndata];
    });
  }
  
  for (btn of readArray) {
    btn.addEventListener("click", () => {      
      readStatus(btn);      
    } );
  }

  function readStatus(readArray) {
    const readdata = readArray.getAttribute("data");
    let currentRead = document.querySelector(`.watched.num${readdata}`);

    if (currentRead.textContent === "Watched: No") {
      currentRead.textContent = "Watched: Yes";
      console.log("YES")
    } else {
      currentRead.textContent = "Watched: No";
      console.log("no")
    }
  }
}

function randomColor(div) {
  const colors = [
    "#08ACC2",
    "#F300FF",
    "#ADD624",
    "#C40000",
    "#AAB7B8",
    "#239B56",
  ];
  div.style.background = colors[Math.floor(Math.random() * colors.length)];
}

class Movie{
  constructor(title, rate,length, watched){
    this.title = title;
    this.rate = rate;
    this.length = length;
    this.watched = watched;
  }
}

// function Movie(title, rate, length, watched) {
//   this.title = title;
//   this.rate = rate;
//   this.length = length;
//   this.watched = watched;
// }

function openForm() {
  document.querySelector(".form-popup").style.display = "block";
}

function closeForm() {
  document.querySelector(".form-popup").style.display = "none";
}
