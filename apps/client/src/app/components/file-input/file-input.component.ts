import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'rii-iso-patcher-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
})  
export class FileInputComponent {
  @Input() label?: string;
  @Input() progress?: number | null;
  @Output() fileSelected = new EventEmitter<string>();

  @ViewChild('f') fileInput?: ElementRef<HTMLElement>;

  protected selectedFile?: string;
  protected hover = false;

  constructor(private viewContainerRef: ViewContainerRef) {}

  @HostListener('dragover', ['$event']) dragStart(e: DragEvent) {
    this.hover = true;
    e.preventDefault();
    e.stopPropagation();
  }

  @HostListener('drop', ['$event']) drop(e: DragEvent) {
    this.hover = false;
    console.log(e);
    e.stopPropagation();
    e.preventDefault();
    this.selectFile('');
  }

  @HostListener('click', ['$event']) click() {
    this.fileInput?.nativeElement.click();
  }

  selectFile(f: string) {
    this.fileSelected.next(f);
    this.selectedFile = f;
  }
}
