// DARKMODE
const outerSlider = document.querySelector(".darkmode-outer");
const innerSlider = document.querySelector(".darkmode-inner");

outerSlider.addEventListener('click', () => {
    const onOff = outerSlider.getAttribute("data-darkmode");
    const onOffInner = innerSlider.getAttribute("data-darkmode");
    if (onOff === "false") {
        outerSlider.setAttribute("data-darkmode", true);
        innerSlider.setAttribute("data-darkmode", true);
        document.querySelector("body").style.background = "#232323";
    } else {
        outerSlider.setAttribute("data-darkmode", false);
        innerSlider.setAttribute("data-darkmode", false);
        document.querySelector("body").style.background = "var(--clr-blue)";
    }
});

// NAVBAR 

const navBar = document.querySelector(".wrapper");
const burgerToggle = document.querySelector(".burger");

burgerToggle.addEventListener('click', () => {
    const onScreen = navBar.getAttribute("data-visible");
    if (onScreen === "false") {
        navBar.setAttribute("data-visible", true);
        burgerToggle.setAttribute("data-visible", true);
        setTimeout(function() {
                burgerToggle.setAttribute("src", "img/cross.png");
        }, 300);
    } else {
        navBar.setAttribute("data-visible", false);
        burgerToggle.setAttribute("data-visible", false);
        setTimeout(function() {
                burgerToggle.setAttribute("src", "img/burg.png");
        }, 300);
    }
});

// ADDITEM TO CART

var buttonAdd = document.getElementsByClassName("store-item-button");
var storeItem = document.getElementsByClassName("store-item");

for (var i = 0; i < buttonAdd.length; i++) {
    var buttonAddItem = buttonAdd[i]
    buttonAddItem.addEventListener('click', addToCart) 
}

function addToCart(event) {
    $(".bottom-cart").fadeIn(300);
    var buttonAddItem = event.target
    var shopItem = buttonAddItem.parentElement
    var title = shopItem.getElementsByClassName("title")[0].innerText;
    var stringPrice = shopItem.getElementsByClassName("price")[0].innerText;
    var price = parseFloat(stringPrice.replace(`$`, ``))
    var imgSource = shopItem.children[0].getAttribute("src");
    var quantityElement = document.getElementsByClassName("quantity")
    addItem(title, price, imgSource);
    quantityCheck(quantityElement)
    totalCheck()
}

// GET DATA FOR ITEM

function addItem(title, price, imgSource) {
    var cartItems = document.getElementsByClassName("cart-item")
    for (i = 0; i < cartItems.length; i++) {
        if (cartItems[i].querySelector(".cart-item-title").innerText === title) {
        cartItems[i].querySelector(".quantity").value++
        // totalCheck()
        return;
        }
    }
    $(".bottom-cart").prepend(`<div class="cart-item">
    <span><img src="${imgSource}" /></span>
    <span><p class="cart-item-title">${title}</p></span>
    <span><p class="cart-item-price">$${price}</p></span>
    <span><div class="button button-minus">-</div><input class="quantity" type="number" value="1" min="1"><div class="button button-plus">+</div></span>
  </div>`)
//   totalCheck()
}

// CHECK TOTAL

function quantityCheck(quantityElement) {

for (i = 0; i < quantityElement.length; i++) {
        

    quantityElement[i].addEventListener('change', () => {
        
        totalCheck()
    })
}
}




function totalCheck() {
    var cartItems = document.getElementsByClassName("cart-item")
    var cartLength = cartItems.length
    var totalElement = document.querySelector(".total")
    var quantityElement = document.getElementsByClassName("quantity")
    var total = 0
    var totalItems = 0
    
    for (i = 0; i < cartLength; i++) {
        var cartItem = cartItems[i];
        var priceElement = cartItem.getElementsByTagName("p")[1]
        var price = parseFloat(priceElement.innerText.replace("$", ""))
        quantity = parseInt(quantityElement[i].value)
        console.log(quantityElement[i].value, quantity)

        

        if (quantity <= 0) {
            quantity = 1;
            quantityElement[i].value = 1;
        }
        total = total + price * quantity
        totalItems = totalItems + quantity

        
       
    }
    newFunction(cartItem, cartLength);
    total = Math.round(total * 100) / 100
 
    if (totalItems === 1) {
        totalElement.innerText = `You have ${totalItems} item in cart. Total: $${total}`
        } else {
        totalElement.innerText = `You have ${totalItems} items in cart. Total: $${total}`
    }
    
}

$(".button-remove").click(function() {
    $(".bottom-cart").fadeOut(300);
    $("div").remove(".cart-item");
});



// PLUS MINUS 

function newFunction(cartItem, cartLength) {
    var minusButton = cartItem.getElementsByClassName("button-minus")[0];
    var plusButton = cartItem.getElementsByClassName("button-plus")[0];

    minusButton.addEventListener('click', () => {
            var minusValue = parseInt(cartItem.querySelector(".quantity").value);
            minusValue--
    });
    plusButton.addEventListener('click', () => {
            var plusValue = parseInt(cartItem.querySelector(".quantity").value);
            plusValue++
            console.log(plusValue)
    });
}