import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { TaskType } from '../../../types/task'
import { TaskService } from '../services/task/task.service'
import { ToastService } from '../services/toast/toast.service'

@Component({
  selector: 'app-create-task-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-task-dialog.component.html',
  styleUrl: './create-task-dialog.component.css',
})
export class CreateTaskDialogComponent {
  taskForm: FormGroup
  @Input() tasksList: TaskType[] = []
  @ViewChild('dialog', { static: false })
  dialog!: ElementRef<HTMLDialogElement>

  constructor(
    private taskService: TaskService,
    public toastService: ToastService
  ) {
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
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
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value).subscribe((task) => {
        this.toastService.add('Task created successfully')
        this.closeDialog()
        this.tasksList.push(task)
      })
    }
  }
}
