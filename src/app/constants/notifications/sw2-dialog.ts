import Swal from "sweetalert2";

export const ErrorDialog = Swal.mixin({
   
    icon: 'error',
    showCancelButton: false
  })


  export const InfoDialog = Swal.mixin({
   
    icon: 'info',
    showCancelButton: false,
    
  })