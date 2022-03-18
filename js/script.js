const allDrink = document.getElementById('all-drinks')
const errorMsg = document.getElementById('error-msg')

// load all drinks
const loadAllDrink = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s')
    .then(res => res.json())
    .then(data => displayDrinks(data.drinks))
}

// loadAllDrink()

// toggle loader
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// toggle drinks view
const toggleSearchResult = displayStyle => {
    document.getElementById('all-drinks').style.display = displayStyle;
}
// toggle rest drinks
const toggleRestDrinks = displayStyle => {
    document.getElementById('rest-drinks').style.display = displayStyle;
}
// toggle load more button
const toggleLoadMore = displayStyle => {
    document.getElementById('load-more').style.display = displayStyle;
}

// random drink finder
const randomDrink = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => displayDrinks(data.drinks))
}

// search drink
const searchDrink = () => {
    const inputField = document.getElementById('input-search')

    // loader start
    toggleSpinner('block')
    // drinks view off
    toggleSearchResult('none')
    // toggle rest drinks
    toggleRestDrinks('none')
    // toggle load more
    toggleLoadMore('none')

    const inputText = inputField.value
    inputField.value = ''
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDrinks(data.drinks))
}
// display drinks on html
const displayDrinks = drinks => {
    const allDrink = document.getElementById('all-drinks')

    allDrink.textContent = ''

    const firstTen = drinks.slice(0, 10)
    errorMsg.innerText = `Showing ${firstTen.length} results from total ${drinks.length} search result found`

    firstTen.forEach(drink => {
       let div = document.createElement('div')
       div.classList.add('col-md-4')
       div.innerHTML = `
       <img src="${drink.strDrinkThumb}" alt="">
        <h2>${drink.strDrink}</h2>
        <h3>${drink.strCategory}</h3>
        <p>${drink.strInstructions}</p>
        <p>${drink.strIngredient1}, ${drink.strIngredient2}, ${drink.strIngredient3}, ${drink.strIngredient4}, ${drink.strIngredient5}, ${drink.strIngredient6}, ${drink.strIngredient7}, ${drink.strIngredient8}, ${drink.strIngredient9}</p>
        <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showDetail(${drink.idDrink})" class="btn btn-primary">see details</button>
        `
        allDrink.appendChild(div)
    })

    // loader off
    toggleSpinner('none')
    // drinks view on
    toggleSearchResult('flex')
    if(drinks.length > 10){
        // toggle load more
        toggleLoadMore('block')
    }
    
    
    loadMore(drinks)
}

// show drinks details by id on button click
const showDetail = async id => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetail(data.drinks[0])
}

const loadMore = restAll => {
    const loadMoreBtn = document.getElementById('load-more')
    
    const allDrink = document.getElementById('all-drinks')
    // allDrink.textContent = ''
    loadMoreBtn.addEventListener('click', function(){
        const restDrinks = document.getElementById('all-drinks')
        restAll.slice(10).forEach(drink => {
            let div = document.createElement('div')
            div.classList.add('col-md-4')
            div.innerHTML = `
            <img src="${drink.strDrinkThumb}" alt="">
             <h2>${drink.strDrink}</h2>
             <h3>${drink.strCategory}</h3>
             <p>${drink.strInstructions}</p>
             <p>${drink.strIngredient1}, ${drink.strIngredient2}, ${drink.strIngredient3}, ${drink.strIngredient4}, ${drink.strIngredient5}, ${drink.strIngredient6}, ${drink.strIngredient7}, ${drink.strIngredient8}, ${drink.strIngredient9}</p>
             <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showDetail(${drink.idDrink})" class="btn btn-primary">see details</button>
             `
             restDrinks.appendChild(div)
         })
         toggleLoadMore('none')
    })
    
}

// display drink details on modal
const displayDetail = (drinks) => {
    const modalBody = document.getElementById('modal-body')
    modalBody.innerHTML = `
    <img src="${drinks.strDrinkThumb}" alt="">
    <h2>${drinks.strDrink}</h2>
    <h3>${drinks.strCategory}</h3>
    <p>${drinks.strInstructions}</p>
    `
}