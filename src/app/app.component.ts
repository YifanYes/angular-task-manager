import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TaskType } from '../../types/task'
import { CreateTaskDialogComponent } from './components/create-task-dialog/create-task-dialog.component'
import { EditTaskDialogComponent } from './components/edit-task-dialog/edit-task-dialog.component'
import { TaskComponent } from './components/task/task.component'
import { TaskService } from './services/task/task.service'
import { ToastService } from './services/toast/toast.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TaskComponent,
    CreateTaskDialogComponent,
    EditTaskDialogComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-task-manager'
  tasksList: TaskType[] = []

  constructor(
    private taskService: TaskService,
    public toastService: ToastService
  ) {
    this.loadTasks()
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasksList = tasks
    })
  }

  getToastClass(type: string): string {
    switch (type.toLowerCase()) {
      case 'error':
        return 'toast error'
      default:
        return 'toast success'
    }
  }
}
