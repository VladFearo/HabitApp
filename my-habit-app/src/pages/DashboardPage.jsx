import Habit from '../components/Habit'
import { useState } from 'react'

const exampleHabits = [
    {
        id: 1,
        name: "Morning Meditation",
        difficulty: "easy",
        type: "regular",
        completed: false,
        streak: 5,
        schedule: [0, 1, 2, 3, 4, 5, 6] // All days of the week
    },
    {
        id: 2,
        name: "Gym Workout",
        difficulty: "hard",
        type: "regular",
        completed: true,
        streak: 8,
        schedule: [1, 3, 5] // Monday, Wednesday, Friday
    },
    {
        id: 3,
        name: "Drink Water",
        difficulty: "medium",
        type: "counter",
        targetCount: 8,
        currentCount: 3,
        completed: false,
        streak: 12,
        schedule: [0, 1, 2, 3, 4, 5, 6] // Every day
    },
    {
        id: 4,
        name: "Read 20 Pages",
        difficulty: "medium",
        type: "regular",
        completed: false,
        streak: 0, // Newly added habit
        schedule: [0, 1, 2, 3, 4, 5, 6] // Every day
    },
    {
        id: 5,
        name: "Code Practice",
        difficulty: "hard",
        type: "counter",
        targetCount: 5,
        currentCount: 5,
        completed: true,
        streak: 15,
        schedule: [1, 2, 3, 4, 5] // Weekdays only
    },
    {
        id: 6,
        name: "Evening Stretching",
        difficulty: "easy",
        type: "regular",
        completed: false,
        streak: 3,
        schedule: [0, 1, 2, 3, 4, 5, 6] // Every day
    }
];

function DashboardPage() {
    const [habits, setHabits] = useState(exampleHabits);


    const handleComplete = (habitId) => {
        // Update habit completion status
        setHabits(habits.map(habit =>
            habit.id === habitId
                ? { ...habit, completed: true, streak: habit.streak + 1 }
                : habit
        ));
    };


    const handleIncrement = (habitId) => {
        // Increment counter habit
        setHabits(habits.map(habit => {
            if (habit.id === habitId) {
                const newCount = habit.currentCount + 1;
                const completed = newCount >= habit.targetCount;
                const newStreak = completed ? habit.streak + 1 : habit.streak;
                return {
                    ...habit,
                    currentCount: newCount,
                    completed: completed,
                    streak: newStreak
                };
            }
            return habit;
        }));
    };

    return (
        <div className="container py-4">
            <h1 className="mb-4">My Habits</h1>

            {/* Uniform list of habits */}
            <div className="card">
                <div className="card-body p-2">
                    {habits.map(habit => (
                        <Habit
                            key={habit.id}
                            habit={habit}
                            onComplete={handleComplete}
                            onIncrement={handleIncrement}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage