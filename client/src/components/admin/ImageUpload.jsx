import { useState } from 'react';
import { Upload, X, Loader } from 'lucide-react';
import axios from '../../utils/axios';
import toast from 'react-hot-toast';

const ImageUpload = ({ images = [], onImagesChange, multiple = false }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    setUploading(true);

    try {
      if (multiple) {
        // Upload multiple images
        const formData = new FormData();
        files.forEach(file => {
          formData.append('images', file);
        });

        const res = await axios.post('/upload/multiple', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const newImages = res.data.data.map(img => ({
          url: img.url,
          alt: ''
        }));

        onImagesChange([...images, ...newImages]);
        toast.success(`${files.length} image(s) uploadée(s)`);
      } else {
        // Upload single image
        const formData = new FormData();
        formData.append('image', files[0]);

        const res = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        onImagesChange([{
          url: res.data.data.url,
          alt: ''
        }]);
        toast.success('Image uploadée');
      }
    } catch (error) {
      toast.error('Erreur lors de l\'upload');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <>
                <Loader className="w-10 h-10 mb-3 text-primary-600 animate-spin" />
                <p className="text-sm text-gray-500">Upload en cours...</p>
              </>
            ) : (
              <>
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP (MAX. 5MB)</p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple={multiple}
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Images Preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image.url}
                alt={image.alt || `Image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary-600 text-white text-xs rounded">
                  Image principale
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
