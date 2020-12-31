interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface HoursAndTarget {
  hours: Array<number>;
  target: number;
}

const parseArgumentsExercise = (args: Array<string>): HoursAndTarget => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const hours = args.splice(3).map(h => Number(h));

  if (!isNaN(target) && hours.every(h => !isNaN(h))) {
    return {
      hours,
      target
    };
  } else {
    throw new Error('Provided values must be numbers');
  }
};


const calculateExercises = (hours: Array<number>, target: number): Result => {
  
  const periodLength = hours.length;
  const trainingDays = hours.filter(h => h > 0).length;
  const average = hours.reduce((acc,curr) => acc + curr) / periodLength;

  const numericalRating = (ratio: number): number => {
    if (ratio < 0.5) return 1;
    else if (ratio < 1) return 2;
    else return 3;
  };

  const ratingDescription = (rating: number): string => {
    switch (rating) {
      case 1:
        return 'did you even try?';
      case 2:
        return 'not too bad but could be better';
      case 3:
        return 'great work, you reached the target!';
      default:
        throw new Error('Numerical rating should be on a scale from 1 to 3');
    }
  };

  const rating = numericalRating(average/target);

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription: ratingDescription(rating),
    target,
    average
  };
};

try {
  const { hours, target } = parseArgumentsExercise(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Something went wrong, error message: ', error.message);
}

export { calculateExercises };