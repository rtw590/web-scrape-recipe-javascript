const request = require('request')
const cheerio = require('cheerio')

let recipeLink = 'https://www.allrecipes.com/recipe/267953/slow-cooker-chicken-quesadillas/?internalSource=popular&referringContentType=Homepage&clickId=cardslot%2019'

request(recipeLink, (error, response, html) => {
  if(!error && response.statusCode == 200) {
    const $ = cheerio.load(html)

    const ingredients = $('.checklist')

    // const output = ingredients.text()
    // const output = ingredients.find('span').text()

    // console.log(output)

    let ingredientsArray = []
    let directionsArray = []

    $('.recipe-ingred_txt').each((i, el) => {
      const ingredient = $(el)
        .text()
        .replace(/\s\s+/g, '')
      ingredientsArray.push(ingredient)
    })

    $('.recipe-directions__list--item').each((i, el) => {
      const direction = $(el)
        .text()
        .replace(/\s\s+/g, '')
        directionsArray.push(direction)
    })

    filteredIngredients = []

    ingredientsArray.forEach(ingredient => {
      if(ingredient != '' && ingredient != 'Add all ingredients to list'){
        filteredIngredients.push(ingredient)
      }
    })

    filteredDirections = []

    directionsArray.forEach(direction => {
      if(direction != ''){
        filteredDirections.push(direction)
      }
    })

    console.log(filteredIngredients)
    console.log(filteredDirections)


  }
})