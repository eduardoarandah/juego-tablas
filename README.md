# Aprende las tablas de multiplicar

Jugar online: [https://juego-tablas.pages.dev/](https://juego-tablas.pages.dev/)

# diseño del juego

El objetivo del juego es ganar todos los animalitos aprendiendo las tablas de multiplicar.
Cada uno de los animales los ganas cuando contestas correctamente una tabla de multiplicar.
El juego guarda en la memoria del navegador el progreso.
Cuando se responde correctamente, incrementa en memoria el numero de victorias

## Home

Se muestra:

- un titulo "Gana todos los animalitos"
- las tablas completadas con su animal
- la lista de premios ganados

ejemplo:

```
Gana todos los animalitos

Tabla del 1 🐰
Tabla del 2 🐶
Tabla del 3 🐹
Tabla del 4
Tabla del 5
Tabla del 6
Tabla del 7
Tabla del 8
Tabla del 9
Tabla del 10

Premios:

🐶🐕🦮🐕‍🦺🐩🐱🐈🐈‍⬛🐵🐒
```

## Tabla de multiplicar

Al entrar a una tabla, nos va a hacer las 10 preguntas, por ejemplo cuanto es 4x1, 4x2, 4x3 ...
Cuando se responde correctamente, se pasa al numero siguiente.
si el numero es incorrecto, no pasa al siguiente.

Ejemplo:

```
Tabla del 4

Cuánto es 4x3 ?
[_____]

volver a jugar
```

## Final del juego

Al completar el juego se muestra:

- El titulo "Felicidades! has ganado a:
- El animalito siguiente de la lista de premios dependiendo de la cantidad de victorias.
- un botón para "volver a jugar". Al dar click en "volver a jugar" se resetea el progreso y se incrementa en memoria la cantidad de victorias.

Notas:

Si la cantidad de victorias excede a los premios, repetir el último premio

## debug:

```js
// agregar progreso
localStorage.setItem(
  "progress",
  JSON.stringify({
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
    11: true,
    12: true,
  }),
);

// establecer victorias
localStorage.setItem("wins", 10);
```
