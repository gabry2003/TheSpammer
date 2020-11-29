let bbrowser;
if(chrome) {
	bbrowser = chrome;
}else {
	bbrowser = browser;
}

/*bbrowser.tabs.insertCSS({
    file: '/assets/css/font.css'
});*/

const getCurrentTabUrl = (callback) => {
	const queryInfo = {
		active: true,
		currentWindow: true
    };
    
	bbrowser.tabs.query(queryInfo, (tabs) => {
		const tab = tabs[0];
		const url = tab.url;
		callback(url);
	});
}

const renderURL = (statusText) => {
	const pageWhatsapp = 'https://web.whatsapp.com';
	const pageTelegram = 'https://web.telegram.org';
    const pageMeet = 'https://meet.google.com';
    const pageMessenger = 'messenger.com';
    
    bbrowser.tabs.executeScript({
        code: `console.log('URL attuale');console.log('${statusText}');`
    });

    if (statusText.includes(pageWhatsapp) || statusText.includes(pageTelegram) || statusText.includes(pageMeet) || statusText.includes(pageMessenger)) {   // Se l'utente e' su whatsapp web o su telegram web
        // Fai partire il bot
        document.getElementById('start-bot').addEventListener('click', () => {
            bbrowser.tabs.executeScript({
                code: 'dialogBot();'
            });
        });

        // Metti in pausa il bot
        document.getElementById('pause-bot').addEventListener('click', () => {
            bbrowser.tabs.executeScript({
                code: 'pauseBot();'
            });
        });

        // Riprendi il bot
        document.getElementById('resume-bot').addEventListener('click', () => {
            bbrowser.tabs.executeScript({
                code: 'resumeBot();'
            });
        });

        // Ferma il bot
        document.getElementById('stop-bot').addEventListener('click', () => {
            bbrowser.tabs.executeScript({
                code: 'stopBot();'
            });
        });
    }else { // Altrimenti, se e' su un'altra pagina
        // Cambio il testo
        document.getElementById('start-bot').innerHTML = 'Apri Whatsapp Web';
        document.getElementById('pause-bot').innerHTML = 'Apri Telegram Web';
        document.getElementById('resume-bot').innerHTML = 'Apri Google Meet';
		document.getElementById('stop-bot').innerHTML = 'Apri Facebook Messenger';

        // Inserisco gli eventi
        document.getElementById('start-bot').addEventListener('click', () => {
            window.open(pageWhatsapp,'_blank');
        });
        document.getElementById('pause-bot').addEventListener('click', () => {
            window.open(pageTelegram,'_blank');
        });
        document.getElementById('resume-bot').addEventListener('click', () => {
            window.open(pageMeet,'_blank');
        });
		document.getElementById('stop-bot').addEventListener('click', () => {
            window.open('https://messenger.com','_blank');
        });

    }
}

document.addEventListener('DOMContentLoaded', () => {
	getCurrentTabUrl((url) => {
		renderURL(url);
	});
});
