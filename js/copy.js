const copyToClipboard = (id) => {
      const text = document.getElementById(id).innerText;
      navigator.clipboard.writeText(text)
        .then(() => {
          console.log('Copiado el siguiente texto al portapapeles: ' + text);
          showMessage('¡Texto copiado!');
        })
        .catch((error) => {
          console.error('Error al copiar el texto: ' + error);
        });
    };
    
    const showMessage = (message) => {
      const messageContainer = document.getElementById('messageContainer');
      const messageElement = document.createElement('div');
      messageElement.innerText = message;
      messageElement.classList.add('message', 'active');
    
      // Insertamos el nuevo mensaje al final del contenedor
      messageContainer.appendChild(messageElement);
    
      setTimeout(() => {
        messageElement.classList.remove('active');
        setTimeout(() => {
          messageContainer.removeChild(messageElement);
        }, 100);
      }, 4000);
    };
    
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    const copyTextById = (id, button) => {
      if (isIOS) {
        return copyIOS(id);
      }
    
      copyToClipboard(id);
      button.innerHTML = '<i class="fa-solid fa-clipboard-check"></i> Copiado';
    
      setTimeout(() => {
        button.innerHTML = '<i class="fa-regular fa-clipboard"></i> Copiar';
      }, 2000);
    };
    
    window.copyTextById = copyTextById;