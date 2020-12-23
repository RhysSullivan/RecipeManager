/*
CREDIT TO THESE SOURCES:
https://github.com/gopinav/Chrome-Extensions
https://github.com/einaregilsson/Redirector
*/

function refreshVault()
{
  var url = chrome.extension.getURL('vault.html');
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].url == url) {
        chrome.tabs.reload(tabs[i].id);
        //chrome.tabs.update(tabs[i].id, { active: true }, function (tab) {
          //close();
        //});
        return;
      }
    }
  }); 
}


function loadVault() {
  var url = chrome.extension.getURL('vault.html');
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].url == url) {
        chrome.tabs.update(tabs[i].id, { active: true }, function (tab) {
          close();
        });
        return;
      }
    }
    chrome.tabs.create({ url: url, active: true });
  });
  return;
}

function querySite() {
  chrome.tabs.executeScript(null, { file: "jquery-3.5.1.min.js" },
    function () {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        //'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }


      chrome.tabs.executeScript(null, { file: "getPageSource.js" },
        function () {
          // If you try and inject into an extensions page or the webstore/NTP you'll get an error
          if (chrome.runtime.lastError) {
            // 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
          }
        });
    });
}


var recipeExtactedURL;
chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getSource") {
    let recipeInfo =
    {
      recipeURL: "",
      recipePictureURL: "",
      recipeType: -1,
      recipeName: ""
    }

    recipeExtactedURL = request.source.recipePictureURL;
    recipeInfo.recipeName = request.source.recipeName;
    $("#recipeName").val(recipeInfo.recipeName);
    $("#recipePicture").attr("src", request.source.recipePictureURL);
  }
});

function addSiteToVault() {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;

    chrome.storage.sync.get(['recipes'],
      function (savedRecipeList) 
      {
        let recipeInfo =
        {
          recipeURL: "",
          recipePictureURL: "",
          recipeType: -1,
          recipeName: ""
        }
        let activeRecipeList = savedRecipeList.recipes;
        if (!Array.isArray(activeRecipeList)) {
          activeRecipeList = [];
        }
        recipeInfo.recipeURL = url;
        recipeInfo.recipePictureURL = recipeExtactedURL;
        recipeInfo.recipeType = stringToRecipeTypeInt($('#recipe-type-dropdown').find(":selected").text());
        recipeInfo.recipeName = $("#recipeName").val();

        activeRecipeList.push(recipeInfo);
        chrome.storage.sync.set({ 'recipes': activeRecipeList }, function () {
          // update active site here
        });
        refreshVault();
        $("div.reicpe-entry").empty();
      }
    );
  }
  );
}


function pageLoad() {
  el('#add-button').addEventListener('click', addSiteToVault);
  el('#vault-button').addEventListener('click', loadVault);
  querySite();
}

pageLoad();
