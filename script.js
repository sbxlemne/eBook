const addtoCart = document.querySelectorAll(".addToCart");
const productUnder = document.querySelector(".productUnder");
let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if(!productsInCart){
	productsInCart = [];
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const displayShoppingList = () => {
    localStorage.setItem("shoppingCart", JSON.stringify(productsInCart));
    let result = productsInCart.map(product => {
        return `<tr>
            <td>${product.name}</td>
            <td><img src="${product.image}" alt="" srcset="" style="height :50px"></td>
            <td>&#8369;${numberWithCommas(product.basePrice)}</td>
            <td>
            <button class="btn btn-primary button-minus text-white" data-product-id="${product.id}">-</button>
            ${product.count}
            <button class="btn btn-primary button-plus text-white" data-product-id="${product.id}">+</button>
            </td>
            <td>&#8369;${numberWithCommas(product.price)}</td>
            <td><button class="btn btn-danger removeSelectedCartItem" data-product-id="${product.id}">Remove</button></td>
        </tr>`;
    })
    productUnder.innerHTML = result.join('');
    // console.log("result", result.join(''));
}   

{/* <th>Image</th>
<th>Description</th>
<th>Price</th>
<th>Count</th>
<th>Tatal</th> */}

const totalPriceAmount = () => {
    let amount = 0;
    let totalItems = 0;
    productsInCart.map(productsInCart => {
        amount += productsInCart.price;
        totalItems += productsInCart.count;
    })
    let result = ` 
            <tr>
                <th class="summary">
                    Total Amount:
                </th>
                <td class="text-white">
                &#8369;${numberWithCommas(amount)}
                </td>
            </tr>
            <tr>
                <th class="summary">
                    Total Items:
                 </th>
                <td class="text-white">
                    ${totalItems}
                </td>
            </tr>
            <tr>
                <td colspan="2">
                <button class="btn btn-primary checkout">Checkout...</button>
                </td>
            </tr>`
    console.log(result);
    document.querySelector(".fortotalPayable").innerHTML = result;
}

const addMinusitems = () => {
    productUnder.addEventListener("click", (e) => {
        console.log('oi nigana');
        if (e.target.classList.contains("button-minus") || e.target.classList.contains("button-plus") || e.target.classList.contains('removeSelectedCartItem')) {
            const isPlusButton = e.target.classList.contains('button-plus');
            const isMinusButton = e.target.classList.contains('button-minus');
            const removeSelectedCartItem = e.target.classList.contains('removeSelectedCartItem');
            for (let i = 0; i < productsInCart.length; i++) {
                const element = productsInCart[i];
                if (e.target.dataset.productId == element.id) {
                    if (isPlusButton) {
                        element.count += 1;
                    } else if (isMinusButton) {
                        element.count -= 1;
                    } else if(removeSelectedCartItem) {
                        productsInCart.splice(i, 1);
                    }
                    console.log(element.count);
                    console.log(element.price);
                    console.log(element.basePrice);
                    element.price = element.basePrice * element.count; 
                    console.log(element.price);              
                }
                if (element.count <= 0) {
                    console.log("help")
                    productsInCart.splice(i, 1);
                }                 
            }
        }
        displayShoppingList();
        totalPriceAmount();
    })
}

const updateCountInCart = (product) => {

    for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
            return;
		}
	}
    
    productsInCart.push(product);
    console.log(productsInCart);
}

//dapat forEach since multiple array for .addToCart to be used
addtoCart.forEach(item => {
    item.addEventListener('click', (e) => {
    e.preventDefault();
    // const addtoCartBtn = addtoCart.querySelector(".addtoCartBtn")
    if (e.target.classList.contains('addToCartBtn')) {
        const productID = e.target.dataset.productId;
        const productName = item.querySelector(".card-title").innerHTML;
        const prodctDec = item.querySelector(".card-text").innerHTML;
        const productPrice = item.querySelector(".price").innerHTML;
        const productImage = item.querySelector('img').src;

        let product = {
            name: productName,
            image: productImage,
            id: productID,
            desc: prodctDec,
            count: 1,
            price: +productPrice,
            basePrice: +productPrice,
        }
            // localStorage.setItem('itemInCart',JSON.stringify(product));
            updateCountInCart (product); //update products, if exeist update count and update by push method
            displayShoppingList();
            totalPriceAmount();
            
        };
        
    });
})

addMinusitems();
displayShoppingList();
totalPriceAmount();