chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScripting({
    target: { tabId: tab.id },
    func: () => alert("Hello world"),
  });
});
