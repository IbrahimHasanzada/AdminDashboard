let updateData = []

let categories = []
fetch("https://oxuaz.yetim.me/news")
.then(res => res.json())
.then(data => console.log(data))
fetch("https://oxuaz.yetim.me/categories")
.then(res => res.json())
.then(data =>{
    categories = data
    silcat() 
}
)
let api = {
    login: function login(userName, password) {
        fetch('https://oxuaz.yetim.me/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                login: userName,
                password: password
            })
        })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(`Failed to login: ${res.statusText} - ${text}`); });
            }
            return res.json();
        })
        .then(data => {
            console.log("Login successful:", data);
            location.href = 'admin.htm';
            localStorage.setItem('token', data.token);
            console.log(data.token);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
    },
    register: function register(user, pass,token) {
        fetch('https://oxuaz.yetim.me/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                login: user,
                password: pass
            })
        })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(`Failed to login: ${res.statusText} - ${text}`); });
            }
            return res.json();
        })
        .then(data => {
            console.log("Login successful:", data);
            location.href = 'admin.htm';
            localStorage.setItem('token', data.token);
            console.log(data.token);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
    },

    addCat: function addCat(catId, token) {
        if (!token) {
            console.error("Token tapilmadi qaqa");
            return;
        }
        fetch('https://oxuaz.yetim.me/categories', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: catId
            })
        })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(`Failed to login: ${res.statusText} - ${text}`); });
            }
            return res.json();
        })
        .then(data => {
            console.log("Login successful:", data);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
    },
    delCat: function delCat(catDel, token) {
        if (!token) {
            console.error("Token tapilmadi qaqa");
            return;
        }
        fetch(`https://oxuaz.yetim.me/categories/${catDel}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(`Failed to login: ${res.statusText} - ${text}`); });
            }
            return res.json();
        })
        .then(data => {
            console.log("Login successful:", data);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
    },
    addNews: async function  (linkValue, catValue, descValue,catID, token) {
        if (!token) {
            console.error("Token tapilmadi qaqa");
            return;
        }

        fetch('https://oxuaz.yetim.me/news', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                img: linkValue,
                title: catValue,
                description: descValue,
                category_id: catID 
            }),
        })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(`Failed to add news: ${res.statusText} - ${text}`); });
            }
            return res.json();
        })
        .then(data => {
            console.log("News added successfully:", data);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
    },
    delNews: function delNews(itemId,token) {
        if (!token) {
            console.error("Token tapilmadi qaqa");
            return;
        }
        fetch(`https://oxuaz.yetim.me/news/${itemId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(`Failed to login: ${res.statusText} - ${text}`); });
            }
            return res.json();
        })
        .then(data => {
            console.log("Login successful:", data);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
    },
    update: async function (upId,catUpdateinp,titleinp, descrUpdateinp,token) {
        
        if (!token) {
            console.error("Token tapilmadi qaqa");
            return;
        }
        fetch(`https://oxuaz.yetim.me/news/${upId}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title: titleinp,
                description: descrUpdateinp,
                category_id: catUpdateinp
            })
        })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(`Failed to login: ${res.statusText} - ${text}`); });
            }
            return res.json();
        })
        .then(data => {
            console.log("Login successful:", data);


        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
    },
}

const token = localStorage.getItem("token")

const btn = document.querySelector("button")
const addBtn = document.querySelector("#gonderNews")
const delNewsBtn = document.getElementById("delNews")
const registerBtn = document.getElementById("resisterBtn")
const delCategoriesBtn = document.getElementById("delCategories")
const addCategories = document.getElementById("addCategories")
const categoriesList = document.getElementById("categoriesList")

btn.onclick = function () {
    const userValue = document.getElementById("userName").value;
    const passValue = document.getElementById("password").value;
    api.login(userValue, passValue);
}


addBtn.onclick = function news () {
    const linkValue = document.getElementById("link").value;
    const catValue = document.getElementById("title").value;
    const catID = document.getElementById("categoryID").value;
    const descValue = document.getElementById("desc").value;
    api.addNews(linkValue, catValue, descValue, catID, token);
}

registerBtn.onclick = function(){
    const userValue = document.getElementById("registerUserName").value;
    const passValue = document.getElementById("registerPassword").value;
    api.register(userValue, passValue,token);
}


addCategories.onclick = function () {
    const catId = document.getElementById("categoryInput").value
    api.addCat(catId,token)
    
}
function silcat() {
    let kod = '';
    categories.forEach(item => {
        kod += `<div class="flex justify-between items-center w-full border-2 p-3 rounded-lg">
        <span>${item.name}</span>
        <span>${item._id}</span>
        <div onclick="deleteCat('${item._id}')" class="text-white bg-blue-700  font-medium rounded-full text-sm  px-2 py-1 text-center"><i class="fa-solid fa-x"></i></div>
    </div>`;
    });
    categoriesList.innerHTML = kod;
}
silcat();

function deleteCat(id) {
    api.delCat(id, token);
}


let currentPage = 1;
paginateCardsNews()
function paginateCardsNews() {
    fetch(`https://oxuaz.yetim.me/news_page/${currentPage}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(`Failed to add news: ${res.statusText} - ${text}`); });
            }
            return res.json();
        })
        .then(data => {
            console.log("News added successfully:", data);
            currentPage++;
            showCardsAdmin(data);
            updateData = data

        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
}
const form2 = document.getElementById("formCards")
function showCardsAdmin(data) {
    let cards = ''
    data.forEach(item => {
        if (item.category_id) {
            cards += 
        `  
        <div id="id${item._id}" class="card flex flex-col relative ml-3 mb-3">
        <div class="absolute right-2 top-2 flex gap-2">
            <div onclick="deleteNews('${item._id}')" class="text-white bg-red-700  font-medium rounded-md text-sm  px-3 py-2 text-center"><i class="fa-solid fa-x"></i></div>
            <div onclick="updateNews('${item._id}')" class=" px-3 py-2 boz rounded-md"><i class="fa-solid fa-pen"></i></div>
        </div>
        <img src="${item.img}" alt="${item.title}">
            <div class="p-2 flex flex-col  gap-2">
            <div  class="flex justify-between w-full">
                <p class="font-bold catNameColor text-[#1894A0]">${item.category_id.name}</p>
                <div class="event-info flex">
                    <span><i class="fa-regular fa-calendar-days"></i>${item.updatedAt.split('T')[0]}  /</span>
                    <span><i class="fa fa-clock-o">${item.updatedAt.split('T')[1].split('.')[0]}</i></span>
                </div>
            </div>
            <h2>${item.title}</h2>
            <p>${item.description.substring(0, 100) + '...'}</p>
            </div>
            <div class="flex gap-8 items-end px-3 pb-3">
                <button onclick="likeNewsButton('${item._id}')" class="cursor-pointer"><i id="a${item._id}" class="fa-regular fa-thumbs-up "></i><span id="like${item._id}">${item.like}</span></button>
                <button onclick="disLikeNewsButton('${item._id}')" class="cursor-pointer"><i id="b${item._id}" class="fa-regular fa-thumbs-down"></i><span id="dislike${item._id}">${item.dislike}</span></button>
            </div>
        </div>
        `
        
        }
        
    })

    form2.innerHTML += cards

}

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY + 5) >= document.body.offsetHeight) {
        paginateCardsNews();
    }
});
function deleteNews (id) {
    api.delNews(id,token) 
}

