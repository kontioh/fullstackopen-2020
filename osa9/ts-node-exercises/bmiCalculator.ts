interface HeightAndWeight {
  height: number;
  weight: number;
}

const parseArgumentsBmi = (args: Array<string>): HeightAndWeight => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values must be numbers');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  if (weight <= 0 || height <= 0) {
    throw new Error('Height and weight must be positive numbers!');
  }

  const bmi = weight / Math.pow(height * 0.01, 2);
  
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi > 30) {
    return 'Obese';
  } else if (bmi > 25) {
    return 'Overweight';
  } else {
    return 'Normal (healthy weight)';
  }
};

try {
  const { height, weight } = parseArgumentsBmi(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Something went wrong, error message: ', error.message);
}

export { calculateBmi };