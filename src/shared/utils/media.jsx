// Compact media utility
const API_BASE = 'http://localhost:8000';
const FALLBACK_IMAGES = ['11.jpg', '8.jpg', 'bg.jpg'];

export const getImageUrl = (path, fallback = '11.jpg') => 
  path ? `${API_BASE}${path}` : `/${fallback}`;

export const handleImageError = (e, fallback = '11.jpg') => 
  e.target.src = `/${fallback}`;

export const getRandomFallbackImage = () => 
  FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];

export const MediaImage = ({ src, alt, className = '', fallback }) => (
  <img
    src={getImageUrl(src, fallback || getRandomFallbackImage())}
    alt={alt}
    className={className}
    onError={(e) => handleImageError(e, fallback || getRandomFallbackImage())}
  />
);