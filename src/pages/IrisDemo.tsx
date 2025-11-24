import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sparkles, Info, FileText, HelpCircle } from "lucide-react";
import { 
  classify, 
  classificationConfigs, 
  type ClassificationType, 
  type ClassificationFeatures,
  type PredictionResult 
} from "@/utils/classifiers";
import { toast } from "sonner";
import { NavLink } from "@/components/NavLink";

const IrisDemo = () => {
  const [activeType, setActiveType] = useState<ClassificationType>('iris');
  const [features, setFeatures] = useState<ClassificationFeatures>({});
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const activeConfig = classificationConfigs.find((c) => c.id === activeType)!;

  const handleFeatureChange = (featureId: string, value: string) => {
    setFeatures((prev) => ({ ...prev, [featureId]: parseFloat(value) || 0 }));
    setPrediction(null); // Clear prediction when input changes
  };

  const handlePredict = () => {
    // Validate all features are provided
    const missingFeatures = activeConfig.features.filter(
      (f) => !features[f.id] || isNaN(features[f.id])
    );

    if (missingFeatures.length > 0) {
      toast.error("Please enter valid numbers for all measurements");
      return;
    }

    // Validate ranges
    const outOfRange = activeConfig.features.filter(
      (f) => features[f.id] < f.min || features[f.id] > f.max
    );

    if (outOfRange.length > 0) {
      toast.error(
        `Some values are outside typical ranges. Prediction may be uncertain.`,
        { duration: 4000 }
      );
    }

    try {
      const result = classify(activeType, features);
      setPrediction(result);
      toast.success("Classification complete!");
    } catch (error) {
      toast.error("Classification failed. Please try again.");
    }
  };

  const loadExample = (category: string) => {
    const example = activeConfig.examples[category];
    setFeatures(example);
    setPrediction(null);
    toast.info(`Loaded ${category} example`);
  };

  const getCategoryColor = (category: string, index: number) => {
    const colors = ['bg-accent', 'bg-primary', 'bg-secondary text-secondary-foreground'];
    return colors[index % colors.length];
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Interactive Classification Demo
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore different classification problems with real measurements
              </p>
              <div className="flex justify-center gap-3">
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <a href="/MEASUREMENTS_GUIDE.md" download>
                    <FileText className="h-4 w-4" />
                    Download Measurements Guide
                  </a>
                </Button>
              </div>
            </div>

            {/* Classification Type Selector */}
            <Tabs
              value={activeType}
              onValueChange={(v) => {
                setActiveType(v as ClassificationType);
                setFeatures({});
                setPrediction(null);
              }}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 h-auto">
                {classificationConfigs.map((config) => (
                  <TabsTrigger
                    key={config.id}
                    value={config.id}
                    className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <span className="text-2xl">{config.icon}</span>
                    <span className="font-semibold">{config.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {classificationConfigs.map((config) => (
                <TabsContent key={config.id} value={config.id} className="space-y-6 mt-6">
                  {/* Description Card */}
                  <Card className="border-primary/20 bg-gradient-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <span>{config.icon}</span>
                        <span>{config.name} Classification</span>
                      </CardTitle>
                      <CardDescription className="text-base">
                        {config.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground mb-1">How It Works</p>
                            <p className="text-sm text-foreground/80">{config.howItWorks}</p>
                            <p className="text-sm text-primary font-medium mt-2">
                              Key Feature: {config.keyFeature}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Example Buttons */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    {config.categories.map((category) => (
                      <Button
                        key={category}
                        variant="outline"
                        size="sm"
                        onClick={() => loadExample(category)}
                        className="gap-2"
                      >
                        <Sparkles className="h-4 w-4" />
                        Load {category} Example
                      </Button>
                    ))}
                  </div>

                  {/* Input Form */}
                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="text-2xl">Enter Measurements</CardTitle>
                      <CardDescription className="text-base">
                        Hover over the <HelpCircle className="h-3 w-3 inline" /> icons for measurement
                        tips
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {config.features.map((feature) => (
                          <div key={feature.id} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Label htmlFor={feature.id} className="text-base">
                                {feature.label}
                                {feature.unit && ` (${feature.unit})`}
                              </Label>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <p>{feature.tooltip}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Range: {feature.min} - {feature.max} {feature.unit}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <Input
                              id={feature.id}
                              type="number"
                              step={feature.step}
                              min={feature.min}
                              max={feature.max}
                              placeholder={`${feature.min} - ${feature.max}`}
                              value={features[feature.id] || ''}
                              onChange={(e) => handleFeatureChange(feature.id, e.target.value)}
                              className="text-lg"
                            />
                          </div>
                        ))}
                      </div>

                      <Button
                        onClick={handlePredict}
                        size="lg"
                        className="w-full text-lg shadow-soft"
                      >
                        Classify {config.name}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Prediction Results */}
                  {prediction && (
                    <Card className="shadow-soft bg-gradient-card animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <CardHeader>
                        <CardTitle className="text-2xl">Classification Results</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center justify-center gap-4 p-6 bg-background/50 rounded-lg">
                          <span className="text-xl text-muted-foreground">Predicted Category:</span>
                          <Badge
                            className={`text-xl py-2 px-6 ${getCategoryColor(
                              prediction.category,
                              config.categories.indexOf(prediction.category)
                            )}`}
                          >
                            {prediction.category}
                          </Badge>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-center">
                            Confidence Scores
                          </h4>

                          <div className="space-y-3">
                            {config.categories.map((category, index) => {
                              const confidence = prediction.confidence[category] || 0;
                              return (
                                <div key={category} className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">{category}</span>
                                    <span className="text-muted-foreground">{confidence}%</span>
                                  </div>
                                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                                    <div
                                      className={`h-full transition-all duration-500 ${getCategoryColor(
                                        category,
                                        index
                                      )}`}
                                      style={{ width: `${confidence}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="p-4 bg-muted/30 rounded-lg text-sm text-foreground/80">
                          <p className="font-semibold mb-1">Understanding the Results:</p>
                          <p>
                            Higher confidence means the measurements closely match typical values for
                            that category. The classifier compares your input to known examples for
                            each category.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              ))}
            </Tabs>

            {/* Help Section */}
            <Card className="border-accent/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-foreground/90">
                  <strong>New to classification?</strong> Check out the{' '}
                  <NavLink to="/about" className="text-primary hover:underline">
                    About page
                  </NavLink>{' '}
                  to learn about the classification workflow.
                </p>
                <p className="text-foreground/90">
                  <strong>Want detailed measurements?</strong> Download the measurements guide above
                  for reference ranges, example values, and tips on which features matter most.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Pro tip:</strong> Try loading examples first to see typical measurements,
                  then experiment by changing individual values to see how it affects classification!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default IrisDemo;
