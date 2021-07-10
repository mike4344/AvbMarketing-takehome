import React, { useState } from 'react';
import { Modal } from '../../Context/Modal';

export default function ConfirmationModal({purpose, classList}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button className={classList} onClick={() => setShowModal(true)}>{purpose}</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <Confirmation purpose={purpose}/>
          </Modal>
        )}
      </>
    );
  }
