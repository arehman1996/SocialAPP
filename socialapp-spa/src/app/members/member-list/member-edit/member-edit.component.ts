import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  // tslint:disable-next-line: whitespace
  @ViewChild('editForm', {static:true}) editForm: NgForm;
  user: User;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  // tslint:disable-next-line: typedef
  unloadNotification($event: any)
  {
    if (this.editForm.dirty)
    {
      $event.returnValue = true;
    }
  }


  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    // tslint:disable-next-line: align
    private userService: UserService, private authService: AuthService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  // tslint:disable-next-line: typedef
  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });

  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}
