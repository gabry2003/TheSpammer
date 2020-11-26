chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
        chrome.tabs.insertCSS(tabId, {
					file: "https://fonts.googleapis.com/css?family=Neucha|Cabin+Sketch&display=swap"
				});
    }
})

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null,
   {
		 file: "https://fonts.googleapis.com/css?family=Neucha|Cabin+Sketch&display=swap"
	 });
});

function getCurrentTabUrl(callback) {
	var queryInfo = {
		active: true,
		currentWindow: true
	};
	chrome.tabs.query(queryInfo, (tabs) => {
		var tab = tabs[0];
		var url = tab.url;
		callback(url);
	});
}

function renderURL(statusText) {
	let pageWhatsapp = "https://web.whatsapp.com";
	let pageTelegram = "https://web.telegram.org";
    let pageMeet = "https://meet.google.com";
	let pageMessenger = "messenger.com";

    if (statusText.includes(pageWhatsapp) || statusText.includes(pageTelegram) || statusText.includes(pageMeet) || statusText.includes(pageMessenger)) {   // Se l'utente e' su whatsapp web o su telegram web

        // Fai partire il bot
        document.getElementById('start-bot').addEventListener('click', () => {
            if(chrome.tabs) {
                chrome.tabs.executeScript({
                    code: "dialogBot();"
                });
            }else {
                browser.tabs.executeScript({
                    code: "dialogBot();"
                });
            }
        });

        // Metti in pausa il bot
        document.getElementById('pause-bot').addEventListener('click', () => {
            if(chrome.tabs) {
                chrome.tabs.executeScript({
                    code: "pauseBot();"
                });
            }else {
                browser.tabs.executeScript({
                    code: "pauseBot();"
                });
            }
        });

        // Riprendi il bot
        document.getElementById('resume-bot').addEventListener('click', () => {
            if(chrome.tabs) {
                chrome.tabs.executeScript({
                    code: "resumeBot();"
                });
            }else {
                browser.tabs.executeScript({
                    code: "resumeBot();"
                });
            }
        });

        // Ferma il bot
        document.getElementById('stop-bot').addEventListener('click', () => {
            if(chrome.tabs) {
                chrome.tabs.executeScript({
                    code: "stopBot();"
                });
            }else {
                browser.tabs.executeScript({
                    code: "stopBot();"
                });
            }
        });

    }else { // Altrimenti, se e' su un'altra pagina

        // Cambio il testo
        document.getElementById('start-bot').innerHTML = "Apri Whatsapp Web";
        document.getElementById('pause-bot').innerHTML = "Apri Telegram Web";
        document.getElementById('resume-bot').innerHTML = "Apri Google Meet";
				document.getElementById('stop-bot').innerHTML = "Apri Facebook Messenger";

        // Inserisco gli eventi
        document.getElementById('start-bot').addEventListener('click', () => {
            window.open(pageWhatsapp,"_blank");
        });
        document.getElementById('pause-bot').addEventListener('click', () => {
            window.open(pageTelegram,"_blank");
        });
        document.getElementById('resume-bot').addEventListener('click', () => {
            window.open(pageMeet,"_blank");
        });
				document.getElementById('stop-bot').addEventListener('click', () => {
            window.open("https://messenger.com","_blank");
        });

    }
}

document.addEventListener('DOMContentLoaded', () => {
	getCurrentTabUrl((url) => {
		renderURL(url);
	});
});
