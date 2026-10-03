import Swal from 'sweetalert2';

export const themeSwal = Swal.mixin({
  buttonsStyling: true, // Let CSS classes drive it via globals.css overrides
  confirmButtonColor: '#C9A84C',
  cancelButtonColor: '#f5f5f5',
  background: '#ffffff',
  color: '#2C1810',
});

export default themeSwal;
