import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { SprintsComponent } from './pages/sprints/sprints.component';
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
  imports: [RouterModule.forChild(routes)
],
  exports: [RouterModule],
  declarations: [HomeComponent, NotificationComponent, ResourcesComponent, ProjectsComponent, SprintsComponent, RegisterComponent]
})
export class DashboardRoutingModule { }