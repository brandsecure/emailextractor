chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === 'getEmailAddresses') {
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const pageContent = document.body.innerText;
      const emailAddresses = pageContent.match(emailRegex) || [];
      sendResponse({ data: emailAddresses });
    }
  });
  
  