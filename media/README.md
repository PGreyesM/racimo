# Videos del landing

Estos son los tres loops que reemplazan los SVG estáticos en `index.html`. Mientras no estén grabados, la landing muestra los fallback SVG automáticamente — no se rompe nada.

## Qué grabar

Para los tres usá grabador de pantalla (OBS, ShareX, QuickTime). Recorte recomendado: **1280×720** o **1600×900**, **15–25 segundos**, sin audio, formato **mp4** (h264) y opcionalmente **webm** (vp9).

### 1. `racimo-multi-windows.mp4` — Múltiples ventanas
Abrí Racimo. Hacé click en un racimo del sidebar, marcá 3 uvas, abrí las 3. Las ventanas se distribuyen por el lienzo. Arrastrá una. Mostrá los cordones SVG visibles. Cerrá el loop volviendo al estado inicial.

### 2. `racimo-bifurcation.mp4` — Bifurcación
Abrí una conversación que tenga términos `[[entre corchetes]]`. Hacé hover sobre un término (mostrar el highlight ámbar). Cliclá. Aparece la rama nueva con un cordón animado conectándola al término origen.

### 3. `racimo-distill.mp4` — Destilación
Mostrá un racimo con varias uvas/conversaciones. Tocá "destilar". Aparece la síntesis a la derecha. Click en "exportar" → se descarga el documento.

## Cómo exportar

**mp4 (h264, casi todos los navegadores)**:
```
ffmpeg -i input.mov -c:v libx264 -crf 26 -preset slow -an -movflags +faststart racimo-multi-windows.mp4
```

**webm (vp9, alternativa más liviana — opcional)**:
```
ffmpeg -i input.mov -c:v libvpx-vp9 -crf 34 -b:v 0 -an racimo-multi-windows.webm
```

Pesos objetivo: cada uno < 1.5 MB. Si pasan eso, bajá la resolución a 1024×576 o subí `-crf`.

## Cómo funciona el fallback

Mientras los archivos no existan, `<video>` falla silenciosamente y queda visible el `<div class="video-fallback">` con un SVG estilizado. Cuando subís el archivo, el evento `canplay` agrega la clase `.video-ready` al contenedor y el fallback se oculta automáticamente. No hay que tocar el HTML.
