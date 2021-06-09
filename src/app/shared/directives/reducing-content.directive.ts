import {AfterViewInit, Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appReducingContent]'
})
export class ReducingContentDirective implements AfterViewInit{
  originalContent = '';
  countWord = 0;
  @Input() limit = 70;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.originalContent = this.elementRef.nativeElement.innerText;
    this.countWord = this.elementRef.nativeElement.innerText.split(' ').length;
    if (this.countWord >= this.limit) {
      this.reduceContent();
    }
  }

  @HostListener('click', ['$event.target'])
  onClick(event: any): void {
    if (this.elementRef.nativeElement.innerText === this.originalContent && this.countWord >= this.limit) {
      this.reduceContent();
    } else {
      this.elementRef.nativeElement.innerText = this.originalContent;
    }
  }

  reduceContent(): void {
    this.elementRef.nativeElement.innerText = this.elementRef.nativeElement.innerText.split(' ').splice(0, this.limit).join(' ') + '...';
  }
}
