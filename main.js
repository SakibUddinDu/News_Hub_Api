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

