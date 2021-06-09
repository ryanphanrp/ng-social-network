import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform} from 'ngx-image-cropper';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {UserService} from '@core/_services';
import {DialogService} from '@features/dialog/dialog.service';

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.component.html',
  styleUrls: ['./update-avatar.component.scss']
})
export class UpdateAvatarComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  listCroppedImage: any[] = [];
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  transform: ImageTransform = {};
  isShowUpload = false;
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<UpdateAvatarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userSr: UserService,
              private dialogSr: DialogService) {
  }

  ngOnInit(): void {
    this.fileChangeEvent(this.data);
  }

  /*
  Function - Cropped Image
  */
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
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

  // Rotate image
  rotateLeft(): void {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight(): void {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

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

  resetImage(): void {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
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

  // Zoom
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

  // Convert Bob to File
  blobToFile(theBlob: Blob, fileName: string): File {
    return new File([theBlob], fileName, {type: 'image/jpeg'});
  }

  /*
  Function - Dialog Upload Avatar
  */
  onNoClick(): void {
    this.dialogRef.close();
  }

  submitNewAvatar(): void {
    this.isLoading = true;

    // Convert Image Blob to File
    const file: File = this.blobToFile(base64ToFile(this.croppedImage), 'avatar.jpeg');
    const formData: FormData = new FormData();
    formData.append('avatarUrl', file);

    // Call user Services
    this.userSr.updateAvatar(formData).subscribe(
      (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            break;
          case HttpEventType.Response:
            this.isLoading = false;
            this.dialogSr.success('A new post has been created successfully!');
            this.userSr.updateUserInLocal(event.body.data.infoUser);
            this.dialogRef.close(true);
        }
      },
      (err: any) => {
        this.isLoading = false;
        this.dialogSr.error('Something went wrong.');
        console.log(err);
      }
    );
  }

}
