export interface IrisFeatures {
  sepalLength: number;
  sepalWidth: number;
  petalLength: number;
  petalWidth: number;
}

export interface PredictionResult {
  species: 'Setosa' | 'Versicolor' | 'Virginica';
  confidence: {
    setosa: number;
    versicolor: number;
    virginica: number;
  };
}

// Simple rule-based classifier based on Iris dataset characteristics
export function classifyIris(features: IrisFeatures): PredictionResult {
  const { sepalLength, sepalWidth, petalLength, petalWidth } = features;
  
  // Rule-based classification inspired by actual Iris dataset patterns
  // Setosa: typically has smaller petals (length < 2.5)
  // Versicolor: medium-sized petals (2.5 <= length < 5.0)
  // Virginica: larger petals (length >= 5.0) and wider petals
  
  let setosaScore = 0;
  let versicolorScore = 0;
  let virginicaScore = 0;
  
  // Petal length is the most discriminative feature
  if (petalLength < 2.5) {
    setosaScore += 40;
  } else if (petalLength >= 2.5 && petalLength < 5.0) {
    versicolorScore += 35;
    if (petalWidth < 1.7) versicolorScore += 15;
  } else {
    virginicaScore += 35;
    if (petalWidth >= 1.7) virginicaScore += 15;
  }
  
  // Petal width
  if (petalWidth < 0.8) {
    setosaScore += 30;
  } else if (petalWidth >= 0.8 && petalWidth < 1.7) {
    versicolorScore += 25;
  } else {
    virginicaScore += 25;
  }
  
  // Sepal length (less discriminative but helpful)
  if (sepalLength < 5.5) {
    setosaScore += 15;
  } else if (sepalLength >= 5.5 && sepalLength < 6.5) {
    versicolorScore += 20;
  } else {
    virginicaScore += 20;
  }
  
  // Sepal width
  if (sepalWidth > 3.2) {
    setosaScore += 15;
  } else if (sepalWidth >= 2.7 && sepalWidth <= 3.2) {
    versicolorScore += 20;
  } else {
    virginicaScore += 20;
  }
  
  // Normalize scores to percentages
  const total = setosaScore + versicolorScore + virginicaScore;
  const confidence = {
    setosa: Math.round((setosaScore / total) * 100),
    versicolor: Math.round((versicolorScore / total) * 100),
    virginica: Math.round((virginicaScore / total) * 100),
  };
  
  // Determine species with highest confidence
  let species: 'Setosa' | 'Versicolor' | 'Virginica';
  if (setosaScore >= versicolorScore && setosaScore >= virginicaScore) {
    species = 'Setosa';
  } else if (versicolorScore >= virginicaScore) {
    species = 'Versicolor';
  } else {
    species = 'Virginica';
  }
  
  return {
    species,
    confidence,
  };
}

// Example measurements for each species (for reference)
export const exampleMeasurements = {
  setosa: {
    sepalLength: 5.1,
    sepalWidth: 3.5,
    petalLength: 1.4,
    petalWidth: 0.2,
  },
  versicolor: {
    sepalLength: 5.9,
    sepalWidth: 3.0,
    petalLength: 4.2,
    petalWidth: 1.5,
  },
  virginica: {
    sepalLength: 6.5,
    sepalWidth: 3.0,
    petalLength: 5.5,
    petalWidth: 2.0,
  },
};
