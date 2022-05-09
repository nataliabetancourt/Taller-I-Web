import { collection, getDocs, doc, getDoc} from "firebase/firestore";

async function getAllProducts(db) {
    const collectionRef = collection(db, "products");
    try {
        const { docs } =  await getDocs(collectionRef);
        const products = docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            };
        });
        return products;
    } catch(e) {
        console.log(e);
    }
}

async function getSingleProduct(db, id) {
    const docRef = doc(db, "products", id);
    try {
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
    
        return data; 
    } catch(e) {
        console.log(e);
    }
}

export {
    getAllProducts,
    getSingleProduct
}