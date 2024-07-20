let ArrProducts=[
    {
        id:1,
        name:"HTML",
        image:"card-1.jpg",
        price:1000,
        rating:4,
    },
    {
        id:2,
        name:"burger",
        image:"card-2.jpg",
        price:400,
        rating:3,
    },
    {
        id:3,
        name:"dosa",
        image:"card-4.jpg",
        price:120,
        rating:4,
    },
    {
        id:4,
        name:"idli",
        image:"bg-3.jpg",
        price:350,
        rating:4,
    },
    {
        id:5,
        name:"dosa",
        image:"card-4.jpg",
        price:100,
        rating:4,
    },
    {
        id:6,
        name:"idli",
        image:"bg-3.jpg",
        price:200,
        rating:5,
    },
];


const body=document.querySelector("body");
products=document.querySelector(".products");

shoppingBasket =document.querySelector('.shoppingBasket');

closeCart =document.querySelector('.close');

productList=document.querySelector('.productList');
quantity=document.querySelector(".quantity");
total=document.querySelector(".totalPrice");


let checkOutList=[];

shoppingBasket.onclick=()=>{
    body.classList.add("active");
};
closeCart.onclick=()=>{
    body.classList.remove("active");
};


function onInIt(){
ArrProducts.forEach((item,key)=>{
    let div=document.createElement("div");
    div.classList.add("item");

    let star ="";
    for(i=0;i<item.rating;i++){  
       star+= `<i class="fa fa-star"></i>`;
    }

    div.innerHTML=`<img src="images/${item.image}"/>
    <div class="name">${item.name}</div>
    <div>${star}</div>
    <div class="price"><small>Rs : <small>${item.price}</div>
     <button onclick="addToCart(${key})">
     <i class="fa fa-cart-plus"><i/> Add to Cart</button> `;
    products.appendChild(div);
});
}
onInIt();

function addToCart(Id){
    if(checkOutList[Id]==null){
        checkOutList[Id] = { ...ArrProducts[Id], quantity: 1 };
       
    }else{
        checkOutList[Id].quantity+=1;
    }
    reloadCart();
}
function reloadCart(){
    productList.innerHTML="";
    let count =0;
    let totalPrice=0;

    checkOutList.forEach((item,key)=>{
        if(item){
            totalPrice += item.price * item.quantity;
            count += item.quantity;

           let li=document.createElement("li");
           li.innerHTML=`
           <img src="images/${item.image}">
           <div>${item.name}</div>
           <div>${item.price}</div>
          <div>
           <button onclick="changeQuantity(${key},${item.quantity-1})">-</button>
           <div class="count">${item.quantity}</div>
          
           <button onclick="changeQuantity(${key},${item.quantity+1})">+</button>
           
           </div>`;

           productList.appendChild(li);
        }
    });
    total.innerHTML = `<small> Subtotal (${count} items)</small>:Rs${totalPrice}`;
    quantity.innerHTML = count;
}
function changeQuantity(key,newQuantity){
    if(quantity==0){
        delete checkOutList[key];
    }
        else{
            checkOutList[key].quantity= newQuantity;
        }

    reloadCart();

}