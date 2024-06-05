import { TaskType } from '../../types/task'

const TaskTransformer = ({
  _id,
  title,
  description,
  status,
}: any): TaskType => ({
  id: _id.toString(),
  title,
  description,
  status,
})

export default TaskTransformer
