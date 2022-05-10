//Colors from products and their categories
const colors = [
    {
        category: "face",
        palette: [
            {
                name: "None",
                hex: "#ffffff"
            },
            {
                name: "1 Cool",
                hex: "#f4cfb5"
            },
            {
                name: "4 Warm",
                hex: "#ecbd8f"
            },
            {
                name: "7 Neutral",
                hex: "#cd9369"
            },
            {
                name: "9 Cool",
                hex: "#ca864f"
            },
            {
                name: "12.5 Warm",
                hex: "#ac6c40"
            },
            {
                name: "15 Neutral",
                hex: "#754626"
            },
        ],
    },
    {
        category: "cheek",
        palette: [
            {
                name: "Romance light",
                hex: "#c4867c"
            },
            {
                name: "Medium bronze",
                hex: "#ca906a"
            },
            {
                name: "Tan bronze",
                hex: "#bc7a51"
            },
            {
                name: "Peachgasm",
                hex: "#f58e7e"
            },
            {
                name: "Pinkgasm",
                hex: "#ed7d7e"
            }
        ],
    },
    {
        category: "eyes",
        palette: [
            {
                name: "Super Black",
                hex: "#090909"
            },
            {
                name: "Pillow Talk",
                hex: "#dd8d8a"
            },
            {
                name: "Pillow Talk Dreams",
                hex: "#82362b"
            },
            {
                name: "The Sophisticate",
                hex: "#ba8973"
            },
            {
                name: "Copper Charge",
                hex: "#c26f59"
            }
        ],
    },
    {
        category: "lips",
        palette: [
            {
                name: "Scarlet Spell",
                hex: "#8b2833"
            },
            {
                name: "Pillow Talk",
                hex: "#dc7b77"
            },
            {
                name: "Lost Cherry",
                hex: "#fd5d5f"
            },
            {
                name: "Love Liberty",
                hex: "#aa2937"
            },
            {
                name: "Gold",
                hex: "#dc7e53"
            }
        ],
    }
];

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
    currencyFormat,
    colors
}