// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {

    return $('meta[property="og:image"]').attr('content');
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});