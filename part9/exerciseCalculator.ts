
interface View1 { 
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number; 
}


const calculateExercises = (args: number[]): View1 => {


    return {
    periodLength: 1,
    trainingDays: 1,
    success: true,
    rating: 1,
    ratingDescription: 'string',
    target: 2,
    average: 2, 
    }
}


console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]))