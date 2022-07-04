import React from "react";
import success from '../../../images/success.svg';
import rejected from '../../../images/rejected.svg';
import "./InfoTooltip.css";

const InfoTooltip = ({register, isSuccsess, onClose, infoToolTipText}) => {

  return (
    <div className={`popup popup_type_register ${register && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <div className="popup__content popup__content_register">
          <img className="popup__register-pic" src={isSuccsess ? success : rejected} alt='' />
          <h2 className="popup__title popup__title_register">{isSuccsess ? infoToolTipText : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;
