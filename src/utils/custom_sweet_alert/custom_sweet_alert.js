import Swal from 'sweetalert2'

export const custom_success_alert= () => {Swal.fire({
                position: 'top-end',
                width: 400,
                padding: '0.5em',
                heightAuto:false,
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        }