
// Ruta "/ws"
app.get('/ws', async (req, res) => {
  const imageURL = req.query.url;

  if (!imageURL) {
    res.status(400).send('Ups, parece que te olvidaste de proporcionar una URL de imagen');
    return;
  }

  // Verificar si la imagen está en la caché

  if (imageEnCache) {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(rutaDeLaImagenEnCache);
    return;
  }

  try {// Cargar la imagen desde el enlace
    const image = await Jimp.read(url);
    
    // Redimensionar la imagen a 720x1080
    image.resize(360, 720);
    
    // Cargar las marcas de agua
    const watermark1 = await Jimp.read('Wtxt-poster.png');
    const watermark2 = await Jimp.read('Wlogo-poster.png');
    
    // Escala la marca de agua a 1280px de ancho por 720px de alto
    watermark1.resize(360, 720);
    watermark2.resize(360, 720);
    
    // Establece la opacidad de la watermark1 a 0.375 y watermark2 a 0.75
    watermark1.opacity(0.20);
    watermark2.opacity(0.35);
    
    // Combinar las marcas de agua en una sola imagen
    watermark1.composite(watermark2, 0, 0, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 1.0,
      opacityDest: 1.0
    });
    
    // Aplicar la marca de agua a la imagen
    image.composite(watermark1, 0, 0, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 1.0,
      opacityDest: 1.0
    });
    
    // Guardar la imagen en formato JPEG con calidad al 100%
    image.quality(100).scale(1.5).write('p.bin');
    
    // Enviar la imagen como respuesta
    image.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
      if (err) {
        return res.status(500).json({ error: 'Error al generar la imagen' });
      }
      res.header(
        'Content-Type', 'image/jpeg'
      );
      res.send(buffer);
    });
    }
    catch (error) {
      res.status(500).json({ error: 'Error al procesar la imagen' });
  }
});

// Ruta "/p"
app.get('/p', async (req, res) => {
  const imageURL = req.query.url;

  if (!imageURL) {
    res.status(400).send('Ups, parece que te olvidaste de proporcionar una URL de imagen');
    return;
  }

  // Verificar si la imagen está en la caché

  if (imageEnCache) {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(rutaDeLaImagenEnCache);
    return;
  }

  try {// Cargar la imagen desde el enlace
    const image = await Jimp.read(url);
    
    // Redimensionar la imagen a 720x1080
    image.resize(720, 1080);
    
    // Cargar las marcas de agua
    const watermark1 = await Jimp.read('Wtxt-poster.png');
    const watermark2 = await Jimp.read('Wlogo-poster.png');
    
    // Escala la marca de agua a 1280px de ancho por 720px de alto
    watermark1.resize(720, 1080);
    watermark2.resize(720, 1080);
    
    // Establece la opacidad de la watermark1 a 0.375 y watermark2 a 0.75
    watermark1.opacity(0.20);
    watermark2.opacity(0.35);
    
    // Combinar las marcas de agua en una sola imagen
    watermark1.composite(watermark2, 0, 0, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 1.0,
      opacityDest: 1.0
    });
    
    // Aplicar la marca de agua a la imagen
    image.composite(watermark1, 0, 0, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 1.0,
      opacityDest: 1.0
    });
    
    // Guardar la imagen en formato JPEG con calidad al 100%
    image.quality(100).scale(1.5).write('p.bin');
    
    // Enviar la imagen como respuesta
    image.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
      if (err) {
        return res.status(500).json({ error: 'Error al generar la imagen' });
      }
      res.header(
        'Content-Type', 'image/jpeg'
      );
      res.send(buffer);
    });
    }
    catch (error) {
      res.status(500).json({ error: 'Error al procesar la imagen' });
  }
});

// Ruta "/b"
app.get('/b', async (req, res) => {
  const imageURL = req.query.url;

  if (!imageURL) {
    res.status(400).send('Ups, parece que te olvidaste de proporcionar una URL de imagen');
    return;
  }

  // Verificar si la imagen está en la caché

  if (imageEnCache) {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(rutaDeLaImagenEnCache);
    return;
  }

  try {// Cargar la imagen desde el enlace
    const image = await Jimp.read(url);

    // Redimensionar la imagen a 1280x720
    image.resize(1280, 720);

    // Cargar las marcas de agua
    const watermark1 = await Jimp.read('Wtxt-Backdrop.png');
    const watermark2 = await Jimp.read('Wlogo-Backdrop.png');

    // Escala la marca de agua a 1280px de ancho por 720px de alto
    watermark1.resize(1280, 720);
    watermark2.resize(1280, 720);

    // Establece la opacidad de la watermark1 a 0.375 y watermark2 a 0.75
    watermark1.opacity(0.25);
    watermark2.opacity(1);
    
    // Combinar las marcas de agua en una sola imagen
    watermark1.composite(watermark2, 0, 0, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 1.0,
      opacityDest: 1.0
    });
    
    // Aplicar la marca de agua a la imagen
    image.composite(watermark1, 0, 0, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 1.0,
      opacityDest: 1.0
    });
    
    // Guardar la imagen en formato JPEG con calidad al 100%
    image.quality(100).scale(1.5).write('p.bin');
    
    // Enviar la imagen como respuesta
    image.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
      if (err) {
        return res.status(500).json({ error: 'Error al generar la imagen' });
      }
      res.header(
        'Content-Type', 'image/jpeg'
      );
      res.send(buffer);
    });
    }
    catch (error) {
      res.status(500).json({ error: 'Error al procesar la imagen' });
  }
});