// DARKMODE
const outerSlider = document.querySelector(".darkmode-outer");
const innerSlider = document.querySelector(".darkmode-inner");

outerSlider.addEventListener('click', () => {
    const onOff = outerSlider.getAttribute("data-darkmode");
    const onOffInner = innerSlider.getAttribute("data-darkmode");
    if (onOff === "false") {
        outerSlider.setAttribute("data-darkmode", true);
        innerSlider.setAttribute("data-darkmode", true);
        document.querySelector("body").style.background = "var(--clr-green-darkest)";
    } else {
        outerSlider.setAttribute("data-darkmode", false);
        innerSlider.setAttribute("data-darkmode", false);
        document.querySelector("body").style.background = "var(--clr-green-dark)";
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
    var cartItems = document.getElementsByClassName("cart-item")
    var quantityElement = document.getElementsByClassName("quantity")
    var id = shopItem.dataset.itemId
    addItem(title, price, imgSource, cartItems, quantityElement, id);
    quantityCheck(quantityElement)
    totalCheck()
    buttonAnim()
    doNotTakeHalf()
    // testing()
    
}

// GET DATA FOR ITEM

function addItem(title, price, imgSource, cartItems, quantityElement, id) {
    for (i = 0; i < cartItems.length; i++) {
        if (cartItems[i].querySelector(".cart-item-title").innerText === title) {
            // alert("Item is already in the cart, use '-' and '+' to adjust quantity")
            cartItems[i].querySelector(".quantity").value++
            // totalCheck()
        return;
        }
    }
    $(".bottom-cart").prepend(`<div class="cart-item" data-item-id="${id}">
    <span><img src="${imgSource}" /></span>
    <span><p class="cart-item-title">${title}</p></span>
    <span><p class="cart-item-price">$${price}</p></span>
    <span><div class="button button-minus">-</div><input class="quantity" type="number" value="1" min="1"><div class="button button-plus">+</div></span>
  </div>`)
//   totalCheck()
plusMinus(cartItems, quantityElement)

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

        if (quantity <= 0 || quantityElement[i].value <= 0) {
            quantity = 1;
            quantityElement[i].value = 1;
        }
        var total = total + (price * quantity)
        totalItems = totalItems + quantity

        
    }
    var total = Math.round(total * 100) / 100
 
    if (totalItems === 1) {
        totalElement.innerText = `You have ${totalItems} item in cart. Total: $${total}`
        } else {
        totalElement.innerText = `You have ${totalItems} items in cart. Total: $${total}`
    }
    
}

// CLEAR CART

clearCart()
function clearCart() {
$(".button-remove").click(function() {
    $(".bottom-cart").slideUp(500);
    setTimeout(function() {$("div").remove(".cart-item")}, 500) 

});
}


// PLUS MINUS 

function plusMinus(cartItems, quantityElement) {
// var cartItems = document.getElementsByClassName("cart-item")

    for (var i = 0; i < quantityElement.length; i++) {
        var cartItem = cartItems[i]
        var quantityElement = cartItem.getElementsByClassName("quantity")[0]
        var minusButton = cartItem.getElementsByClassName("button-minus")[0];
        var plusButton = cartItem.getElementsByClassName("button-plus")[0];

        minusButton.addEventListener('click', () => {
            quantityElement.value--
            totalCheck()
        });
        plusButton.addEventListener('click', () => {
            quantityElement.value++
            totalCheck()
        });
    }
}

// BUTTON ANIM

function buttonAnim() {
$(".button").click(function() {
    $(this).addClass("buttonAnim")
    setTimeout(function() {$(".button").removeClass("buttonAnim")}, 200)
})
}

// BOTTOM CART DO NOT TAKE HALF OF SCREEN!!!

function doNotTakeHalf() {
    var cartItself = document.querySelectorAll(".bottom-cart")[0]
if (cartItself.clientHeight > 300) {
    cartItself.style.position = "static"
    cartItself.scrollIntoView({behavior: "smooth", block: "center"})
} else {
    cartItself.style.position = "sticky"
}
}

// STRIPE 

var stripeHandler = StripeCheckout.configure({
    key: stripePublicKey,
    locale: 'en',
    token: function(token) {
        var items = []
        var cartItemContainer = document.getElementsByClassName('bottom-cart')[0]
        var cartItems = cartItemContainer.getElementsByClassName('cart-item')
        for (var i = 0; i < cartItems.length; i++) {
            var cartItem = cartItems[i]
            var quantityElement = cartItem.getElementsByClassName('quantity')[0]
            var quantity = quantityElement.value
            var id = cartItem.dataset.itemId
            // console.log(quantity)
            items.push({
                id: id,
                quantity: quantity
            })
        }

        fetch('/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                stripeTokenId: token.id,
                items: items
            })
        }).then(function(res) {
            return res.json()
        }).then(function(/* data */) {
            // alert(data.message)
            $("body").append(`<div class="purchase-complete">
            <div>
              <h2>Thank you for your purchase!</h2>
              <p>
                Payment details have been sent to your E-mail and we're preparing your
                geckos for safe transfer!
              </p>
            </div>
          </div>`)
            $(".purchase-complete").show(500);
            setTimeout(function() {
                $(".purchase-complete").hide(500, "linear", $(this).remove())
            }, 5000)
            $(".bottom-cart").slideUp(500);
            setTimeout(function() {$("div").remove(".cart-item")}, 500)
            totalCheck()
        }).catch(function(error) {
            console.error(error)
        })
    }
})

// CHECKOUT
checkout()
function checkout() {
    var buttonCheckout = document.querySelector(".bottom-cart-button")
    buttonCheckout.addEventListener('click', () => {
        const regex = /[^$]*$/g
        var totalPrice = document.getElementsByClassName("total")[0].innerText
        totalP = totalPrice.match(regex)[0]
        var price = parseFloat(totalP) * 100
        stripeHandler.open({
            amount: price
    })
        // alert("Thank you for your purchase!")
        // $(".bottom-cart").slideUp(500);
        // setTimeout(function() {$("div").remove(".cart-item")}, 500)
    })
}

/* function testing() {
var items = []
        var cartItemContainer = document.getElementsByClassName('bottom-cart')[0]
        var cartItems = cartItemContainer.getElementsByClassName('cart-item')
        for (var i = 0; i < cartItems.length; i++) {
            var cartItem = cartItems[i]
            var quantityElement = cartItem.getElementsByClassName('quantity')[0]
            var quantity = quantityElement.value
            var id = cartItem.dataset.itemId
            
            items.push({
                id: id,
                quantity: quantity
            })
            console.log(quantity, id, items)
        }
        } */