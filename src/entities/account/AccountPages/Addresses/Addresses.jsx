import { useState, useEffect, useRef } from "react";
import { getAddresses, addAddress as addAddressAPI, deleteAddress } from "../../../..//shared/api/auth";

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    async function fetchAddresses() {
      try {
        const data = await getAddresses();
        setAddresses(data);
      } catch (err) {
        console.error("Failed to load addresses:", err);
      }
    }
    fetchAddresses();
  }, []);

  // Load Leaflet CSS and JS
  useEffect(() => {
    // Load Leaflet CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }

    // Load Leaflet JS
    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.async = true;
      document.head.appendChild(script);
    }

    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSearchSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Search address using Nominatim (OpenStreetMap)
  const searchAddress = async (query) => {
    if (!query || query.length < 3) {
      setSearchSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
      );
      const data = await response.json();
      setSearchSuggestions(data);
    } catch (err) {
      console.error('Error searching address:', err);
    }
  };

  // Reverse geocoding using Nominatim
  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await response.json();
      if (data && data.display_name) {
        return data.display_name;
      }
      return null;
    } catch (err) {
      console.error('Error getting address:', err);
      return null;
    }
  };

  const openMapSelector = () => {
    if (isMapOpen) {
      setIsMapOpen(false);
      return;
    }

    setIsMapOpen(true);
    
    // Wait for Leaflet to load and map container to be ready
    const initMap = () => {
      if (!window.L) {
        setTimeout(initMap, 100);
        return;
      }

      setTimeout(() => {
        if (!mapRef.current) return;

        // If map already exists, just return
        if (mapInstanceRef.current) {
          return;
        }

        // Yerevan center coordinates
        const yerevanCenter = [40.1792, 44.4991];
        
        // Initialize map
        const map = window.L.map(mapRef.current).setView(yerevanCenter, 12);
        
        // Add OpenStreetMap tiles
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Save map instance
        mapInstanceRef.current = map;

        // Add click listener to map
        map.on('click', async (e) => {
          const { lat, lng } = e.latlng;
          console.log('Map clicked at:', lat, lng);
          
          // Get address from coordinates
          const address = await getAddressFromCoordinates(lat, lng);
          
          if (address) {
            console.log('Address found:', address);
            setNewAddress(address);
            
            // Remove old marker if exists
            if (markerRef.current) {
              map.removeLayer(markerRef.current);
            }
            
            // Create new marker
            markerRef.current = window.L.marker([lat, lng], {
              draggable: true
            }).addTo(map)
              .bindPopup(address)
              .openPopup();

            // Add drag listener to marker
            markerRef.current.on('dragend', async (event) => {
              const marker = event.target;
              const position = marker.getLatLng();
              const address = await getAddressFromCoordinates(position.lat, position.lng);
              if (address) {
                setNewAddress(address);
                marker.setPopupContent(address).openPopup();
              }
            });
          } else {
            console.error('Could not find address');
            alert('Could not find address for this location. Please try another location.');
          }
        });
      }, 200);
    };

    initMap();
  };

  const addAddress = async () => {
    if (!newAddress.trim()) return;
    try {
      const added = await addAddressAPI(newAddress);
      setAddresses((prev) => [...prev, added]);
      setNewAddress("");
    } catch (err) {
      console.error("Failed to add address:", err);
    }
  };

  const removeAddress = async (id) => {
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    } catch (err) {
      console.error("Failed to delete address:", err);
    }
  };


  return (
    <div className="px-[3%] py-6 h-full flex flex-col overflow-hidden">
      <h1 className="text-[#f93c22] text-2xl sm:text-[34px] font-bold mb-6">Addresses</h1>

      {/* Addresses */}
      <div className="flex-1 overflow-y-auto max-h-[250px] pr-2 mb-6 space-y-4 custom-scrollbar">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="bg-white border rounded-xl shadow p-4 sm:p-5 flex justify-between items-center hover:shadow-lg transition"
          >
            <div className="flex-1">
              <div className="font-semibold text-[#f93c22] text-sm sm:text-base">{addr.label || 'Address'}</div>
              <div className="text-gray-600 text-xs sm:text-sm">{addr.address}</div>
            </div>
            <div className="flex gap-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                title="Open in Google Maps"
              >
                📍 Map
              </a>
              <button
                onClick={() => removeAddress(addr.id)}
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {addresses.length === 0 && (
          <p className="text-gray-500 text-sm sm:text-base">You haven't added any addresses yet.</p>
        )}
      </div>

      {/* New addresses */}
      <div className="flex flex-col gap-3 flex-shrink-0">
        <h2 className="font-bold text-sm sm:text-base">New Address</h2>
        <div className="flex flex-col gap-2">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={newAddress}
              onChange={(e) => {
                setNewAddress(e.target.value);
                searchAddress(e.target.value);
              }}
              placeholder="Start typing address or click map to select"
              className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
            />
            {/* Search suggestions dropdown */}
            {searchSuggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {searchSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setNewAddress(suggestion.display_name);
                      setSearchSuggestions([]);
                      // Update map if open
                      if (mapInstanceRef.current && suggestion.lat && suggestion.lon) {
                        const map = mapInstanceRef.current;
                        map.setView([suggestion.lat, suggestion.lon], 15);
                        if (markerRef.current) {
                          map.removeLayer(markerRef.current);
                        }
                        markerRef.current = window.L.marker([suggestion.lat, suggestion.lon])
                          .addTo(map)
                          .bindPopup(suggestion.display_name)
                          .openPopup();
                      }
                    }}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {suggestion.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={openMapSelector}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm sm:text-base whitespace-nowrap"
              title="Open map to select address by clicking"
            >
              📍 {isMapOpen ? 'Hide Map' : 'Choose on Map'}
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Start typing to see address suggestions, or click "Choose on Map" to select a location on the map. Click on the map to automatically get the address.
          </p>
        </div>

        {/* Map selector */}
        {isMapOpen && (
          <div className="w-full h-[300px] sm:h-[350px] border rounded-lg overflow-hidden relative flex-shrink-0">
            <div ref={mapRef} className="w-full h-full" style={{ zIndex: 0 }} />
          </div>
        )}
        
        <button
          onClick={addAddress}
          disabled={!newAddress.trim()}
          className={`w-full sm:w-2/3 md:w-1/2 lg:w-[40%] py-2 text-white rounded-xl transition text-sm sm:text-base flex-shrink-0 ${
            !newAddress.trim() 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-[#f93c22] hover:bg-[#e2331d]'
          }`}
        >
          Add Address
        </button>
      </div>

      {/* CSS for custom scroll and Leaflet */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #ffe5df;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #f93c22, #ff724f);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #e2331d, #ff5c3a);
        }
        /* Leaflet map container */
        .leaflet-container {
          height: 100%;
          width: 100%;
          z-index: 0;
        }
      `}</style>
    </div>
  );
}
