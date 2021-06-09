import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-hashtag-chip',
  templateUrl: './hashtag-chip.component.html',
  styleUrls: ['./hashtag-chip.component.scss']
})
export class HashtagChipComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @Output() hashTags = new EventEmitter<string[]>();
  @Input() hashtags = ['example'];

  constructor() {
  }

  ngOnInit(): void {
    this.hashTags.emit(this.hashtags);
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim() && !this.hashtags.includes(value)) {
      this.hashtags?.push(value.trim());
      this.hashTags?.emit(this.hashtags);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: string): void {
    const index = this.hashtags.indexOf(fruit);

    if (index >= 0) {
      this.hashtags?.splice(index, 1);
    }
    this.hashTags.emit(this.hashtags);
  }

}
