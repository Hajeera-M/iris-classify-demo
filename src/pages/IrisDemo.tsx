import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flower2, Sparkles } from "lucide-react";
import { classifyIris, exampleMeasurements, type PredictionResult } from "@/utils/irisModel";
import { toast } from "sonner";

const IrisDemo = () => {
  const [sepalLength, setSepalLength] = useState("");
  const [sepalWidth, setSepalWidth] = useState("");
  const [petalLength, setPetalLength] = useState("");
  const [petalWidth, setPetalWidth] = useState("");
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const handlePredict = () => {
    const sl = parseFloat(sepalLength);
    const sw = parseFloat(sepalWidth);
    const pl = parseFloat(petalLength);
    const pw = parseFloat(petalWidth);

    if (isNaN(sl) || isNaN(sw) || isNaN(pl) || isNaN(pw)) {
      toast.error("Please enter valid numbers for all measurements");
      return;
    }

    if (sl < 0 || sw < 0 || pl < 0 || pw < 0) {
      toast.error("Measurements cannot be negative");
      return;
    }

    const result = classifyIris({
      sepalLength: sl,
      sepalWidth: sw,
      petalLength: pl,
      petalWidth: pw,
    });

    setPrediction(result);
    toast.success("Classification complete!");
  };

  const loadExample = (species: keyof typeof exampleMeasurements) => {
    const example = exampleMeasurements[species];
    setSepalLength(example.sepalLength.toString());
    setSepalWidth(example.sepalWidth.toString());
    setPetalLength(example.petalLength.toString());
    setPetalWidth(example.petalWidth.toString());
    setPrediction(null);
  };

  const getSpeciesColor = (species: string) => {
    switch (species) {
      case 'Setosa':
        return 'bg-accent';
      case 'Versicolor':
        return 'bg-primary';
      case 'Virginica':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-gradient-hero">
                <Flower2 className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Interactive Iris Classifier
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter the measurements of an iris flower and let our classifier predict its species
            </p>
          </div>

          {/* Example Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadExample('setosa')}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Load Setosa Example
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadExample('versicolor')}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Load Versicolor Example
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadExample('virginica')}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Load Virginica Example
            </Button>
          </div>

          {/* Input Form */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl">Flower Measurements</CardTitle>
              <CardDescription className="text-base">
                Enter measurements in centimeters (typical range: 0.1 - 8.0 cm)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sepal-length" className="text-base">
                    Sepal Length (cm)
                  </Label>
                  <Input
                    id="sepal-length"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 5.1"
                    value={sepalLength}
                    onChange={(e) => setSepalLength(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sepal-width" className="text-base">
                    Sepal Width (cm)
                  </Label>
                  <Input
                    id="sepal-width"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 3.5"
                    value={sepalWidth}
                    onChange={(e) => setSepalWidth(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="petal-length" className="text-base">
                    Petal Length (cm)
                  </Label>
                  <Input
                    id="petal-length"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 1.4"
                    value={petalLength}
                    onChange={(e) => setPetalLength(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="petal-width" className="text-base">
                    Petal Width (cm)
                  </Label>
                  <Input
                    id="petal-width"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 0.2"
                    value={petalWidth}
                    onChange={(e) => setPetalWidth(e.target.value)}
                    className="text-lg"
                  />
                </div>
              </div>

              <Button
                onClick={handlePredict}
                size="lg"
                className="w-full text-lg shadow-soft"
              >
                Predict Species
              </Button>
            </CardContent>
          </Card>

          {/* Prediction Results */}
          {prediction && (
            <Card className="shadow-soft bg-gradient-card animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardHeader>
                <CardTitle className="text-2xl">Prediction Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-xl text-muted-foreground">Predicted Species:</span>
                  <Badge className={`text-xl py-2 px-6 ${getSpeciesColor(prediction.species)}`}>
                    {prediction.species}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-center">Confidence Scores</h4>
                  
                  <div className="space-y-3">
                    {(['Setosa', 'Versicolor', 'Virginica'] as const).map((species) => {
                      const confidence = prediction.confidence[species.toLowerCase() as keyof typeof prediction.confidence];
                      return (
                        <div key={species} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{species}</span>
                            <span className="text-muted-foreground">{confidence}%</span>
                          </div>
                          <div className="h-3 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-500 ${
                                species === 'Setosa' ? 'bg-accent' :
                                species === 'Versicolor' ? 'bg-primary' :
                                'bg-secondary'
                              }`}
                              style={{ width: `${confidence}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Card */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl">About the Iris Dataset</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-foreground/90">
              <p>
                The Iris dataset is one of the most famous datasets in machine learning. It contains 150 measurements 
                of iris flowers from three different species.
              </p>
              <p>
                Our classifier uses a simple rule-based approach that mimics how a machine learning algorithm would 
                learn to distinguish between species based on petal and sepal measurements.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Tip:</strong> Petal length is typically the most important feature for distinguishing species!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IrisDemo;
