// Puntos, tiempo, equipo.


// eslint-disable-next-line import/no-extraneous-dependencies
import { doc, setDoc } from "firebase/firestore";
import { db } from './config';

export default async function setWinner(points, time, team) {
    // Guardar el ganador en la base de datos, con puntos, tiempo y equipo.
    try {
        await setDoc(doc(db, "winners", window.crypto.randomUUID()), {
            points,
            time,
            team
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

