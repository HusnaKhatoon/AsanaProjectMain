import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ControlService } from 'src/app/services/control.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

    list = [
        'home',
        'projects',
        'notification',
        'resources',
        'register',
    ]

    currentPage = "HOME";

    keyword = 'name';
    public global_search = []

    constructor(
        private router: Router,
        private control: ControlService,
        private toastr: ToastrService
    ) { }

    ngDoCheck() {
        let url = this.router.url
        this.list.forEach(res => {
            if (url.includes(res)) {
                this.currentPage = res.toUpperCase()
            }
        })
    }

    ngOnInit() {
        //console.log (this.router.url);

        this.control.globalSearch().subscribe(resp => {
            if (resp.code == 0) {
                 console.log(resp.result)
                this.global_search = resp.result
            } else {
                this.toastr.show(
                    `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
                    <span data-notify="message">                
                        <b>Project Management</b> - a Techweirdo Consultancy internal App.
                    </span>`,
                    "",
                    {
                        timeOut: 3000,
                        closeButton: true,
                        enableHtml: true,
                        toastClass: "alert alert-danger alert-with-icon",
                        positionClass: "toast-bottom-right"
                    }
                );
            }
        }, (error) => {
            if (error.status == 401) {
                this.control.logout()
            }
        });
    }

    // (inputChanged)="onChangeSearch($event)"
    // (inputFocused)="onFocused($event)"

    selectEvent(item) {

        // console.log(item)

        this.router.navigate(["dashboard/projects/search/" + item.project_id + "/" + item.task_id])

    }

    logout() {
        this.control.logout()
    }


}
