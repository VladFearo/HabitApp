import { Card, Badge, Button, ProgressBar } from 'react-bootstrap';

function Habit({ habit, onComplete, onIncrement }) {
    // Get the appropriate difficulty badge styling
    const getDifficultyBadge = (difficulty) => {
        const badges = {
            easy: "success",
            medium: "primary",
            hard: "danger"
        };
        return badges[difficulty] || "secondary";
    };

    // Handle completion of a regular habit
    const handleComplete = () => {
        onComplete(habit.id);
    };

    // Handle increment for counter habits
    const handleIncrement = () => {
        onIncrement(habit.id);
    };

    return (
        <Card className="mb-2">
            <Card.Body className="d-flex align-items-center p-3">
                {/* Left section: habit name and badge */}
                <div className="d-flex align-items-center me-3" style={{ width: "30%" }}>
                    <span className="fw-bold me-2">{habit.name}</span>
                    <Badge bg={getDifficultyBadge(habit.difficulty)} pill>
                        {habit.difficulty}
                    </Badge>
                </div>

                {/* Middle section: streak and/or progress bar */}
                <div className="flex-grow-1 d-flex align-items-center">
                    {habit.streak > 0 && (
                        <Badge bg="warning" text="dark" pill className="me-3">
                            <i className="bi bi-fire me-1"></i>{habit.streak}
                        </Badge>
                    )}

                    {habit.type === 'counter' ? (
                        <div className="w-100 position-relative">
                            <ProgressBar
                                now={(habit.currentCount / habit.targetCount) * 100}
                                variant="success"
                                style={{ height: '24px' }}
                            />
                            <div className="position-absolute top-50 start-50 translate-middle text-dark fw-bold">
                                {habit.currentCount}/{habit.targetCount}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-grow-1"></div> // Spacer for regular habits
                    )}
                </div>

                {/* Right section: action button */}
                <div style={{ width: "100px", textAlign: "right" }}>
                    {habit.completed ? (
                        <Badge bg="success" className="p-2">
                            <i className="bi bi-check-circle me-1"></i>Done
                        </Badge>
                    ) : habit.type === 'counter' ? (
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={handleIncrement}
                        >
                            +1
                        </Button>
                    ) : (
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={handleComplete}
                        >
                            Complete
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default Habit;