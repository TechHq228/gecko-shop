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
        document.querySelector("body").style.background = "#fff";
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
    totalCheck()
    quantityCheck(quantityElement)
}

// GET DATA FOR ITEM

function addItem(title, price, imgSource) {
    var cartItems = document.getElementsByClassName("cart-item")
    for (i = 0; i < cartItems.length; i++) {
        if (cartItems[i].querySelector(".cart-item-title").innerText === title) {
        /* var popup = document.querySelector(".popup")
        var popupRemove = document.querySelector(".popup img")
        popup.getAttribute("data-visible")
        popup.setAttribute("data-visible", true)
        popupRemove.addEventListener('click', () => {
        popup.setAttribute("data-visible", false)
        }) */
        
        cartItems[i].querySelector(".quantity").value++
        console.log(cartItems[i].querySelector(".quantity").value)
        totalCheck()
        return;
        }
    }
    $(".bottom-cart").prepend(`<div class="cart-item">
    <span><img src="${imgSource}" /></span>
    <span><p class="cart-item-title">${title}</p></span>
    <span><p class="cart-item-price">$${price}</p></span>
    <span><input class="quantity" type="number" value="1" min="1"></span>
  </div>`)
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
    
    for (i = 0; i < cartLength; i++) {
        var cartItem = cartItems[i];
        var priceElement = cartItem.getElementsByTagName("p")[1]
        var price = parseFloat(priceElement.innerText.replace("$", ""))
        quantity = parseInt(quantityElement[i].value)
        if (quantity === 0) {
            quantity = 1;
            quantityElement[i].value = 1;
        }
        total = total + price * quantity
        quantity = quantity++
        console.log(quantityElement[i].value)
        console.log(quantity)
    }
    total = Math.round(total * 100) / 100
 
    if (cartLength === 1) {
        totalElement.innerText = `You have ${cartLength} item in cart. Total: $${total}`
        } else {
        totalElement.innerText = `You have ${cartLength} items in cart. Total: $${total}`
    }
    
}

$(".button-remove").click(function() {
    $(".bottom-cart").fadeOut(300);
    $("div").remove(".cart-item");
});

// QUANTITY CHECK
