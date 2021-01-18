import React from "react";
import styles from "./Modal.module.css";
export const Modal = ({ closeModal, children }) => {
    // const showHideClassName = show ? styles.modal displayblock : styles.modal displaynone;
    return (
    <div className={styles.modal}>
      <div className={styles.displayblock} >
        <section className={styles.modalmain}>
          {children}
            <div className={styles.buttonAlign}>
                <button className="btn btn-info" onClick={closeModal}>Close</button>
            </div>
        </section>
      </div>
    </div>
    );
  };