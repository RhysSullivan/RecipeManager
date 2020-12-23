function clearVault() {
    recipeList = [];
    chrome.storage.sync.set({ 'recipes': recipeList}, function () {        
        displaySavedRecipes();        
    });
}

var recipeList;
var activeTypeFilters = [];

function displaySavedRecipes() 
{
    $("div.row").empty();
    
    let filter = $("#search-input").val().toUpperCase();
    let numDisplayedRecipes = 0;
    for (var i = recipeList.recipes.length-1; i >= 0; i--) 
    {
        var recipeInfo =
        {
            recipeURL: "",
            recipePictureURL: "",
            recipeType: -1,
            recipeName: ""
        }
        var info = recipeList.recipes[i];
        let html = "";
        let txtValue = info.recipeName;
        
        if(activeTypeFilters.length > 0 && !activeTypeFilters.includes(info.recipeType))
        {
            continue;
        }
        if (txtValue.toUpperCase().indexOf(filter) > -1)
        {            
            html += (`<div>`);
            html += (`<h2 id = "recipeName">` + info.recipeName + `</h2>`)
            html += (`<a href=` + info.recipeURL + `>`)
            html += (`<img src=` + info.recipePictureURL + `>`)
            html += (`</a>`)
            //html += `<h2 id = "recipeName">` + intToRecipeTypeString(info.recipeType) + `</h2>`;
            html += `<div></div>`;
            html += `<button id="remove-button-` + (numDisplayedRecipes) + `" >Remove</button>`;
            html += (`</div>`);
            html += `<span></span>`;
            $("div.row").append(html);
            numDisplayedRecipes++;
        }
        else 
        {
            continue;
        }
    }
    for(let j = 0; j < numDisplayedRecipes; j++)
    {
        el('#remove-button-' + j).addEventListener('click', function(){removeElement(numDisplayedRecipes - 1 - j)});
    }    
}

function removeElement(index)
{
    console.log(index);
    recipeList.recipes.splice(index, 1);
    chrome.storage.sync.set({ 'recipes': recipeList.recipes}, function () {
        displaySavedRecipes();        
    });
}

function toggleTypeFilters(typeFilterIndex, element)
{
    if(activeTypeFilters.includes(typeFilterIndex))
    {
        activeTypeFilters.splice(activeTypeFilters.indexOf(typeFilterIndex), 1);
    }
    else
    {
        activeTypeFilters.push(typeFilterIndex);
    }
    $(element).toggleClass('selected unselected');
    displaySavedRecipes();
}


function pageLoad() {
    chrome.storage.sync.get(['recipes'],
        function (recipeListFromStorage) {
            recipeList = recipeListFromStorage;
            displaySavedRecipes();
        }
    );

    //el('#see-all-button').addEventListener('click',   function () { activeTypeFilters = []; displaySavedRecipes(); });
    $("#search-input").on("change keyup paste",       function () { displaySavedRecipes() });
    //el('#clear-button').addEventListener('click',     function () { clearVault()});
    el('#main-dish-button').addEventListener('click', function () { toggleTypeFilters(1, '#main-dish-button') });
    el('#snack-button').addEventListener('click',     function () { toggleTypeFilters(2, '#snack-button') });
    el('#side-dish-button').addEventListener('click', function () { toggleTypeFilters(3, '#side-dish-button') });
    el('#dessert-button').addEventListener('click',   function () { toggleTypeFilters(4, '#dessert-button') });
    el('#breakfast-button').addEventListener('click', function () { toggleTypeFilters(5, '#breakfast-button') });
    el('#misc-button').addEventListener('click',      function () { toggleTypeFilters(6, '#misc-button') });
}

pageLoad();
