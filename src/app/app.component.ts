import { Component } from '@angular/core'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { RouterOutlet } from '@angular/router'
import { TaskType } from '../../types/task'
import { TaskService } from './services/task.service'
import { TaskComponent } from './task/task.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-task-manager'
  tasksList: TaskType[] = []
  taskForm: FormGroup

  constructor(private taskService: TaskService) {
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    })

    this.loadTasks()
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasksList = tasks
    })
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value).subscribe((task) => {
        this.tasksList = [...this.tasksList, task]
      })
    }
  }
}
