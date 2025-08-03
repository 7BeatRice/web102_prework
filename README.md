# WEB102 Prework - Sea Monster Crowdfunding Games

Submitted by: Beatrice Olaosebikan
Sea Monster Crowdfunding Games is a website for the company Sea Monster Crowdfunding that displays information about the games they have funded.

Time spent: 8 hours spent in total

## Required Features

The following **required** functionality is completed:

* [x] The introduction section explains the background of the company and how many games remain unfunded.
* [x] The Stats section includes information about the total contributions and dollars raised, as well as the top two most funded games.
* [x] The Our Games section initially displays all games funded by Sea Monster Crowdfunding
* [x] The Our Games section has three buttons that allow the user to display only unfunded games, only funded games, or all games.

The following **optional** features are implemented:

* [x] The topmost section contains a search bar that allows the user to input the game they are looking for.
* [x] The top post section displays a search suggestion box that contains the names of the games that match the input.
* [x] The suggestions from the suggestion box are clickable, and when clicked on, scroll to the section of the page containing the selected game. 

## Video Walkthrough

Here's a walkthrough of implemented features:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

-- Replace this with whatever GIF tool you used! -->
GIF created with ...  
-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

My greatest challenge was implementing the function that scrolls to the selected game based on the search suggestion that the user clicked on.
My first few attempts had many logic errors. My initial logic was to loop through the games and then use the scroll to view method to go to the game
whose name matches the text of the selected search suggestion. The issue with this implementation is that the scroll to view method only scrolls to objects
rendered on the DOM. So, I had to access the game by how it was rendered on the page, which can be found in the addGamesToPage function. It was rendered as
such:
 div.innerHTML = `
                        Name: ${games[i].name}
                        Description: ${games[i].description}
                        src="${games[i].img}" class="game-img">
                        `;
Since the name was rendered as an h2 element with the following syntax Name: ${games[i].name}, I had to go through the h2 element to find one that matched the
search suggestion text. The resulting code: 
            const searchName = li.textContent;

        // Get all h2 elements in the document
        const h2Elements = document.querySelectorAll("h2");

        for (let i = 0; i < h2Elements.length; i++) {
            const h2 = h2Elements[i];

            // Match the name: assuming h2 is like "Name: Heroes Of Mythic Americas"
            const h2Text = h2.textContent.trim();

            if (h2Text === `Name: ${searchName}`) {
                    ...
            }                .


## License

    Copyright [2025] [Olaosebikan]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
