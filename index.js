/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)
console.log(GAMES_JSON);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i=0; i < games.length; i++){


        // create a new div element, which will become the game card
       const div = document.createElement('div')

        // add the class game-card to the list
        div.classList.add('game-card');


        // set the inner HTML using a template literal to display some info 
        // about each game
        div.innerHTML = `
                        <h2>Name: ${games[i].name}</h2>
                        <p>Description: ${games[i].description}</p>
                        <img src="${games[i].img}" class="game-img">
                        `;

        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
       
        gamesContainer.append(div);


        
    }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
     addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContribution = GAMES_JSON.reduce((acc, game) => {return acc + game.backers;}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
    contributionsCard.innerHTML = `${totalContribution.toLocaleString('en-US')}`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => {return acc + game.pledged;}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `${totalRaised.toLocaleString('en-US')}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.reduce((acc, game) => {return acc += 1;}, 0);
gamesCard.innerHTML = `${totalGames.toLocaleString('en-US')}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter((game) => {return game.pledged < game.goal;});


    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
    console.log(`Num of Unfunded Games: ${unfundedGames.length}`);

}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter((game) => {return game.pledged >= game.goal;});

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
    console.log(`Num of funded Games: ${fundedGames.length}`);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click",filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

 const numOfUnfunded = GAMES_JSON.reduce((acc, game) => {return game.pledged < game.goal? acc += 1: acc;}, 0);
 console.log(`Num of Unfunded Games: ${numOfUnfunded}`);


// create a string that explains the number of unfunded games using the ternary operator
const str = `A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.reduce((acc, game) => {return acc += 1;}, 0)} games. Currently, ${numOfUnfunded} game
remains unfunded. We need your help to fund these amazing games!`;


// create a new DOM element containing the template string and append it to the description container
const description = document.createElement("p");
description.innerHTML = str;
descriptionContainer.append(description);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, secGame, ...otherGames] = sortedGames;



// create a new element to hold the name of the top pledge game, then append it to the correct element
const {name, ...others}= topGame;
firstGameContainer.append(name);


// do the same for the runner up item
const{name: nameSec, ...othersSec} = secGame;
secondGameContainer.append(nameSec);



/************************************************************************************
 * Custmization Searchbar
 */
const searchSuggest = document.getElementById("suggestionBox");

//populate a input suggestion box of game names

// create a function that adds all the game name from the games array to the page
function addNameToBox(games) {

    // loop over each item in the data
    for (let i=0; i < games.length; i++){
        const li = document.createElement("li");
        li.innerHTML = games[i].name;
        searchSuggest.append(li);
    }
}
addNameToBox(GAMES_JSON);

//display suggestions if they match input
// Filter list based on user input
searchBar.addEventListener("input", () => {
    const search = searchBar.value.toLowerCase();
    const listItems = suggestionBox.querySelectorAll("li");

    listItems.forEach(li => {
        const text = li.textContent.toLowerCase();
        li.style.display = text.includes(search) ? "block" : "none"; 
    });
})

//scroll to the game searched for
const listItems = suggestionBox.querySelectorAll("li");

listItems.forEach(li => {
    li.addEventListener("click", function () {
        const searchName = li.textContent;

        // Get all h2 elements in the document
        const h2Elements = document.querySelectorAll("h2");

        for (let i = 0; i < h2Elements.length; i++) {
            const h2 = h2Elements[i];

            // Match the name: assuming h2 is like "Name: Heroes Of Mythic Americas"
            const h2Text = h2.textContent.trim();

            if (h2Text === `Name: ${searchName}`) {
                const card = h2.parentElement; // The outer div
                card.scrollIntoView({ behavior: "smooth", block: "center" });
                return;
            }
        }

        console.warn("No matching game card found for:", searchName);
    });
});

