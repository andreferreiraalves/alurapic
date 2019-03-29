import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
    fromUrl: string;
    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private platformDetectorService: PlatformDetectorService,
        private activatedRout: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRout.queryParams.subscribe(params => this.fromUrl = params['fromUrl']);

        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.platformDetectorService.isPlatformBrowser() &&
            this.userNameInput.nativeElement.focus();
    }

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService
            .authenticate(userName, password)
            .subscribe(
                () => {
                    if (this.fromUrl) {
                        this.router.navigateByUrl(this.fromUrl)
                    } else {
                        this.router.navigate(['user', userName]);
                    }
                },
                err => {
                    this.loginForm.reset();

                    this.platformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
                    alert('Invalid user name or password');
                }
            );
    }
}