import { Component, ElementRef, ViewChild } from '@angular/core';
import { TabbedButtonComponent } from './tabbed-button/tabbed-button.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TabbedButtonComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  constructor() {}

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('chatArea') chatArea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('sendMessage') sendMessage!: ElementRef<HTMLInputElement>; //Za slanje requesta prema AI

  public audioTabButtonText: string = 'Audio \n Transcription';
  public imageTabGeneratorButtonText: string = 'Image Generator';
  public aboutOurPageText: string = 'About Our Page';
  public audioButtonText: string = 'Transcript';
  public uploadedFileName: string = '';

  public audioButtonTabbed: boolean = false;
  public imageGeneratorButtonTabbed: boolean = false;

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
      this.uploadedFileName = file.name;
    }
  }

  autoResize(): void {
    this.chatArea.nativeElement.style.height = '1px';
    this.chatArea.nativeElement.style.height = `${this.chatArea.nativeElement.scrollHeight}px`;
  }
}
