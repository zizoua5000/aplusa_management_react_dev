import Swal from 'sweetalert2'

export const custom_success_alert= () => {Swal.fire({
                // position: 'top-end',
                width: 400,
                padding: '0.5em',
                heightAuto:false,
                icon: 'success',
                title: 'Successfully saved',
                showConfirmButton: false,
                timer: 1500
            })
        }


export const custom_sweet_delete={
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }