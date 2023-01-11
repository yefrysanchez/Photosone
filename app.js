const auth = "563492ad6f91700001000001e6cf9ec123174708b4b25d4f6b6dc7d7";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
const topPage = document.querySelector(".top");
let searchValue;
let page = 2;
let fetchLink;
let currentSearch;

//Event Listerners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhoto(searchValue);
});

more.addEventListener("click", loadMore);

topPage.addEventListener("click", function () {
  window.scrollTo(0, 0);
});

//Functions

function updateInput(e) {
  searchValue = e.target.value;
  currentSearch = searchValue;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePhoto(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.large} alt='${photo.alt}'>
        <div class="photo-info">
            <a class="photographer" href=${photo.photographer_url} target="_blank">${photo.photographer}</a>
            <a class="download" href=${photo.src.large2x} target="_blank"><i class="fa-solid fa-download"></i></a>
        </div>`;
    gallery.appendChild(galleryImg);
  });
}
//--------------------Photos-----------------------------//
async function curatedPhoto() {
  fetchLink = "https://api.pexels.com/v1/curated";
  const data = await fetchApi(fetchLink);

  generatePhoto(data);
}
//--------------------Search-----------------------------//
async function searchPhoto(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePhoto(data);
}

function clear() {
  gallery.innerHTML = "";
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=25&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated/?page=${page}&per_page=25`;
  }
  const data = await fetchApi(fetchLink);
  generatePhoto(data);
}

curatedPhoto();
