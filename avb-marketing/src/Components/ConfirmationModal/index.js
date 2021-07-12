import React, { useState } from 'react';
import { Modal } from '../../Context/Modal'
import Confirmation from './confirmation';
import './confirmation.css'
export default function ConfirmationModal({purpose, classList, disabled, currentChanges}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button disabled={disabled} className={`${classList} ${disabled ? 'disabled': ''}`} onClick={() => setShowModal(true)}>{purpose}</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <Confirmation purpose={purpose} currentChanges={currentChanges} onClose={() => setShowModal(false)}/>
          </Modal>
        )}
      </>
    );
  }
