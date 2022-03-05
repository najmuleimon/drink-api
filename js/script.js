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
    const restAll = drinks.slice(10)
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
        <button onclick="showDetail(${drink.idDrink})">see details</button>
        `
        allDrink.appendChild(div)
    })

    // loader off
    toggleSpinner('none')
    // drinks view on
    toggleSearchResult('block')
    // toggle load more
    toggleLoadMore('block')
    loadMore(restAll)
}
const showDetail = (id) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data.drinks[0]))
}

const loadMore = restAll => {
    const loadMoreBtn = document.getElementById('load-more')
    loadMoreBtn.addEventListener('click', function(){
        restAll.forEach(drink => {
            let div = document.createElement('div')
            div.classList.add('col-md-4')
            div.innerHTML = `
            <img src="${drink.strDrinkThumb}" alt="">
             <h2>${drink.strDrink}</h2>
             <h3>${drink.strCategory}</h3>
             <p>${drink.strInstructions}</p>
             <p>${drink.strIngredient1}, ${drink.strIngredient2}, ${drink.strIngredient3}, ${drink.strIngredient4}, ${drink.strIngredient5}, ${drink.strIngredient6}, ${drink.strIngredient7}, ${drink.strIngredient8}, ${drink.strIngredient9}</p>
             <button onclick="showDetail(${drink.idDrink})">see details</button>
             `
             allDrink.appendChild(div)
         })
    })
}