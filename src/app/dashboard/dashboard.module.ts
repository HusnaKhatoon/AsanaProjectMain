import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { SidebarComponent } from "../shared/sidebar/sidebar.component";
import { FooterComponent } from "../shared/footer/footer.component";
// import { TagInputModule } from "ngx-chips";
// import { Ng2SearchPipeModule } from "ng2-search-filter";
// import { AutocompleteLibModule } from "angular-ng-autocomplete";
// import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";

// import { DragDropModule } from "@angular/cdk/drag-drop";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // NgbModule,
    //FormsModule,
    //ReactiveFormsModule,
    // TagInputModule,
    // Ng2SearchPipeModule,
    // AutocompleteLibModule,
    // NgxDaterangepickerMd.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    // DragDropModule,
  ],
})
export class DashboardModule {}
