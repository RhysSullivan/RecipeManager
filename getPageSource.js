// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {

    var recipeInfo =
    {             
                recipeURL: "",
                recipePictureURL: "",
                recipeType: "",
                recipeName: ""     
    }
    recipeInfo.recipePictureURL = $('meta[property="og:image"]').attr('content');
    recipeInfo.recipeName = $('meta[property="og:title"]').attr('content');
    return recipeInfo;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});