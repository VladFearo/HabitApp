import React from 'react'
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

function Habit({ id, name, initialCompleted, total, difficulty, streak, onComplete }) {
    const [completed, setCompleted] = React.useState(initialCompleted);
    const precentage = (completed / total) * 100;

    const handleIncrement = () => {
        if (completed + 1 < total) {
            setCompleted(completed + 1);
        } else if (completed + 1 === total) {
            // Just completed
            setCompleted(completed + 1);
            // Call the onComplete callback with habit id, difficulty and streak
            onComplete(id, difficulty, streak);
        }
    }
    return (
        <Card body>
            <div className="d-flex align-items-center">
                <div className="me-3" >
                    <div>{name}</div>
                    <Badge bg={
                        {
                            "easy": "success",
                            "medium": "primary",
                            "hard": "danger"
                        }[difficulty] || "secondary"  // "secondary" as fallback
                    }>
                        {difficulty}
                    </Badge>
                    {streak > 0 && (
                        <Badge bg="warning" text="dark" className="ms-1">
                            Streak: {streak}
                        </Badge>
                    )}
                </div>
                <div className="flex-grow-1 me-3">
                    <ProgressBar
                        variant='success'
                        now={precentage}
                        label={`${completed}/${total}`} />
                </div>
                <Button
                    variant={completed >= total ? "secondary" : "success"}
                    onClick={handleIncrement}
                    disabled={completed >= total}
                >
                    {completed >= total ? 'Completed' : 'Complete'}
                </Button>
            </div>
        </Card>
    )
}

export default Habit