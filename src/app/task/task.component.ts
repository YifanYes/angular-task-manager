import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { TaskType } from '../../../types/task'
import { TaskService } from '../services/task.service'

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  faTrash = faTrash
  @Input() task!: TaskType
  @Output('loadTasks') loadTasks = new EventEmitter()

  constructor(private taskService: TaskService) {}

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'todo':
        return 'status-badge todo'
      case 'in-progress':
        return 'status-badge in-progress'
      case 'done':
        return 'status-badge done'
      default:
        return 'status-badge'
    }
  }

  deleteTask(task: TaskType) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.loadTasks.emit()
    })
  }
}
