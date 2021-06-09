import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-mail-sent',
  templateUrl: './mail-sent.component.html',
  styleUrls: ['./mail-sent.component.scss']
})
export class MailSentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MailSentComponent>) {
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.dialogRef.close(true);
  }

}
