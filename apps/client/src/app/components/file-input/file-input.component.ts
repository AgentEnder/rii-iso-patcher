import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'rii-iso-patcher-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
})  
export class FileInputComponent {
  @Input() label?: string;
  @Input() progress?: number | null;
  @Output() fileSelected = new EventEmitter<string | undefined>();

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
    if (e.dataTransfer?.files[0].path) {
      this.selectFile(e.dataTransfer?.files[0].path);
    }
  }

  @HostListener('click', ['$event']) click() {
    this.fileInput?.nativeElement.click();
  }

  selectFile(path?: string) {
    this.fileSelected.next(path);
    this.selectedFile = path;
  }
}
