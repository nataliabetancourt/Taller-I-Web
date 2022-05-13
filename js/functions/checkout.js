import { setDoc, doc } from "firebase/firestore";

async function addOrder (db, order, userId) {
    try {
        await setDoc(doc(db, "orders", userId), {
            order
        });
        console.log("order added");
    } catch (e) {
        console.log(e);
    }
}

export {
    addOrder
}