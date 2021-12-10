import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { ControlService } from "src/app/services/control.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  isActive = {};
  public projects = [];
  searchProject;

  constructor(
    private ts: Title,
    private control: ControlService,
    private toastr: ToastrService,
    private ar: ActivatedRoute,
    private router: Router
  ) {
    this.ts.setTitle("Register");
  }

  createProject = {
    project_id: "",
    workspace_id: "",
    project_name: "",
  };

  unRegProjects;

  ngOnInit() {
    this.control.getAllProjects().subscribe(
      (resp) => {
        if (resp.code == 0) {
          // console.log(resp.result)
          this.projects = resp.result;

          resp.result.forEach((rep) => {
            this.isActive = {
              ...this.isActive,
              [rep.project_id]: true,
            };
          });

          // console.log(this.isActive)
        } else {
          this.toastr.show(
            `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
                <span data-notify="message">                
                    ` +
              resp.message +
              `
                </span>`,
            "",
            {
              timeOut: 3000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-danger alert-with-icon",
              positionClass: "toast-bottom-right",
            }
          );
        }
      },
      (error) => {
        if (error.status == 401) {
          this.control.logout();
        }
      }
    );

    this.control.getAllUnregisteredProjects().subscribe(
      (resp) => {
        if (resp.code == 0) {
          // console.log(resp)
          this.unRegProjects = resp.result;
        } else {
          this.toastr.show(
            `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
                <span data-notify="message">                
                    ` +
              resp.message +
              `
                </span>`,
            "",
            {
              timeOut: 3000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-danger alert-with-icon",
              positionClass: "toast-bottom-right",
            }
          );
        }
      },
      (error) => {
        if (error.status == 401) {
          this.control.logout();
        }
      }
    );
  }

  editPrivilege(id, state) {
    if (this.isActive[id] == true) {
      this.isActive[id] = false;
    } else {
      this.isActive[id] = true;
    }

    if (state == "cancel") {
      this.ngOnInit();
    }
  }

  updateProject(val) {
    let data = {
      project_id: val.project_id,
      start_date: moment(val.start_date).format("YYYY-MM-DD"),
      end_date: moment(val.end_date).format("YYYY-MM-DD"),
      due_date: moment(val.due_date).format("YYYY-MM-DD"),
    };
    // console.log(data)
    this.control.updateProjectDetails(data).subscribe(
      (res) => {
        if (res.code == 0) {
          this.toastr.show(
            `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
                        <span data-notify="message">                
                            ` +
              res.message +
              `
                        </span>`,
            "",
            {
              timeOut: 3000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-success alert-with-icon",
              positionClass: "toast-bottom-right",
            }
          );
          this.ngOnInit();
        } else {
          this.toastr.show(
            `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
                        <span data-notify="message">                
                            ` +
              res.message +
              `
                        </span>`,
            "",
            {
              timeOut: 3000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-danger alert-with-icon",
              positionClass: "toast-bottom-right",
            }
          );
        }
      },
      (error) => {
        if (error.status == 401) {
          this.control.logout();
        }
      }
    );
  }

  getTheDate(project_id, event) {
    // console.log(project_id, event)
  }

  onCreateProject() {
    if (
      this.createProject.project_id != "" &&
      this.createProject.project_name != "" &&
      this.createProject.workspace_id != ""
    ) {
      // console.log(this.createProject)

      this.control.createProject(this.createProject).subscribe(
        (resp) => {
          if (resp.code == 0) {
            this.ngOnInit();
            this.createProject = {
              project_id: "",
              workspace_id: "",
              project_name: "",
            };
            this.toastr.show(
              `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
                        <span data-notify="message">                
                            ` +
                resp.message +
                `
                        </span>`,
              "",
              {
                timeOut: 3000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-primary alert-with-icon",
                positionClass: "toast-bottom-right",
              }
            );
          } else {
            this.toastr.show(
              `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
                    <span data-notify="message">                
                        ` +
                resp.message +
                `
                    </span>`,
              "",
              {
                timeOut: 3000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-danger alert-with-icon",
                positionClass: "toast-bottom-right",
              }
            );
          }
        },
        (error) => {
          if (error.status == 401) {
            this.control.logout();
          }
        }
      );
    } else {
      this.toastr.show(
        `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
            <span data-notify="message">                
                Please Provide a Project Id and Name
            </span>`,
        "",
        {
          timeOut: 3000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: "toast-bottom-right",
        }
      );
    }
  }

  onRegisterProject(project) {
    if (project.value.project_id != "") {
      // console.log(project.value.project_id)

      this.control
        .registerProject({ project_id: project.value.project_id })
        .subscribe(
          (resp) => {
            if (resp.code == 0) {
            } else {
              this.toastr.show(
                `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
                    <span data-notify="message">                
                        ` +
                  resp.message +
                  `
                    </span>`,
                "",
                {
                  timeOut: 3000,
                  closeButton: true,
                  enableHtml: true,
                  toastClass: "alert alert-danger alert-with-icon",
                  positionClass: "toast-bottom-right",
                }
              );
            }
          },
          (error) => {
            if (error.status == 401) {
              this.control.logout();
            }
          }
        );
    }
  }
}
