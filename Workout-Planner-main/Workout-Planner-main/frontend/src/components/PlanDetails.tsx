import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Plan {
  id: number;
  name: string;
  description: string;
  days: Day[];
}

interface Day {
  id: number;
  name: string;
  orderIndex: number;
  exercises: Exercise[];
}

interface Exercise {
  id: number;
  name: string;
  sets: number;
  repetitions: number;
  notes?: string;
  orderIndex: number;
}

interface ExerciseForm {
  name: string;
  sets: number;
  repetitions: number;
  notes?: string;
}

function PlanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [newDayName, setNewDayName] = useState('');
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [editingExercise, setEditingExercise] = useState<number | null>(null);
  const [exerciseForm, setExerciseForm] = useState<ExerciseForm>({
    name: '',
    sets: 0,
    repetitions: 0,
    notes: ''
  });

  useEffect(() => {
    fetchPlan();
  }, [id]);

  const fetchPlan = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/plans/${id}`);
      setPlan(response.data);
    } catch (error) {
      console.error('Error fetching plan:', error);
    }
  };

  const handleAddDay = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/plans/${id}/days`, {
        name: newDayName,
        orderIndex: plan?.days.length || 0
      });
      setNewDayName('');
      fetchPlan();
    } catch (error) {
      console.error('Error adding day:', error);
    }
  };

  const handleDeleteDay = async (dayId: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/days/${dayId}`);
      fetchPlan();
    } catch (error) {
      console.error('Error deleting day:', error);
    }
  };

  const handleUpdateDay = async (dayId: number, name: string) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/days/${dayId}`, { name });
      setEditingDay(null);
      fetchPlan();
    } catch (error) {
      console.error('Error updating day:', error);
    }
  };

  const handleAddExercise = async (dayId: number, exercise: Partial<Exercise>) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/days/${dayId}/exercises`, {
        ...exercise,
        orderIndex: plan?.days.find(d => d.id === dayId)?.exercises.length || 0
      });
      fetchPlan();
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExercise(exercise.id);
    setExerciseForm({
      name: exercise.name,
      sets: exercise.sets,
      repetitions: exercise.repetitions,
      notes: exercise.notes || ''
    });
  };

  const handleSaveExercise = async (exerciseId: number) => {
    try {
      console.log('Saving exercise:', { exerciseId, form: exerciseForm });

      const apiUrl = `${import.meta.env.VITE_API_URL}/exercises/${exerciseId}`;
      console.log('API URL:', apiUrl);

      const response = await axios.patch(apiUrl, {
        name: exerciseForm.name,
        sets: Number(exerciseForm.sets),
        repetitions: Number(exerciseForm.repetitions),
        notes: exerciseForm.notes || null
      });
      
      console.log('Save response:', response.data);

      if (response.status === 200) {
        setEditingExercise(null);
        await fetchPlan();
      }
    } catch (error) {
      console.error('Error updating exercise:', error.response?.data || error);
    }
  };

  const handleDeleteExercise = async (exerciseId: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/exercises/${exerciseId}`);
      fetchPlan();
    } catch (error) {
      console.error('Error deleting exercise:', error);
    }
  };

  if (!plan) return <div>Loading...</div>;

  return (
    <div className="plan-details">
      <h1>{plan.name}</h1>
      <p className="description">{plan.description}</p>
      
      <div className="add-day">
        <input
          type="text"
          value={newDayName}
          onChange={(e) => setNewDayName(e.target.value)}
          placeholder="New day name"
        />
        <button onClick={handleAddDay} className="btn add-btn">Add Day</button>
      </div>

      <div className="days-list">
        {plan.days.sort((a, b) => a.orderIndex - b.orderIndex).map(day => (
          <div key={day.id} className="day-card">
            {editingDay === day.id ? (
              <div className="edit-day">
                <input
                  type="text"
                  defaultValue={day.name}
                  onBlur={(e) => handleUpdateDay(day.id, e.target.value)}
                />
              </div>
            ) : (
              <div className="day-header">
                <h2>{day.name}</h2>
                <div className="day-actions">
                  <button onClick={() => setEditingDay(day.id)} className="btn edit-btn">Edit</button>
                  <button onClick={() => handleDeleteDay(day.id)} className="btn delete-btn">Delete</button>
                </div>
              </div>
            )}

            <div className="add-exercise">
              <button
                onClick={() => handleAddExercise(day.id, {
                  name: 'New Exercise',
                  sets: 3,
                  repetitions: 10
                })}
                className="btn add-btn"
              >
                Add Exercise
              </button>
            </div>

            <div className="exercises-list">
              {day.exercises.sort((a, b) => a.orderIndex - b.orderIndex).map(exercise => (
                <div key={exercise.id} className="exercise-card">
                  {editingExercise === exercise.id ? (
                    <div className="edit-exercise">
                      <input
                        type="text"
                        value={exerciseForm.name}
                        onChange={(e) => setExerciseForm({ ...exerciseForm, name: e.target.value })}
                        placeholder="Exercise name"
                      />
                      <input
                        type="number"
                        value={exerciseForm.sets}
                        onChange={(e) => setExerciseForm({ ...exerciseForm, sets: parseInt(e.target.value) || 0 })}
                        placeholder="Sets"
                      />
                      <input
                        type="number"
                        value={exerciseForm.repetitions}
                        onChange={(e) => setExerciseForm({ ...exerciseForm, repetitions: parseInt(e.target.value) || 0 })}
                        placeholder="Repetitions"
                      />
                      <textarea
                        value={exerciseForm.notes}
                        onChange={(e) => setExerciseForm({ ...exerciseForm, notes: e.target.value })}
                        placeholder="Notes"
                      />
                      <div className="exercise-form-actions">
                        <button onClick={() => handleSaveExercise(exercise.id)} className="btn save-btn">Save</button>
                        <button onClick={() => setEditingExercise(null)} className="btn cancel-btn">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3>{exercise.name}</h3>
                      <p>Sets: {exercise.sets}</p>
                      <p>Reps: {exercise.repetitions}</p>
                      {exercise.notes && <p>Notes: {exercise.notes}</p>}
                      <div className="exercise-actions">
                        <button onClick={() => handleEditExercise(exercise)} className="btn edit-btn">Edit</button>
                        <button onClick={() => handleDeleteExercise(exercise.id)} className="btn delete-btn">Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlanDetails; 