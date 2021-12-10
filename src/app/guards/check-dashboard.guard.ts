import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ControlService } from '../services/control.service';

@Injectable({
    providedIn: 'root'
})
export class CheckDashboardGuard implements CanActivate {
    constructor(private control: ControlService, private router: Router) { }

    canActivate(): boolean {
        // console.log(this.control.loggedIn)
        if (this.control.loggedIn === true) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false
        }
    }

}

