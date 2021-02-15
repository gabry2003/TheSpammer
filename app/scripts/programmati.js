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

document.addEventListener('DOMContentLoaded', async() => {
    try {
        if ((await getStorageData('temaScuro')).temaScuro) {
            document.getElementById('style').setAttribute('href', 'programmati/css/stylesDark.css');
        }

        const msgProgrammati = (await getStorageData('msgProgrammati')).msgProgrammati;

        document.getElementById('elenco-messaggi').innerHTML = ``;
        for (let i = 0; i < msgProgrammati.length; i++) {
            document.getElementById('elenco-messaggi').innerHTML += `<li class="cd-accordion__item">
    <a class="cd-accordion__label cd-accordion__label--icon-img" href="javascript: return false;" style="text-decoration: none;">
        <span>${msgProgrammati[i].nome} - ${msgProgrammati[i].orario} &nbsp;
            <img src="popup/images/icons/trash.png" width=33 height=33 onclick="" style="cursor: pointer;">
            <img src="popup/images/icons/pencil.png" width=33 height=33 onclick="" style="cursor: pointer;">
        </span>
    </a>
    <a class="cd-accordion__label cd-accordion__label--icon-img" href="javascript: return false;" style="text-decoration: none;">
        <span class="text-sm" style="display: block;">${msgProgrammati[i].msg}</span>
    </a>
</li>`;
        }
    } catch (e) {
        console.error(e);
    }
});