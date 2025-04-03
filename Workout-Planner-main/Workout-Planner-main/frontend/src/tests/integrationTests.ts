import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://backend:3000/api';

// Test tworzenia planu
export const testCreatePlan = async () => {
  try {
    const response = await axios.post(`${API_URL}/plans`, {
      name: "Test Plan",
      description: "Test Description"
    });
    console.log('Plan created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating plan:', error);
    throw error;
  }
};

// Test usuwania planu
export const testDeletePlan = async (planId: number) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/plans/${planId}`);
    console.log('Plan deleted successfully');
  } catch (error) {
    console.error('Error deleting plan:', error);
  }
};

// Test dodawania dnia
export const testAddDay = async (planId: number) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/plans/${planId}/days`, {
      name: "Test Day",
      orderIndex: 0
    });
    console.log('Day added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding day:', error);
  }
};

// Test edycji dnia
export const testUpdateDay = async (dayId: number) => {
  try {
    const response = await axios.patch(`${import.meta.env.VITE_API_URL}/days/${dayId}`, {
      name: "Updated Day Name"
    });
    console.log('Day updated:', response.data);
  } catch (error) {
    console.error('Error updating day:', error);
  }
};

// Test usuwania dnia
export const testDeleteDay = async (dayId: number) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/days/${dayId}`);
    console.log('Day deleted successfully');
  } catch (error) {
    console.error('Error deleting day:', error);
  }
};

// Test dodawania ćwiczenia
export const testAddExercise = async (dayId: number) => {
  try {
    const response = await axios.post(`${API_URL}/days/${dayId}/exercises`, {
      name: "Test Exercise",
      sets: 3,
      repetitions: 10,
      notes: "Test notes",
      orderIndex: 0
    });
    console.log('Exercise added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding exercise:', error);
    throw error;
  }
};

// Test edycji ćwiczenia
export const testUpdateExercise = async (exerciseId: number) => {
  try {
    const updateResponse = await axios.patch(`${API_URL}/exercises/${exerciseId}`, {
      name: "Updated Exercise",
      sets: 4,
      repetitions: 12,
      notes: "Updated notes"
    });
    console.log('Exercise updated:', updateResponse.data);
    return updateResponse.data;
  } catch (error) {
    console.error('Error updating exercise:', error);
    throw error;
  }
};

// Test usuwania ćwiczenia
export const testDeleteExercise = async (exerciseId: number) => {
  try {
    await axios.delete(`${API_URL}/exercises/${exerciseId}`);
    console.log('Exercise deleted successfully');
  } catch (error) {
    console.error('Error deleting exercise:', error);
  }
};

// Pełny test integracyjny
export const runFullTest = async () => {
  try {
    // 1. Utwórz plan
    const plan = await testCreatePlan();
    if (!plan || !plan.id) {
      throw new Error('Failed to create plan');
    }
    console.log('Step 1: Plan created');

    // 2. Dodaj dzień do planu
    const day = await testAddDay(plan.id);
    console.log('Step 2: Day added');

    // 3. Dodaj ćwiczenie do dnia
    const exercise = await testAddExercise(day.id);
    console.log('Step 3: Exercise added');

    // 4. Edytuj ćwiczenie
    await testUpdateExercise(exercise.id);
    console.log('Step 4: Exercise updated');

    // 5. Edytuj dzień
    await testUpdateDay(day.id);
    console.log('Step 5: Day updated');

    // 6. Usuń ćwiczenie
    await testDeleteExercise(exercise.id);
    console.log('Step 6: Exercise deleted');

    // 7. Usuń dzień
    await testDeleteDay(day.id);
    console.log('Step 7: Day deleted');

    // 8. Usuń plan
    await testDeletePlan(plan.id);
    console.log('Step 8: Plan deleted');

    console.log('All tests passed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}; 