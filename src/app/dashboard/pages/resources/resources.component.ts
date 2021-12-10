import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ToastrService } from "ngx-toastr";
import { ControlService } from "src/app/services/control.service";

export interface AutoCompleteModel {
  value: any;
  display: string;
}

@Component({
  selector: "app-resources",
  templateUrl: "./resources.component.html",
  styleUrls: ["./resources.component.css"],
})
export class ResourcesComponent implements OnInit {
  public skills_list = [];
  public project_list = [];

  selected_skills = [];
  selected_projects = [];

  searchText;

  constructor(
    private ts: Title,
    private control: ControlService,
    private toastr: ToastrService
  ) {
    this.ts.setTitle("Resources");
  }

  public skills = [];
  public resources = [];
  public projects = [];

  public user = {
    resource_id: "",
    name: "",
    email: "",
    mobile_number: "",
    resource_level: "",
    skills: [],
    project: [],
  };

  creating: boolean = false;

  public newUser = {
    resource_id: "",
    name: "",
    email: "",
    mobile_number: "",
  };

  createMode: boolean = false;

  ngOnInit() {
    this.control.getAllSkills().subscribe(
      (resp) => {
        if (resp.code == 0) {
          // console.log(resp.result)
          this.skills = resp.result;

          resp.result.forEach((skill) => {
            this.skills_list.push({
              display: skill.skill_name,
              value: skill.skill_id,
            });
          });
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

    this.control.getAllProjects().subscribe(
      (resp) => {
        if (resp.code == 0) {
          // console.log(resp.result)
          this.projects = resp.result;

          resp.result.forEach((project) => {
            this.project_list.push({
              display: project.project_name,
              value: project.project_id,
            });
          });
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

    this.control.getAllResources().subscribe(
      (resp) => {
        if (resp.code == 0) {
          // console.log(resp.result)

          this.showResources(resp.result[0]);

          this.resources = resp.result;
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

  showResources(user) {
    // console.log(this.user)
    this.user = user;
    this.selected_skills = user.skills;
    this.selected_projects = user.project;
  }

  onSubmit() {
    this.user.skills = this.selected_skills;
    this.user.project = this.selected_projects;

    // console.log(this.user)
    // console.log(this.selected_skills)
    // console.log(this.selected_projects)

    this.control.updateResourceData(this.user).subscribe(
      (resp) => {
        if (resp.code == 0) {
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
              toastClass: "alert alert-success alert-with-icon",
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
  }

  createResource() {
    if (!this.newUser.resource_id) {
      return this.notification("Resource ID is Required", false);
    }
    if (!this.newUser.resource_id.match(/^[0-9]+$/)) {
      return this.notification("Invalid Resource ID (Number)", false);
    }
    if (!this.newUser.name) {
      return this.notification("Username is Required", false);
    }
    if (!this.newUser.email) {
      return this.notification("Email is Required", false);
    }
    if (
      !this.newUser.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      return this.notification("Invalid Email", false);
    }
    if (!this.newUser.mobile_number) {
      return this.notification("Mobile Number is Required", false);
    }
    if (!this.newUser.mobile_number.match(/^\d{10}$/)) {
      return this.notification("Invalid Mobile Number (Length: 10)", false);
    }

    this.creating = true;
    this.control.createResources(this.newUser).subscribe((resp) => {
      if (resp.code === 0) {
        this.creating = false;
        this.notification(resp.message, true);
        this.createMode = false;
        this.ngOnInit();
      } else {
        this.notification(resp.message, false);
      }
    });
  }

  notification(message, success) {
    if (success) {
      this.toastr.show(
        `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
              <span data-notify="message">                
                  ` +
          message +
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
    } else {
      this.toastr.show(
        `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
                <span data-notify="message">                
                    ` +
          message +
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
  }
}
