import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OpenAIPostModel } from '../../models/open-ai-post.model';
import { OpenAIReturnModel } from '../../models/open-ai-return.model';

@Injectable({
  providedIn: 'root',
})
export class ImageGeneratorService {
  constructor(private httpClient: HttpClient) {}

  private openAIUrl: string = environment.openAIUrl;
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `${environment.authorization}`,
  });

  generateImage(sentData: OpenAIPostModel): Observable<OpenAIReturnModel> {
    return this.httpClient.post<OpenAIReturnModel>(this.openAIUrl, sentData, {
      headers: this.headers,
      responseType: 'json',
    });
  }
}
