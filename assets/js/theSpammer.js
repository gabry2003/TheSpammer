// Author: Gabriele Princiotta
// Package: The Spammer
// Description: Bot per spammare messaggi su Whatsapp Web, Telegram Web, Google Meet e Facebook Messenger

let messaggi;   // Messaggi da inviare
let modalita = 0;   // Modalita' invio messaggi
let chatOrig;   // Chat quando il bot e' partito
let msgIndex = 0;    // Contatore del messaggio che sto attualmente mandando
let lastIndex = 0;  // Contatore del messaggio che sto attualmente mandando (per metterlo in pausa e ricordarsi a quanti era arrivato)
let limite = null;  // Limite di messaggi
let msgCount = 0;   // Contatore dei messaggi inviati
let lastCount = 0;  // Contatore dei messaggi inviati (per metterlo in pausa e ricordarsi a quanti era arrivato)
let lastTime = 0;   // Ultimo tempo impostato
let spammerOnline = false;    // Se il bot e' attivo
let partito = false; // Se il bot e' partito almeno una volta
let inPausa = false;    // Se il bot e' stato messo in pausa
let elencoChat = [];    // Elenco chat del bot

// Description: Funzione per inviare una notifica toast con sweetalert
// Usage:
// titolo = titolo della notifica
// tipo = tipo della notifica (di default success)
const notifica = (titolo,tipo = '') => {
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

// Description: Funzione per effettuare un log piu' bello esteticamente
// Usage;
// testo = Testo da loggare
// colore = Colore del testo
// sfondo = Colore di sfondo
const spammerLog = (testo,colore = '#bada55',sfondo = '#222') => {
    console.log('%c ' + testo, 'background: ' + sfondo + '; color: ' + colore + '; font-weight: bold;');
}

if(window.location.href.includes("https://web.whatsapp.com")) {
    spammerLog("Siamo su Whatsapp Web");
}else if(window.location.href.includes("https://web.telegram.org")) {
    spammerLog("Siamo su Telegram Web");
}else if(window.location.href.includes("https://meet.google.com")) {
    spammerLog("Siamo su Google Meet");
}else if(window.location.href.includes("messenger.com")) {
    spammerLog("Siamo su Facebook Messenger");
}

// Description: Funzione che ritorna il nome della chat attuale
// Usage: Non ha parametri
const getChatName = () => {
    let el;
    if(window.location.href.includes("https://web.whatsapp.com")) { // Se siamo su Whatsapp Web
        el = $("._2FCjS .DP7CM ._3ko75._5h6Y_._3Whw5");
    }else if(window.location.href.includes("https://web.telegram.org")) {   // Se siamo su Telegram Web
        el = $("span.tg_head_peer_title");
    }else if(window.location.href.includes("messenger.com")) { // Se siamo su Messenger

        el = document.getElementsByClassName("_1jt6 _710_")[0].children[1];
        return el.innerText;

    }else if(window.location.href.includes("https://meet.google.com")) {    // Se siamo su Meet

        console.log("Su Meet non bisogna entrare in una chat!");
        return "";

    }

    // Se e' aperta una chat
    if(typeof(el) !== 'undefined' && el !== null) {
        return el.text();
    }else { // Altrimenti
        console.log("el1 non trovato");
        return "";  // Ritorno una stringa vuota
    }
};

const getElencoChat = () => {
    if(window.location.href.includes("https://web.whatsapp.com")) { // Se siamo su Whatsapp Web
        let elencoChat = [];
        $('.-GlrD._2xoTX ._210SC').each(function() {
            const immagine = $(this).find('._325lp ._1BjNO img').attr('src') || null;
            const nomeContatto = [
                {
                    testo: $(this).find('._357i8 ._3ko75._5h6Y_._3Whw5').text(),
                    emoji: () => {
                        let emojis = '';
                        $(this).find('._357i8 ._3ko75._5h6Y_._3Whw5 img').each(function() {
                            emojis += $(this).attr('alt');
                        });
                        return emojis;
                    }
                },
                {
                    testo: $(this).find('._3CneP ._3ko75._5h6Y_._3Whw5').text(),
                    emoji: () => {
                        let emojis = '';
                        $(this).find('._3CneP ._3ko75._5h6Y_._3Whw5 img').each(function() {
                            emojis += $(this).attr('alt');
                        });
                        return emojis;
                    }
                }
            ];
            const contatto = nomeContatto[0].testo + nomeContatto[0].emoji() || nomeContatto[1].testo + nomeContatto[1].emoji();

            elencoChat.push({
                el: $(this),
                contatto: contatto,
                img: immagine,
                apriChat: () => {
                    console.log(`Apro la chat "${contatto}"`)
                    const el = $(this).find('.eJ0yJ');
                }
            });
        });
        return elencoChat;
    }else {
        return [];
    }
};

// Description: Funzione che controlla se sei in una chat, solamente se sei su whatsapp web o telegram web
// Usage: un parametro opzionale, in caso si voglia confrontare il nome della chat con un altro
const checkChatName = (confronto = null) => {
    if(window.location.href.includes("https://web.whatsapp.com") || window.location.href.includes("https://web.telegram.org") || window.location.href.includes("messenger.com")) {    // Se siamo su whatsapp web o telegram web o messenger

        let cond = getChatName() !== "";    // La condizione iniziale e' che sia dentro una chat
        if(confronto !== null) {    // Se ha passato un valore da confrontare

            // Aggiungo che questo valore sia uguale alla chat attuale
            cond = cond && getChatName() == confronto;
        }

        return cond;

    }else { // Negli altri casi
        return true;
    }
};

// Description_ Funzione per inviare un messaggio
// Usage:
// msg = Messaggio da inviare nella chat attuale
const sendMsgBot = (msg) => {
    // Campo di input
    let inputEl;
    if(window.location.href.includes("https://web.whatsapp.com")) { // Se siamo su Whatsapp Web
        inputEl = document.querySelectorAll("._2FVVk._2UL8j ._3FRCZ.copyable-text.selectable-text")[0];
    }else if(window.location.href.includes("https://web.telegram.org")) {   // Se siamo su Telegram Web
        inputEl = document.querySelectorAll(".composer_rich_textarea")[0];
    }else if(window.location.href.includes("https://meet.google.com")) {    // Se siamo su Meet
        inputEl = document.querySelectorAll("textarea.KHxj8b.tL9Q4c")[0];
    }else if(window.location.href.includes("messenger.com")) { // Se siamo su Messenger
        inputEl = document.querySelectorAll("div.notranslate._5rpu [data-text=true]")[0];
    }

    console.log(inputEl);
    if(typeof(inputEl) !== 'undefined' && inputEl !== null) {   // Se esiste il campo di input

        let buttonEl;
        if(window.location.href.includes("https://web.whatsapp.com")) { // Se siamo su Whatsapp Web

            inputEl.innerHTML = msg;    // Inserisco il messaggio nel campo di input
            // Simulo il bubbling sul campo di input
            inputEl.dispatchEvent(new Event('input', {
                bubbles: true
            }));
            buttonEl = $("._1JNuk ._1U1xa");    // Pulsante per inviare il messaggio
            if(typeof(buttonEl) !== 'undefined' && buttonEl !== null) { // Se esiste il pulsante di invio del messaggio
                buttonEl.click();   // Clicco il pulsante per inviare il messaggio
            }else {
                console.error("Impossibile inviare il messaggio!");
            }

        }else if(window.location.href.includes("https://web.telegram.org")) {   // Se siamo su Telegram Web

            inputEl.innerHTML = msg;    // Inserisco il messaggio nel campo di input
            buttonEl = document.getElementsByClassName("im_submit")[0];
            if(typeof(buttonEl) !== 'undefined' && buttonEl !== null) { // Se esiste il pulsante di invio del messaggio
                buttonEl.dispatchEvent(new Event("mousedown"));
            }else {
                console.error("Impossibile inviare il messaggio!");
            }

        }else if(window.location.href.includes("https://meet.google.com")) {    // Se siamo su Meet

            inputEl.value = msg;    // Inserisco il messaggio nel campo di input
            // Simulo il bubbling sul campo di input
            inputEl.dispatchEvent(new Event('input', {
                bubbles: true
            }));
            buttonEl = $("span.XuQwKc");    // Pulsante per inviare il messaggio
            if(typeof(buttonEl) !== 'undefined' && buttonEl !== null) { // Se esiste il pulsante di invio del messaggio
                buttonEl.click();   // Clicco il pulsante per inviare il messaggio
            }else {
                console.error("Impossibile inviare il messaggio!");
            }

        }else if(window.location.href.includes("messenger.com")) { // Se siamo su Messenger

            // Simulo l'inserimento del testo da tastiera
            document.querySelectorAll("div.notranslate._5rpu [data-text=true]")[0].dispatchEvent(new InputEvent('textInput', {data: msg, bubbles: true}));
            buttonEl = document.querySelectorAll("a[aria-label=Invia]")[0];    // Pulsante per inviare il messaggio
            if(typeof(buttonEl) !== 'undefined' && buttonEl !== null) { // Se esiste il pulsante di invio del messaggio
                buttonEl.click();   // Clicco il pulsante per inviare il messaggio
            }else {
                console.error("Impossibile inviare il messaggio!");
            }

        }

    }
};

// Description: Funzione principale del bot
// Usage: Non ha parametri
const ohMyBot = () => {
    let chatAttuale = getChatName();  // Nome della chat attuale
    let msg;    // Messaggio da inviare
    if(chatAttuale !== "") spammerLog("Chat attuale: " + chatAttuale);
    if(checkChatName(chatOrig)) {   // Se non ha cambiato chat ed e' aperta una chat oppure non siamo ne' su telegram web ne' su whatsapp web
        if(modalita == 1) { // Se devo mandarlo in modo casuale
            msgIndex = Math.round(Math.random() * (messaggi.length - 1));  // Genero un indice casuale come contatore
        }
        msg = messaggi[msgIndex];
        sendMsgBot(msg);
        if(modalita == 0) { // Se a giro devo inviarli tutti
            if(msgIndex == (messaggi.length - 1)) { // Se sono alla fine dell'array
                msgIndex = 0;   // Ritorno al primo elemento
            }else { // Altrimenti
                msgIndex++; // Passo al messaggio successivo
            }
        }
        if(limite !== null) {   // Se e' stato impostato un limite
            msgCount++; // Incremento il contatore dei messaggi inviati
            if(msgCount == limite) {    // Se sono al limite
                stopBot();  // Stoppo il bot
            }
        }
    }
};

// Variabile che contiene il bot, per poterlo dopo fermare
theSpammer = null;
// Description: Funzione per far partire il bot
// Usage:
// mod = modalita' invio messaggi
//      0 = tutti a giro
//      1 = in modo casuale
// botTime = tempo di attesa tra l'invio di un messaggio e l'invio di un altro (in millisecondi)
// chatName = chat destinataria dei messaggi
const startBot = (mod = 0,botTime = 333,chatName = '',messages = ['Messaggio'],lim = null,isResume = false) => {   // Funzione per far partire il bot
    lastTime = botTime; // Modifico l'ultimo tempo impostato
    messaggi = messages;    // Modifico i messaggi
    limite = lim;   // Modifico il liimte
    modalita = mod; // Modifico la modalita'
    spammerOnline = true; // Modifico lo stato del bot
    partito = true; // Specifico che il bot e' partito almeno una volta
    isPausa = true;
    if(chatName == '') chatName = getChatName();
    chatOrig = chatName;  // Cambio il nome della chat quando il bot comincia
    spammerLog("Chat destinataria: " + chatOrig);
    if(checkChatName()) {   // Se e' aperta una chat oppure non siamo ne' su telegram web ne' su whatsapp web

        // Faccio partire la funzione principale del bot ogni tot di tempo (passato come parametro in questa funzione)
        if(isResume) {   // Se devo riprendere il bot
            spammerLog("Bot ripartito");
            notifica("Bot ripartito");
        }else { //  Altrimenti
            spammerLog("Bot partito");
            notifica("Bot partito");
        }
        theSpammer = setInterval(function() {
          ohMyBot();
        },botTime);

    }
};

// Description: Funzione per stoppare il bot
// Usage: Non ha parametri
const stopBot = (pausa = false) => {

    if(spammerOnline) {   // Fermo il bot se e' attivo
        limite = null;  // Resetto il limite
        msgCount = 0;   // Azzero il contatore dei messaggi invati
        msgIndex = 0;  // Azzero il messaggio selezionato
        spammerOnline = false;    // Modifico lo stato del bot
        clearInterval(theSpammer);    // Stoppo il bot
        if(pausa) { // Se devo metterlo in pausa
            isPausa = true;
            spammerLog("Bot messo in pausa");
            notifica("Bot messo in pausa");
        }else { // Altrimenti
            isPausa = false;
            spammerLog("Bot fermato");
            notifica("Bot fermato");
        }
    }
    return 0;
};

// Description: Funzione per mettere in pausa il bot
// Usage: Non ha parametri
const pauseBot = () =>{
    if(spammerOnline) {   // Metto in pausa il bot se e' attivo
        // Salvo i dati necessari a riprendere dopo
        lastCount = msgCount;
        lastIndex = msgIndex;
        stopBot(true);  // Stoppo il bot
        // Rimetto i dati nelle variabili
        msgCount = lastCount;
        msgIndex = lastIndex;
    }
    return 0;
};

// Description: Funzione per riprendere il bot da dov'era
// Usage: Non ha parametri
const resumeBot = () => {
    if(!spammerOnline && partito && isPausa) {  // Se il bot era stoppato ed e' partito almeno una volta
        startBot(modalita,lastTime,"",messaggi,limite,true);    // Lo faccio partire di nuovo
    }
    return 0;
};

// Description: Funzione che apre una finestra di dialogo per fare partire il bot in modalita' grafica
// Usage: Non ha parametri
const dialogBot = () => {
    spammerLog("Visualizzo l'alert per scegliere le opzioni e fare partire il bot");
    elencoChat = getElencoChat();
    console.log(elencoChat);
    elencoChat[0].apriChat();
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
                    a: $('#spammerText').val(),
                    b: $('#spammerTime').val(),
                    c: $('#spammerLimite').val(),
                    d: $('#spammerMod').val()
                });
            });
        }
    }).then((isConfirm) => {
        if(isConfirm) { // Se ha confermato l'inizio del bot
            if(checkChatName()) {  // Se e' in una chat ed e' su whatsapp web o telegram web (gli unici due dove ci sono le chat)
                let spammerText = $('#spammerText').val();
                let spammerTime = $('#spammerTime').val();
                let spammerLimite = $('#spammerLimite').val();
                let spammerMod = $("#spammerMod").val();
                if(spammerText !== "" && spammerTime > 0) { // Se ha inserito tutti i dati necessari

                    let continuare = true; // Se continuare la creazione del nuovo processo
                    if(spammerOnline) {   // Se il bot e' in esecuzione
                        stopBot();  // Fermo quello attivo in questo momento
                    }
                    // Faccio partire il bot
                    let lim;
                    if(spammerLimite == 0) {   // Se non ha inserito un limite
                        lim = null; // Assegno null
                    }else { // Altrimenti
                        lim = spammerLimite;   // Assegno il limite inserito dall'utente
                    }
                    tmp = [];
                    if(spammerText.includes("\n")) { // Se ci sono piu' frasi
                        tmp = spammerText.split("\n");
                    }else { // Altrimenti
                        tmp[0] = spammerText;
                    }
                    console.log(spammerMod);
                    console.log(spammerTime);
                    console.log(tmp);
                    console.log(lim);
                    startBot(spammerMod,spammerTime,"",tmp,lim);

                }else { // Altrimenti

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
            }else { // Altrimenti

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
        }else { // Altrimenti
            spammerLog("Operazione annllata!");
        }
    },function() {
        spammerLog("Operazione annullata!");
    });
    return 0;
};

spammerLog("theSpammer caricato");