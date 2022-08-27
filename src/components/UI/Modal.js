import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from "./Modal.module.css";


const Modal = (props) => {
    const Backdrop = () => {
        return <div className={classes.backdrop} onClick={props.onClick}></div >;
    };
    const ModalOverlay = (props) => {
        return <div className={classes.modal}>{props.children}</div>;
    };

    const portalElement = document.getElementById("overlays");

    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    );
};

export default Modal;