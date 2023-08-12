// This is the JavaScript File of this Project

function reload() {
    window.location.reload();
}


// Ab hm yaha pe API Call and Fetch krna sikhenge

const API_KEY = "26917582afc44590bd716faadf274c31";     // ye API KEY hai, ye hme "newsapi.org" site se mili hai
const url = "https://newsapi.org/v2/everything?q="      // or ye hai hmari news url


// hm ek eventListener add krenge, jb bhi hmara page load hoga, to hmari news fetch hogi
window.addEventListener('load', () => {
    fetchNews("Indian");     // fetchNews() is a function which we will make, and it will be a asynchronous function
});

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&sortBy=publishedAt&apiKey=${API_KEY}`);    // ye hm jo bhi news available hai, wo fetch kr rhe hai, or ye ek promise return krega to hm await krenge

    const data = await res.json();  // jo bhi data hme fetch hua, wo ab hm json format me convert krenge
    console.log(data);

    bindData(data.articles);    // we made this function, to bind the data so that we can display it over our web-page
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const templateNews = document.getElementById("template-card");

    // ab hm sbse phele hmara jo cardsContainer hai, uski innerHTML ko empty krenge, esa isliye krenge ki jb bhi hm new data ko fetch krenge to phele jo purana data hai wo empty ho jaaye, uske bad naya data aaye. Agar apn esa nahi krenge, to hmesha hmara new data jo ayega wo hmare purane data ke last me add hoga, jo hm nahi chahte
    cardsContainer.innerHTML = "";
    
    articles.forEach(article => {
        if (!article.urlToImage) {
            return; // esa hm isliye krenge, qki jis bhi article me koi image available nahi hoga usko hm nahi add krenge hmare web-page pe, qki usse hmari UI thodi bekar dikhegi
        }

        const cardClone = templateNews.content.cloneNode(true); // iska mtlb hai ki hmari templateNews ke andr jitne bhi 'div' hai wo saare clone krega yeh

        // ab hm hmare data me jo actual data hai wo daal dete hai
        fillDataInCard(cardClone, article);

        // ab jo hmne clone bnaya, usko hmare cardsContainer me daal dete hai
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard (cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSrc = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    newsSrc.innerHTML = `${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let currSelectedItem = null;
function navItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    currSelectedItem?.classList.remove('active');
    currSelectedItem = navItem;
    currSelectedItem.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-input");

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) {   // if button is clicked without any input
        return;
    }

    fetchNews(query);
    currSelectedItem?.classList.remove('active');
    currSelectedItem = null;
});
