// DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import Habit from '../components/Habit';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Card from 'react-bootstrap/Card';

// Example habit data
const initialHabits = [
    {
        id: 1,
        name: "Morning Meditation",
        completed: 0,
        total: 5,
        difficulty: "easy",
        streak: 3
    },
    {
        id: 2,
        name: "Workout",
        completed: 2,
        total: 10,
        difficulty: "hard",
        streak: 5
    },
    {
        id: 3,
        name: "Reading",
        completed: 0,
        total: 1,
        difficulty: "medium",
        streak: 140
    }
];

function DashboardPage() {
    // State for habits, experience and level
    const [habits, setHabits] = useState(initialHabits);
    const [exp, setExp] = useState(0);
    const [level, setLevel] = useState(1);

    // Calculate XP needed for next level
    const xpForNextLevel = (currentLevel) => {
        const baseXP = 100;
        return Math.round(baseXP * Math.pow(1.5, currentLevel - 1));
    };

    // Get current XP requirement
    const expToNextLevel = xpForNextLevel(level);

    // Calculate percentage for exp bar
    const expPercentage = (exp / expToNextLevel) * 100;

    // Calculate XP based on habit difficulty and streak
    const calculateXP = (difficulty, streak = 0) => {
        let baseXP = 0;

        // Base XP by difficulty
        switch (difficulty) {
            case "easy": baseXP = 10; break;
            case "medium": baseXP = 20; break;
            case "hard": baseXP = 30; break;
            default: baseXP = 10;
        }

        // Streak multiplier
        let multiplier = 1;
        if (streak >= 30) multiplier = 3;
        else if (streak >= 14) multiplier = 2;
        else if (streak >= 7) multiplier = 1.5;
        else if (streak >= 3) multiplier = 1.2;

        return Math.round(baseXP * multiplier);
    };

    // Handle habit completion
    const onComplete = (habitId, difficulty, streak) => {
        // Update streak for the completed habit
        setHabits(prevHabits =>
            prevHabits.map(habit =>
                habit.id === habitId
                    ? { ...habit, streak: habit.streak + 1 }
                    : habit
            )
        );

        // Get the updated streak value
        const updatedStreak = habits.find(h => h.id === habitId).streak + 1;

        // Calculate earned XP
        const earnedXP = calculateXP(difficulty, updatedStreak);

        // Update total XP
        const newExp = exp + earnedXP;

        // Check for level up
        if (newExp >= expToNextLevel) {
            setLevel(prevLevel => prevLevel + 1);
            setExp(newExp - expToNextLevel);
            // You could add a level-up notification here
        } else {
            setExp(newExp);
        }
    };

    return (
        <Container className="py-4">
            {/* XP Progress Bar */}
            <Card className="mb-4">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="mb-0">Level {level}</h5>
                        <span>{exp}/{expToNextLevel} XP</span>
                    </div>
                    <ProgressBar
                        now={expPercentage}
                        variant="success"
                        animated
                    />
                </Card.Body>
            </Card>

            <Container className="mb-4">
                <h1>Dashboard</h1>
            </Container>

            <Container className="mb-3">
                {habits.map(habit => (
                    <Habit
                        key={habit.id}
                        id={habit.id}
                        name={habit.name}
                        initialCompleted={habit.completed}
                        total={habit.total}
                        difficulty={habit.difficulty}
                        streak={habit.streak}
                        onComplete={onComplete}
                    />
                ))}
            </Container>

            <Container>
                <Button variant="primary">Add Habit</Button>
            </Container>
        </Container>
    );
}

export default DashboardPage;