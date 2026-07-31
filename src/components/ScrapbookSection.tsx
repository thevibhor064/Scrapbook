import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Image as ImageIcon, Plus, Upload, X, Calendar, MapPin, Sparkles, ZoomIn, Edit2, Trash2 } from 'lucide-react';
import { PhotoMemory } from '../types';

interface ScrapbookSectionProps {
  photos: PhotoMemory[];
  girlfriendName: string;
  onUpdatePhotos: (photos: PhotoMemory[]) => void;
  onNext: () => void;
}

export const ScrapbookSection: React.FC<ScrapbookSectionProps> = ({
  photos,
  girlfriendName,
  onUpdatePhotos,
  onNext,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<PhotoMemory | null>(null);

  // New photo form state
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [selectedSticker, setSelectedSticker] = useState<'heart' | 'sparkle' | 'flower' | 'kiss' | 'star'>('heart');

  // Handle local file upload (base64 string representation for instant display)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = () => {
    if (!newPhotoUrl && !editingPhoto?.url) return;

    if (editingPhoto) {
      // Edit existing
      const updated = photos.map((p) =>
        p.id === editingPhoto.id
          ? {
              ...p,
              url: newPhotoUrl || p.url,
              caption: newCaption || p.caption,
              date: newDate || p.date,
              location: newLocation || p.location,
              sticker: selectedSticker,
            }
          : p
      );
      onUpdatePhotos(updated);
    } else {
      // Add new
      const newMemory: PhotoMemory = {
        id: `photo-${Date.now()}`,
        url: newPhotoUrl || 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000',
        caption: newCaption || 'A precious memory together 💕',
        date: newDate || 'Today',
        location: newLocation || 'With You',
        rotation: (Math.random() - 0.5) * 8, // slight rotation
        tapeStyle: 'washi-pink',
        sticker: selectedSticker,
      };
      onUpdatePhotos([newMemory, ...photos]);
    }

    resetModal();
  };

  const handleDeletePhoto = (id: string) => {
    onUpdatePhotos(photos.filter((p) => p.id !== id));
    if (selectedPhoto?.id === id) setSelectedPhoto(null);
  };

  const resetModal = () => {
    setIsAddModalOpen(false);
    setEditingPhoto(null);
    setNewPhotoUrl('');
    setNewCaption('');
    setNewDate('');
    setNewLocation('');
    setSelectedSticker('heart');
  };

  const openEditModal = (photo: PhotoMemory, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPhoto(photo);
    setNewPhotoUrl(photo.url);
    setNewCaption(photo.caption);
    setNewDate(photo.date || '');
    setNewLocation(photo.location || '');
    setSelectedSticker(photo.sticker || 'heart');
    setIsAddModalOpen(true);
  };

  return (
    <section 
      id="scrapbook-section"
      className="relative min-h-screen w-full py-24 px-4 sm:px-6 bg-gradient-to-b from-[#120817] via-[#1a0c1f] to-[#0d0612] overflow-hidden"
    >
      {/* Soft ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Our Digital Scrapbook 📷</span>
            </div>
            <h2 className="font-script text-4xl sm:text-6xl text-rose-100">
              Moments With {girlfriendName} 💕
            </h2>
            <p className="font-cormorant italic text-lg text-rose-200/80 mt-2">
              Click any photo to view in detail, or add your own memories below!
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-6 py-3 rounded-full text-sm font-medium shadow-xl shadow-rose-900/40 border border-rose-300/30 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add / Upload Our Photo</span>
          </motion.button>
        </div>

        {/* Polaroid Scrapbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: photo.rotation }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 30 }}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative bg-[#fdfbf7] p-4 sm:p-5 rounded-sm shadow-2xl shadow-black/60 border border-amber-100/30 cursor-pointer transform transition-all duration-300"
            >
              {/* Decorative Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-rose-200/60 backdrop-blur-sm border border-rose-300/40 rotate-[-2deg] shadow-sm z-20" />

              {/* Sticker badge */}
              <div className="absolute top-2 right-2 z-20 text-xl drop-shadow-md select-none">
                {photo.sticker === 'heart' && '💖'}
                {photo.sticker === 'sparkle' && '✨'}
                {photo.sticker === 'flower' && '🌸'}
                {photo.sticker === 'kiss' && '💋'}
                {photo.sticker === 'star' && '⭐'}
              </div>

              {/* Photo Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 rounded-sm mb-4">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                
                {/* Hover overlay with zoom hint */}
                <div className="absolute inset-0 bg-rose-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900/80 text-rose-200 flex items-center justify-center shadow-lg">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Polaroid Caption */}
              <div className="space-y-1 text-slate-800">
                <p className="font-handwriting text-xl sm:text-2xl leading-snug font-semibold text-slate-900 line-clamp-2">
                  {photo.caption}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500 font-sans pt-2 border-t border-slate-200/60">
                  {photo.date && (
                    <span className="flex items-center gap-1 font-medium text-rose-700">
                      <Calendar className="w-3 h-3" />
                      {photo.date}
                    </span>
                  )}
                  {photo.location && (
                    <span className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3 h-3" />
                      {photo.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons (Edit & Delete) */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 z-30">
                <button
                  onClick={(e) => openEditModal(photo, e)}
                  className="p-1.5 rounded-full bg-slate-900/80 text-slate-200 hover:text-rose-300 hover:bg-slate-900 shadow-md"
                  title="Edit photo info"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePhoto(photo.id);
                  }}
                  className="p-1.5 rounded-full bg-slate-900/80 text-slate-200 hover:text-rose-400 hover:bg-slate-900 shadow-md"
                  title="Delete memory"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state if no photos */}
        {photos.length === 0 && (
          <div className="text-center py-20 bg-slate-950/40 rounded-3xl border border-rose-500/20 p-8">
            <ImageIcon className="w-16 h-16 text-rose-400/40 mx-auto mb-4" />
            <h3 className="font-script text-3xl text-rose-200 mb-2">Our Scrapbook Canvas</h3>
            <p className="font-cormorant italic text-lg text-rose-300/70 mb-6">
              No photos added yet! Click the button below to upload your favorite memories of Aruu.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-rose-600 hover:bg-rose-500 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg"
            >
              Upload First Memory 💕
            </button>
          </div>
        )}

        {/* Next Section Button */}
        <div className="mt-16 text-center">
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-rose-950/80 border border-rose-500/30 text-rose-200 px-8 py-3.5 rounded-full text-sm font-medium shadow-xl transition-all cursor-pointer"
          >
            <span>Proceed to Final Note</span>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#fdfbf7] p-6 sm:p-8 rounded-lg shadow-2xl overflow-hidden text-slate-900"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[4/3] w-full bg-slate-950 rounded-sm overflow-hidden mb-6 shadow-inner">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-center space-y-2">
                <p className="font-handwriting text-3xl sm:text-4xl text-slate-900 font-bold">
                  {selectedPhoto.caption}
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-rose-700 font-medium pt-2">
                  {selectedPhoto.date && <span>🗓️ {selectedPhoto.date}</span>}
                  {selectedPhoto.location && <span>📍 {selectedPhoto.location}</span>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add / Edit Photo Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-lg w-full bg-[#180e1d] border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 relative"
            >
              <button
                onClick={resetModal}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-script text-3xl text-rose-200 mb-6">
                {editingPhoto ? 'Edit Memory Card 📷' : 'Add New Photo Memory 💕'}
              </h3>

              <div className="space-y-4">
                {/* Image Upload / URL */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-rose-300/80 mb-2 font-medium">
                    Photo File or Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Paste image URL (e.g. Unsplash or direct link)"
                      value={newPhotoUrl}
                      onChange={(e) => setNewPhotoUrl(e.target.value)}
                      className="w-full bg-slate-900/80 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-rose-400"
                    />
                    <label className="flex items-center gap-1.5 bg-rose-600/30 hover:bg-rose-600/50 border border-rose-400/40 text-rose-200 text-xs px-4 py-2.5 rounded-xl cursor-pointer font-medium whitespace-nowrap">
                      <Upload className="w-4 h-4" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Preview if image URL exists */}
                {newPhotoUrl && (
                  <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-950 border border-rose-500/20">
                    <img
                      src={newPhotoUrl}
                      alt="Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Caption */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-rose-300/80 mb-1 font-medium">
                    Memory Caption
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sunset beach walk with my Aruu 🥰"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    className="w-full bg-slate-900/80 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-rose-400"
                  />
                </div>

                {/* Date & Location */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-rose-300/80 mb-1 font-medium">
                      Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aug 1st"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full bg-slate-900/80 border border-rose-500/20 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-rose-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-rose-300/80 mb-1 font-medium">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Our City"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full bg-slate-900/80 border border-rose-500/20 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-rose-400"
                    />
                  </div>
                </div>

                {/* Sticker Selection */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-rose-300/80 mb-2 font-medium">
                    Sticker Accent
                  </label>
                  <div className="flex gap-3 text-2xl">
                    {(['heart', 'sparkle', 'flower', 'kiss', 'star'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setSelectedSticker(st)}
                        className={`p-2 rounded-xl border transition-all ${
                          selectedSticker === st
                            ? 'bg-rose-500/30 border-rose-400 scale-110'
                            : 'bg-slate-900/50 border-rose-500/10 opacity-60'
                        }`}
                      >
                        {st === 'heart' && '💖'}
                        {st === 'sparkle' && '✨'}
                        {st === 'flower' && '🌸'}
                        {st === 'kiss' && '💋'}
                        {st === 'star' && '⭐'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Save button */}
                <div className="pt-4">
                  <button
                    onClick={handleSavePhoto}
                    className="w-full bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white font-medium py-3 rounded-xl shadow-lg shadow-rose-950/50"
                  >
                    {editingPhoto ? 'Save Changes' : 'Add Memory to Scrapbook 💕'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
