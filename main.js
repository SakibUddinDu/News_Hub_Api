// categories data load
const categoriesNameUrl= 'https://openapi.programming-hero.com/api/news/categories'

const loadCategories = async() =>{
    const res = await fetch(categoriesNameUrl);
    const data = await res.json();
    displayCategories(data.data.news_category);
}
loadCategories()

// display categories
const displayCategories = (categories) =>{
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoryDiv = document.createElement('li');
        // const categoryDiv = document.createElement('ul');
        categoryDiv.classList.add('m-auto');
         categoryDiv.innerHTML = `
          <a onclick="loadNewsDetails(${category.category_id})">${category.category_name}</a>  
        `;
        categoriesContainer.appendChild(categoryDiv);
    })
}

// load details news
let newsDetailsContainer = document.getElementById('news-details-container');
const loadNewsDetails = async(category_id) =>{
    console.log(category_id)
    toggleSpinner(true)
    const allNewsInCategoryUrl =`https://openapi.programming-hero.com/api/news/category/0${category_id}`
    const res = await fetch(allNewsInCategoryUrl);
    const data = await res.json();
    console.log(data.data);
    displayNewsDetails(data.data);

}

const displayNewsDetails=(newsDetails)=>{
    newsDetails.map((newsDetail)=>{
        const newsDetailDiv= document.createElement('div');
        // newsDetailDiv.classList.add('mx-auto')
       
        newsDetailDiv.innerHTML=`<div class="card mb-3" style="max-width: 1200px">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              src="${newsDetail.image_url}"
              class="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${newsDetail.title}</h5>
              <p class="card-text">${newsDetail.details.slice(0,500)}...</p>
     
                
                <div class="news-sub-info d-flex justify-content-between">
                  <div class="author-description d-flex">
                    <img class="rounded-circle" src="${newsDetail.author.img}" alt="" />
                    <div>
                      <h3>${newsDetail.author.name ? newsDetail.author.name: "No Author Found"}</h3>
                      <p>${newsDetail.author.published_date?newsDetail.author.published_date: "date not found"}</p>
                    </div>
                  </div>
                  <div class="view-details d-flex align-items-center">
                    <img src="https://img.icons8.com/ios/50/000000/visible--v1.png" />
                    <p class="mb-1">${newsDetail.total_view}</p>
                  </div>
                  <button onclick="loadModalNewsDetails('${newsDetail._id}')"  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop">
                    <img src="https://img.icons8.com/ios/50/000000/pixel-arrow.png" />
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>`;
      newsDetailsContainer.appendChild(newsDetailDiv)
     /* <h3>${newsDetail.author?name:"Author name not found"}</h3>*/

    })
  //  stop loader
  toggleSpinner(false)
}
// spinner
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('spinner');
  if(isLoading){
      loaderSection.classList.remove('d-none')
  }
  else{
      loaderSection.classList.add('d-none');
  }
}

