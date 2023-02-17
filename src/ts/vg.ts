/*
1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/
export enum Sort {
  PRICE_ASCENDING = "Stigande pris",
  PRICE_DECENDING = "Sjunkande pris",
  NAME_ALPHABETIC = "Alfabetisk ordning",
  NAME_ALPHABETIC_REVERSE = "Omvänd alfabetisk ordning",
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public imageUrl: string[],
    public price: number,
    public description: string
  ){}
}

export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
  let unsortedList: Product[] = structuredClone(products);

  let sortedList: Product[] = [];
  
  if (sort === Sort.PRICE_ASCENDING) {
    sortedList = sortByPrice(unsortedList).reverse();
  } else if (sort === Sort.PRICE_DECENDING) {
    sortedList = sortByPrice(unsortedList);
  } else if (sort === Sort.NAME_ALPHABETIC) {
    sortedList = sortByName(unsortedList);
  } else if (sort === Sort.NAME_ALPHABETIC_REVERSE) {
    sortedList = sortByName(unsortedList).reverse();
  }

  return sortedList;
}

function sortByPrice(products: Product[]){
  return products.sort((p1,p2) => {
    if (p1.price < p2.price) {
      return 1;
    } else if (p1.price > p2.price) {
      return -1;
    }
    return 0;
  })
}

function sortByName(products: Product[]){
  return products.sort((p1,p2) => {
    if (p1.name < p2.name) {
      return 1;
    } else if (p1.name > p2.name) {
      return -1;
    }
    return 0;
  })
}

// 2. Refaktorera funktionen createProductHtml :)
// */

class Cart {
addToCart(i: number) {}
}
export let cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export let productList = JSON.parse(localStorage.getItem("savedList") || "[]");

export function createQuantityHtml(){
  let quantity = 0;
  
  for (let i = 0; i < cartList.length; i++) {
    quantity += cartList[i].quantity;
  }
  
  const floatingCart = document.getElementById(
    "floatingcartnumber"
  ) as HTMLElement;

  floatingCart.innerHTML = `${quantity}`;
}

export function createProductHtml() {

for (let i = 0; i < productList.length; i++) {

  let { dogproduct, dogImgContainer, dogImg }: { dogproduct: HTMLDivElement; dogImgContainer: HTMLDivElement; dogImg: HTMLImageElement; } = imgHtml(i);
  let { cartSymbolContainer, cartSymbol }: { cartSymbolContainer: HTMLDivElement; cartSymbol: HTMLElement; } = cartHtml();
  let { name, price, info }: { name: HTMLHeadingElement; price: HTMLHeadingElement; info: HTMLHeadingElement; } = productHtml(i);

  dogproduct.appendChild(dogImgContainer);
  dogImgContainer.appendChild(dogImg);
  dogImgContainer.appendChild(cartSymbolContainer);
  cartSymbolContainer.appendChild(cartSymbol);
  dogproduct.appendChild(name);
  dogproduct.appendChild(price);
  dogproduct.appendChild(info);
  

  addEventListenersMouseover(dogImg, cartSymbolContainer);
  addEventListenersClick(dogImg, i, cartSymbol);

  productList[i].productSpec = false;

  let cat = catByCategory();
  cat?.appendChild(dogproduct);

  function catByCategory() {
    if (productList[i].category === "sassy") {
      return document.getElementById("sassy") as HTMLElement;
    }
    if (productList[i].category === "kriminella") {
      return document.getElementById("kriminella") as HTMLElement;
    }
    if (productList[i].category == "singlar") {
      return document.getElementById("singlar") as HTMLElement;
    }
    if (productList[i].category === "puppy") {
      return document.getElementById("puppy") as HTMLElement;
    }
    if (productList[i].category === "oldies") {
      return document.getElementById("oldies") as HTMLElement;
    }
  }
}

let listastext = JSON.stringify(productList);
localStorage.setItem("savedList", listastext);
sessionStorage.clear();

  function addEventListenersClick(dogImg: HTMLImageElement, i: number, cartSymbol: HTMLElement) {
    dogImg.addEventListener("click", () => {
      productList[i].productSpec = !productList[i].productSpec;
      window.location.href = "product-spec.html#backArrow";
      let listastext = JSON.stringify(productList);
      localStorage.setItem("savedList", listastext);
    });

    cartSymbol.addEventListener("click", () => {
      let cart = new Cart();
      cart.addToCart(i);
    });
  }

  function productHtml(i: number) {
    let name: HTMLHeadingElement = document.createElement("h5");
    name.innerHTML = productList[i].name;
    let price: HTMLHeadingElement = document.createElement("p");
    price.innerHTML = "$" + productList[i].price;
    let info: HTMLHeadingElement = document.createElement("p");
    info.innerHTML = productList[i].info;
    return { name, price, info };
  }

  function cartHtml() {
    let cartSymbolContainer: HTMLDivElement = document.createElement("div");
    cartSymbolContainer.className = "cartSymbolContainer";
    let cartSymbol: HTMLElement = document.createElement("i");
    cartSymbol.className = "bi bi-bag-plus";
    return { cartSymbolContainer, cartSymbol };
  }

  function addEventListenersMouseover(dogImg: HTMLImageElement, cartSymbolContainer: HTMLDivElement) {
    dogImg.addEventListener("mouseover", () => {
      cartSymbolContainer.classList.add("hover");
      dogImg.classList.add("hover");
    });

    dogImg.addEventListener("mouseout", () => {
      dogImg.classList.remove("hover");
      cartSymbolContainer.classList.remove("hover");
    });
  }

  function imgHtml(i: number) {
    let dogproduct: HTMLDivElement = document.createElement("div");
    let dogImgContainer: HTMLDivElement = document.createElement("div");
    dogImgContainer.className = "dogimgcontainer";
    let dogImg: HTMLImageElement = document.createElement("img");
    dogImg.src = productList[i].picture;
    dogImg.alt = productList[i].pictureAlt;
    dogproduct.className = "dogproduct";
    return { dogproduct, dogImgContainer, dogImg };
  }
}

