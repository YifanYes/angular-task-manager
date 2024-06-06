import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { TaskType } from '../../../types/task'
import { TaskService } from '../services/task.service'

@Component({
  selector: 'app-edit-task-dialog',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './edit-task-dialog.component.html',
  styleUrl: './edit-task-dialog.component.css',
})
export class EditTaskDialogComponent {
  faPenToSquare = faPenToSquare
  taskForm: FormGroup
  @Input() task!: TaskType
  @ViewChild('dialog', { static: false })
  dialog!: ElementRef<HTMLDialogElement>

  constructor(private taskService: TaskService) {
    this.taskForm = new FormGroup({
      id: new FormControl(this.task?.id ?? ''),
      title: new FormControl(this.task?.title ?? '', [Validators.required]),
      description: new FormControl(this.task?.description ?? ''),
      status: new FormControl(this.task?.status ?? ''),
    })
  }

  openDialog() {
    this.dialog.nativeElement.showModal()
  }

  closeDialog() {
    this.dialog.nativeElement.close()
    this.taskForm.reset()
  }

  onSubmit() {
    //console.log('UPDATE')
    if (this.taskForm.valid) {
      this.taskService.updateTask(this.taskForm.value).subscribe(() => {})
      window.location.reload()
    }
  }

  deleteTask(task: TaskType): void {
    this.taskService.deleteTask(task).subscribe(() => {
      window.location.reload()
    })
  }
}
