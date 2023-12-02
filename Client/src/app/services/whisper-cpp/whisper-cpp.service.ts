import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranscriptionModel } from '../../models/transcription.model';
import { environment } from '../../../environments/environment';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhisperCppService {
  private endpoint: string = '/whisper/transcribe';

  constructor(private httpClient: HttpClient) {}

  getTranscription(audioFile: File): Observable<TranscriptionModel> {
    const formData = this.convertToFormData(audioFile);

    return this.httpClient
      .post<TranscriptionModel>(
        `${environment.whisperCppApiUrl}${this.endpoint}`,
        formData,
      )
      .pipe(
        retry(1),
        catchError((error) => {
          console.error('Request failed: ', error);
          return throwError(() => new Error(error));
        }),
      );
  }

  private convertToFormData(file: File): FormData {
    const formData = new FormData();
    formData.append('file', file);

    return formData;
  }
}
