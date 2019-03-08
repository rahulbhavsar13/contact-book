import React from 'react';
import { toast } from 'react-toastify';
import { FormattedMessage } from '../components/common/formatted-message';

/** 
 * Wrapper for displaying toast notifications.
 * Uses {@link https://github.com/fkhadra/react-toastify} 
 */
const ToastNotificationHelper = {

    displayMessage: (messageId, options) => {
        toast(<span className={options.type + '-notification'}><FormattedMessage id={ messageId } values={ options.values }/></span>, getNotificationOptions(options));
    },

    displayNonLocalizedMessage: (message, options) => {
        toast(<span className={options.type + '-notification'}>{ message }</span>, getNotificationOptions(options));
    }
}

/** 
 * Returns an options object as per library specs. 
 */
const getNotificationOptions = (options) => {
    return {
        type: options && options.type || toast.TYPE.DEFAULT,
        autoClose: options && options.autoClose ? options.autoClose : options && options.type === toast.TYPE.ERROR ? 7000 : 3000,
        hideProgressBar: options && options.hideProgressBar || true,
        position: options && options.position || toast.POSITION.TOP_CENTER,
        pauseOnHover: options && options.pauseOnHover || true,
        onOpen: options && options.onOpen || null,
        onClose: options && options.onClose || null,
        className: options && options.customClass || null,
    }
}

export default ToastNotificationHelper;