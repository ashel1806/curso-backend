/*

Código síncrono que simula el lanzamiento de un dado tantas veces como se indique

*/

// Número de lanzamientos que se realizarán
const iterations = 10;
// Arreglo de números donde se guardarán los resultados de los lanzamientos
const numbers = [];

for (let i = 0; i < iterations; i++) {
  // Obtenemos un número aleatorio entre 1 y 6
  const number = 1 + Math.floor(Math.random() * 6);
  // Agregamos el número al arreglo
  numbers.push(number);

  // Si el número es 6, mostramos un error y salimos del bucle
  if (number === 6) {
    console.log("ERROR");
    break;
  }
}

// Mostramos los números
console.log(numbers);



/* CALLBACKS */

/*

Los callbacks son funciones que se pasan como argumento a otras funciones
y que se ejecutan dentro de estas.

*/

// const doTask = (iterations, callback) => {
//   const numbers = [];

//   for (let i = 0; i < iterations; i++) {
//     /* Obtenemos un número aleatorio entre 1 y 6 */
//     const number = 1 + Math.floor(Math.random() * 6);
//     console.log('Numero: ', number);
//     numbers.push(number);

//     if (number === 6) {
//       /* Error, se ha sacado un 6 */
//       callback({
//         error: true,
//         message: "Se ha obtenido un 6",
//       });
//       return;
//     }
//   }

//   /* Termina el bucle y no se ha sacado un 6 */
//   return callback(null, {
//     error: false,
//     value: numbers,
//   });
// };

// doTask(10, (error, result) => {
//   if (error) {
//     console.error('Error:', error.message);
//     return;
//   }

//   console.log('Tiradas correctas: ',result.value);
// })

/* PROMESAS */

/*

Las promesas son objetos que representan el resultado de una operación asíncrona.

Pueden tener tres estados:

- Pendiente (pending): se espera un resultado
- Resuelta (fulfilled): se cumple la promesa y se devuelve un resultado
- Rechazada (rejected): no se cumple la promesa y se devuelve un error

*/

// const doTask = (iterations) => new Promise((resolve, reject) => {
//   const numbers = [];

//   for (let i = 0; i < iterations; i++) {
//     /* Obtenemos un número aleatorio entre 1 y 6 */
//     const number = 1 + Math.floor(Math.random() * 6);
//     console.log(number);
//     numbers.push(number);

//     if (number === 6) {
//       /* Error, se ha sacado un 6 */
//       reject({
//         error: true,
//         message: "Se ha obtenido un 6",
//       });

//       return;
//     }
//   }

//   /* Termina el bucle y no se ha sacado un 6 */
//   resolve({
//     error: false,
//     value: numbers,
//   });
// });

// const miPromesa = doTask(10);

// miPromesa
//   .then((result) => console.log('Tiradas correctas: ', result.value))
//   .then(() => console.log('Fin del programa'))
//   .catch((error) => console.error('Ha ocurrido un error: ', error.message))

/* ASYNC/AWAIT */

/*

Es una nueva estructura de control que nos permite manejar las promesas de forma
más sencilla y entendidble.

- La palabra async debe ir al momento de declarar una función que será asíncrona,
es decir, devolverá una promesa.

- La palabra await debe ir dentro de una función asíncrona y funciona para esperar
a que una promesa se resuelva.

*/

// const doTask = async (iterations) => {
//   const numbers = [];

//   for (let i = 0; i < iterations; i++) {
//     /* Obtenemos un número aleatorio entre 1 y 6 */
//     const number = 1 + Math.floor(Math.random() * 6);
//     console.log(number);
//     numbers.push(number);

//     if (number === 6) {
//       /* Error, se ha sacado un 6 */
//       return {
//         error: true,
//         message: "Se ha obtenido un 6",
//       };
//     }
//   }

//   /* Termina el bucle y no se ha sacado un 6 */
//   return {
//     error: false,
//     value: numbers,
//   };
// };

// const otraFuncion = async () => {
//   try {
//     const result = await doTask(10);

//     if (result.error) {
//       throw new Error(result.message);
//     }

//     console.log('Tiradas correctas: ', result.value);
//   } catch (error) {
//     console.error(error);
//   }
// }

// otraFuncion();

/* OBJETOS 2 */

// Objetos literales (objects literals)

const persona = {
  nombre: "Pepe",
  edad: 23,
};

const coche = new Object();

// Notación de punto

coche.marca = "Ford";
coche.modelo = "Fiesta";

persona.apellido = "Vasquez";

// Notación de corchetes
coche["color"] = "Verde";

persona["altura"] = 1.70

coche["numero de llantas"] = 4;

let propiedadNueva = "propietario";

