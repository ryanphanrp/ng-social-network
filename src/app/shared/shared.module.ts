import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatRippleModule} from '@angular/material/core';
import {BrandComponent, InfoUserComponent, NotFoundComponent, SvgIconComponent} from '@shared/components';
import {ReducingContentDirective} from '@shared/directives';
import {CountedLikesPipe, TimeAgoPipe, ToPartnerPipe} from '@shared/pipes';
import {MatTooltipModule} from '@angular/material/tooltip';

// Material Modules
const materialModules = [
  MatDividerModule,
  MatTooltipModule,
  MatRippleModule
];

// Component for share
const sharedComponents = [
  BrandComponent,
  InfoUserComponent,
  SvgIconComponent,
  NotFoundComponent
];

// Directives for share
const sharedDirectives = [
  ReducingContentDirective
];

// Pipes for share
const sharedPipes = [
  CountedLikesPipe,
  TimeAgoPipe,
  ToPartnerPipe
];

@NgModule({
  declarations: [
    sharedComponents,
    sharedPipes,
    sharedDirectives
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    materialModules
  ],
  exports: [
    sharedComponents,
    sharedPipes,
    sharedDirectives
  ]
})
export class SharedModule {
}
