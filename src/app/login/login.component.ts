import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ControlService } from '../services/control.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private control: ControlService,
        private _formBuilder: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
        private ts: Title,
    ) {
        this.ts.setTitle("Project Management");
    }

    formdata: FormGroup;

    ngOnInit() {
        this.formdata = this._formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required],
        });
    }

    get email() {
        return this.formdata.get("email");
    }
    get password() {
        return this.formdata.get("password");
    }

    onSubmit() {
        if (this.formdata) {
             console.log(this.formdata.value)

            this.control.loginUser(this.formdata.value).subscribe(res => {
                if (res.code == 0) {

                    localStorage.setItem('techweirdo_token', res.result.Token);
                    localStorage.setItem('techweirdo_user', JSON.stringify(res.result.data));
                    this.router.navigate(['dashboard']);

                } else {

                    this.toastr.show(
                        `<span data-notify="icon" class="nc-icon nc-bell-55"></span>
                        <span data-notify="message">                
                            `+ res.message + `
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
            });
        }
    }

}
