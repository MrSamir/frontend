import { NgModule } from "@angular/core";
import { MyRequestsComponent } from "../components/my-requests/my-requests.component";
import { PublicPortalSharedModule } from "../../shared/modules/public-portal-shared.module";
import { TableModule } from "primeng/table";
import { UserDashBoardRoutingModule } from "./user-dashboard-routing.module";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { FormsModule } from "@angular/forms";
import { CoreLibModule } from "projects/core-lib/src/public-api";
import { CommonModule } from "@angular/common";
import { MyTasksComponent } from "../components/my-tasks/my-tasks.component";
import { NgbAccordionModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserDashboardComponent } from "../components/user-dashboard/user-dashboard.component";


@NgModule({
    declarations: [MyRequestsComponent, MyTasksComponent, UserDashboardComponent],
    imports: [
        PublicPortalSharedModule,
        UserDashBoardRoutingModule,
        TableModule,
        FormsModule, CommonModule, TableModule,
        CoreLibModule, NgbModule
    ],
    exports: [MyRequestsComponent]
})
export class UserDashBoardModule { }