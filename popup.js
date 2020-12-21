/*
CREDIT TO THESE SOURCES:
https://github.com/gopinav/Chrome-Extensions
https://github.com/einaregilsson/Redirector
*/


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
                // update active site here
            });
        }
        );
    }
    );
}

function loadVault()
{
    var url = chrome.extension.getURL('vault.html');
    chrome.tabs.query({currentWindow:true}, function(tabs) {
		for (var i=0; i < tabs.length; i++) {
			if (tabs[i].url == url) {
				chrome.tabs.update(tabs[i].id, {active:true}, function(tab) {
					close();
				});
				return;
			}
		}
		chrome.tabs.create({url:url, active:true});
	});
	return;
}

function pageLoad()
{
    el('#add-button').addEventListener('click', addSiteToVault);
    el('#vault-button').addEventListener('click', loadVault);
}

pageLoad();
