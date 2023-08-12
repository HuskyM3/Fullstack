interface MultiplyValues {
    value1: number;
    value2: number;
  }
  
  const parseArguments = (args: string[]): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  
  const calculateBmi = (a: number, b: number, printText: string) => {
    const value: number = b / (a*0.1*0.1*a);
    if (value < 0.17){
        return console.log(printText,  'under weight');
    }if (value > 0.25){
        return console.log(printText,  'over weight');
    }else console.log(printText,  'normal weight');

    
  }
  
  try {
    const { value1, value2 } = parseArguments(process.argv);
    calculateBmi(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
    console.log(calculateBmi(180, 74, 'test'))
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }


  