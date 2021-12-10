

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ControlService } from '../services/control.service';

@Injectable({
    providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
    constructor(private control: ControlService, private router: Router) { }

    canActivate(): boolean {
        if (this.control.loggedIn === false) {
            return true;
        }
        else {
            this.router.navigate(['/dashboard']);
            return false
        }
    }
}

