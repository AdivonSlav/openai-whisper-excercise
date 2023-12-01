import { Component, OnInit } from '@angular/core';
import { WhisperCppService } from '../../services/whisper-cpp/whisper-cpp.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  constructor(private whisperService: WhisperCppService) {}

  async ngOnInit(): Promise<void> {
    await this.whisperService.transcribe();  
  }
}
