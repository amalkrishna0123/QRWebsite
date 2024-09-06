import React, { useRef, useState, useEffect } from 'react';
import { FaSquarePlus } from "react-icons/fa6";
import { storage, db, auth } from "./Firebase";
import { BiSolidFileImage } from "react-icons/bi";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as dbRef, set, onValue, push } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';

const UploadImages = ({ storagePath, dbPath }) => {
  const [imgUrl, setImgUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [isError, setIsError] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [playStoreLink, setPlayStoreLink] = useState('');
  const inRef = useRef();
  const [user, setUser] = useState(null);
  const [productName, setProductName] = useState('')
  const [productParagraph, setProductParagraph] = useState('')

  useEffect(() => {
    const imageRef = dbRef(db, `${dbPath}/latest`);
    onValue(imageRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setImgUrl(data.url);
      }
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [dbPath]);

  const selectImage = () => {
    inRef.current.click();
  };

  const handleInputFile = (e) => {
    let fileData = e.target.files[0];
    setFile(fileData);
    setFileName(fileData.name);
  };

  const handleImageUpload = () => {
    if (!file) return;
    setIsLoading(true);
    const storageRef = ref(storage, `${storagePath}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setPercentage(Math.round(progress));
    }, (error) => {
      setIsError(true);
      setIsLoading(false);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
        setImgUrl(url);
        const newImageRef = push(dbRef(db, dbPath));
        set(newImageRef, { url, playStoreLink });
        set(dbRef(db, `${dbPath}/latest`), { url });
        setIsLoading(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      }).catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
    });
  };
  return (
    <div>
      <div className='flex justify-center items-center gap-10'>
        <input type="file" accept='image/*' ref={inRef} className='hidden' onChange={handleInputFile} />
        
         
            <div className='grid grid-cols-1 place-items-center Mlg:grid-cols-2 gap-5'>
            <div className='flex justify-center items-center gap-10 mt-5 lg:mt-0'>
              <button className='px-8 py-2 bg-[#ffffff4a] text-[#fff] GlassBg font-bold rounded-lg flex  items-center gap-2' onClick={selectImage}>
                Select<span className=''><BiSolidFileImage /></span>
              </button>
              <button onClick={handleImageUpload} className='px-8 py-2 bg-[#ffffff4a] text-[#fff] GlassBg font-bold rounded-lg flex  items-center gap-2'>
                Upload <span className=''><FaSquarePlus /></span>
              </button>
            </div>
          </div>
          
        
        
      </div>
      <div className='text-center mt-10'>
        {isLoading ? <span className='text-sm md:text-xl font-semibold fontName text-[#343434]'>Loading... {percentage}<span className='text-[#ff9019]'>%</span></span> : null}
        {isError ? <span className='text-sm md:text-xl font-semibold fontName text-[#343434]'>Error <span className='text-[#ff9019]'>Uploading</span> File</span> : null}
        {showSuccess && <h1 className='text-sm md:text-xl font-base fontName text-[#343434]'>Uploaded <span className='text-[#ff9019]'>Successfully</span></h1>}
      </div>
    </div>
  )
}

export default UploadImages
