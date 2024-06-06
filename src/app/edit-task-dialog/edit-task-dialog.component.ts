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
import confetti from 'canvas-confetti'
import { TaskStatus, TaskType } from '../../../types/task'
import { TaskService } from '../services/task/task.service'
import { ToastService } from '../services/toast/toast.service'

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
  @Input() tasksList!: TaskType[]
  @ViewChild('dialog', { static: false })
  dialog!: ElementRef<HTMLDialogElement>

  constructor(
    private taskService: TaskService,
    public toastService: ToastService
  ) {
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
      const updatedTask = {
        ...this.task,
        ...this.taskForm.value,
      }

      this.taskService.updateTask(updatedTask).subscribe(() => {
        const taskIndex = this.tasksList.findIndex(
          (t) => t.id === updatedTask.id
        )
        if (taskIndex !== -1) {
          this.tasksList[taskIndex] = updatedTask
        }

        this.toastService.add('Task updated successfully')
        this.closeDialog()

        if (updatedTask.status === TaskStatus.done) {
          this.celebrate()
        }
      })
    }
  }

  deleteTask(task: TaskType): void {
    this.taskService.deleteTask(task).subscribe(() => {
      const taskIndex = this.tasksList.findIndex((t) => t.id === task.id)
      if (taskIndex !== -1) {
        this.tasksList.splice(taskIndex, 1)
      }

      this.toastService.add('Task deleted successfully')
      this.closeDialog()
    })
  }

  async celebrate(): Promise<void> {
    const duration = 1000

    confetti({
      particleCount: 100,
      spread: 180,
      origin: { y: 0.6 },
    })

    // Clear confetti after a certain duration
    setTimeout(() => confetti.reset(), duration)
  }
}
