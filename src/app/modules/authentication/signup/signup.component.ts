import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, TokenService} from '@core/_services';
import {DialogService} from '@features/dialog/dialog.service';
import {MustMatch} from '@core/_helpers/must-match.validator';
import {environment} from '../../../../environments/environment';

const PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/;
const USERNAME_PATTERN = /^[a-zA-Z0-9_-]{3,20}$/;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  message = '';
  passwordShow = false;
  brand = environment.brand;


  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private dialogSr: DialogService,
              private tokenService: TokenService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]
      ],
      username: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(USERNAME_PATTERN)]
      ],
      name: ['', [Validators.required, Validators.maxLength(30)]
      ],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(PASSWORD_PATTERN)],
      ],
      confirm: ['', [],
      ]
    }, {
      validators: MustMatch('password', 'confirm')
    });
  }

  /* Switch show password or not? */
  switchPassword(): void {
    this.passwordShow = !this.passwordShow;
  }

  /* Submit - sign up */
  submit(): void {
    this.authService.signUp(this.signUpForm.value).subscribe(
      (_: any) => {
        this.dialogSr.success('Sign Up Successfully!');
        this.router.navigate(['../signin'], {relativeTo: this.route}).then(r => {
        });
      },
      (err: any) => {
        this.dialogSr.error(err.error.errors);
      }
    );
  }

}
