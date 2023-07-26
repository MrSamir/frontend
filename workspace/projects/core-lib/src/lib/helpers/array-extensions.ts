const notEmpty = (elements: any[]) => {
    return !!elements && elements.length > 0;
  }
  
  const isEmpty = (elements: any[]) => {
    return !elements || elements.length == 0;
  }
  
  const pushIfNotFound = (elements: any[], toBePushed: any) => {
    if( elements.indexOf(toBePushed) == -1) {
      elements.push(toBePushed);
    }
  }
  
  const removeifFound = (elements: any[], toBeRemoved: any) => {
    const index = elements.indexOf(toBeRemoved);
    if( index > -1 ) {
      elements.splice(index, 1);
    }
  }
  
  export const ArrayExtensions = {
    notEmpty,
    isEmpty,
    pushIfNotFound,
    removeifFound
  }
  