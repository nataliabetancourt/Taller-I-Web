async function addProductToBag(bag) {
    localStorage.setItem("bag", JSON.stringify(bag));
};

function getMyLocalBag() {
    const myBag = localStorage.getItem("bag");
    return myBag ? JSON.parse(myBag) : [];
}

function currencyFormat(price) {
    return new Intl.NumberFormat("en-UK", {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0
    }).format(price);
}

export {
    addProductToBag, 
    getMyLocalBag,
    currencyFormat
}