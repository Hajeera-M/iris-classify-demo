// Unified classification system supporting multiple classification problems

export type ClassificationType = 'iris' | 'wine' | 'fruit' | 'animal';

export interface ClassificationFeatures {
  [key: string]: number;
}

export interface PredictionResult {
  category: string;
  confidence: {
    [key: string]: number;
  };
}

export interface ClassificationConfig {
  id: ClassificationType;
  name: string;
  description: string;
  icon: string;
  categories: string[];
  features: {
    id: string;
    label: string;
    unit: string;
    min: number;
    max: number;
    step: number;
    tooltip: string;
  }[];
  examples: {
    [category: string]: ClassificationFeatures;
  };
  howItWorks: string;
  keyFeature: string;
}

// Configuration for all classification types
export const classificationConfigs: ClassificationConfig[] = [
  {
    id: 'iris',
    name: 'Iris Flowers',
    description: 'Classify iris flowers into three species based on petal and sepal measurements',
    icon: '🌸',
    categories: ['Setosa', 'Versicolor', 'Virginica'],
    features: [
      {
        id: 'sepalLength',
        label: 'Sepal Length',
        unit: 'cm',
        min: 4.0,
        max: 8.0,
        step: 0.1,
        tooltip: 'Length of the outer leaf-like structure that protects the flower bud',
      },
      {
        id: 'sepalWidth',
        label: 'Sepal Width',
        unit: 'cm',
        min: 2.0,
        max: 4.5,
        step: 0.1,
        tooltip: 'Width of the outer leaf-like structure',
      },
      {
        id: 'petalLength',
        label: 'Petal Length',
        unit: 'cm',
        min: 1.0,
        max: 7.0,
        step: 0.1,
        tooltip: 'Length of the inner colored petal (most important feature!)',
      },
      {
        id: 'petalWidth',
        label: 'Petal Width',
        unit: 'cm',
        min: 0.1,
        max: 2.5,
        step: 0.1,
        tooltip: 'Width of the inner colored petal',
      },
    ],
    examples: {
      Setosa: { sepalLength: 5.1, sepalWidth: 3.5, petalLength: 1.4, petalWidth: 0.2 },
      Versicolor: { sepalLength: 5.9, sepalWidth: 3.0, petalLength: 4.2, petalWidth: 1.5 },
      Virginica: { sepalLength: 6.5, sepalWidth: 3.0, petalLength: 5.5, petalWidth: 2.0 },
    },
    howItWorks: 'The classifier examines petal and sepal measurements to distinguish between species. Petal length is the most important feature—Setosa has very short petals (<2.5cm), while Virginica has the longest petals (>5cm).',
    keyFeature: 'Petal Length',
  },
  {
    id: 'wine',
    name: 'Wine Types',
    description: 'Classify wines into Red, White, or Rosé based on chemical composition',
    icon: '🍷',
    categories: ['Red Wine', 'White Wine', 'Rosé Wine'],
    features: [
      {
        id: 'alcohol',
        label: 'Alcohol Content',
        unit: '%',
        min: 8.0,
        max: 15.0,
        step: 0.1,
        tooltip: 'Percentage of alcohol by volume in the wine',
      },
      {
        id: 'acidity',
        label: 'Total Acidity',
        unit: 'g/L',
        min: 2.5,
        max: 4.0,
        step: 0.1,
        tooltip: 'Total acidity measured in grams per liter (key for wine type!)',
      },
      {
        id: 'sugar',
        label: 'Residual Sugar',
        unit: 'g/L',
        min: 0.5,
        max: 15.0,
        step: 0.5,
        tooltip: 'Amount of sugar remaining after fermentation',
      },
      {
        id: 'ph',
        label: 'pH Level',
        unit: '',
        min: 2.8,
        max: 4.0,
        step: 0.1,
        tooltip: 'Measure of acidity/alkalinity (lower = more acidic)',
      },
    ],
    examples: {
      'Red Wine': { alcohol: 13.5, acidity: 3.2, sugar: 2.5, ph: 3.5 },
      'White Wine': { alcohol: 11.0, acidity: 3.8, sugar: 8.0, ph: 3.1 },
      'Rosé Wine': { alcohol: 12.0, acidity: 3.4, sugar: 4.5, ph: 3.3 },
    },
    howItWorks: 'Wine classification relies on chemical properties. White wines typically have higher acidity and more residual sugar, while red wines are fuller-bodied with higher alcohol content and lower acidity.',
    keyFeature: 'Total Acidity',
  },
  {
    id: 'fruit',
    name: 'Fruits',
    description: 'Classify common fruits based on physical characteristics',
    icon: '🍎',
    categories: ['Apple', 'Orange', 'Banana'],
    features: [
      {
        id: 'weight',
        label: 'Weight',
        unit: 'g',
        min: 50,
        max: 300,
        step: 5,
        tooltip: 'Weight of the fruit in grams',
      },
      {
        id: 'diameter',
        label: 'Diameter',
        unit: 'cm',
        min: 3.0,
        max: 10.0,
        step: 0.5,
        tooltip: 'Widest diameter measurement (bananas are much narrower!)',
      },
      {
        id: 'sweetness',
        label: 'Sweetness',
        unit: 'Brix',
        min: 8.0,
        max: 18.0,
        step: 0.5,
        tooltip: 'Sugar content measured on the Brix scale',
      },
      {
        id: 'firmness',
        label: 'Firmness',
        unit: 'kg/cm²',
        min: 2.0,
        max: 10.0,
        step: 0.5,
        tooltip: 'Pressure resistance (apples are firmest, bananas are softest)',
      },
    ],
    examples: {
      Apple: { weight: 180, diameter: 7.5, sweetness: 14.0, firmness: 8.5 },
      Orange: { weight: 150, diameter: 7.0, sweetness: 11.0, firmness: 6.0 },
      Banana: { weight: 120, diameter: 3.5, sweetness: 16.0, firmness: 3.0 },
    },
    howItWorks: 'Fruit classification uses physical measurements. Diameter is highly distinctive—bananas are elongated with small diameter, while apples and oranges are rounder. Firmness also helps distinguish fruits.',
    keyFeature: 'Diameter',
  },
  {
    id: 'animal',
    name: 'Animals',
    description: 'Classify animals into Dog, Cat, or Bird based on physical traits',
    icon: '🐾',
    categories: ['Dog', 'Cat', 'Bird'],
    features: [
      {
        id: 'bodyLength',
        label: 'Body Length',
        unit: 'cm',
        min: 15,
        max: 120,
        step: 5,
        tooltip: 'Length from head to tail',
      },
      {
        id: 'weight',
        label: 'Weight',
        unit: 'kg',
        min: 0.5,
        max: 50.0,
        step: 0.5,
        tooltip: 'Animal weight in kilograms',
      },
      {
        id: 'legCount',
        label: 'Leg Count',
        unit: '',
        min: 2,
        max: 4,
        step: 1,
        tooltip: 'Number of legs (birds have 2, dogs and cats have 4)',
      },
      {
        id: 'heartRate',
        label: 'Heart Rate',
        unit: 'bpm',
        min: 60,
        max: 250,
        step: 5,
        tooltip: 'Resting heart rate in beats per minute',
      },
    ],
    examples: {
      Dog: { bodyLength: 85, weight: 25.0, legCount: 4, heartRate: 100 },
      Cat: { bodyLength: 50, weight: 4.5, legCount: 4, heartRate: 150 },
      Bird: { bodyLength: 20, weight: 0.8, legCount: 2, heartRate: 200 },
    },
    howItWorks: 'Animal classification combines categorical (leg count) and numerical features. Leg count immediately separates birds from mammals, while weight and heart rate help distinguish between dogs and cats.',
    keyFeature: 'Leg Count',
  },
];

