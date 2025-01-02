import styles from '../styles/Modal.module.scss';

const ConfirmationModal = ({ onConfirm, onCancel, recipe }) => {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h3>Are you sure you want to delete &quot;{recipe?.title}&quot;?</h3>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    );
  };
  
  export default ConfirmationModal;
  