let bbrowser;
if (chrome) {
    bbrowser = chrome;
} else {
    bbrowser = browser;
}

const getStorageData = key =>
    new Promise((resolve, reject) =>
        bbrowser.storage.local.get(key, result =>
            bbrowser.runtime.lastError ?
            reject(Error(bbrowser.runtime.lastError.message)) :
            resolve(result)
        )
    );

const getCurrentTabUrl = (callback) => {
    bbrowser.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const tab = tabs[0];
        const url = tab.url;
        callback(url, tab.id);
    });
}

const renderURL = (url, id) => {
    const pageWhatsapp = 'web.whatsapp.com';
    const pageTelegram = 'web.telegram.org';
    const pageMeet = 'meet.google.com';
    const pageMessenger = 'messenger.com';
    const pageInstagram = 'instagram.com/direct/';
    const pageTellonym = 'tellonym.me';
    const pageTeams = 'teams.microsoft.com/';
    const pageZoom = 'zoom.us/';

    // Se l'utente è in un sito dove si spamma
    if (url.includes(pageWhatsapp) || url.includes(pageTelegram) || url.includes(pageMeet) || url.includes(pageMessenger) || url.includes(pageInstagram) || url.includes(pageTellonym) || url.includes(pageTeams) || url.includes(pageZoom)) {
        // Fai partire il bot
        document.getElementById('start-bot').addEventListener('click', () => {
            bbrowser.tabs.sendMessage(id, { 'message': 'dialogBot' });
        });

        // Metti in pausa il bot
        document.getElementById('pause-bot').addEventListener('click', () => {
            bbrowser.tabs.sendMessage(id, { 'message': 'pauseBot' });
        });

        // Riprendi il bot
        document.getElementById('resume-bot').addEventListener('click', () => {
            bbrowser.tabs.sendMessage(id, { 'message': 'resumeBot' });
        });

        // Ferma il bot
        document.getElementById('stop-bot').addEventListener('click', () => {
            bbrowser.tabs.sendMessage(id, { 'message': 'stopBot' });
        });

        document.getElementById('apri-instagram').parentElement.setAttribute('style', 'display: none;');
        document.getElementById('apri-teams').parentElement.setAttribute('style', 'display: none;');
        document.getElementById('apri-tellonym').parentElement.setAttribute('style', 'display: none;');
        document.getElementById('apri-zoom').parentElement.setAttribute('style', 'display: none;');
    } else { // Altrimenti, se e' su un'altra pagina
        // Cambio il testo
        document.getElementById('start-bot').innerHTML = '<img src="popup/images/whatsapp.png" width=33 height=33></img><span> &nbsp;Apri Whatsapp Web</span>';
        document.getElementById('pause-bot').innerHTML = '<img src="popup/images/telegram.png" width=33 height=33></img><span> &nbsp;Apri Telegram Web</span>';
        document.getElementById('resume-bot').innerHTML = '<img src="popup/images/meet.png" width=33 height=33></img><span> &nbsp;Apri Google Meet</span>';
        document.getElementById('stop-bot').innerHTML = '<img src="popup/images/messenger.png" width=33 height=33></img><span> &nbsp;Apri Facebook Messenger</span>';
        document.getElementById('apri-instagram').parentElement.setAttribute('style', '');
        document.getElementById('apri-tellonym').parentElement.setAttribute('style', '');
        document.getElementById('apri-teams').parentElement.setAttribute('style', '');
        document.getElementById('apri-zoom').parentElement.setAttribute('style', '');

        // Inserisco gli eventi
        document.getElementById('start-bot').addEventListener('click', () => {
            window.open('https://web.whatsapp.com', '_blank');
        });
        document.getElementById('pause-bot').addEventListener('click', () => {
            window.open('https://web.telegram.org', '_blank');
        });
        document.getElementById('resume-bot').addEventListener('click', () => {
            window.open('https://meet.google.com', '_blank');
        });
        document.getElementById('stop-bot').addEventListener('click', () => {
            window.open('https://messenger.com', '_blank');
        });
    }
}

document.addEventListener('DOMContentLoaded', async() => {
    try {
        if ((await getStorageData('temaScuro')).temaScuro) {
            document.getElementById('style').setAttribute('href', 'popup/css/stylesDark.css');
        }
    } catch (e) {
        console.error(e);
    }

    getCurrentTabUrl((url, id) => {
        renderURL(url, id);
    });
});