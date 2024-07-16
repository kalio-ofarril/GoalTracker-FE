export function getCalendarData(userId){
    let calendarData = {
        "2024": {
            "5": {
                "25": {
                    "completeness": 75,
                    "activities": ["GYM", "Learning", "Diet"]
                },
                "27": {
                    "completeness": 100,
                    "activities": ["GYM", "Learning", "Diet","Practice"]
                }
            },
            "6": {
                "1": {
                    "completeness": 0,
                    "activities": []
                },
                "2": {
                    "completeness": 75,
                    "activities": ["GYM", "Diet","Practice"]
                },
                "3": {
                    "completeness": 75,
                    "activities": ["GYM", "Diet","Practice"]
                },
                "4": {
                    "completeness": 100,
                    "activities": ["GYM", "Learning","Diet","Practice"]
                },
                "10": {
                    "completeness": 100,
                    "activities": ["GYM", "Learning","Diet","Practice"]
                }
            }
        }
    };

    return calendarData;
}

export function getMonthActivities(userId, month){

    let monthActivities = [
        "Gym",
        "Diet",
        "Learning",
        "Practice",
        "Practice",
        "Practice",
        "Practice",
        "Practice",
        "Practice",
        "Practice"
    ]

    return monthActivities;
}