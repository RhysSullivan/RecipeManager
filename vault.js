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
                var img = document.createElement('img');   
                img.src = recipeList.recipes[i]; 
                var attach = document.getElementById('body');
                attach.appendChild(img); 
            }
            else
            {
                var img = document.createElement('img');
                img.src = 'https://rimatour.com/wp-content/uploads/2017/09/No-image-found-250x250.jpg'; 
                var attach = document.getElementById('body');
                attach.appendChild(img); 
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
