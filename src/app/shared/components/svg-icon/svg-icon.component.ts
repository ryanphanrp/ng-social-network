import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {getSvg} from '@shared/components/svg-icon/svg.data';
import {ISvg} from '@shared/models';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss']
})
export class SvgIconComponent implements OnInit {

  @Input() name = '';
  @Input() fill = 'none';
  @Input() height = 28;
  @Input() width = 28;
  svg!: ISvg;
  data!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.svg = getSvg(this.name);
    this.data = this.sanitizer.bypassSecurityTrustHtml(this.svg.data);
  }
}
