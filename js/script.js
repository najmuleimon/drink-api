const allDrink = document.getElementById('all-drinks')

// load all drinks
const loadAllDrink = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s')
    .then(res => res.json())
    .then(data => displayDrinks(data.drinks))
}

loadAllDrink()

// toggle loader
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// toggle drinks view
const toggleSearchResult = displayStyle => {
    document.getElementById('all-drinks').style.display = displayStyle;
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
    drinks.forEach(drink => {
       let div = document.createElement('div')
       div.innerHTML = `
       <img src="${drink.strDrinkThumb}" alt="">
        <h2>${drink.strDrink}</h2>
        <h3>${drink.strCategory}</h3>
        <p>${drink.strInstructions}</p>
        <p>${drink.strIngredient1}, ${drink.strIngredient2}, ${drink.strIngredient3}, ${drink.strIngredient4}, ${drink.strIngredient5}, ${drink.strIngredient6}, ${drink.strIngredient7}, ${drink.strIngredient8}, ${drink.strIngredient9}</p>
       `
        allDrink.appendChild(div)
    })

    // loader off
    toggleSpinner('none')
    // drinks view on
    toggleSearchResult('block')
}

