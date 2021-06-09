import {Component, OnInit} from '@angular/core';
import {enterAnimations} from '@shared/models';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: enterAnimations
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
  }

}
