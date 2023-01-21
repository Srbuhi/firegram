import { useState, useEffect } from "react";
import { projectFirestore }  from "../firebase/config";
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const useFirestore = (col) => {
    const[docs, setDocs] = useState([]);

    useEffect(() => {
        const orderCol = query(collection(projectFirestore, col), orderBy( 'timestamp', 'desc'));
        const unsub = onSnapshot(orderCol, (snap) => {            
                let documents = [];
                snap.forEach( doc => {
                    documents.push({...doc.data(), id: doc.id})
                });
                setDocs(documents);
            }) 

           return () => unsub();        
    }, [col])

    return{ docs };

}

export default useFirestore;