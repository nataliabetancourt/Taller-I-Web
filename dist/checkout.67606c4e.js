var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},a=e.parcelRequire0a97;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in t){var a=t[e];delete t[e];var r={id:e,exports:{}};return n[e]=r,a.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){t[e]=n},e.parcelRequire0a97=a);var r=a("6QD2Y"),o=a("1tHc5"),i=a("ba58U");function d(e){return new Intl.NumberFormat("en-UK",{style:"currency",currency:"EUR",minimumFractionDigits:0}).format(e)}var c=a("etBjH");const l=document.getElementById("checkoutForm"),s=document.getElementById("checkoutOrder"),u=document.getElementById("checkoutTotal"),p=document.getElementById("shippingPrice"),m=document.getElementById("popup");let g,f=[],v=[],h=0,y=0,b=0;function w(e){e.forEach((e=>{const{name:n,price:t}=e,a={name:n,price:t};v.push(a),y+=parseInt(e.price)*e.counter,function(e){const n=document.createElement("div");n.className="order",n.innerHTML=`\n        <img src="${e.images[0]}" alt="" class="order__img">\n        <div class="order__infosection">\n            <h3 class="order__name">${e.name}</h3>\n            <p class="order__info">${e.color.name.toUpperCase()}</p>\n            <p class="order__info">${d(e.price)}</p>\n        </div>`,s.appendChild(n)}(e),u.innerText=d(y)}))}l.addEventListener("change",(e=>{b=y,"standard"==l.shipping.value&&(h=6),"expedited"==l.shipping.value&&(h=10),"overnight"==l.shipping.value&&(h=14),b=y+h,p.innerHTML="Shipping price: "+d(h),u.innerText=b})),l.addEventListener("submit",(async e=>{e.preventDefault(),console.log("clicked");const n={userInfo:{firstname:l.firstname.value,lastname:l.lastname.value,address:l.address.value,city:l.city.value,cellphone:l.cell.value},paymentInfo:{shipping:l.shipping.value,cardNum:l.card.value,expiration:l.expiration.value,code:l.code.value},order:v,finalTotal:b};await async function(e,n,t){try{await c.setDoc(c.doc(e,"orders",t),{order:n}),console.log("order added")}catch(e){console.log(e)}}(r.db,n,g.uid),m.classList.add("popup--open"),i.deleteFromBag(r.db,g.uid),window.localStorage.removeItem("bag")})),o.onAuthStateChanged(r.auth,(async e=>{e&&(g=e,f=await i.getFirebaseBag(r.db,g.uid)),w(f)}));
//# sourceMappingURL=checkout.67606c4e.js.map