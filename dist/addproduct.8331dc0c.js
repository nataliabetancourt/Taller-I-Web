var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},t={},n=e.parcelRequire0a97;null==n&&((n=function(e){if(e in a)return a[e].exports;if(e in t){var n=t[e];delete t[e];var o={id:e,exports:{}};return a[e]=o,n.call(o.exports,o,o.exports),o.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,a){t[e]=a},e.parcelRequire0a97=n);var o=n("6QD2Y"),c=n("etBjH"),r=n("aYguL");async function l(e,a=[]){return a.map((async a=>{const t=await async function(e,a){const t=r.ref(e,`products/images/${a.name}`);return await r.uploadBytes(t,a)}(e,a);return r.getDownloadURL(r.ref(e,t.ref.fullPath))}))}const i=[{category:"face",palette:[{name:"None",hex:"#ffffff"},{name:"1 Cool",hex:"#f4cfb5"},{name:"4 Warm",hex:"#ecbd8f"},{name:"7 Neutral",hex:"#cd9369"},{name:"9 Cool",hex:"#ca864f"},{name:"12.5 Warm",hex:"#ac6c40"},{name:"15 Neutral",hex:"#754626"}]},{category:"cheek",palette:[{name:"Romance light",hex:"#c4867c"},{name:"Medium bronze",hex:"#ca906a"},{name:"Tan bronze",hex:"#bc7a51"},{name:"Peachgasm",hex:"#f58e7e"},{name:"Pinkgasm",hex:"#ed7d7e"}]},{category:"eyes",palette:[{name:"Super Black",hex:"#090909"},{name:"Pillow Talk",hex:"#dd8d8a"},{name:"Pillow Talk Dreams",hex:"#82362b"},{name:"The Sophisticate",hex:"#ba8973"},{name:"Copper Charge",hex:"#c26f59"}]},{category:"lips",palette:[{name:"Scarlet Spell",hex:"#8b2833"},{name:"Pillow Talk",hex:"#dc7b77"},{name:"Lost Cherry",hex:"#fd5d5f"},{name:"Love Liberty",hex:"#aa2937"},{name:"Gold",hex:"#dc7e53"}]}];const s=document.getElementById("productsForm"),d=document.getElementById("color"),m=document.getElementById("colorBox"),u=document.querySelector(".rating"),f=u.querySelectorAll(".rating-item");let g,h="No rating";s.category.addEventListener("change",(e=>{const a=s.category.value,{palette:t}=i.find((e=>e.category===a)),n=t.map((e=>`<option value="${e.hex}">${e.name}</option>`));d.innerHTML=n,d.addEventListener("change",(e=>{m.style.backgroundColor=d.value;const a=d.selectedOptions[0].text;console.log(d.value),g={name:a,hex:d.value}}))})),u.addEventListener("click",(e=>{const a=e.target.classList;a.contains("active")||(f.forEach((e=>e.classList.remove("active"))),h=e.target.getAttribute("data-rate"),a.add("active"))})),s.addEventListener("submit",(async e=>{e.preventDefault(),console.log("clicked");const a=s.name.value,t=s.category.value,n=s.price.value,r=s.description.value,i=s.stock.value,d=s.images.files;let m=[];if(d.length){const e=await l(o.storage,[...d]);m=await Promise.all(e)}const u={name:a,category:t,price:n,description:r,stock:i,color:g,rating:h,images:m,counter:0};await async function(e,a){try{await c.addDoc(c.collection(e,"products"),a),console.log("Product added")}catch(e){console.log(e)}}(o.db,u),s.reset()}));
//# sourceMappingURL=addproduct.8331dc0c.js.map