import {Component, Input, OnInit} from '@angular/core';
import {slideAnimation} from '@shared/models';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: slideAnimation
})
export class CarouselComponent implements OnInit {
  curIndex = 0;
  @Input() slides: string[] = [];
  @Input() animation: 'fade' | 'scale' | 'flip' | 'jackInTheBox' = 'fade';
  @Input() mode: 'normal' | 'dialog' = 'normal';

  options = {
    normal: {
      height: 'auto',
      width: '100%'
    },
    dialog: {
      height: '100%',
      width: '100%'
    }
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  onNext(): void {
    this.curIndex = this.curIndex === this.slides.length - 1 ? 0 : this.curIndex + 1;
  }

  onPre(): void {
    this.curIndex = this.curIndex === 0 ? this.slides.length - 1 : this.curIndex - 1;
  }

}
