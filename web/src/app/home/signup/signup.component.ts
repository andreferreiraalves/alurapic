import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
    templateUrl: './signup.component.html',
    providers: [UserNotTakenValidatorService]
})
export class SignUpComponent implements OnInit {

    @ViewChild('mailInput') emailInput: ElementRef<HTMLInputElement>;

    signUpGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signUpService: SignUpService,
        private platformDetectorService: PlatformDetectorService) { }


    ngOnInit(): void {
        this.signUpGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
            // userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[a-z0-9_\-]+$/)]],
            userName: [
                '',
                [Validators.required, Validators.minLength(2), Validators.maxLength(30), lowerCaseValidator],
                this.userNotTakenValidatorService.checkUserNameTaken()
            ],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]]
        });

        this.platformDetectorService.isPlatformBrowser() &&
            this.emailInput.nativeElement.focus();
    }

    signUp() {
        const newUser = this.signUpGroup.getRawValue() as NewUser;
        this.signUpService
            .signUp(newUser)
            .subscribe(
                () => this.router.navigate([''])
                , err => console.log(err))
    }
}