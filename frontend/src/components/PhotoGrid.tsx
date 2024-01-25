import { useState } from 'react';
import Modal from 'react-modal';

function PhotoGrid() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="relative" onClick={() => openModal(`/photo${index + 1}.png`)}>
          <img
            src={`/photo${index + 1}.png`}
            alt={`Photo ${index + 1}`}
            className="w-full h-full object-cover rounded cursor-pointer"
          />
        </div>
      ))}

      {/* Modal */}
      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Photo Modal"
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000,
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
    },
  }}
>
  {selectedImage && (
    <img src={selectedImage} alt="Selected Photo" className="w-full h-full object-contain" />
  )}
  <button onClick={closeModal} className="absolute top-4 right-4 text-black font-bold text-xl cursor-pointer">
    X
  </button>
</Modal>
    </div>
  );
}

export default PhotoGrid;
