let bbrowser;
if (chrome) {
    bbrowser = chrome;
} else {
    bbrowser = browser;
}

bbrowser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch (message.method) {
        case 'setTheme':
            bbrowser.storage.local.set({
                'temaScuro': message.value
            }, function() {
                console.log(`SET temaScuro=${message.value}`);
            });
            break;
    }
});