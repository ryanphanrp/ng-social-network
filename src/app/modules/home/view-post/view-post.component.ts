import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {IPost} from '@shared/models';
import {map, switchMap} from 'rxjs/operators';
import {PostService} from '@core/_services';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  post$!: Observable<IPost>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postSr: PostService) { }

  ngOnInit(): void {
    this.post$ = this.activatedRoute.paramMap.pipe(
      map(para => para.get('ID') as string),
      switchMap((ID: string) => this.postSr.getSinglePost(ID))
    ) as Observable<IPost>;
  }

}
