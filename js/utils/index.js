function currencyFormat(price) {
    return new Intl.NumberFormat("en-UK", {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0
    }).format(price);
}

export {
    currencyFormat
}