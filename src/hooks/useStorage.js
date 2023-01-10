import { async }                from '@firebase/util';
import { useState , useEffect } from 'react';
import { projectStorage }       from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

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
          () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) =>
                  setUrl(url)
              );
          }
      );
    }, [file])

    return { progress, error, url };
}

export default useStorage;