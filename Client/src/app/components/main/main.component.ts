import { Component, ElementRef, ViewChild } from '@angular/core';
import { TabbedButtonComponent } from './tabbed-button/tabbed-button.component';
import { WhisperCppService } from '../../services/whisper-cpp/whisper-cpp.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageGeneratorService } from '../../services/open-ai-api/image-generator.service';
import { OpenAIPostModel } from '../../models/open-ai-post.model';
import { OpenAIReturnModel } from '../../models/open-ai-return.model';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TabbedButtonComponent, CommonModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  constructor(
    private whisperService: WhisperCppService,
    public imageGeneratorService: ImageGeneratorService,
  ) {}

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('chatArea')
  chatArea!: ElementRef<HTMLTextAreaElement>;

  public audioTabButtonText: string = 'Audio \n Transcription';
  public imageTabGeneratorButtonText: string = 'Image Generator';
  public aboutOurPageText: string = 'About Our Page';
  public transcribeButtonText: string = 'Transcribe';
  public transcribedText: string = '';
  public imageIsGeneratingText: string = 'Generating image, please wait.';

  public transcriptionFinished: boolean = false;
  public transcriptionCopied: boolean = false;
  public audioButtonTabbed: boolean = false;
  public imageGeneratorButtonTabbed: boolean = false;
  public imageIsGenerating: boolean = false;
  public imageIsGenerated: boolean = false;

  public uploadedFile?: File | null;

  public imageGenerationPostData: OpenAIPostModel = new OpenAIPostModel();
  public imageGenerationGetData: OpenAIReturnModel = new OpenAIReturnModel();

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

  generateImage() {
    this.imageIsGenerating = true;
    this.imageIsGenerated = false;
    if (this.imageGenerationPostData.prompt != '') {
      this.imageGeneratorService
        .generateImage(this.imageGenerationPostData)
        .subscribe({
          next: (data: OpenAIReturnModel) => {
            this.imageGenerationGetData = data;
          },
          error: (err) => {
            console.error(err);
            this.imageIsGeneratingText = err.error.error.message;
          },
          complete: () => {
            this.imageIsGenerating = false;
            this.imageIsGenerated = true;
          },
        });
    }
  }
}
