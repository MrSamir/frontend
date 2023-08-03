import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

// hijriDate is expectedTobe in the format yyyy/mm/dd
const parseHijriString = (hijriDate: string): NgbDateStruct => {
  if( !hijriDate ) {
    return { year: 1, month: 1, day: 1 };
  }
  const spltData = hijriDate.split("/");
  return { year: parseInt(spltData[0]), month: parseInt(spltData[1]), day: parseInt(spltData[2]) };
}


const parseHijriStringWithDash= (hijriDate: string): NgbDateStruct => {
  if( !hijriDate ) {
    return { year: 1, month: 1, day: 1 };
  }
  const spltData = hijriDate.split("-");
  return { year: parseInt(spltData[0]), month: parseInt(spltData[1]), day: parseInt(spltData[2]) };
}


export const hijriDateExtensions = {
  parseHijriString,
  parseHijriStringWithDash
};
