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
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      status: new FormControl(''),
    })
  }

  openDialog() {
    this.dialog.nativeElement.showModal()

    this.taskForm.patchValue({
      id: this.task.id,
      title: this.task.title,
      description: this.task.description,
      status: this.task.status,
    })
  }

  closeDialog() {
    this.dialog.nativeElement.close()
    this.taskForm.reset()
  }

  onSubmit() {
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
