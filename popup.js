document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("emailAddressesContainer");
  
    const getEmailAddresses = `
      const regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g;
      const matches = [];
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
      let node;
      while ((node = walker.nextNode())) {
        let match;
        while ((match = regex.exec(node.textContent))) {
          matches.push(match[1]);
        }
      }
      matches;
    `;
  
    chrome.tabs.executeScript(
      {
        code: getEmailAddresses,
      },
      function (result) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
  
        if (result && result[0] && result[0].length > 0) {
          const emailAddresses = result[0];
          emailAddresses.forEach((email) => {
            const listItem = document.createElement("li");
            listItem.textContent = email;
            container.appendChild(listItem);
          });
        } else {
          container.textContent = "No email addresses found";
        }
      }
    );
  });
  