// Generic classifier function
export function classify(
  type: ClassificationType,
  features: ClassificationFeatures
): PredictionResult {
  const config = classificationConfigs.find((c) => c.id === type);
  if (!config) throw new Error(`Unknown classification type: ${type}`);

  const scores: { [key: string]: number } = {};
  config.categories.forEach((cat) => (scores[cat] = 0));

  // Get example measurements for comparison
  const examples = config.examples;

  // Calculate similarity scores for each category
  config.categories.forEach((category) => {
    const example = examples[category];
    let similarity = 0;
    let totalWeight = 0;

    config.features.forEach((feature, index) => {
      const weight = config.features.length - index; // Earlier features get higher weight
      const userValue = features[feature.id];
      const exampleValue = example[feature.id];
      const range = feature.max - feature.min;

      // Calculate normalized difference (0 = identical, 1 = max difference)
      const diff = Math.abs(userValue - exampleValue) / range;
      const featureSimilarity = Math.max(0, 1 - diff);

      similarity += featureSimilarity * weight;
      totalWeight += weight;
    });

    scores[category] = (similarity / totalWeight) * 100;
  });

  // Normalize scores to percentages
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const confidence: { [key: string]: number } = {};
  config.categories.forEach((cat) => {
    confidence[cat] = Math.round((scores[cat] / total) * 100);
  });

  // Find category with highest confidence
  const category = Object.entries(confidence).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];

  return { category, confidence };
}
