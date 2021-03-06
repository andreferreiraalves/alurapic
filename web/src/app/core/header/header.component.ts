import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../user/user';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    user$: Observable<User>;

    constructor(
        private userService: UserService,
        private route: Router) {
        this.user$ = this.userService.getUser();
    }

    logout() {
        this.userService.logout();
        this.route.navigate(['']);
    }
}