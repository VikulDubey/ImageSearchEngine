const [userInput, submitBtn, apiImages, showMoreBtn] =
  document.querySelectorAll(
    "#userInput , #submitBtn, #apiImages, #showMoreBtn"
  );
const form = document.querySelector("form");
const accessKey = "Y1w0MgvQF3ZynE490kfQK5izTvfc6jegSlnqJAQj9lU";
let page = 1;

async function getPhotos(keyword, page) {
  const URL = `https://api.unsplash.com/search/photos?page=${page}&per_page=12&query=${keyword}&client_id=${accessKey}`;
  const res = await fetch(URL);
  const data = await res.json();
  let url = data.results;
  console.log(url);
  if (url.length === 0) {
    showMoreBtn.style.display = "none";
    alert("No photos found");
  } else {
    url.forEach((obj, index) => {
      const img = document.createElement("img");
      img.src = obj.urls.small;
      img.alt = obj.alt_description;
      const a = document.createElement("a");
      a.href = obj.links.html;
      a.target = "_blank";
      a.appendChild(img);
      apiImages.appendChild(a);
    });
    showMoreBtn.style.display = "block";
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const keyword = userInput.value;
  getPhotos(keyword, page);
});

showMoreBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const keyword = userInput.value;
  page++;
  getPhotos(keyword, page);
});

userInput.addEventListener("keyup", () => {
  if (userInput.value.length === 0) {
    showMoreBtn.style.display = "none";
    apiImages.innerHTML = "";
  }
});
