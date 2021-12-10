import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TagInputModule } from 'ngx-chips';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { SprintsComponent } from './pages/sprints/sprints.component';
import { RegisterComponent } from './pages/register/register.component';
const routes: Routes = [
    {
        path: "",
        redirectTo: 'home'
    },
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'projects',
                component: ProjectsComponent
            },
            {
                path: 'projects/search/:project_id/:task_id',
                component: ProjectsComponent
            },
            {
                path: 'notification',
                component: NotificationComponent
            },
            {
                path: 'resources',
                component: ResourcesComponent
            },
            {
                path: 'projects/sprints/:project_id',
                component: SprintsComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
        ]
    },
    {
        path: "**",
        redirectTo: 'home'
    }
];

@NgModule({
    imports: [

        RouterModule.forChild(routes),
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        TagInputModule,
        Ng2SearchPipeModule,
        AutocompleteLibModule,
        NgxDaterangepickerMd.forRoot(),
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatFormFieldModule,
    ],
    exports: [RouterModule],
    declarations: [HomeComponent, NotificationComponent, ResourcesComponent, ProjectsComponent, SprintsComponent, RegisterComponent]
})
export class DashboardRoutingModule { }
