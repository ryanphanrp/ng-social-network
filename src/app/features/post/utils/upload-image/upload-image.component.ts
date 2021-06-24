import {ChangeDetectorRef, Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform} from 'ngx-image-cropper';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  listCroppedImage: any[] = [];
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  Images: File[] = [];
  isShowUpload = false;
  ratio = 4 / 3;
  disableRatio = false;
  editImg: any = '';

  /* Images from input */
  imagesFromInput: string[] = [];

  @Output() listImg = new EventEmitter<File[]>();

  constructor(private cdRef: ChangeDetectorRef) {
  }

  @Input() set setImg(value: string[]) {
    if (!!value) {
      this.imagesFromInput = value;
      this.initImages();
    }
  }

  ngOnInit(): void {
  }

  initImages(): void {
    this.isShowUpload = true;
    this.imagesFromInput.forEach(ele => {
      this.toDataURL(ele, (dataUrl: string) => {
        this.listCroppedImage.push(dataUrl);
        this.emitToParent();
      });
    });
  }

  /*
  *  Initial Image
  * */
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log(event);
    this.isShowUpload = true;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  imageLoaded(): void {
    this.showCropper = true;
    // console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions): void {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed(): void {
    console.log('Load failed');
  }

  // Rotate Image
  rotateLeft(): void {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight(): void {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  updateRotation(): void {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }

  /*handleChangeRatio(event: any): void {
    console.log(event);
  }*/

  // Flip Image
  flipHorizontal(): void {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical(): void {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  flipAfterRotate(): void {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }

  // Zoom Image
  zoomOut(): void {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn(): void {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }


  // Other functions
  resetImage(): void {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  toggleContainWithinAspectRatio(): void {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  blobToFile(theBlob: Blob, fileName: string): File {
    return new File([theBlob], fileName, {type: 'image/jpeg'});
  }

  // Emit List Images to Parent Component
  pushToListCroppedImage(): void {
    if (!this.listCroppedImage.includes(this.croppedImage)) {
      this.listCroppedImage.push(this.croppedImage);
      this.Images.push(this.convertBase64toFile(this.croppedImage));
      this.listImg.emit(this.Images);
      this.emitToParent();
      this.disableRatio = true;
    }
  }

  convertBase64toFile(value: any): File {
    const filename = Math.random().toString(36).substring(10);
    return this.blobToFile(base64ToFile(value), filename);
  }

  emitToParent(): void {
    this.Images = this.listCroppedImage.map(ele => this.convertBase64toFile(ele));
    this.listImg.emit(this.Images);
  }

  // Delete Image in List Cropped Images
  deleteThisImage(img: any): void {
    this.listCroppedImage = this.listCroppedImage.filter(ele => ele !== img);
    this.emitToParent();
  }


  // Convert URL to base64
  toDataURL(url: string, callback: any): void {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  // Crop this image
  editThisImage(value: string): void {
    this.deleteThisImage(value);
    this.editImg = value;
    this.cdRef.markForCheck();
  }

}
