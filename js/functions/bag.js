import { setDoc, doc } from "firebase/firestore";

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

export {
    createFirebaseBag,
    getFirebaseBag
}