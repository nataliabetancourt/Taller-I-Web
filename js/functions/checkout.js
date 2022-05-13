import { addDoc, collection } from "firebase/firestore";

async function addOrder (db, order) {
    try {
        await addDoc(collection(db, "orders"), order);
        console.log("Order added");
    } catch (error) {
        console.log(error);
    }
}

export {
    addOrder
}