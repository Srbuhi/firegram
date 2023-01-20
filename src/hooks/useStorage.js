import { async }                from '@firebase/util';
import { useState , useEffect } from 'react';
import { projectStorage, projectFirestore }  from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore'; 

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError]       = useState(null);
    const [url, setUrl]           = useState(null);

    useEffect(() => {
      //references
      const storageRef = ref(projectStorage, file.name);
    
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
          'state_changed',
          (snapshot) => {
              let percentage =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(percentage);
          },
          (err) => {
              setError(err);
          },
            async () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) =>
                  setUrl(url)
              );
            //   const createdAt = timestamp();
              const createdAt = 123;
            //  imagesCollectionRef.add({ url, createdAt })
            try {
                const docRef = await addDoc(collection(projectFirestore, "images"), {
                  first: "Ada",
                  last: "Lovelace",
                  born: 1815
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }              
          }
      );
    }, [file])

    return { progress, error, url };
}

export default useStorage;