import { Component, ElementRef, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit, DoCheck {

    // add path to the list which is showing in the sidebar also add it in the navbar.component.ts
    list = [
        'home',
        'projects',
        'resources',
        'register',
    ]

    currentUser = JSON.parse(localStorage.getItem("techweirdo_user") || '{}').email.split("@")[0]
  
    constructor(private router: Router, private element: ElementRef) { }

    ngOnInit() {
        this.routeChange()
        console.log(this.currentUser);
    }

    ngDoCheck() {
        this.routeChange()
    }

    routeChange() {
        let url = this.router.url
        // console.log(url);
        var sidebar: HTMLElement = this.element.nativeElement;
        this.list.forEach(res => {
            if (url.includes(res)) {
                sidebar.getElementsByClassName(res)[0].classList.add('active');
            } else {
                sidebar.getElementsByClassName(res)[0].classList.remove('active');
            }
        })
    }
}