function updateNews (id) {
    let kod = ''
    const newCard = document.getElementById(`id${id}`)

  let item = updateData.filter(elem => elem._id == id)
  
  item.forEach(item => {

    kod = 
  `  
  <div  class="card flex flex-col relative">
  <div class="absolute right-2 top-2 flex gap-2">
      <div onclick="deleteNews('${item._id}')" class="text-white bg-red-700  font-medium rounded-md text-sm  px-3 py-2 text-center"><i class="fa-solid fa-x"></i></div>
      <div onclick="updateNews('${item._id}')" class=" px-3 py-2 boz rounded-md"><i class="fa-solid fa-pen"></i></div>
  </div>
  <img  src="${item.img}" alt="${item.title}">
      <div class="p-2 flex flex-col  gap-2">
      <div  class="flex justify-between w-full">
          <input id="catinp${item._id}" type="text" value="${item.category_id?.name}" />
      </div>
      <input id="titleinp${item._id}" type="text" value="${item.title}" />
      <input id="descriptioninp${item._id}" type="text" value="${item.description}" />
      </div>
      <div class="flex gap- p-4">
         <div  onclick="applyNews('${id}')" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Goner</div>
         <div  onclick="rejectNews()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Legv et</div>
      </div>
  </div>
  `
  })
  
newCard.innerHTML = kod

}

function applyNews(id) {
    let catUpdateinp = document.getElementById(`catinp${id}`).value
    let descrUpdateinp = document.getElementById(`descriptioninp${id}`).value
    let titleinp = document.getElementById(`titleinp${id}`).value
    api.update(id,catUpdateinp,titleinp, descrUpdateinp,token)
}
