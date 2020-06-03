// Author: Gabriele Princiotta
// Package: Whatsapp Spammer
// Description: Bot per spammare messaggi su Whatsapp Web

var messaggi;   // Messaggi da inviare
var modalita = 0;   // Modalita' invio messaggi
var chatOrig;   // Chat quando il bot e' partito
var msgIndex = 0;    // Contatore del messaggio che sto attualmente mandando
var lastIndex = 0;  // Contatore del messaggio che sto attualmente mandando (per metterlo in pausa e ricordarsi a quanti era arrivato)
var limite = null;  // Limite di messaggi
var msgCount = 0;   // Contatore dei messaggi inviati
var lastCount = 0;  // Contatore dei messaggi inviati (per metterlo in pausa e ricordarsi a quanti era arrivato)
var lastTime = 0;   // Ultimo tempo impostato
var whatsOnline = false;    // Se il bot e' attivo
var partito = false; // Se il bot e' partito almeno una volta
var inPausa = false;    // Se il bot e' stato messo in pausa

// Description: Funzione per inviare una notifica toast con sweetalert
// Usage:
// titolo = titolo della notifica
// tipo = tipo della notifica (di default success)
function notifica(titolo,tipo = "success") {
    swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
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
function whatsLog(testo,colore = "#bada55",sfondo = "#222") {
    console.log('%c ' + testo, 'background: ' + sfondo + '; color: ' + colore + '; font-weight: bold;');
}
// Description: Funzione che ritorna il nome della chat attuale
// Usage: Non ha parametri
function getChatName() {
    let el = $("._16vzP ._3XrHh ._1wjpf._3NFp9._3FXB1");
    // Se e' aperta una chat
    if(typeof(el) !== 'undefined' && el !== null) {
        return el.text();
    }else { // Altrimenti
        console.log("el1 non trovato");
        return "";  // Ritorno una stringa vuota
    }
}
// Description_ Funzione per inviare un messaggio
// Usage: 
// msg = Messaggio da inviare nella chat attuale
function sendMsgBot(msg) {
    // Campo di input
    let inputEl = document.querySelectorAll("._3F6QL._2WovP ._2S1VP.copyable-text.selectable-text")[0];
    console.log(inputEl);
    if(typeof(inputEl) !== 'undefined' && inputEl !== null) {   // Se esiste il campo di input
        inputEl.innerHTML = msg;    // Inserisco il messaggio nel campo di input
        // Simulo il bubbling sul campo di input
        inputEl.dispatchEvent(new Event('input', {
            bubbles: true
        }));
        let buttonEl = $("._35EW6");    // Pulsante per inviare il messaggio
        if(typeof(buttonEl) !== 'undefined' && buttonEl !== null) { // Se esiste il pulsante di invio del messaggio
            buttonEl.click();   // Clicco il pulsante per inviare il messaggio
        }else {
            console.error("Impossibile inviare il messaggio!");
        }
    }
}
// Description: Funzione principale del bot
// Usage: Non ha parametri
function ohMyBot() {
    let chatAttuale = getChatName();  // Nome della chat attuale
    let msg;    // Messaggio da inviare
    if(chatAttuale !== "") whatsLog("Chat attuale: " + chatAttuale);
    if(chatAttuale == chatOrig && chatAttuale !== "") {   // Se non ha cambiato chat ed e' aperta una chat
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
}
// Variabile che contiene il bot, per poterlo dopo fermare
whatsBot = null;
// Description: Funzione per far partire il bot
// Usage:
// mod = modalita' invio messaggi
//      0 = tutti a giro
//      1 = in modo casuale
// botTime = tempo di attesa tra l'invio di un messaggio e l'invio di un altro (in millisecondi)
// chatName = chat destinataria dei messaggi
function startBot(mod = 0,botTime = 333,chatName = "",messages = new Array("Messaggio"),lim = null,isResume = false) {   // Funzione per far partire il bot
    lastTime = botTime; // Modifico l'ultimo tempo impostato
    messaggi = messages;    // Modifico i messaggi
    limite = lim;   // Modifico il liimte
    modalita = mod; // Modifico la modalita'
    whatsOnline = true; // Modifico lo stato del bot
    partito = true; // Specifico che il bot e' partito almeno una volta
    isPausa = true;
    if(chatName == "") chatName = getChatName();
    chatOrig = chatName;  // Cambio il nome della chat quando il bot comincia
    whatsLog("Chat destinataria: " + chatOrig);
    if(chatName !== "") {   // Se e' aperta una chat
        // Faccio partire la funzione principale del bot ogni tot di tempo (passato come parametro in questa funzione)
        if(isResume) {   // Se devo riprendere il bot
            whatsLog("Bot ripartito");
            notifica("Bot ripartito");
        }else { //  Altrimenti
            whatsLog("Bot partito");
            notifica("Bot partito");
        }
        whatsBot = setInterval(function() {
          ohMyBot();
        },botTime);
    }
}
// Description: Funzione per stoppare il bot
// Usage: Non ha parametri
function stopBot(pausa = false) {
    if(whatsOnline) {   // Fermo il bot se e' attivo
        limite = null;  // Resetto il limite
        msgCount = 0;   // Azzero il contatore dei messaggi invati
        msgIndex = 0;  // Azzero il messaggio selezionato
        whatsOnline = false;    // Modifico lo stato del bot
        clearInterval(whatsBot);    // Stoppo il bot
        if(pausa) { // Se devo metterlo in pausa
            isPausa = true;
            whatsLog("Bot messo in pausa");
            notifica("Bot messo in pausa");
        }else { // Altrimenti
            isPausa = false;
            whatsLog("Bot fermato");
            notifica("Bot fermato");
        }
    }
    return 0;
}
// Description: Funzione per mettere in pausa il bot
// Usage: Non ha parametri
function pauseBot() {
    if(whatsOnline) {   // Metto in pausa il bot se e' attivo
        // Salvo i dati necessari a riprendere dopo
        lastCount = msgCount;
        lastIndex = msgIndex;
        stopBot(true);  // Stoppo il bot
        // Rimetto i dati nelle variabili
        msgCount = lastCount;
        msgIndex = lastIndex;
    }
    return 0;
}
// Description: Funzione per riprendere il bot da dov'era
// Usage: Non ha parametri
function resumeBot() {
    if(!whatsOnline && partito && isPausa) {  // Se il bot era stoppato ed e' partito almeno una volta
        startBot(modalita,lastTime,"",messaggi,limite,true);    // Lo faccio partire di nuovo
    }
    return 0;
}
// Description: Funzione che apre una finestra di dialogo per fare partire il bot in modalita' grafica
// Usage: Non ha parametri
function dialogBot() {
    whatsLog("Visualizzo l'alert per scegliere le opzioni e fare partire il bot");
    var span = document.createElement("span");
    span.innerHTML = "<div class=\"swal-form\"> \
    <p>Messaggi da inviare, ogni riga un messaggio<br><br></p> \
    <textarea id=\"whatsText\" class=\"nice-input swal-form-field\" style=\"width:100%;\"></textarea> \
    <label for=\"whatsText\"></label> \
    <p><br>Millisecondi da aspettare tra un messaggio e l'altro<br><br></p> \
    <input id=\"whatsTime\" class=\"nice-input swal-form-field\" type=\"number\" name=\"\" value=1000 style=\"width:100%;\"> \
    <label for=\"whatsTime\"></label> \
    <p><br>Limite messaggi<br><br></p> \
    <input id=\"whatsLimite\" class=\"nice-input swal-form-field\" type=\"number\" name=\"\" value=0 style=\"width:100%;\"> \
    <label for=\"whatsLimite\"></label> \
    <p><br>Modalita' invio<br><br></p> \
    <select id=\"whatsMod\" class=\"nice-input swal-form-field\" style=\"color:#000;background-color:#fff;\"> \
        <option value=0 selected style=\"color:#000;background-color:#fff;\">Invio di tutti i messaggi a giro</option> \
        <option value=1 style=\"color:#000;background-color:#fff;\">Scelta causale tra i messaggi</option> \
    </select> \
    <label for=\"whatsMod\"></label> \
</div>";
    swal({
        title: "Impostazioni bot", 
        content: span,
        buttons: {
            cancel: "Annulla",
            confirm: "Spamma"
        },
        footer: '<a href="http://gabriprinciott.altervista.org">Sito sviluppatore</a>',
        closeOnClickOutside: false,
        closeOnEsc: false,
        preConfirm: function () {
            return new Promise((resolve, reject) => {
                resolve({
                    a: $('#whatsText').val(),
                    b: $('#whatsTime').val(),
                    c: $('#whatsLimite').val(),
                    d: $('#whatsMod').val()
                });
            });
        }
    }).then(function(isConfirm) {
        if(isConfirm) { // Se ha confermato l'inizio del bot
            if(getChatName() !== "") {  // Se e' in una chat
                let whatsText = $('#whatsText').val();
                let whatsTime = $('#whatsTime').val();
                let whatsLimite = $('#whatsLimite').val();
                let whatsMod = $("#whatsMod").val();
                if(whatsText !== "" && whatsTime > 0) { // Se ha inserito tutti i dati necessari
                    let continuare = true; // Se continuare la creazione del nuovo processo
                    if(whatsOnline) {   // Se il bot e' in esecuzione
                        stopBot();  // Fermo quello attivo in questo momento
                    }
                    // Faccio partire il bot
                    let lim;
                    if(whatsLimite == 0) {   // Se non ha inserito un limite
                        lim = null; // Assegno null
                    }else { // Altrimenti
                        lim = whatsLimite;   // Assegno il limite inserito dall'utente
                    }
                    tmp = [];
                    if(whatsText.includes("\n")) { // Se ci sono piu' frasi
                        tmp = whatsText.split("\n");
                    }else { // Altrimenti
                        tmp[0] = whatsText;
                    }
                    console.log(whatsMod);
                    console.log(whatsTime);
                    console.log(tmp);
                    console.log(lim);
                    startBot(whatsMod,whatsTime,"",tmp,lim);
                }else { // Altrimenti
                    swal({
                        title: "Errore",
                        text: "Inserisci i dati necessari per fare partire il bot!",
                        icon: "error",
                        buttons: {
                            confirm: "Chiudi"
                        },
                        footer: '<a href="http://gabriprinciott.altervista.org">Sito sviluppatore</a>',
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
                    footer: '<a href="http://gabriprinciott.altervista.org">Sito sviluppatore</a>',
                    closeOnClickOutside: true,
                    closeOnEsc: true,
                    dangerMode: true
                });
            }
        }else { // Altrimenti
            whatsLog("Operazione annllata!");
        }
    },function() {
        whatsLog("Operazione annullata!");
    });
    return 0;
}
whatsLog("WhatsBot caricato");