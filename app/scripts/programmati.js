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

document.getElementById('elimina-tutti').addEventListener('click', () => {
    if (confirm('Sicuro di volerli eliminare tutti?')) {
        bbrowser.storage.local.set({
            msgProgrammati: []
        });
        document.getElementById('elenco-messaggi').innerHTML = `<tr class="row100 body">
        <td class="cell100 column1" colspan=4><span class="text-center">Nessun messaggio programmato!</span></td>
    </tr>`;
    }
});

const elimina = async(el, index) => {
    if (confirm('Sicuro di voler eliminare il messaggio?')) {
        let msgProgrammati;
        try {
            msgProgrammati = (await getStorageData('msgProgrammati')).msgProgrammati;

            if (msgProgrammati == undefined) throw Exception();

            msgProgrammati.splice(index, 1);
        } catch (e) {
            msgProgrammati = [];
        }


        bbrowser.storage.local.set({
            msgProgrammati: msgProgrammati
        });

        el.parentElement.parentElement.remove();
    }
};

const modifica = async(index, key, value, el, origClass) => {
    let msgProgrammati;
    try {
        msgProgrammati = (await getStorageData('msgProgrammati')).msgProgrammati;

        if (msgProgrammati == undefined) throw Exception();

        msgProgrammati[index][key] = value;
    } catch (e) {
        msgProgrammati = [];
    }

    try {
        bbrowser.storage.local.set({
            msgProgrammati: msgProgrammati
        });

        el.className += ' td-success';
    } catch (e) {
        console.error(e);

        el.className += ' td-error';
    }

    setTimeout(() => {
        el.className = origClass;
    }, 500);
};

document.addEventListener('DOMContentLoaded', async() => {
    try {
        if ((await getStorageData('temaScuro')).temaScuro) {
            document.getElementById('tabella').className = 'table100 ver3 m-b-110';
            document.getElementById('style').setAttribute('href', 'programmati/css/stylesDark.css');
        } else {
            document.getElementById('tabella').className = 'table100 ver1 m-b-110';
        }

        const msgProgrammati = (await getStorageData('msgProgrammati')).msgProgrammati;

        if (msgProgrammati.length > 0) {
            document.getElementById('elenco-messaggi').innerHTML = ``;
            for (let i = 0; i < msgProgrammati.length; i++) {
                const orarioOrig = msgProgrammati[i].orario;
                const split = orarioOrig.split('T');
                let orario = `${split[0]} alle ${split[1]}`;
                document.getElementById('elenco-messaggi').innerHTML += `<tr class="row100 body">
    <td class="cell100 column1" contenteditable="true" id="msg-${i}">${msgProgrammati[i].msg}</td>
    <td class="cell100 column2" contenteditable="true" id="nome-${i}">${msgProgrammati[i].nome}</td>
    <td class="cell100 column3" contenteditable="true" id="orario-${i}">${orario}</td>
    <td class="cell100 column4" id="orario-${i}">${msgProgrammati[i].piattaforma}</td>
    <td class="cell100 column5">
        <button class="btn btn-danger" id="elimina-${i}">
            <i class="fa fa-trash"></i>
        </button>
    </td>
</tr>`;
                setTimeout(() => {
                    document.getElementById(`msg-${i}`).addEventListener('keypress', async function(e) {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            await modifica(i, 'msg', this.innerHTML, this, 'cell100 column1');
                        }
                    });
                    document.getElementById(`nome-${i}`).addEventListener('keypress', async function(e) {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            await modifica(i, 'nome', this.innerText, this, 'cell100 column2');
                        }
                    });
                    document.getElementById(`orario-${i}`).addEventListener('keypress', async function(e) {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            const split = this.innerText.split(' alle ');
                            await modifica(i, 'orario', `${split[0]}T${split[1]}`, this, 'cell100 column3');
                        }
                    });
                    document.getElementById(`elimina-${i}`).addEventListener('click', async function() {
                        await elimina(this, parseInt(this.id.split('-')[1]));
                    });
                }, 500);
            }
        } else {
            document.getElementById('elenco-messaggi').innerHTML = `<tr class="row100 body">
        <td class="cell100 column1" colspan=4><span class="text-center">Nessun messaggio programmato!</span></td>
    </tr>`;
        }
    } catch (e) {
        console.error(e);
    }
});