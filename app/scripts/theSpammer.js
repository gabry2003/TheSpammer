/**
 * Bot per spammare messaggi su Whatsapp Web, Telegram Web, Google Meet e Facebook Messenger
 * 
 * @author Gabriele Princiotta
 * @version 1.0
 */
let messaggi; // Messaggi da inviare
let modalita = 0; // Modalita' invio messaggi
let chatOrig; // Chat quando il bot e' partito
let msgIndex = 0; // Contatore del messaggio che sto attualmente mandando
let lastIndex = 0; // Contatore del messaggio che sto attualmente mandando (per metterlo in pausa e ricordarsi a quanti era arrivato)
let limite = null; // Limite di messaggi
let msgCount = 0; // Contatore dei messaggi inviati
let lastCount = 0; // Contatore dei messaggi inviati (per metterlo in pausa e ricordarsi a quanti era arrivato)
let lastTime = 0; // Ultimo tempo impostato
let spammerOnline = false; // Se il bot e' attivo
let partito = false; // Se il bot e' partito almeno una volta
let inPausa = false; // Se il bot e' stato messo in pausa

/**
 * Funzione per inviare una notifica toast con sweetalert
 * 
 * @author Gabriele Princiotta
 * @function
 * @version 1.0
 * @param {string} titolo titolo della notifica
 * @param {string} [tipo='success'] tipo della notifica (di default success)
 */
const notifica = (titolo, tipo = 'success') => {
    swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        icon: tipo,
        title: titolo
    });
    return 0;
}

/**
 * Funzione per effettuare un log piu' bello esteticamente
 * 
 * @function
 * @author Gabriele Princiotta
 * @version 1.0
 * @param {*} testo Testo da loggare
 * @param {*} [colore='#bada55'] Colore del testo
 * @param {*} [sfondo='#222'] Colore di sfondo
 */
const spammerLog = (testo, colore = '#bada55', sfondo = '#222') => {
    console.log('%c ' + testo, 'background: ' + sfondo + '; color: ' + colore + '; font-weight: bold;');
}

if (window.location.href.includes("https://web.whatsapp.com")) {
    spammerLog("Siamo su Whatsapp Web");
} else if (window.location.href.includes("https://web.telegram.org")) {
    spammerLog("Siamo su Telegram Web");
} else if (window.location.href.includes("https://meet.google.com")) {
    spammerLog("Siamo su Google Meet");
} else if (window.location.href.includes("messenger.com")) {
    spammerLog("Siamo su Facebook Messenger");
}

/**
 * Ritorna il nome della chat attuale
 */
const getChatName = () => {
    let el;
    if (window.location.href.includes('web.whatsapp.com')) { // Se siamo su Whatsapp Web
        el = document.querySelectorAll('#main span._1hI5g._1XH7x._1VzZY')[0];
    } else if (window.location.href.includes('web.telegram.org')) { // Se siamo su Telegram Web
        el = document.querySelectorAll('span.tg_head_peer_title')[0];
    } else if (window.location.href.includes('messenger.com')) { // Se siamo su Messenger
        el = document.getElementsByClassName('bafdgad4 tkr6xdv7')[0].getElementsByClassName('a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7 ltmttdrg g0qnabr5')[0];
    } else if (window.location.href.includes('meet.google.com')) { // Se siamo su Meet
        console.log('Su Meet non bisogna entrare in una chat!');
        return '';
    } else if (window.location.href.includes('instagram.com/direct/')) {
        el = document.getElementsByClassName('PjuAP')[0].getElementsByClassName('Igw0E IwRSH eGOV_ ybXk5 _4EzTm')[0];
    }

    // Se e' aperta una chat
    if (typeof(el) !== 'undefined' && el !== null) {
        return el.innerText;
    } else { // Altrimenti
        console.log('el1 non trovato');
        return ''; // Ritorno una stringa vuota
    }
};

/**
 * Funzione che controlla se sei in una chat, solamente se sei su whatsapp web o telegram web
 * 
 * @param {*} [confronto=null] 
 */
const checkChatName = (confronto = null) => {
    if (window.location.href.includes('web.whatsapp.com') || window.location.href.includes('web.telegram.org') || window.location.href.includes('messenger.com') || window.location.href.includes('instagram.com/direct/')) {

        let cond = getChatName() !== ''; // La condizione iniziale e' che sia dentro una chat
        if (confronto !== null) { // Se ha passato un valore da confrontare

            // Aggiungo che questo valore sia uguale alla chat attuale
            cond = cond && getChatName() == confronto;
        }

        return cond;

    } else { // Negli altri casi
        return true;
    }
};

