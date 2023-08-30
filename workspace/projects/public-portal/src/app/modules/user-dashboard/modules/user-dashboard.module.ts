import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TableModule } from "primeng/table";
import { CoreLibModule } from "projects/core-lib/src/public-api";
import { MyRequestsComponent } from "../components/my-requests/my-requests.component";
import { MyTasksComponent } from "../components/my-tasks/my-tasks.component";
import { UserDashboardComponent } from "../components/user-dashboard/user-dashboard.component";
import { UserDashBoardRoutingModule } from "./user-dashboard-routing.module";
import { PublicPortalSharedModule } from "../../shared/modules/public-portal-shared.module";
import { MyAwqafsComponent } from "../components/my-awqafs/my-awqafs.component";
import { SvgIconModule } from "projects/shared-features-lib/src/lib/modules/svg-icon.module";

@NgModule({
  declarations: [MyRequestsComponent, MyTasksComponent, UserDashboardComponent, MyAwqafsComponent],
  imports: [
    PublicPortalSharedModule,
    UserDashBoardRoutingModule,
    TableModule,
    FormsModule, CommonModule, TableModule,
    CoreLibModule, NgbModule,
    SvgIconModule
  ],
  exports: [MyRequestsComponent]
})
export class UserDashBoardModule { }
