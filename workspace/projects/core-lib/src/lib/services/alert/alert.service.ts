import Swal, {SweetAlertIcon} from "sweetalert2";
 
 
 

var defaultConfirmButtonText = 'متابعة';
var defaultRetryButtonText = 'إعادة المحاولة';

export function showSuccess(message: string, onOkPressed: () => void = undefined) {
  confirm(message, onOkPressed, undefined, 'success');
}

export function showError(errorMessage: string, onOkPressed: () => void = undefined) {
  confirm(errorMessage, onOkPressed, undefined, 'error', defaultRetryButtonText);
}

export function areyousure(onOkPressed: () => void, onCancelPressed: () => void = undefined) {
  // confirm(translations.assure, onOkPressed, onCancelPressed, 'question', translations.yes, translations.no);
}

export function question(message: string, onOkPressed: () => void) {
  confirm(message, onOkPressed, undefined, 'question');
}

export function confirm(message: string,
                        onOkPressed: () => void,
                        onCancelPressed: () => void,
                        icon: SweetAlertIcon,
                        confirmButtonText: string | undefined = undefined,
                        cancelButtonText: string = undefined,
                        showConfirmButton: boolean = true) {
  Swal.fire( {
    title: message,
    icon,
    confirmButtonText: confirmButtonText ?? defaultConfirmButtonText,
    width: 800,
    padding: '3em',
    confirmButtonColor: '#D6BD81',
    cancelButtonText,
    showCancelButton: !!cancelButtonText,
    showConfirmButton: showConfirmButton  ,
    allowOutsideClick: false
  }).then((result) => {
    if (result.isConfirmed) {
      if(!!onOkPressed) {
        onOkPressed();
      }
    }
    if (!result.isConfirmed) {
      if(!!onCancelPressed) {
        onCancelPressed();
      }
    }
  });
}

export function confirmWithContent(title: string, message: string,
  onOkPressed: () => void,
  onCancelPressed: () => void,
  icon: SweetAlertIcon,
  confirmButtonText: string | undefined = undefined,
  cancelButtonText: string = undefined,
  showConfirmButton: boolean = true) {
Swal.fire( {
title: title,
text: message,
icon,
confirmButtonText: confirmButtonText ?? defaultConfirmButtonText,
width: 800,
padding: '3em',
confirmButtonColor: '#D6BD81',
cancelButtonText,
showCancelButton: !!cancelButtonText,
showConfirmButton: showConfirmButton  ,

}).then((result) => {
if (result.isConfirmed) {
if(!!onOkPressed) {
onOkPressed();
}
}
if (!result.isConfirmed) {
if(!!onCancelPressed) {
onCancelPressed();
}
}
});
}


// export function handleServiceProxyError() {
//   debugger
//   var serviceResponse = JSON.parse(apiException.response);
//   if( !serviceResponse.isSuccess ) {
//     var firstError = serviceResponse.errorData[0];
//     showError(firstError.message);
//   }
// }


export function handleError<T>(serviceResponse) {
  if( !serviceResponse.isSuccess ) {
    var errorData = serviceResponse.errorData;
    var firstError = errorData[0];
    showError(firstError.message);
  }
}
