# QR Studio

QR Studio es una aplicacion web responsiva para convertir enlaces en codigos QR visualmente personalizables, con una interfaz moderna y lista para usarse desde el navegador.

## Vista general

Con esta app puedes pegar una URL, personalizar el estilo del QR y descargarlo listo para compartir. Tambien permite incrustar un logo dentro del codigo con una placa circular blanca que mejora la presencia visual y ayuda a conservar el contraste.

## Caracteristicas

- Generacion de QR en tiempo real.
- Personalizacion de colores principales, secundarios y fondo.
- Cambio de formas para puntos y esquinas.
- Ajuste de tamano y margenes.
- Carga de logo personalizado.
- Logo centrado en una placa circular blanca con sombra suave.
- Descarga del resultado en PNG y SVG.
- Funcionamiento directo desde `index.html`.
- Diseno responsivo para escritorio y movil.

## Demo local

1. Abre `index.html` en tu navegador.
2. Escribe o pega el enlace que quieras convertir.
3. Ajusta colores, formas, tamano y margenes.
4. Sube un logo si quieres personalizar el QR.
5. Descarga el resultado en PNG o SVG.

## Estructura del proyecto

- `index.html`: estructura principal de la interfaz.
- `styles.css`: estilos visuales y comportamiento responsivo.
- `app.js`: logica de personalizacion, render del QR y tratamiento del logo.

## Capturas

Puedes agregar una carpeta `assets/` y colocar aqui tus imagenes para mostrar la app en GitHub.

```md
![Vista principal](./assets/preview-1.png)
![QR con logo](./assets/preview-2.png)
```

## Tecnologias

- HTML
- CSS
- JavaScript
- [qr-code-styling](https://github.com/kozakdenys/qr-code-styling)

## Nota tecnica

La app carga fuentes y la libreria del generador QR desde CDN. Para usarla tal como esta, conviene abrirla con conexion a internet.

## Autor

Proyecto preparado para el repositorio [QRTCT](https://github.com/vijumolo/QRTCT).
