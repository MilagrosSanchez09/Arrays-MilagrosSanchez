//Variables declaradas
let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');
let buyThings = [];
let totalCard = 0;
let countProduct = 0;

//Clase y objetos.

class Producto{
    constructor(nombre, precio){
        this._nombre = nombre;
        this._precio = precio;
}
}

let producto1 = new Producto('AOFLY SUNGLASSES', '20$')
let producto2 = new Producto('AOFLY SUNGLASSES', '35$')
let producto3 = new Producto('AOFLY SUNGLASSES', '15.50$')
let producto4 = new Producto('AOFLY SUNGLASSES', '20.20$')
let producto5 = new Producto('AOFLY SUNGLASSES', '19$')
let producto6 = new Producto('AOFLY SUNGLASSES', '45$')
let producto7 = new Producto('AOFLY SUNGLASSES', '23.99$')
let producto8 = new Producto('AOFLY SUNGLASSES', '50$')
let producto9 = new Producto('AOFLY SUNGLASSES', '16$')
let producto10 = new Producto('AOFLY SUNGLASSES', '17.50$')
let producto11 = new Producto('AOFLY SUNGLASSES', '45$')

let productos=[]

//Functions
loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct);

    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        
        countProduct--;
    }
    //FIX: El contador se quedaba con "1" aunque Hubiera 0 productos
    if (buyThings.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
}

function readTheContent(product){
    const infoProducto = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProducto.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProducto.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProducto.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProducto]
        countProduct++;
    }
    loadHtml();
    console.log(infoProduct);
}

function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalCard;

        amountProduct.innerHTML = countProduct;
    });
}
 function clearHtml(){
    containerBuyCart.innerHTML = '';
 }