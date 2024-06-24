document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('workout-form');
    const message = document.getElementById('message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const exercise = form.exercise.value.trim();
        const duration = form.duration.value;
        const date = form.date.value;

        if (exercise && duration && date) {
            const workout = {
                exercise,
                duration,
                date
            };

            let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
            workouts.push(workout);
            localStorage.setItem('workouts', JSON.stringify(workouts));

            message.textContent = 'Workout logged successfully!';
            form.reset();
        } else {
            message.textContent = 'Please fill in all fields.';
        }
    });

    if (window.location.pathname.includes('progress.html')) {
        const ctx = document.getElementById('progressChart').getContext('2d');
        let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
        
        const dates = workouts.map(workout => workout.date);
        const durations = workouts.map(workout => workout.duration);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Workout Duration (minutes)',
                    data: durations,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