/**
 * Funzione per inviare un messaggio
 * 
 * @function
 * @author Gabriele Princiotta
 * @version 1.0
 * @param {string} msg Messaggio da inviare nella chat attuale
 */
const sendMsgBot = (msg) => {
    // Campo di input
    let inputEl;
    if (window.location.href.includes('https://web.whatsapp.com')) { // Se siamo su Whatsapp Web
        inputEl = document.querySelectorAll('#main ._1awRl.copyable-text.selectable-text')[0];
    } else if (window.location.href.includes('https://web.telegram.org')) { // Se siamo su Telegram Web
        inputEl = document.querySelectorAll('.composer_rich_textarea')[0];
    } else if (window.location.href.includes('https://meet.google.com')) { // Se siamo su Meet
        inputEl = document.querySelectorAll('textarea.KHxj8b.tL9Q4c')[0];
    } else if (window.location.href.includes('messenger.com')) { // Se siamo su Messenger
        inputEl = document.querySelectorAll('div.notranslate._5rpu [data-text=true]')[0];
    } else if (window.location.href.includes('instagram.com/direct/')) {
        inputEl = document.getElementsByClassName('Igw0E IwRSH eGOV_ _4EzTm L-sTb HcJZg')[0].getElementsByTagName('textarea')[0];
    }

    if (typeof(inputEl) !== 'undefined' && inputEl !== null) { // Se esiste il campo di input
        let buttonEl;
        try {
            if (window.location.href.includes('https://web.whatsapp.com')) { // Se siamo su Whatsapp Web
                inputEl.innerHTML = msg; // Inserisco il messaggio nel campo di input
                // Simulo il bubbling sul campo di input
                inputEl.dispatchEvent(new Event('input', {
                    bubbles: true
                }));
                buttonEl = document.querySelectorAll('._3qpzV button._2Ujuu')[0]; // Pulsante per inviare il messaggio
                buttonEl.click(); // Clicco il pulsante per inviare il messaggio
            } else if (window.location.href.includes("https://web.telegram.org")) { // Se siamo su Telegram Web
                inputEl.innerHTML = msg; // Inserisco il messaggio nel campo di input
                buttonEl = document.getElementsByClassName("im_submit")[0];
                buttonEl.dispatchEvent(new Event("mousedown"));
            } else if (window.location.href.includes("https://meet.google.com")) { // Se siamo su Meet
                inputEl.value = msg; // Inserisco il messaggio nel campo di input
                // Simulo il bubbling sul campo di input
                inputEl.dispatchEvent(new Event('input', {
                    bubbles: true
                }));
                buttonEl = document.querySelectorAll(".uArJ5e.Y5FYJe.cjq2Db.IOMpW.Cs0vCd.M9Bg4d .XuQwKc")[0]; // Pulsante per inviare il messaggio
            } else if (window.location.href.includes("messenger.com")) { // Se siamo su Messenger
                // Simulo l'inserimento del testo da tastiera
                document.getElementsByClassName('rq0escxv datstx6m k4urcfbm a8c37x1j')[0].querySelectorAll('[data-text=true]')[0].dispatchEvent(new InputEvent('textInput', { data: msg, bubbles: true }));
                buttonEl = document.querySelectorAll('[aria-label="Premi Invio per inviare"]')[0]; // Pulsante per inviare il messaggio
                buttonEl.click(); // Clicco il pulsante per inviare il messaggio
            } else if (window.location.href.includes('instagram.com/direct/')) {
                inputEl.value = msg; // Inserisco il messaggio nel campo di input
                inputEl.dispatchEvent(new Event('input', {
                    bubbles: true
                }));
                buttonEl = document.getElementsByClassName('Igw0E IwRSH eGOV_ _4EzTm L-sTb HcJZg')[0].getElementsByClassName('sqdOP yWX7d y3zKF')[0];
                buttonEl.click();
            }
        } catch (err) {
            console.error('Impossibile inviare il messaggio!');
            console.error(err);
        }
    }
};

/**
 * Funzione principale del bot
 */
const ohMyBot = () => {
    let chatAttuale = getChatName(); // Nome della chat attuale
    let msg; // Messaggio da inviare
    if (chatAttuale !== "") spammerLog("Chat attuale: " + chatAttuale);
    if (checkChatName(chatOrig)) { // Se non ha cambiato chat ed e' aperta una chat oppure non siamo ne' su telegram web ne' su whatsapp web
        if (modalita == 1) { // Se devo mandarlo in modo casuale
            msgIndex = Math.round(Math.random() * (messaggi.length - 1)); // Genero un indice casuale come contatore
        }
        msg = messaggi[msgIndex];
        sendMsgBot(msg);
        if (modalita == 0) { // Se a giro devo inviarli tutti
            if (msgIndex == (messaggi.length - 1)) { // Se sono alla fine dell'array
                msgIndex = 0; // Ritorno al primo elemento
            } else { // Altrimenti
                msgIndex++; // Passo al messaggio successivo
            }
        }
        if (limite !== null) { // Se e' stato impostato un limite
            msgCount++; // Incremento il contatore dei messaggi inviati
            if (msgCount == limite) { // Se sono al limite
                stopBot(); // Stoppo il bot
            }
        }
    }
};

/**
 * @description Variabile che contiene il bot, per poterlo dopo fermare
 */
theSpammer = null;
/**
 * Funzione per far partire il bot
 * 
 * @author Gabriele Princiotta
 * @function
 * @version 1.0
 * @param {number} [mod] modalita' invio messaggi (0 = tutti a giro, 1 = in modo casuale)
 * @param {number} [botTime] tempo di attesa tra l'invio di un messaggio e l'invio di un altro (in millisecondi)
 * @param {string} [chatName] 
 * @param {string[]} [messages=['Messaggio]] 
 * @param {number} [lim=null] 
 * @param {boolean} [isResume=false] 
 */
// chatName = chat destinataria dei messaggi
const startBot = (mod = 0, botTime = 333, chatName = '', messages = ['Messaggio'], lim = null, isResume = false) => { // Funzione per far partire il bot
    lastTime = botTime; // Modifico l'ultimo tempo impostato
    messaggi = messages; // Modifico i messaggi
    limite = lim; // Modifico il liimte
    modalita = mod; // Modifico la modalita'
    spammerOnline = true; // Modifico lo stato del bot
    partito = true; // Specifico che il bot e' partito almeno una volta
    isPausa = true;
    if (chatName == '') chatName = getChatName();
    chatOrig = chatName; // Cambio il nome della chat quando il bot comincia
    spammerLog("Chat destinataria: " + chatOrig);
    if (checkChatName()) { // Se e' aperta una chat oppure non siamo ne' su telegram web ne' su whatsapp web

        // Faccio partire la funzione principale del bot ogni tot di tempo (passato come parametro in questa funzione)
        if (isResume) { // Se devo riprendere il bot
            spammerLog("Bot ripartito");
            notifica("Bot ripartito");
        } else { //  Altrimenti
            spammerLog("Bot partito");
            notifica("Bot partito");
        }
        theSpammer = setInterval(function() {
            ohMyBot();
        }, botTime);

    }
};

/**
 * Funzione per stoppare il bot
 * @param {boolean} [pausa=false] 
 */
const stopBot = (pausa = false) => {

    if (spammerOnline) { // Fermo il bot se e' attivo
        limite = null; // Resetto il limite
        msgCount = 0; // Azzero il contatore dei messaggi invati
        msgIndex = 0; // Azzero il messaggio selezionato
        spammerOnline = false; // Modifico lo stato del bot
        clearInterval(theSpammer); // Stoppo il bot
        if (pausa) { // Se devo metterlo in pausa
            isPausa = true;
            spammerLog("Bot messo in pausa");
            notifica("Bot messo in pausa");
        } else { // Altrimenti
            isPausa = false;
            spammerLog("Bot fermato");
            notifica("Bot fermato");
        }
    }
    return 0;
};

/**
 * Funzione per mettere in pausa il bot
 */
const pauseBot = () => {
    if (spammerOnline) { // Metto in pausa il bot se e' attivo
        // Salvo i dati necessari a riprendere dopo
        lastCount = msgCount;
        lastIndex = msgIndex;
        stopBot(true); // Stoppo il bot
        // Rimetto i dati nelle variabili
        msgCount = lastCount;
        msgIndex = lastIndex;
    }
    return 0;
};

/**
 * Funzione per riprendere il bot da dov'era
 */
const resumeBot = () => {
    if (!spammerOnline && partito && isPausa) { // Se il bot era stoppato ed e' partito almeno una volta
        startBot(modalita, lastTime, '', messaggi, limite, true); // Lo faccio partire di nuovo
    }
    return 0;
};

/**
 * Funzione che apre una finestra di dialogo per fare partire il bot in modalita' grafica
 */
const dialogBot = () => {
    spammerLog(`Visualizzo l'alert per scegliere le opzioni e fare partire il bot`);
    let span = document.createElement("span");
    span.innerHTML = "<div class=\"swal-form\"> \
    <p style=\"color:#000;\">Messaggi da inviare, ogni riga un messaggio<br><br></p> \
    <textarea id=\"spammerText\" class=\"nice-input swal-form-field\" style=\"width:100%;color:#000;\"></textarea> \
    <label for=\"spammerText\"></label> \
    <p style=\"color:#000;\"><br>Millisecondi da aspettare tra un messaggio e l'altro<br><br></p> \
    <input id=\"spammerTime\" class=\"nice-input swal-form-field\" type=\"number\" name=\"\" value=1000 style=\"width:100%;color:#000;\"> \
    <label for=\"spammerTime\"></label> \
    <p style=\"color:#000;\"><br>Limite messaggi<br><br></p> \
    <input id=\"spammerLimite\" class=\"nice-input swal-form-field\" type=\"number\" name=\"\" value=0 style=\"width:100%;color:#000;\"> \
    <label for=\"spammerLimite\"></label> \
    <p style=\"color:#000;\"><br>Modalita' invio<br><br></p> \
    <select id=\"spammerMod\" class=\"nice-input swal-form-field\" style=\"color:#000;background-color:#fff;\"> \
        <option value=0 selected style=\"color:#000;background-color:#fff;\">Invio di tutti i messaggi a giro</option> \
        <option value=1 style=\"color:#000;background-color:#fff;\">Scelta causale tra i messaggi</option> \
    </select> \
    <label for=\"spammerMod\"></label> \
</div>";
    swal({
        title: "Impostazioni bot",
        content: span,
        buttons: {
            cancel: "Annulla",
            confirm: "Spamma"
        },
        closeOnClickOutside: false,
        closeOnEsc: false,
        preConfirm: () => {
            return new Promise((resolve, reject) => {
                resolve({
                    a: document.getElementById('spammerText').value,
                    b: document.getElementById('spammerTime').value,
                    c: document.getElementById('spammerLimite').value,
                    d: document.getElementById('spammerMod').value
                });
            });
        }
    }).then((isConfirm) => {
        if (isConfirm) { // Se ha confermato l'inizio del bot
            if (checkChatName()) { // Se e' in una chat ed e' su whatsapp web o telegram web (gli unici due dove ci sono le chat)
                let spammerText = document.getElementById('spammerText').value;
                let spammerTime = document.getElementById('spammerTime').value;
                let spammerLimite = document.getElementById('spammerLimite').value;
                let spammerMod = document.getElementById('spammerMod').value;
                if (spammerText !== "" && spammerTime > 0) { // Se ha inserito tutti i dati necessari

                    let continuare = true; // Se continuare la creazione del nuovo processo
                    if (spammerOnline) { // Se il bot e' in esecuzione
                        stopBot(); // Fermo quello attivo in questo momento
                    }
                    // Faccio partire il bot
                    let lim;
                    if (spammerLimite == 0) { // Se non ha inserito un limite
                        lim = null; // Assegno null
                    } else { // Altrimenti
                        lim = spammerLimite; // Assegno il limite inserito dall'utente
                    }
                    tmp = [];
                    if (spammerText.includes("\n")) { // Se ci sono piu' frasi
                        tmp = spammerText.split("\n");
                    } else { // Altrimenti
                        tmp[0] = spammerText;
                    }
                    console.log(spammerMod);
                    console.log(spammerTime);
                    console.log(tmp);
                    console.log(lim);
                    startBot(spammerMod, spammerTime, "", tmp, lim);

                } else { // Altrimenti

                    swal({
                        title: "Errore",
                        text: "Inserisci i dati necessari per fare partire il bot!",
                        icon: "error",
                        buttons: {
                            confirm: "Chiudi"
                        },
                        closeOnClickOutside: true,
                        closeOnEsc: true,
                        dangerMode: true
                    });

                }
            } else { // Altrimenti

                swal({
                    title: "Errore",
                    text: "Entra in una chat per fare partire il bot!",
                    icon: "error",
                    buttons: {
                        confirm: "Chiudi",

                    },
                    closeOnClickOutside: true,
                    closeOnEsc: true,
                    dangerMode: true
                });

            }
        } else { // Altrimenti
            spammerLog("Operazione annllata!");
        }
    }, function() {
        spammerLog("Operazione annullata!");
    });

    let styleElem = document.head.appendChild(document.createElement('style'));
    styleElem.innerHTML = '.swal-overlay:before { height: 0% !important; }';

    return 0;
};

spammerLog("theSpammer caricato");

let bbrowser;
if (chrome) {
    bbrowser = chrome;
} else {
    bbrowser = browser;
}

bbrowser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.message) {
        case 'dialogBot':
            dialogBot();
            break;
        case 'pauseBot':
            pauseBot();
            break;
        case 'resumeBot':
            resumeBot();
            break;
        case 'stopBot':
            stopBot();
            break;
    }
});