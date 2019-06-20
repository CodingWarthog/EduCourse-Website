import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Asset } from '../_models/assets/asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserDocuments(user_id: number) {
    return this.http.get<Asset[]>(this.baseUrl + 'assets/documents/' + user_id);
  }
  getUserImages() {
    return this.http.get<Asset[]>(this.baseUrl + 'assets/images');
  }
  getUserVideos(user_id: number) {
    return this.http.get<Asset[]>(this.baseUrl + 'assets/videos/' + user_id);
}
  deleteAsset(asset_id: number)  {
    const url = this.baseUrl + `assets/` + asset_id;
    return this.http.delete(url);
  }
}
