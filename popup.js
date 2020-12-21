/*
CREDIT TO THESE SOURCES:
https://github.com/gopinav/Chrome-Extensions
https://github.com/einaregilsson/Redirector
*/



function addSiteToVault()
{
    var message = document.querySelector('#message');
  
    chrome.tabs.executeScript(null, { file: "jquery-3.5.1.min.js" },
     function()
     {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) 
      {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }


      chrome.tabs.executeScript(null, { file: "getPageSource.js"},
      function()
      {          
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) 
        {
          message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
      });
    });
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


chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
      message.innerText = request.source;



      chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;

        chrome.storage.sync.get( ['recipes'], 
        function(savedRecipeList)
        {
            let activeRecipeList = savedRecipeList.recipes;            
            activeRecipeList.push(request.source);            

            chrome.storage.sync.set({'recipes' : activeRecipeList}, function()
            {
                // update active site here
            });
        }
        );
    }
    );





    }
  });

pageLoad();
