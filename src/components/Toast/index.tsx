import { toast } from 'react-toastify'

interface ToastProps {
    message: String,
    type: String
}

function ToastNotification (props: ToastProps) {

  if (props.type === "ERROR") return toast.error(props.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })

}

export default ToastNotification;
