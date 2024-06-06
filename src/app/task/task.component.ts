import { Component, EventEmitter, Input, Output } from '@angular/core'
import { TaskStatus, TaskType } from '../../../types/task'
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component'

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [EditTaskDialogComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task!: TaskType
  @Output() loadTasks = new EventEmitter()

  constructor() {}

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case TaskStatus.toDo:
        return 'status-badge todo'
      case TaskStatus.inProgress:
        return 'status-badge in-progress'
      case TaskStatus.done:
        return 'status-badge done'
      default:
        return 'status-badge'
    }
  }
}
