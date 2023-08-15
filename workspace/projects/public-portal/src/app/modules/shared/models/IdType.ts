export enum IdType {
  NIN_ONLY = 1,
  IQAMA_ONLY = 2,
  NIN_OR_IQAMA = 3,
  NONE_OF_THE_ABOVE,
  OTHER = 5
}

export const insideKsaIds = [ IdType.NIN_ONLY, IdType.IQAMA_ONLY];
export const outsideKsaIds = [ IdType.OTHER ];

export const defineIdType = (idNumber: string) => {
  let ninRegEx: RegExp = /^[1]\d{9}$/g;
  if( ninRegEx.test(idNumber) ) {
    return IdType.NIN_ONLY;
  }

  let iqamaRegEx: RegExp = /^[2]\d{9}$/g;
  if( iqamaRegEx.test(idNumber) ) {
    return IdType.NIN_ONLY;
  }

  return IdType.OTHER;
}
