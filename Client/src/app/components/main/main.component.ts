import { Component, ElementRef, ViewChild } from '@angular/core';
import { TabbedButtonComponent } from './tabbed-button/tabbed-button.component';
import { WhisperCppService } from '../../services/whisper-cpp/whisper-cpp.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TabbedButtonComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  constructor(private whisperService: WhisperCppService) {}

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('chatArea')
  chatArea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('sendMessage')
  sendMessage!: ElementRef<HTMLInputElement>; //Za slanje requesta prema AI

  public audioTabButtonText: string = 'Audio \n Transcription';
  public imageTabGeneratorButtonText: string = 'Image Generator';
  public aboutOurPageText: string = 'About Our Page';
  public transcribeButtonText: string = 'Transcribe';

  public uploadedFile?: File | null;
  public transcriptionFinished: boolean = false;
  public transcribedText: string = '';
  public transcriptionCopied: boolean = false;

  public audioButtonTabbed: boolean = false;
  public imageGeneratorButtonTabbed: boolean = false;

  getFileName(): string {
    if (this.uploadedFile == null || this.uploadedFile.name == '') {
      return 'No file selected';
    }

    return this.uploadedFile.name;
  }

  audioButtonClicked(tabbedStatus: boolean): void {
    this.audioButtonTabbed = tabbedStatus;
    this.imageGeneratorButtonTabbed = false;
  }

  imageGeneratorClicked(tabbedStatus: boolean): void {
    this.imageGeneratorButtonTabbed = tabbedStatus;
    this.audioButtonTabbed = false;
  }

  onUploadClicked(): void {
    this.fileInput.nativeElement.click();
  }

  onFileUploaded(): void {
    if (this.fileInput.nativeElement.files != null) {
      const file = this.fileInput.nativeElement.files[0];
      this.uploadedFile = file;
    }
  }

  autoResize(): void {
    this.chatArea.nativeElement.style.height = '1px';
    this.chatArea.nativeElement.style.height = `${this.chatArea.nativeElement.scrollHeight}px`;
  }

  async onTranscribeClicked(): Promise<void> {
    if (this.uploadedFile == null) {
      alert('Upload a file first!');
      return;
    }

    this.transcribeButtonText = 'Transcribing...';

    this.whisperService.getTranscription(this.uploadedFile).subscribe({
      next: (transcriptionModel) => {
        this.transcribedText =
          this.whisperService.parseTranscriptionModel(transcriptionModel);
      },
      error: (error) => {
        console.error('Error happened: ', error);
      },
      complete: () => {
        this.transcribeButtonText = 'Transcribe';
        this.transcriptionCopied = false;
      },
    });
  }

  onCopyClick(): void {
    navigator.clipboard.writeText(this.transcribedText);
    this.transcriptionCopied = true;
  }
}
