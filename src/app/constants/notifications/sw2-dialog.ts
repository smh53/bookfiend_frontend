import Swal from "sweetalert2";

export const ErrorDialog = Swal.mixin({
   
    icon: 'error',
    showCancelButton: false
  })