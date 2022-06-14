


let carts = document.querySelectorAll('.add-cart');
// let goods = document.querySelectorAll('./images');

let products = [
    // breakfast
    {
        name: 'Black Coffee',
        tag: 'blackcoffee',
        price: 2,
        inCart: 0
    },
    {
        name: 'Pancakes',
        tag: 'pancakes',
        price: 5,
        inCart: 0
    },
    {
        name: 'White Coffee',
        tag: 'whitecoffee',
        price: 2,
        inCart: 0
    },
    {
        name: 'Oats',
        tag: 'oats',
        price: 4,
        inCart: 0
    },
    {
        name: 'Latte',
        tag: 'latte',
        price: 3,
        inCart: 0
    },
    {
        name: 'Croissant',
        tag: 'croissant',
        price: 5,
        inCart: 0
    },
    {
        name: 'Iced Latte',
        tag: 'icedlatte',
        price: 3,
        inCart: 0
    }
    
];
//adding eventlistener once add cart button is clicked to add item, the loop the process on each button.

for (let i=0; i < carts.length; i++) { 
    carts[i].addEventListener('click', () => { 
        cartNumbers(products[i]);
        totalCost(products[i])

    })
}


//this function ensures once you refresh a page the cart numbers still remain.
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart-count span').textContent = productNumbers;
    }
}

//this function writes the number of items in local storage to cart.
function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    //this updates the cart numbers when we decrease or increase items.
    if( action == "decrease") {
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cart-count span').textContent = productNumbers - 1;
    }else if( productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart-count span').textContent = productNumbers + 1;
    }else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart-count span').textContent = 1;
    }
    
    // if( productNumbers ) {
    //     localStorage.setItem('cartNumbers', productNumbers + 1);
    //     document.querySelector('.cart-count span').textContent = productNumbers + 1;
    // } else {
    //     localStorage.setItem('cartNumbers', 1);
    //     document.querySelector('.cart-count span').textContent = 1;
    // }  
    
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart +=1;
    }else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));

}
//this function calculates the totalcost of the cart
function totalCost(product, action) {
    // console.log('the product price is', product.price);
    let cartCost = localStorage.getItem('totalCost');
    
    // console.log('my cartCost is', cartCost);
    // console.log(typeof cartCost);

    if( action == "decrease") {
        cartCost = parseInt(cartCost);

        localStorage.setItem('totalCost', cartCost - product.price);
    }else if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }

    
}
//this function populates the cart page
function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products');
    let cartCost = localStorage.getItem('totalCost');

    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="grid justify-items-center m-2">
                <div class="flex py-2 sm:py-2 border border-indigo-200">
                    <form class="mt-2">
                        <div class="products justify-evenly sm:ml-6 sm:space-x-4">
                            <ul role="list" class="sm:flex-col lg:flex-col">
                                <li class="flex py-2 sm:py-2">

                                    <div class="product flex lg:flex-row sm:flex-row py-2 sm:py-2">
                                        <div>
                                            <ion-icon name="trash-outline" class="visible ml-1 text-indigo-900 max-w-2xl mx-auto px-4 sm:py-1 sm:px-2 lg:px-8 flex sm:flex-initial sm:text-center w-4 h-6 "></ion-icon>
                                        </div>
                                    
                                    
                                        <div class="flex-shrink-0">
                                            <img src="./images/${item.tag}.jpg" class="w-24 h-24 rounded-lg object-center object-cover sm:w-32 sm:h-32">
                                        </div>
                                    
                                    
                                        <div class="relative ml-5 flex-1 flex-col justify-between sm:ml-6">
                                            
                                            <div class="item-name flex justify-between sm:grid sm:grid-cols-2">
                                                <div class="pr-6">
                                                    <span>${item.name}</span>
                                                    
                                                </div>
                                            </div>
                                    
                                        
                                        <div class="price mt-4 ">
                                            <span>$${item.price}.00</span>
                                        </div>
                                        </div> 
                                    </div>
                                    

                                
                                    <div class="relative ml-5 flex-initial flex flex-col lg:flex-row justify-between sm:ml-6">
                                            <div class="quantity ml-4 relative justify-between flex sm:flex-row lg:flex-row mt-6 ">
                                            <div>
                                                <ion-icon name="remove-circle-outline" class="decrease h-6 w-6 fill-indigo-800 "></ion-icon>
                                            </div>
                                            <div>
                                                <span class="ml-1 sm:mr-2 h-6 w-6">${item.inCart}</span>
                                            </div>
                                            <div>
                                                <ion-icon name="add-circle-outline" class="increase h-6 w-6 "></ion-icon>
                                            </div>
                                        
                                            </div> 

                                            <div class="subtotal text-end lg:mt-24 pr-6">
                                                $${item.inCart * item.price}.00
                                            </div>
                                    </div>

                                <li>
                            </ul>
                                        
                                    
                        </div>
                    </form>
                </div>
             </div>
                
            `;
        });

        productContainer.innerHTML +=`
        <div class="basketTotalContainer max-w-4xl mx-auto py-8 px-4 sm:py-8 sm:px-6 lg:px-8">
            <div class="px-16 quantity mt-6 sm:ml-32 sm:pl-6">
                <div class="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
                    <div class="flow-root">
                        <dl class="-my-4 text-sm divide-y divide-gray-200">
                            <div class="py-1 flex items-center justify-between">
                                <h4 class="basketTotalTitle text-left">
                                    <b> Total <b>
                                </h4>
                                <h4 class="basketTotal "> $${cartCost}.00 </h4>
                            </div>
                            
                        </dl>
                        
                    </div>
                    
                </div>

                <a href="#"><button type="submit"  class="justify-end w-full bg-indigo-900 border border-transparent rounded-md shadow-sm py-2 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">Purchase</button></a>
                
            </div>
        </div>
        `;
    }

    deleteButtons();
    manageQuantity();
}
//remove button
function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.products .product ion-icon');
    let productName;
    // console.log(productName);
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartItems = localStorage.getItem('productsInCart');
    console.log(cartItems);
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.nextElementSibling.nextElementSibling.firstElementChild.textContent.trim().toLowerCase().replace(/\s+/g, '');
            console.log(productName);

            //this updates the cart numbers.
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            
            //updates the total
            //localStorage.setItem('totalCost', cartCost - (cartItems[productName].price + cartItems[productName].inCart));

            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();



            // console.log(productName);
            // console.log(cartItems[productName].name + " " + cartItems[productName].inCart)
            // console.log("We have " + productNumbers + " products in cart");
        });
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let cartItems = localStorage.getItem('productsInCart');
    let currentQuantity = 0;
    let currentProduct = "";
    
    cartItems = JSON.parse(cartItems);
    // console.log(cartItems);

    for(let i=0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.parentElement.parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.parentElement.parentElement.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            //if statement ensures when you decrease to 1 it sticks there no going to 0
            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers( cartItems[currentProduct], "decrease" );
                totalCost( cartItems[currentProduct], "decrease" );
                localStorage.setItem('productsInCart',JSON.stringify(cartItems));
                displayCart();
            }
        });
    }

    for(let i=0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', () => {
            currentQuantity = increaseButtons[i].parentElement.parentElement.parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.parentElement.parentElement.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers( cartItems[currentProduct], "increase" );
            totalCost( cartItems[currentProduct], "increase" );
            localStorage.setItem('productsInCart',JSON.stringify(cartItems));
            displayCart();
            
        });
    }
}
    

//whenever we load a page first time this functions will run
onLoadCartNumbers();
displayCart();