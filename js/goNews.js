let originalDataNews = [];

fetch("https://oxuaz.yetim.me/news")
    .then(res => res.json())
    .then(data => {
        getNews(data)
        originalDataNews = [...data];
    })


const image = document.getElementById("image")
const desc = document.getElementById("description")
const title = document.getElementById("title")
const date = document.getElementById("date")
const time = document.getElementById("time")
const categ = document.getElementById("categ")
const eye = document.getElementById("eye")
const newsLoad = document.getElementById("newsLoad")


const url = new URLSearchParams(window.location.search);
const id = url.get("id");
const main = document.querySelector("main");
function getNews(data) {
    newsLoad.style.display = "none";
     let filtered = data.filter(news => news._id === id)
     filtered.forEach(item => {
         image.src = item.img
         desc.innerHTML = item.description
         title.innerHTML = item.title
         categ.innerHTML = item.category_id.name
         date.innerHTML = item.updatedAt.split('T')[0] +' / '
         time.innerHTML = item.updatedAt.split('T')[1].split('.')[0]
         eye.innerHTML = item.view 
     })
    
}
fetch(`https://oxuaz.yetim.me/news_view/${id}`,{
    method: "PATCH"
})
    .then(res => res.json())
    .then(data => {
        console.log(data.view);
    })