import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Plan {
    id: number;
    name: string;
    description: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export const PlanList = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchPlans = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${API_URL}/plans`);
            setPlans(response.data);
        } catch (error) {
            console.error('Error fetching plans:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/plans/${id}`);
            setPlans(plans.filter(plan => plan.id !== id));
        } catch (error) {
            console.error('Error deleting plan:', error);
            setError(error instanceof Error ? error.message : 'Error deleting plan');
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="plans">
            <h1>Training Plans</h1>
            <div className="actions">
                <Link to="/plans/create" className="btn create-btn">Create New Plan</Link>
            </div>
            <div className="plans-grid">
                {plans.map(plan => (
                    <div key={plan.id} className="plan-card">
                        <h2>{plan.name}</h2>
                        <p>{plan.description}</p>
                        <div className="card-actions">
                            <Link to={`/plans/${plan.id}`} className="btn view-btn">View</Link>
                            <button onClick={() => handleDelete(plan.id)} className="btn delete-btn">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlanList;