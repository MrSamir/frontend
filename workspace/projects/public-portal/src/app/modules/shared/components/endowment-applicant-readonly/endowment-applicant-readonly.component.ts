import { Component, Injector, Input, OnInit } from '@angular/core';
import { InputEndwomentRegistraionRequestApplicantDto, LookupDto } from '../../services/services-proxies/service-proxies';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { AttachementItem } from 'projects/shared-features-lib/src/lib/components/AttachmentViewer/AttachmentViewer.component';

@Component({
  selector: 'app-endowment-applicant-readonly',
  templateUrl: './endowment-applicant-readonly.component.html',
  styleUrls: ['./endowment-applicant-readonly.component.css'],
})
export class EndowmentApplicantReadonlyComponent
  extends ComponentBase
  implements OnInit
{
  @Input() applicantRequestInfo: InputEndwomentRegistraionRequestApplicantDto;
  @Input() applicantTypes: LookupDto[];
  @Input() prestigiousAttributeTypes: LookupDto[];
  @Input() endowmentPartiesTypes: LookupDto[];
  @Input() educationLevels: LookupDto[];
  @Input() experienceYears: LookupDto[];
  @Input() seerDeadAttachemt: AttachementItem;
  @Input() agentDeedAttachment: AttachementItem;
  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInit() {}
  loadendowmentPartType(id) {
    if (id && id>0)
      return this.endowmentPartiesTypes.filter((value, index) => {
        return value.id == id;
      })[0].name;
    else return this.l('Common.Nothing');
  }
  loadprestigiousAttributeType(id) {
    if(id &&id>0)
    return this.prestigiousAttributeTypes.filter((value, index) => {
       return value.id == id;
     })[0].name;
     else
    return this.l('Common.Nothing');
  }
  loadeducationLevel(id) {
     if (id && id > 0)
       return this.educationLevels.filter((value, index) => {
         return value.id == id;
       })[0].name;
     else return this.l('Common.Nothing');
  }
  loadexperienceYear(id) {
       if (id && id > 0)
         return this.experienceYears.filter((value, index) => {
           return value.id == id;
         })[0].name;
       else return this.l('Common.Nothing');
  }
}
