function el(query) {
	return document.querySelector(query);
}

function addSiteToVault()
{
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;

        chrome.storage.sync.get( ['recipes'], 
        function(savedRecipeList)
        {
            let activeRecipeList = savedRecipeList.recipes;
            activeRecipeList.push(url);
            chrome.storage.sync.set({'recipes' : activeRecipeList}, function()
            {
                updateSavedRecipeList();
            });
        }
        );
    }
    );
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

function clearVault()
{
    let activeRecipeList = [];
    chrome.storage.sync.set({'recipes' : activeRecipeList}, function()
    {
        updateSavedRecipeList();
    });
}

function pageLoad()
{
    el('#add-button').addEventListener('click', addSiteToVault);
    el('#clear-button').addEventListener('click', clearVault);
    updateSavedRecipeList();
}

pageLoad();
