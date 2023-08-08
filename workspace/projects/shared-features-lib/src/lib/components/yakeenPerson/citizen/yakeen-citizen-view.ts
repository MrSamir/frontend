// import { Component, Input, OnInit } from "@angular/core";
// import { CitizenInfoResponse } from "@app/dto/yakeen/citizenInfoResponse";
// import { translations } from "@app/model/translations";
// import {lifeStatusMap} from "@app/model/users/personalInformation.model";
//
// @Component({
//   selector: 'yakeen-citizen-view',
//   templateUrl: './yakeen-citizen-view.html'
// })
// export class YakeenCitizenView implements OnInit {
//   @Input() citizenInfoResponse: CitizenInfoResponse;
//   constructor() {
//   }
//
//   yakeenGender = {
//     'M': 'ذكر',
//     'F': 'أنثى',
//     '0': 'ذكر',
//     '1': 'أنثى'
//   }
//
//   get lifeStatus() {
//     switch (this.citizenInfoResponse.lifeStatus) {
//       case lifeStatusMap.Alive:
//         return  translations.alive;
//       case lifeStatusMap.Dead:
//         return translations.dead;
//       default:
//         return translations.unknownLifeStatus
//     }
//   }
//
//   get translations() {
//     return translations;
//   }
//
//   ngOnInit(): void {
//   }
// }
