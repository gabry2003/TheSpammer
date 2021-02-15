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

(async() => {
    try {
        const temaScuro = (await getStorageData('temaScuro')).temaScuro;
        console.log(`GET temaScuro=${temaScuro}`);
        document.getElementById('tema-scuro').checked = temaScuro;
    } catch (e) {
        console.error(e);
    }
})();

document.getElementById('tema-scuro').addEventListener('change', function() {
    bbrowser.runtime.sendMessage({
        method: 'setTheme',
        value: document.getElementById('tema-scuro').checked
    });
});