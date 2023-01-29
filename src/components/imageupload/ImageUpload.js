import React, { useState } from 'react';
import axios from 'axios';
import checkEnv from '../CheckUrl';

const ImageUpload = ({saveImage}) => {
  const [image, setImage] = useState(null);
    // const [imageUrl, setImageUrl] = useState(null);
    const url=checkEnv()
  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post(`${url}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
    //   setImageUrl(res.data.url);
      saveImage(res.data.url)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      {image && <img src={URL.createObjectURL(image)} alt="UploadedImage" />}
    </>
  );
};

export default ImageUpload;
