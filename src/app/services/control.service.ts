import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpEventType,
  HttpEvent,
} from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

/* Result interface */
interface ResApi {
  code: any;
  result: any;
  message: any;
}

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  public nodeUrl = environment.nodeUrl;
  public webHook = environment.webHook;
  constructor(
    private _http: HttpClient,
    private toastr: ToastrService,
    public router: Router
  ) {}

  loginUser(data: any) {
    return this._http.post<ResApi>(this.nodeUrl + "user/login", data);
  }

  public get loggedIn(): boolean {
    return localStorage.getItem("techweirdo_token") !== null;
  }

  // logout() {
  //   localStorage.removeItem("techweirdo_token");
  //   localStorage.removeItem("techweirdo_user");
  //   this.router.navigate(["login"]);
  // }

  // getCount() {
  //   return this._http.get<ResApi>(this.nodeUrl + "projects/get_count");
  // }

  // getAllSkills() {
  //   return this._http.get<ResApi>(this.nodeUrl + "resources/get_all_skills");
  // }

  // getAllResources() {
  //   return this._http.get<ResApi>(this.nodeUrl + "resources/get_all_resources");
  // }

  // getAllProjects() {
  //   return this._http.get<ResApi>(this.nodeUrl + "projects/get_all_projects");
  // }

  // getAllUnregisteredProjects() {
  //   return this._http.get<ResApi>(
  //     this.nodeUrl + "projects/get_all_unregistered_projects"
  //   );
  // }

  // createProject(data) {
  //   return this._http.post<ResApi>(
  //     this.nodeUrl + "projects/create_project",
  //     data
  //   );
  // }

  // getProjectsById(id) {
  //   return this._http.get<ResApi>(
  //     this.nodeUrl + "projects/get_project_by_id/" + id
  //   );
  // }

  // getResourcesByProject(id) {
  //   return this._http.get<ResApi>(
  //     this.nodeUrl + "resources/get_resources_by_project/" + id
  //   );
  // }

  // getTasksByProject(id) {
  //   return this._http.get<ResApi>(
  //     this.nodeUrl + "projects/get_tasks_by_project/" + id
  //   );
  // }

  // projectLineChart(id) {
  //   return this._http.get<ResApi>(
  //     this.nodeUrl + "projects/project_line_chart/" + id
  //   );
  // }

  // getSubtaskByTask(id) {
  //   return this._http.get<ResApi>(
  //     this.nodeUrl + "projects/get_subtask_by_task/" + id
  //   );
  // }

  // resourceWiseChart(id) {
  //   return this._http.get<ResApi>(
  //     this.nodeUrl + "projects/resource_wise_chart/" + id
  //   );
  // }

  // updateResourceData(data) {
  //   return this._http.post<ResApi>(
  //     this.nodeUrl + "resources/update_resources_data",
  //     data
  //   );
  // }

  // globalSearch() {
  //   return this._http.get<ResApi>(this.nodeUrl + "projects/global_search");
  // }

  // getSubtaskByTaskRunningLate(task) {
  //   return this._http.post<ResApi>(
  //     this.nodeUrl + "projects/get_subtask_by_task_running_late",
  //     task
  //   );
  // }

  // updateProjectDetails(data) {
  //   return this._http.post<ResApi>(
  //     this.nodeUrl + "projects/update_project_details",
  //     data
  //   );
  // }

  // chartHeatmapData(data) {
  //   return this._http.post<ResApi>(
  //     this.nodeUrl + "projects/chart_heatmap_data",
  //     data
  //   );
  // }

  // getTaskProjectNullSprint(id: string) {
  //   return this._http.get<ResApi>(
  //     this.nodeUrl + "sprints/get_task_for_project_null_sprint/" + id
  //   );
  // }

  // createSprint(data: any) {
  //   return this._http.post<ResApi>(
  //     this.nodeUrl + "sprints/create_sprint",
  //     data
  //   );
  // }

  // getSprintsOnProjects(id) {
  //   return this._http.get<ResApi>(
  //     this.nodeUrl + "sprints/get_sprints_on_project/" + id
  //   );
  // }

  // updateTaskSprint(data) {
  //   return this._http.post<ResApi>(
  //     this.nodeUrl + "sprints/update_task_spirit",
  //     data
  //   );
  // }

  // getTasksBySprint(id) {
  //   return this._http.get<ResApi>(
  //     this.nodeUrl + "sprints/get_tasks_by_sprint/" + id
  //   );
  // }

  // updateStatusReport(data) {
  //   return this._http.post<ResApi>(
  //     this.nodeUrl + "sprints/update_status_sprint",
  //     data
  //   );
  // }

  // createResources(data) {
  //   return this._http.post<ResApi>(
  //     this.nodeUrl + "resources/add_resources",
  //     data
  //   );
  // }

  //webhook registration api
  registerProject(data: any) {
    return this._http.post<ResApi>(
      this.webHook + "asana/set_webhook.php",
      data
    );
  }
}

