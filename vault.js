function clearVault()
{
    let activeRecipeList = [];
    chrome.storage.sync.set({'recipes' : activeRecipeList}, function()
    {
        displayAllSavedRecipes();
    });
}

function displayAllSavedRecipes()
{
    chrome.storage.sync.get( ['recipes'], 
    function(recipeList)
    {
        var html = "";
        for(var i = 0; i < 16; i++)
        {
            if(i < recipeList.recipes.length)
            {
                var recipeInfo =
                {             
                    recipeURL: "",
                    recipePictureURL: "",
                    recipeType: "",
                    recipeName: ""     
                }

                var info = recipeList.recipes[i]; 
                html += (`<div>`);
                html += (`<h2 id = "recipeName">` + info.recipeName + `</h2>`)
                html += (`<a href=` + info.recipeURL + `>`)
                html += (`<img src=` + info.recipePictureURL + `>`)                       
                html += (`</a>`)
                html += (`<h2 id = "recipeName">` + intToRecipeTypeString(info.recipeType) + `</h2>`)
                html +=(`</div>`);
            }
        }
        $("div.row").append(html);
    }
    );
    
}

function pageLoad()
{
    el('#clear-button').addEventListener('click', clearVault);
    displayAllSavedRecipes();
}

pageLoad();
