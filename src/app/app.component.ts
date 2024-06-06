import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TaskType } from '../../types/task'
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component'
import { TaskService } from './services/task.service'
import { TaskComponent } from './task/task.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskComponent, CreateTaskDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-task-manager'
  tasksList: TaskType[] = []

  constructor(private taskService: TaskService) {
    this.loadTasks()
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasksList = tasks
    })
  }
}
