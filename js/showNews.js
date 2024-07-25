let dataNews = [];
let originalDataNews = [];
// L I K E   N E W S 
let currentPage = 1;
paginateNews()
function paginateNews() {
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
            currentPage++;
            showCards(data);

        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
}
function likeNews(likeID, span) {
    fetch(`https://oxuaz.yetim.me/news_like/${likeID}`, {
        method: "PATCH",
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
            span.innerHTML = data.like
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
}
function disLikeNews(dislikeID, span) {
    fetch(`https://oxuaz.yetim.me/news_dislike/${dislikeID}`, {
        method: "PATCH",
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
            span.innerHTML = data.dislike
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
}
let itemID = ''
function getCategories(itemID) {
    console.log(itemID);
    main.innerHTML = ''
    fetch(`https://oxuaz.yetim.me/news_by_categ/${itemID}`, {
        method: "GET"
    })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(`Failed to fetch news: ${res.statusText} - ${text}`); });
            }
            return res.json();
        })
        .then(data => {
            showCards(data)


        })
        currentPage = 0
}


fetch("https://oxuaz.yetim.me/news")
    .then(res => res.json())
    .then(data => {
        dataNews = data;
        originalDataNews = [...data];
        console.log(data);
        sliderHeader();
        menuList();
        showTextNews()
    });

const listMenu = document.querySelector("#listMenu");
const newsText = document.querySelector("#news");
const main = document.querySelector("main");
const slideTrack = document.querySelector(".slide-track");
const loading = document.getElementById("loading")
const newsShow = document.getElementById("newsSearch")

function menuList() {
    listMenu.innerHTML = '';
    let li = '';
    const uniqueCategories = new Set();
    originalDataNews.forEach(item => {
        if (item.category_id && !uniqueCategories.has(item.category_id._id)) {
            uniqueCategories.add(item.category_id._id);
            li += `<li class="text-[#051D39]"><a href="#" onclick="getCategories('${item.category_id._id}')">${item.category_id.name}</a></li>`;
        }
    });
    listMenu.innerHTML = li;
}


function showCards(data) {
    
    loading.style.display = 'none';
    let cards = '';
    data.forEach(item => {
        if (item.category_id != null) {
        cards += `
        <div  class="card flex flex-col">
            <img src="${item.img}" alt="${item.title}">
            <div class="p-2 flex flex-col gap-2">
                <div class="flex justify-between w-full">
                    <p class="font-bold catNameColor text-[#1894A0]">${item.category_id?.name}</p>
                    <div class="event-info flex">
                        <span><i class="fa-regular fa-calendar-days"></i> ${item.updatedAt.split('T')[0]} /</span>
                        <span><i class="fa fa-clock-o"></i>${item.updatedAt.split('T')[1].split('.')[0]}</span>
                    </div>
                </div>
                <a href="goNews.htm?id=${item._id}"><h2 class="font-medium">${item.title}</h2></a>
                <p>${item.description.substring(0, 100) + '...'}</p>
            </div>
            <div class="flex justify-between px-3 pb-3">
                <div class="flex gap-8">
                    <button onclick="likeNewsButton('${item._id}')" class="cursor-pointer"><i id="a${item._id}" class="fa-regular fa-thumbs-up"></i> <span id="like${item._id}">${item.like}</span></button>
                    <button onclick="disLikeNewsButton('${item._id}')" class="cursor-pointer"><i id="b${item._id}" class="fa-regular fa-thumbs-down"></i> <span id="dislike${item._id}">${item.dislike}</span></button>
                </div>
                <p><i class="fa-solid fa-eye"></i> ${item.view}</p>
            </div>
        </div>
        `;
    }
        
    });

    main.innerHTML += cards;
}


function searchNews() {
    let newsSearch = '';
    const search = document.getElementById("search").value;

    if (search != ' ') {
        fetch(`https://oxuaz.yetim.me/news/search?title=${search}`, {
            method: "GET"
        })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => {
                    throw new Error(`Failed to fetch news: ${res.statusText} - ${text}`);
                });
            }
            return res.json();
        })
        .then(elm => {
            elm.forEach(item => {
                newsSearch +=
                 `<div class="w-full py-2 border">
                    <p class="font-bold catNameColor text-[#1894A0]">${item.category_id.name}</p>
                    <a href="goNews.htm?id=${item._id}"><p>${item.title}</p></a>
                </div>`
            });
            newsShow.innerHTML = newsSearch;
        })
        .catch(error => {
            console.error(error);
        });
    }else{
        newsSearch = '';
    }
}


function showTextNews() {
    let kodText = ''
    originalDataNews.forEach((item, i) => {
        if (item.category_id != null) {
            if (i < 10) {
                kodText += `
                <div class="w50 mb-3 px-1 flex flex-col justify-between text-[.9em] md:text-[1em]">
                    <div>
                        <a href="goNews.htm?id=${item._id}"><p class="h-[50px] overflow-hidden font-medium">${item.title}</p></a>
                        <div>
                            <span class="font-bold catNameColor text-[#1894A0]">${item.category_id.name}</span>
                            <span> ${item.updatedAt.split('T')[0]}</span>
                        </div>
                    </div>
                </div>
                
                `
            }
    }

    })
    newsText.innerHTML = kodText;
}


function sliderHeader() {
    let kod = ''
    dataNews.forEach(slide => {
        kod += `
        <div class="slide text-white">
            <h2>⦿ ${slide.title}</h2>
        </div>`
    })
    slideTrack.innerHTML = kod

}

function likeNewsButton(id) {

    const likeSpan = document.getElementById(`like${id}`)
    const like = document.getElementById(`a${id}`)
    if (like) like.classList.add('text-blue-500'); like.parentElement.disabled = true
    likeNews(id, likeSpan);
}
function disLikeNewsButton(id) {
    const dislikeSpan = document.getElementById(`dislike${id}`)
    const like = document.getElementById(`b${id}`)

    if (like) like.classList.add('text-red-500'); like.parentElement.disabled = true
    disLikeNews(id, dislikeSpan);
}
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY + 5) >= document.body.offsetHeight) {
        paginateNews();
    }
});

function mostViewed(){
    main.innerHTML = '';
    fetch(`https://oxuaz.yetim.me/news_viewed`,{
        method: "GET"
    })
        .then(res => res.json())
        .then(data => {
           showCards(data)
        })
        currentPage = 0
}