/*
  3. Refaktorera funktionen getfromstorage
  */

  export class CartProduct {
    constructor(
      public name: string,
      public image: string,
      public price: number,
      public amount: number
    ) {}
  }
  
  function getfromstorage() {
    let fromstorage: string = localStorage.getItem("cartArray") || "";
    let astext: CartProduct[] = JSON.parse(fromstorage);
  
    let { amountcontainer, amounttext, titlecontainer }: { amountcontainer: HTMLDivElement; amounttext: HTMLTableCellElement; titlecontainer: HTMLTableRowElement; } = containerHtml();
    let { productquantity, qttext, checkkouttotal2, totaltext }: { productquantity: HTMLTableRowElement; qttext: HTMLTableCellElement; checkkouttotal2: HTMLTableCellElement; totaltext: HTMLTableCellElement; } = quatityAndPriceHtml();
    
    let totalprice2: HTMLTableCellElement = totalPriceHtml();
      
    amountcontainer.appendChild(amounttext);
    productquantity.appendChild(qttext);
    checkkouttotal2.appendChild(totaltext);
    checkkouttotal2.appendChild(totalprice2);


  
    for (let i: number = 0; i < astext.length; i++) {
      let { productt, amountt, amountqt }: { productt: HTMLTableCellElement; amountt: HTMLTableCellElement; amountqt: HTMLTableCellElement; } = tableHtml(i);
      let { amountplusbtn, icon, amountminusbtn, icon2 }: { amountplusbtn: HTMLButtonElement; icon: HTMLSpanElement; amountminusbtn: HTMLButtonElement; icon2: HTMLSpanElement; } = buttonHtml();

      titlecontainer.appendChild(productt);
      amountcontainer.appendChild(amountt);
      amountqt.appendChild(amountplusbtn);
      amountplusbtn.appendChild(icon);
      amountqt.appendChild(amountminusbtn);
      amountminusbtn.appendChild(icon2);
    }
  

    function totalPriceHtml() {
      let addition = getTotalPrice();
      let totalprice2: HTMLTableCellElement = document.createElement("th");
      totalprice2.innerHTML = addition + "$";
      totalprice2.id = "totalincenter";
      return totalprice2;
    }

    function getTotalPrice() {
      let addition: number = 0;

      for (let i = 0; i < astext.length; i++) {
        addition += astext[i].price *= astext[i].amount;
      }
      return addition
    }

    function buttonHtml() {
      let amountplusbtn: HTMLButtonElement = document.createElement("button");
      amountplusbtn.className = "plusbtn";

      let amountminusbtn: HTMLButtonElement = document.createElement("button");
      amountminusbtn.className = "minusbtn";

      let icon: HTMLSpanElement = document.createElement("i");
      icon.className = "fas fa-minus";

      let icon2: HTMLSpanElement = document.createElement("i");
      icon2.className = "fas fa-plus";
      return { amountplusbtn, icon, amountminusbtn, icon2 };
    }

    function tableHtml(i: number) {
      let productt: HTMLTableCellElement = document.createElement("th");
      productt.innerHTML = astext[i].name;
      productt.className = "hej";

      let amountt: HTMLTableCellElement = document.createElement("th");
      amountt.innerHTML = "x" + astext[i].amount;
      amountt.className = "hej";

      let amountqt: HTMLTableCellElement = document.createElement("th");
      productquantity.appendChild(amountqt);
      amountqt.className = "hej";
      return { productt, amountt, amountqt };
    }

    function quatityAndPriceHtml() {
      let productquantity = document.getElementById(
        "product-quantity"
      ) as HTMLTableRowElement;
      let qttext: HTMLTableCellElement = document.createElement("th");
      qttext.innerHTML = "change quantity:";

      let checkkouttotal2 = document.getElementById(
        "title-total"
      ) as HTMLTableCellElement;
      let totaltext: HTMLTableCellElement = document.createElement("th");
      totaltext.innerHTML = "total:";
      return { productquantity, qttext, checkkouttotal2, totaltext };
    }

    function containerHtml() {
      let amountcontainer = document.getElementById(
        "amount-checkout-container2"
      ) as HTMLDivElement;
      let amounttext: HTMLTableCellElement = document.createElement("th");
      amounttext.innerHTML = "amount:";

      let titlecontainer = document.getElementById(
        "title-container"
      ) as HTMLTableRowElement;
      titlecontainer.innerHTML = "<strong>products:</strong>";
      return { amountcontainer, amounttext, titlecontainer };
    }
  }

