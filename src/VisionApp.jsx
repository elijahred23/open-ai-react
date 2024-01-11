import { useState } from 'react';
import axios from 'axios';
import './App.css';

const apiURL = `http://${window.location.hostname}:3000`;

const VisionApp = () => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0];

        if (selectedImage) {
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

    const handlePromptInput = (event) => {
        const newPrompt = event.target.value;
        setPrompt(newPrompt);
    };

    const handleImagePaste = () => {
        navigator.clipboard
            .readText()
            .then((pastedUrl) => {
                setImage(pastedUrl);
                setError('');
            })
            .catch((error) => {
                console.error('Failed to read clipboard data:', error);
            });
    };

    const handleVisionRequest = async () => {
        if (!image || !prompt) {
            window.alert('ADD PROMPT OR IMAGE');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                `${apiURL}/openai/vision`,
                {
                    imageUrl: image,
                    prompt: prompt,
                },
                {
                    'Content-Type': 'application/json',
                }
            );
            let responseData = response.data.result;

            setResult(responseData.choices[0].message?.content);
        } catch (error) {
            console.error('Error making OpenAI Vision request:', error);
            setError('Error making OpenAI Vision request');
        } finally {
            setLoading(false);
        }
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
                <input
                    type="text"
                    placeholder="Enter Prompt For Image"
                    value={prompt}
                    onChange={handlePromptInput}
                    className="url-input"
                />
                {image && (
                    <button
                        className="vision-button"
                        onClick={handleVisionRequest}
                        disabled={loading} // Disable the button while loading
                    >
                        {loading ? 'Loading...' : 'Get Vision Result'}
                    </button>
                )}
            </div>

            {error && <p className="error-message">{error}</p>}

            {result && (
                <div className="vision-result">
                    <h3>Vision Result:</h3>
                    <p>{result}</p>
                </div>
            )}

            {image && (
                <div className="image-preview">
                    <img src={image} alt="Preview" className="preview-image" />
                </div>
            )}
        </div>
    );
};

export default VisionApp;
