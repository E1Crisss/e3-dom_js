/* ¡Volvemos a trabajar con nuestro array de Pizzas🍕 !:

Deberán realizar el siguiente desafio: 

👉 A cada Pizza, agregarle una imagen. 
👉 Crear un archivo HTML que contenga un contenedor en el cual se renderice una card en la que deberán renderizar el nombre, imagen, ingredientes y precio de una pizza (Estilizarlo con CSS 🎨). Además, deberán renderizar el mismo input de tipo number y botón de la entrega anterior.

Deberemos colocar un numero en el input y, al apretar el botón, deberá renderizar en el contenedor una card con los datos de la pizza cuyo id coincida con el número ingresado en el input.

🚨 Si el número ingresado no coincide con ningún id, renderizar un mensaje de error en el contenedor. 
🚨 Si no se ingresa un número, renderizar un mensaje de error diferente en el contenedor. 
🚨 En el contenedor se debe renderizar una única cosa , ya sea la pizza buscada y renderizada, o cualquiera de los errores(El error no se guarda en el LS).

¿Cuál es el desafío final?
Deberán guardar en localStorage la última pizza buscada y renderizada, y al recargar la página será esa pizza la que se deberá mostrar en la página.


🆙 Entregar el link de Github , en el cual debe estar linkeado el deploy del Vercel de su aplicación (mediante Github nosotros deberíamos poder ver el Vercel vinculado a su repositorio).  */

const menuPizzas = [];

class Pizzas {
  constructor(id, nombre, ingredientes, precio, image) {
    this.id = id;
    this.nombre = nombre;
    this.ingredientes = ingredientes;
    this.precio = precio;
    this.image = image;
  }
}

let Muzarella = new Pizzas(
  1,
  "Muzarella",
  ["salsa ", "queso muzarella ", "aceituna"],
  1200,
  "assets/p-muzzarella.jpg"
);
let Napolitana = new Pizzas(
  2,
  "Napolitana",
  ["salsa ", "queso muzarella ", "tomate ", "aceituna"],
  1500,
  "assets/p-napo.jpg"
);
let Calabresa = new Pizzas(
  3,
  "Calabresa",
  ["salsa ", "queso muzarella ", "longaniza calabresa cortada en rodajas"],
  1800,
  "assets/p-especial.webp"
);
let Espinaca = new Pizzas(
  4,
  "Espinaca a la crema",
  ["salsa ", "queso muzarella ", "aceituna ", "aceite de oliva ", "espinaca"],
  1700,
  "assets/p-panceta.jpg"
);
let Fugazzetton = new Pizzas(
  5,
  "Fugazzettón",
  [
    "cebolla en juliana ",
    "queso cremoso ",
    "jamón ",
    "tomate al natural ",
    "aceite de oliva ",
    "parmesano ",
  ],
  1800,
  "assets/p-especial.webp"
);
let Primavera = new Pizzas(
  6,
  "Primavera",
  ["palmitos ", "huevo duro ", "morrones ", "salsa golf"],
  2000,
  "assets/p-palmitos.jpg"
);

menuPizzas.push(
  Muzarella,
  Napolitana,
  Calabresa,
  Espinaca,
  Fugazzetton,
  Primavera
);

const btnS = document.getElementById("submit"),
  $hgroup = document.getElementById("render");

const buscarID = () => {
  while ($hgroup.firstChild) {
    $hgroup.removeChild($hgroup.firstChild);
  }

  let inputValue = document.getElementById("numberID").value;

  if (inputValue === "") {
    let inputError = document.getElementById("numberID");
    inputError.setAttribute("aria-invalid", "true");
    let $error = document.createElement("header");
    $error.style.color = "red";
    $error.innerHTML = `<strong>🚨 Ingresar un Numero 🚨<strong>`;
    $hgroup.appendChild($error);
  } else {
    const mostrar = menuPizzas.find((pizza) => pizza.id == inputValue);
    mostrarPizza(mostrar);
    guardarPizza(mostrar);
  }
};

const mostrarPizza = (pizza) => {
  if (pizza) {
    let inputError = document.getElementById("numberID");
    inputError.setAttribute("aria-invalid", "false");
    let $card = document.createElement("article");
    let $name = document.createElement("header");
    let $price = document.createElement("footer");
    let $img = document.createElement("img");
    let $ingredientes = document.createElement("p");
    $ingredientes.innerHTML = `📝<b> Estos son los ingredientes </b> <br>${pizza.ingredientes}`;
    $img.setAttribute("src", pizza.image);
    $name.innerHTML = `🍕 Pizza ${pizza.nombre}`;
    $price.innerHTML = `<p>Precio </p>💲${pizza.precio}`;

    $card.appendChild($name);
    $card.appendChild($img);
    $card.appendChild($ingredientes);
    $card.appendChild($price);
    $hgroup.appendChild($card);
  } else {
    let inputError = document.getElementById("numberID");
    inputError.setAttribute("aria-invalid", "true");

    let $error = document.createElement("header");
    $error.style.color = "red";
    $error.innerHTML = `<strong>🚨 No existe Pizza con esa ID 🚨<strong>`;

    $hgroup.appendChild($error);
  }
};

$hgroup.style.textAlign = "center";

const removeRender = () => {
  document.getElementById("numberID").value = "";
};

btnS.addEventListener("click", (e) => {
  buscarID();
  removeRender();
});

function guardarPizza(pizza) {
  if (pizza) {
    localStorage.setItem("pizza", JSON.stringify(pizza));
  }
}

function checkPizza() {
  const pizzaCheck = localStorage.getItem("pizza");

  if (pizzaCheck) {
    mostrarPizza(JSON.parse(pizzaCheck));
  }
}

checkPizza();
