import { toast } from 'react-toastify';

const useNotification = () => {
  const notify = (message, type = 'info', options = {}) => {
    const toastOptions = { ...options, position: 'bottom-right' };

    // depends on type call particular toast
    switch (type) {
      case 'info':
        toast.info(message, toastOptions);
        break;
      case 'error':
        toast.error(message, toastOptions);
        break;
      case 'success':
        toast.success(message, toastOptions);
        break;
      default:
        toast.info(message, toastOptions);
    }
  };

  return notify;
};

export default useNotification;
