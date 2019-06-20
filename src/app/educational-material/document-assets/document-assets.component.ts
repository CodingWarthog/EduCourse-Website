import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Asset } from 'src/app/_models/assets/asset';
import { AssetService } from 'src/app/_services/asset.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-assets',
  templateUrl: './document-assets.component.html',
  styleUrls: ['./document-assets.component.scss']
})
export class DocumentAssetsComponent implements OnInit {
  assets: Asset[];
  displayedColumns: string[] = ['name', 'type', 'creationDate', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private assetService: AssetService,
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.assetService
      .getUserDocuments(this.authService.decodedToken.nameid)
      .subscribe(result => {
        this.assets = result['documentOfUserListingResponses'];
        this.dataSource = new MatTableDataSource(this.assets);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  deleteAsset(row) {
    const asset_id = (row.id);
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
  moveToUpload() {
    this.router.navigate(['/images']);
  }
}
