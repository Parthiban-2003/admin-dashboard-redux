import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../features/formsSlice'
import { useNavigate } from 'react-router-dom'

function FormStore() {
  const users = useSelector(state => state.forms.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="container mt-4">
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate('/formsControl')}
      >
        Add User
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Skills</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.skills.join(',')}</td>
              <td>{user.country}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => navigate(`/formsControl/${user.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => dispatch(deleteUser(user.id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FormStore;
