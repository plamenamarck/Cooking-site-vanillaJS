(function(){

let recipies = data;
let ingredientsArr = [];
for(let i = 0; i< recipies.length; i++){
    recipies[i].isLiked = false;
    recipies[i].cookedCounter = 0;
    let ingredArr = recipies[i].ingredients.split(",");
    for(let j = 0; j <ingredArr.length; j++){
        let ingredient = ingredArr[j].trim();
        if(!ingredientsArr.includes(ingredient)){
            ingredientsArr.push(ingredient);
        }
    }
}

let navbarLis = document.getElementById("parentOfLi").getElementsByTagName("li");
function colorNav(arr, index){
    for(let i = 0; i < arr.length; i++){
        if(i == index){
            arr[i].classList.add("active");
        }else{
            arr[i].classList.remove("active");
        }
    }
}

// bl FOR my Profile
let admin = new Person ("Plami", "Sofia", 28, "./assets/images/guestNone.png")

let userPi = document.getElementById("userImg");
userPi.src = admin.picture;
let profileName = document.getElementById("nameProfile");
profileName.value = admin.name;
let profileAdress = document.getElementById("adresForm");
profileAdress.value = admin.adress;
let profileAge = document.getElementById("ageForm");
profileAge.value = admin.age;
let profilePicture = document.getElementById("imgProfile");
profilePicture.value = admin.picture;
let onCreateProfile = document.getElementById("SubmitProfile");
onCreateProfile.addEventListener("submit", function(event){
    event.preventDefault();
    if(profileName.value.trim() !== "" &&
    profileAdress.value.trim() !== "" &&
    profileAge.value.trim() !== "" &&
    profilePicture.value.trim() !== ""
    ){
        admin.name = profileName.value;
        admin.adress = profileAdress.value;
        admin.age = profileAge.value;
        admin.picture = profilePicture.value;
        userPi.src = admin.picture;
        console.log(admin);
    }
});


function printProfilePage(){
    tablicaRec.innerHTML = "";
    for(let i = 0; i < recipies.length; i++){
        let sgotveni = recipies[i];
        if(sgotveni.cookedCounter > 0){
            let div = document.createElement("div");
            div.classList.add("cookedTable")
            let name = document.createElement("h2");
            name.innerText = sgotveni.title;
            let coockedTimes = document.createElement("div");
            coockedTimes.innerText = ` - Sgotvena e ${sgotveni.cookedCounter} puti`;
            div.appendChild(name);
            div.appendChild(coockedTimes);
            tablicaRec.appendChild(div);
        }
    }      
}

//

let homePage = document.getElementById("recipiesP");
let favRecipies = document.getElementById("favP");
let makeRecipies = document.getElementById("makeP");
let myProfile = document.getElementById("profileP");
let errorPage = document.getElementById("errorP");
let myForm = document.getElementById("formOfSubmit");
myForm.addEventListener("submit", function(event){
    event.preventDefault();
    printMakeRecPage();
    addNewRecip();
})
let likedArr = admin.likedRecipArr;
let nameInput = document.getElementById("nameForm");
let sustavkiInput = document.getElementById("sustavkiForm");
let linkInput = document.getElementById("linkForm");
let imgInput = document.getElementById("imgForm");
let buttonInput = document.getElementById("buttonForm")
nameInput.addEventListener("keyup", function(){
    if(isValid()){
        buttonInput.disabled = false;
    }else{
        buttonInput.disabled = true;
    }
})

let tablicaRec = document.getElementById("tablicaRecepti");


// BL for the search boxes
let searchPage = document.getElementById("search");

let searchByName = document.getElementById("searchName");
searchByName.addEventListener("keyup", function(event){
    let currArray = recipies;
    let textName = event.target.value.toLowerCase();
    let filterArray = recipies.filter((recipie) => recipie.title.toLowerCase().indexOf(textName) !== -1);
    recipies = filterArray;
    printHomePage();
    recipies = currArray;
});

let searchByIngr = document.getElementById("searchIngr")
let fieldIgr = document.createElement("select");

for(let op = 0; op< ingredientsArr.length; op++){
    let options = document.createElement("option");
    options.innerHTML = ingredientsArr[op];
    options.value = ingredientsArr[op];
    fieldIgr.appendChild(options);
}
searchByIngr.appendChild(fieldIgr);

searchByIngr.addEventListener("change",function(event){
    let currIngrArr = recipies;
    let ingrSelected = event.target.value;
    let filtIngrArr = recipies.filter((recipie) => recipie.ingredients.includes(ingrSelected));
    recipies = filtIngrArr;
    printHomePage();
    recipies = currIngrArr;
})


// BL for the home page with all recipies
function printHomePage(){
    homePage.innerHTML = "";
    for(let i = 0; i< recipies.length; i++){
        let rexipiesCartichka = recipies[i];
        let div = document.createElement("div");
        div.classList.add("kartichkaContainer");
        let img = document.createElement("img");
        img.src = rexipiesCartichka.thumbnail
        img.addEventListener("click", function(){
            window.location.href = rexipiesCartichka.href
        });
        let name = document.createElement("h3");
        name.innerText = rexipiesCartichka.title;
        let info = document.createElement("div");
        info.innerText = rexipiesCartichka.ingredients;
        let favButton = document.createElement("button");
        favButton.classList.add("buttonFavLeft")
        if(rexipiesCartichka.isLiked){
            favButton.addEventListener("click", function(){
                removeFromLiked(rexipiesCartichka);
            });
            favButton.innerText = "Mahni ot lybimi";
            favButton.style.backgroundColor = "red"
        }else{
            favButton.addEventListener("click", function(){
                addToLiked(rexipiesCartichka);
            });
            favButton.innerText = "Dobavi v lybimi";
        }
        let cookButton = document.createElement("button");
        cookButton.classList.add("buttonCookRight")
        cookButton.addEventListener("click", function(){
            countCooks(rexipiesCartichka);
        })
        cookButton.innerText = "Sgotvi";
        
        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(info);
        div.appendChild(favButton);
        div.appendChild(cookButton);
        homePage.appendChild(div);
    } 
}

function removeFromLiked(recip){
    recip.isLiked = !recip.isLiked;
    likedArr.splice(likedArr.indexOf(recip),1);
    printHomePage();
    printFavPage();
}
function addToLiked(recip){
    recip.isLiked = !recip.isLiked;
    if(likedArr.indexOf(recip) === -1){
        likedArr.push(recip);
    }
    printHomePage();
}
function countCooks(recipi){
    recipi.cookedCounter++;
}

// BL for the Lybimi Page

function printFavPage(){
    favRecipies.innerHTML = "";
    for(let i = 0; i <likedArr.length; i++){
        let addedLiked = likedArr[i];
        let div = document.createElement("div");
        div.classList.add("kartichkaContainer");
        let img = document.createElement("img");
        img.src = addedLiked.thumbnail
        img.addEventListener("click", function(){
            window.location.href = rexipiesCartichka.href
        });
        let name = document.createElement("h3");
        name.innerText = addedLiked.title;
        let info = document.createElement("div");
        info.innerText = addedLiked.ingredients;
        let favButton = document.createElement("button");
        favButton.classList.add("buttonFavLeft")
        favButton.addEventListener("click", function(){
            removeFromLiked(addedLiked);
        });
        favButton.innerText = "Mahni ot lybimi";
        let cookButton = document.createElement("button");
        cookButton.classList.add("buttonCookRight")
        cookButton.addEventListener("click", function(){
            countCooks(addedLiked);
        })
        cookButton.innerText = "Sgotvi";
        
        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(info);
        div.appendChild(favButton);
        div.appendChild(cookButton);
        favRecipies.appendChild(div);
    } 
}


// bL for the Make recipie

function printMakeRecPage(){

    if(!isValid()){
        nameInput.value= "";
        sustavkiInput.value = "";
        linkInput.value = "";
        imgInput.value = "";
    }
}  


function addNewRecip(){
    if(isValid()){
            let newRecipie = new Recipies(
                nameInput.value,
                linkInput.value,
                sustavkiInput.value,
                imgInput.value
            );
            recipies.unshift(newRecipie);
                nameInput.value= "";
                sustavkiInput.value = "";
                linkInput.value = "";
                imgInput.value = "";
    }
}

function isValid(){
    return (nameInput.value.trim() !== "" &&
    sustavkiInput.value.trim() !== "" &&
    linkInput.value.trim() !== "" &&
    imgInput.value.trim() !== "")
}


// BL for error page
function printErrorPage(){
    let suobshtenie = document.createElement("h1");
    suobshtenie.innerText = "This is 404 page not found, select from buttons"
    errorPage.appendChild(suobshtenie);
}


// BL for the hash change
function hashChange() {
  let hash = location.hash.slice(1);
    switch (hash) {
        case "allRecipiesPage":
            searchPage.style.display = "block"
          homePage.style.display = "flex";
          favRecipies.style.display = "none";
          makeRecipies.style.display = "none";
          myProfile.style.display = "none";
          errorPage.style.display = "none";
          printHomePage();
        colorNav(navbarLis,0)
          break;
        case "favRecipiesPage":
            searchPage.style.display = "none"
          homePage.style.display = "none";
          favRecipies.style.display = "flex";
          makeRecipies.style.display = "none";
          myProfile.style.display = "none";
          errorPage.style.display = "none";
          printFavPage();
          colorNav(navbarLis,1)
          break;
        case "makeRecipiesPage":
            searchPage.style.display = "none"
          homePage.style.display = "none";
          favRecipies.style.display = "none";
          makeRecipies.style.display = "block";
          myProfile.style.display = "none";
          errorPage.style.display = "none";
          printMakeRecPage();
          colorNav(navbarLis,2)
          break;
        case "myProfilePage":
            searchPage.style.display = "none"
          homePage.style.display = "none";
          favRecipies.style.display = "none";
          makeRecipies.style.display = "none";
          myProfile.style.display = "block";
          errorPage.style.display = "none";
          printProfilePage();
          colorNav(navbarLis,3)
          break;
        case "":
            searchPage.style.display = "block"
        homePage.style.display = "flex";
          favRecipies.style.display = "none";
          makeRecipies.style.display = "none";
          myProfile.style.display = "none";
          errorPage.style.display = "none";
          printHomePage();
          colorNav(navbarLis,0)
        default:
            searchPage.style.display = "none"
      homePage.style.display = "none";
      favRecipies.style.display = "none";
      makeRecipies.style.display = "none";
      myProfile.style.display = "none";
      errorPage.style.display = "block";
      printErrorPage();
      colorNav(navbarLis,-1)
      break;
  }
}

window.addEventListener("load", hashChange);
window.addEventListener("hashchange", hashChange);

})();