coche[propiedadNueva] = "Pepe";

// Propiedades computadas (computed properties)
let combustible = "gasolina"
let tipoDeCombustible = `tipo de ${combustible}`;

const moto = {
  marca: "Honda",
  modelo: "CBR",
  año: 2020,
  [tipoDeCombustible]: "10W40",
};

console.log(coche);
console.log(persona);
console.log(moto);

// Eliminar una propiedad
delete coche.color;
delete coche["numero de llantas"];

console.log(coche);

/* ARREGLOS 2 */

const numeros = [1, 2, 3, 4]

const frutas = new Array("Manzana", "Pera", "Sandía");
const verduras = new Array(3);

console.log(verduras);

/* MUTABILIDAD */

/* Capacidad de modificar el estado original de un arreglo u objeto */

// Agrego un elemento al arreglo frutas
frutas.push("Fresa");

// Veo que mi arreglo original se ha modificado
console.log(frutas);

// Agrego elementos al arreglo frutas, pero ahora devuelvo el nuevo arreglo
// con los nuevos elementos agregados
const nuevasFrutas = frutas.concat("Naranja", "Mango");

// El nuevo arreglo tiene los elementos agregados
console.log(nuevasFrutas);

// El arreglo original no se ha modificado
console.log('Arreglo original: ', frutas);

/* METODOS DE ARREGLO */

// map()

const numerosCuadrados = numeros.map((numero, idx, array) => {
  console.log(`Elemento del índice ${idx}: ${numero}`);
  console.log("Arreglo original: ", array);
  return numero * numero;
})

console.log(numerosCuadrados);

// find()

const numeroPar = numeros.find((numero) => numero % 2 === 0);

console.log(numeroPar);

// reduce()
const sumaTotal = numeros.reduce((acumulador, numero) => {
  // Valor inicial -> acumulador = 0
  // Primera iteración -> numero = 1, acumulador = 0
  // Segunda iteración -> numero = 2, acumulador = 1
  // Tercera iteración -> numero = 3, acumulador = 3
  // Cuarta iteración -> numero = 4, acumulador = 6
  return acumulador + numero;
},  0);

console.log(sumaTotal);

/* REST Y SPREAD OPERATORS (...) */

/* REST */

/*

Se usa para comprimir varios valores, en un arreglo o en un objeto.

*/

const guardarDatos = (nombre, apellido, ...otrosDatos) => {
  console.log(nombre); // Pepe
  console.log(apellido); // Vasquez
  console.log(otrosDatos); // [23, "Calle falsa 123", true, {}]
}

guardarDatos("Pepe", "Vasquez", 23, "Calle falsa 123", true, {});

/* DESTRUCTURACION */

/*

Es una forma de extraer valores de un arreglo o de un objeto.

*/

const paises = ["Peru", "Canada", "Mexico", "Chile"]

const [primerPais, ...otrosPaises] = paises;

// const [...otrosPaises2, ultimoPais] = paises;
// El operador rest debe ir al final, no al principio

console.log(primerPais); // Peru
console.log(otrosPaises); // ["Canada", "Mexico", "Chile"]

const person = {
  name: "Pepe",
  age: 23,
  country: "Peru",
}

// Al destructurar un objeto, se debe usar el mismo nombre de la propiedad
// En este caso queremos extraer la propiedad name, y el resto de las propiedades
// las queremos guardar en un objeto llamado otrosDatos
const { name, ...otrosDatos2 } = person;

console.log(name); // Pepe
console.log(otrosDatos2); // { age: 23, country: "Peru" }

/* SPREAD */

/*

Se usa para expandir un arreglo o un objeto.

*/

const marcasDeAutos = ["Ford", "Chevrolet", "Toyota"];
const marcasDeMotos = ["Honda", "Yamaha", "Suzuki"];

// Unimos los dos arreglos en uno solo
const marcas = [...marcasDeAutos, ...marcasDeMotos];

console.log(marcas);
// ["Ford", "Chevrolet", "Toyota", "Honda", "Yamaha", "Suzuki"]

const address = {
  street: "Calle falsa 123",
  city: "Lima",
  country: "Peru",
}

// Expandimos el objeto person2 con las propiedades del objeto address
const person2 = {
  name: "Alberto",
  ...address,
}

console.log(person2);
// { name: "Alberto", street: "Calle falsa 123", city: "Lima", country: "Peru" }


// También se puede usar para pasar parámetros a una función
const parametros = ["Pepe", "Vasquez", "PE"];

const imprimirInfo = (nombre, apellido, pais) => {
  console.log(nombre); // Pepe
  console.log(apellido); // Vasquez
  console.log(pais); // PE
}

imprimirInfo(...parametros);
