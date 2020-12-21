function clearVault()
{
    let activeRecipeList = [];
    chrome.storage.sync.set({'recipes' : activeRecipeList}, function()
    {
        updateSavedRecipeList();
    });
}

function updateSavedRecipeList()
{
    chrome.storage.sync.get( ['recipes'], 
    function(recipeList)
    {
        for(var i = 0; i < 16; i++)
        {
            if(i < recipeList.recipes.length)
            {
                $('#el' + (i+1)).text(recipeList.recipes[i]);
            }
            else
            {
                $('#el' + (i+1)).text("");
            }
        }
    }
    );
    
}


function pageLoad()
{
    el('#clear-button').addEventListener('click', clearVault);
    updateSavedRecipeList();
}

pageLoad();
