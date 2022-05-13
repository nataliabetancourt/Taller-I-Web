import { setDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

async function createFirebaseBag(db, userId, bag) {
    try {
        await setDoc(doc(db, "bag", userId), {
            bag
        });
    } catch (e) {
        console.log(e);
    }
}

async function getFirebaseBag(db, userId) {
    const docRef = doc(db, "bag", userId);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    return (result) ? result.bag : [];
}

async function deleteFromBag(db, userId) {
    try {
        const docRef = doc(db, "bag", userId);
        await deleteDoc(docRef)
    } catch (error) {
        console.log(error);
    }
}

async function changeCounter(db, userId, counterValue){
    try {
        const productRef = doc(db, "bag", userId);
        await updateDoc(productRef, { counter: counterValue});
    } catch (error) {
        console.log(error);
    }
}

export {
    createFirebaseBag,
    getFirebaseBag,
    deleteFromBag,
    changeCounter
}