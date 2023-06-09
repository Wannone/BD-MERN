import { useState } from "react"
import { useWorkoutContext } from "../hooks/UseWorkoutContext"

const WorkoutForm = () => {
    const {dispatch} = useWorkoutContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = {title, load, reps};
        const response = await fetch('/api/workout', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(workout)
        })
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFields([]);
            console.log('new workout added',json);
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Workout</h3>

            <label>Exercize Title: </label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title} 
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Exercize Load: </label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load} 
                className={emptyFields.includes('load') ? 'error' : ''}
            />
            <label>Exercize Reps: </label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />
        
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm