
// eslint-disable-next-line import/no-extraneous-dependencies
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from './config';


export default async function getWinner() {
    // Trae los 10 ganadores con más puntos.
    try {
        const collectionRef = collection(db, "winners");
        const q = query(collectionRef, orderBy("points", "desc"), limit(10));
        const collectionSnap = await getDocs(q);

        const games = [];
        collectionSnap.forEach((doc) => games.push(doc.data()));

        return games;
    } catch (error) {
        console.error(error);
        return [];
    }
}