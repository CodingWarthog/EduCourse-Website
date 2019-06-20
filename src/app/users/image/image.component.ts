import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Asset } from 'src/app/_models/assets/asset';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AssetService } from 'src/app/_services/asset.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() assets: Asset[];
  documentOfUserListingResponses: Asset[];
  dataSource = new MatTableDataSource();

  displayedColumns = ['name', 'url', 'dataCreated', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  baseUrl = environment.apiUrl;
  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private assetService: AssetService
  ) {}

  ngOnInit() {
    this.initializeUploader();
    this.assetService
      .getUserDocuments( this.authService.decodedToken.nameid)
      .subscribe(result => {
        this.assets = result['documentOfUserListingResponses'];
        this.dataSource = new MatTableDataSource(this.assets);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'assets/' + this.authService.decodedToken.nameid,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image', 'pdf', 'video'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 1000 * 1024 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
      this.assetService.getUserDocuments( this.authService.decodedToken.nameid);
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Asset = JSON.parse(response);
        this.alertifyService.success('Plik został wysłany');
        const asset = {
          id: res.id,
          name: res.name,
          type: res.type,
          dataCreated: res.dataCreated,
          url: res.url,
          publicId: res.publicId,
          userId: res.userId
        };
        // this.assets.push(asset);
        // if (photo.isMain) {
        //   this.authService.changeMemberPhoto(photo.url);
        //   this.authService.currentUser.photoUrl = photo.url;
        //   localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        // }
      }
    };
    // this.uploader.onErrorItem = (item, response, status, headers) => {
    //   if (response) {
    //     const res: Asset = JSON.parse(response);
    //     this.alertify.error('Plik nie został wysłany');
    //     const asset = {
    //       id: res.id,
    //       name: res.name,
    //       description: res.description,
    //       dataCreated: res.dataCreated,
    //       url: res.url,
    //       publicId: res.publicId,
    //       userId: res.userId
    //     };
    //     // this.assets.push(asset);
    //     // if (photo.isMain) {
    //     //   this.authService.changeMemberPhoto(photo.url);
    //     //   this.authService.currentUser.photoUrl = photo.url;
    //     //   localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    //     // }
    //   }
    // };
  }
  deleteQuestion(row) {
    const asset_id = row.id;
    console.log(asset_id);
    console.log(row);
    this.assetService.deleteAsset(asset_id).subscribe(
      () => {
        this.alertifyService.success('Materiał został usunięty');
        this.ngOnInit();
        // this.router.navigate(['/users']);
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }
}
