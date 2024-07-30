const copyToClipboard = (id) => {
  const text = document.getElementById(id).innerText; // Get text without including line breaks
  navigator.clipboard.writeText(text) // Write the text to the clipboard
    .then(() => {
      // Success message or UI update
      console.log('Text copied to clipboard: ' + text);
    })
    .catch((error) => {
      // Error handling
      console.error('Failed to copy text: ' + error);
    });
};

// Check if the user agent is an iOS device
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const copyTextById = (id) => {
	if (isIOS) {
		return copyIOS(id);
	}

	copyToClipboard(id);
};

window.copyTextById = copyTextById;