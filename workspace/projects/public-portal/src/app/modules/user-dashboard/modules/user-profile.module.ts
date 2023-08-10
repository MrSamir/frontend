import { NgModule } from "@angular/core";
import { MyRequestsComponent } from "../components/my-requests/my-requests.component";
import { PublicPortalSharedModule } from "../../shared/modules/public-portal-shared.module";
import { UserProfileRoutingModule } from "./user-profile-routing.module";
import { TableModule } from "primeng/table";


@NgModule({
    declarations: [MyRequestsComponent],
    imports: [
        PublicPortalSharedModule,
        UserProfileRoutingModule,
        TableModule,
    ],
    exports: [MyRequestsComponent]
})
export class UserProfileModule { }