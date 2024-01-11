import { useState, useEffect } from 'react';
import './App.css';

const VisionApp = () => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
  
    const handleImageUpload = (event) => {
      const selectedImage = event.target.files[0];
  
      if (selectedImage) {
        setImageUrl('');
        setImage(URL.createObjectURL(selectedImage));
        setError('');
      } else {
        setError('Please select a valid image file.');
      }
    };
  
    const handleImageUrlInput = (event) => {
      const url = event.target.value;
      setImage(url);
      setError('');
    };
  
    const handleImagePaste = () => {
      navigator.clipboard.readText()
        .then((pastedUrl) => {
          setImageUrl(pastedUrl);
          setImage(null);
          setError('');
        })
        .catch((error) => {
          console.error('Failed to read clipboard data:', error);
        });
    };
  
    return (
      <div className="image-uploader-container">
        <h2 className="title">Vision App</h2>
  
        <div className="upload-section">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
          <span className="or">or</span>
          <input
            type="text"
            placeholder="Enter Image URL"
            value={image ?? ''}
            onChange={handleImageUrlInput}
            className="url-input"
          />
          <button className="paste-button" onClick={handleImagePaste}>
            Paste
          </button>
        </div>
  
        {error && <p className="error-message">{error}</p>}
  
        {image && (
          <div className="image-preview">
            <img src={image} alt="Preview" className="preview-image" />
          </div>
        )}
      </div>
    );
}


export default VisionApp;