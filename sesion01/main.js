///////////////////
//  COMENTARIOS  //
///////////////////

// Para crear un comentario de una sola línea utilizamos dos barras (//)
// Si queremos escribir un comentario de varias líneas utilizamos /* y */

/*
  Comentario de varias líneas
  una lina
  otra linea
  mas lineas...
*/

/////////////////
//  VARIABLES  //
/////////////////

/*

En Javascript tenemos dos maneras de declarar variables:

- var -> Ya no se recomienda utilizarla
- let

Si tenemos una variable que tenga un nombre de más de una palabra, se recomienda
utilizar "camelCase", es decir, la primera palabra en minúscula, y las siguientes
palabras en mayúscula

*/

// let edad = 20

// Para imprimir cualquier cosa en la consola usamos:
// console.log(edad)

//////////////////
//  CONSTANTES  //
//////////////////

/*

Las constantes son variables que no pueden cambiar su valor, una vez que se
les asigna un valor, no se puede cambiar. Para declarar una constante utilizamos
la palabra reservada "const"

*/

// Recomendación: utilizar siempre mayusculas para las constantes

const PI = 3.1416

//////////////////////
//  TIPOS DE DATOS  //
//////////////////////

// Datos primitivos //

/*

- String -> Cadena de caracteres
- number -> enteros, decimales, positivos y negativos
- boolean -> true o false
- null -> valor nulo
- undefined -> valor indefinido
- Symbol -> valor único
- Bigint -> enteros muy grandes

*/

// String

let nombre = "Juan"
let apellido = 'Perez'

let frase = 'A Juan le dicen "El perezoso"'
let frase2 = "A Juan le dicen 'El perezoso'"

// - Strings literales

let mensaje = `Hola, mi nombre es ${nombre} y mi apellido es ${apellido}`

// - Contatenación de caracteres
let mensaje2 = "Hola, mi nombre es " + nombre + " y mi apellido es " + apellido

console.log(mensaje2)

// number
let entero = 10
let decimal = 10.5
let negativo = -10
let positivo = 12

let infinitiPositivo = Infinity
let infinitiNegativo = -Infinity
let noEsUnNumero = NaN

console.log(isNaN(nombre))

// boolean
let verdadero = true
let falso = false

// null
// Tiene valor nulo, no es undefined ni tampoco 0
let nulo = null

// undefined
let indefinido = undefined
let sinDefinir

// valor por defecto de las variables
console.log(sinDefinir)

// Datos de referencia //

/*

Objects -> Colección de propiedades
Arrays -> Lista de elementos
Functions -> Bloques de código que se pueden reutilizar

*/

// Objects
const persona = {
  nombre: "Juan",
  edad: 20,
  mayorDeEdad: true,
  direccion: {
    calle: "Av. Siempre Viva",
    numero: 123,
  },
  saludar: function () {
    console.log("Buenos días")
  },
  0: "Hola",
}

// Notación punto (.) para acceder al valor de una propiedad de un objeto
console.log(persona.nombre)

// Notación corchete ([]) para acceder al valor de una propiedad de un objeto
console.log(persona["edad"])

// SI una propiedad no existe en el objeto, la podemos agregar luego
persona.comidaFavorita = "Pizza"
persona["cancionFavorita"] = "La bomba"

console.log(persona.comidaFavorita)
console.log(persona.cancionFavorita)

// Arrays (arreglos, lista, vector)
// Lista de elementos de cualquier tipo

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const mezclados = [1, "Hola", true, null, undefined, [1, 2, 3]]

const contactos = [
  {
    nombre: "Juan",
    telefono: "123456789",
  },
  {
    nombre: "Pedro",
    telefono: "987654321",
  },
  {
    nombre: "Maria",
    telefono: "123456789",
  }
]

console.log(mezclados.length)

// Funciones

// Funcion nombrada
function saludar() {
  // Bloque de código
  console.log("Hola desde una funcion")
}

saludar()

// Funcion anónima
const saludarTodos = function () {
  // Bloque de código
  console.log("Hola a todos desde una funcion anonima")
}

saludarTodos()

// Funcion flecha
const saludarAmigos = () => {
  // Bloque de codigo
  console.log("Hola amigos desde una funcion flecha")
}

saludarAmigos()

// Parámetros y argumentos

// Parametros -> Variables que se declaran en la definición de la función
const saludarPersona = (nombre) => {
  console.log(`Hola ${nombre}`)
}

// Argumentos -> Valor que se pasan a una funcion
saludarPersona("Juan")

// Retorno de funciones
const sumar = (num1, num2) => {
  // Recomendación: guardar lo que vamos a devolver en una variable
  let resultado = num1 + num2

  return resultado
}

let resultado = sumar(10, 20)
console.log(resultado)


//////////////////////////////
//  ESTRUCTURAS DE CONTROL  //
//////////////////////////////

// if
// if else
// switch

// if -> Hacer algo si se cumple una condición
// let edad = 20

// if (edad >= 18) {
//   console.log("Es mayor de edad")
// }

// if else -> Hacer algo si se cumple una condición, y otra cosa si no se cumple

// if (edad <= 18) {
//   console.log("Aún no eres adulto")
// } else {
//   console.log("Ya eres adulto")
// }

// if ... else -> Hacer algo si se cumple una condición, y otra cosa si no se
// cumple (múltiples condiciones)

// if (edad === 20) {
//   console.log("Tienes 20 años")
// } else if (edad === 21) {
//   console.log("Tienes 21 años")
// } else {
//   console.log("Tienes otra edad")
// }

// switch -> Evaluar una variable, y hacer algo dependiendo del valor de la variable

// switch (edad) {
//   case 20:
//     // Bloque de codigo
//     console.log("Tienes 20 años")
//     break
//   case 21:
//     // Bloque de codigo
//     console.log("Tienes 21 años")
//     break
//   default:
//     // Bloque de codigo
//     console.log("Tienes otra edad")
// }

////////////////////////////////
//  ESTRUCTURAS DE REPETICIÓN //
////////////////////////////////

// for -> Hacer algo un número determinado de veces

for (let i = 0; i < 10; i = i + 1) {
  console.log(i)
}

// while -> Hacer algo mientras se cumpla una condición

let edad = 21

while (edad < 21) {
  console.log(edad)
  edad = edad + 1
}

// do while -> Hacer algo al menos una vez, y mientras se cumpla una condición

do {
  console.log(edad) // 21
  edad = edad + 1 // 22
} while (edad < 21)
