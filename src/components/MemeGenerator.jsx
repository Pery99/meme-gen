import React, { useState, useRef, useCallback, Suspense, lazy } from "react";
import html2canvas from 'html2canvas';
import LoadingSpinner from './LoadingSpinner';

const predefinedMemes = [
  {
    id: 1,
    url: "/memes/meme1.jpg",
    name: "Tired",
    thumbnail: "/memes/meme1.jpg",
  },
  {
    id: 2,
    url: "/memes/meme2.jpg",
    name: "Hmmmm",
    thumbnail: "/memes/meme2.jpg",
  },
  {
    id: 3,
    url: "/memes/meme3.jpg",
    name: "feeling funky",
    thumbnail: "/memes/meme3.jpg",
  },
  {
    id: 4,
    url: "/memes/meme4.jpg",
    name: "ehn eh??",
    thumbnail: "/memes/meme4.jpg",
  },
  {
    id: 5,
    url: "/memes/meme5.jpg",
    name: "cheers",
    thumbnail: "/memes/meme5.jpg",
  },
];

function MemeGenerator() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [error, setError] = useState("");
  const [showMemeSelector, setShowMemeSelector] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef();
  const memeRef = useRef();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.match('image.*')) {
        setIsLoading(true);
        try {
          const compressedImage = await compressImage(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            setSelectedImage(e.target.result);
            setIsLoading(false);
          };
          reader.readAsDataURL(compressedImage);
          setError("");
        } catch (err) {
          setError("Error processing image");
          setIsLoading(false);
        }
      } else {
        setError("Please upload an image file");
      }
    }
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      throw new Error('Image compression failed');
    }
  };

  const downloadMeme = useCallback(async () => {
    if (!memeRef.current) return;
    
    try {
      const canvas = await html2canvas(memeRef.current, {
        allowTaint: true,
        useCORS: true,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      setError("Failed to download meme");
    }
  }, [memeRef]);

  const handleMemeSelect = (memeUrl) => {
    setSelectedImage(memeUrl);
    setShowMemeSelector(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Top Text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
            className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-web3-primary/50"
          />
          <input
            type="text"
            placeholder="Bottom Text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-web3-primary/50"
          />
          <div className="flex gap-4">
            <button
              onClick={() => setShowMemeSelector(!showMemeSelector)}
              className="px-6 py-3 bg-gradient-to-r from-web3-secondary to-web3-accent rounded-xl text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-web3-secondary/25"
            >
              Choose Template
            </button>
            <button
              onClick={() => fileInputRef.current.click()}
              className="px-6 py-3 bg-gradient-to-r from-web3-primary to-web3-secondary rounded-xl text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-web3-primary/25"
            >
              Upload Image
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {showMemeSelector && (
          <div className="mt-6 p-4 bg-black/30 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold mb-4 text-white/90">Choose a Template</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {predefinedMemes.map((meme) => (
                <div
                  key={meme.id}
                  onClick={() => handleMemeSelect(meme.url)}
                  className="group cursor-pointer relative overflow-hidden rounded-lg border-2 border-transparent hover:border-web3-primary/50 transition-all duration-300"
                >
                  <img
                    src={meme.thumbnail || meme.url}
                    alt={meme.name}
                    className="w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="absolute bottom-2 left-2 right-2 text-sm text-white font-medium text-center">
                      {meme.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
            {error}
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="flex flex-col items-center gap-4">
          <div 
            ref={memeRef}
            className="relative max-w-2xl backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4 shadow-xl"
          >
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected meme"
                className="rounded-xl max-h-[70vh] w-auto"
                crossOrigin="anonymous"
              />
              <h2 className="absolute top-4 left-0 w-full text-center text-4xl font-bold text-white uppercase tracking-wider [text-shadow:_2px_2px_0_rgb(0_0_0_/_100%)]">
                {topText}
              </h2>
              <h2 className="absolute bottom-4 left-0 w-full text-center text-4xl font-bold text-white uppercase tracking-wider [text-shadow:_2px_2px_0_rgb(0_0_0_/_100%)]">
                {bottomText}
              </h2>
            </div>
          </div>
          
          <button
            onClick={downloadMeme}
            className="px-6 py-3 bg-gradient-to-r from-web3-primary to-web3-secondary rounded-xl text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-web3-primary/25"
          >
            Download Meme
          </button>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

export default MemeGenerator;
