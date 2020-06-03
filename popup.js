// Fai partire il bot
document.getElementById('start-bot').addEventListener('click', function() {
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
document.getElementById('pause-bot').addEventListener('click', function() {
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
document.getElementById('resume-bot').addEventListener('click', function() {
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
document.getElementById('stop-bot').addEventListener('click', function() {
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
