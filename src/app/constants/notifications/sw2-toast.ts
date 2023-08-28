import Swal from "sweetalert2";

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast'
    },  
    timer: 5000,
    timerProgressBar: true,
    showConfirmButton: false
  })
