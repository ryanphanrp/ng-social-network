import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountedLikesPipe } from './pipes/counted-likes.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { ReducingContentDirective } from './directives/reducing-content.directive';
import { BrandComponent } from './components/brand/brand.component';
import {MatDividerModule} from '@angular/material/divider';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CommentComponent } from './components/comment/comment.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {RouterModule} from '@angular/router';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { InfoUserComponent } from './components/info-user/info-user.component';
import { ToPartnerPipe } from './pipes/to-partner.pipe';
import {FormsModule} from '@angular/forms';
import {MatRippleModule} from '@angular/material/core';



@NgModule({
    declarations: [
        CountedLikesPipe,
        TimeAgoPipe,
        ReducingContentDirective,
        BrandComponent,
        CarouselComponent,
        CommentComponent,
        NotFoundComponent,
        SvgIconComponent,
        InfoUserComponent,
        ToPartnerPipe
    ],
  exports: [
    CommentComponent,
    CountedLikesPipe,
    SvgIconComponent,
    CarouselComponent,
    ReducingContentDirective,
    TimeAgoPipe,
    InfoUserComponent,
    BrandComponent,
    ToPartnerPipe
  ],
    imports: [
        CommonModule,
        MatDividerModule,
        RouterModule,
        FormsModule,
        MatRippleModule
    ]
})
export class SharedModule { }
