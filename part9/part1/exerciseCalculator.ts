
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
    periodLength: args.length,
    trainingDays: args.filter(n=>n>0).length,
    success: true,
    rating: 1,
    ratingDescription: 'string',
    target: 2,
    average: args.reduce((n,m)=>n+m,0)/args.length, 
    }
}

try{

    console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]))
}catch{

}
