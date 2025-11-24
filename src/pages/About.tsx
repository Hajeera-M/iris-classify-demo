import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Filter, Cog, GraduationCap, BarChart3, Rocket } from "lucide-react";

const About = () => {
  const workflowSteps = [
    {
      icon: Database,
      title: "1. Data Collection",
      description: "Gather relevant data with features (measurements) and labels (categories). Quality data is the foundation of good classification.",
    },
    {
      icon: Filter,
      title: "2. Preprocessing",
      description: "Clean the data by handling missing values, normalizing measurements, and removing outliers to ensure quality input.",
    },
    {
      icon: Cog,
      title: "3. Model Selection",
      description: "Choose an appropriate algorithm based on your data and problem. Popular options include decision trees, logistic regression, and neural networks.",
    },
    {
      icon: GraduationCap,
      title: "4. Training",
      description: "Feed the data to the model so it can learn patterns. The model adjusts its internal parameters to minimize prediction errors.",
    },
    {
      icon: BarChart3,
      title: "5. Evaluation",
      description: "Test the model on unseen data and measure performance using metrics like accuracy, precision, recall, and F1-score.",
    },
    {
      icon: Rocket,
      title: "6. Deployment",
      description: "Put your trained model into production where it can make predictions on real-world data and provide value.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              About Classification
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Understanding the complete workflow from raw data to deployed machine learning models
            </p>
          </div>

          {/* Introduction */}
          <Card className="shadow-soft bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl">What is Classification?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                Classification is a supervised machine learning technique that categorizes data into predefined classes. 
                The algorithm learns from labeled examples to predict the category of new, unseen data points.
              </p>
              <p>
                Think of it as teaching a system to recognize patterns—like training someone to identify different 
                types of flowers by showing them examples. Once trained, they can identify flowers they've never seen before!
              </p>
              <p>
                Classification powers countless real-world applications: spam filters categorizing emails, medical 
                diagnosis systems, fraud detection in banking, image recognition, and much more.
              </p>
            </CardContent>
          </Card>

          {/* Workflow Steps */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-foreground">
              The Classification Workflow
            </h2>
            
            <div className="grid gap-6">
              {workflowSteps.map((step, index) => (
                <Card 
                  key={index}
                  className="shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-hero">
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{step.title}</CardTitle>
                        <p className="text-foreground/80 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Key Considerations */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl">Key Considerations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <strong className="text-foreground">Data Quality:</strong>
                    <p className="text-foreground/80">The better your training data, the better your model performs. Garbage in, garbage out!</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                  <div>
                    <strong className="text-foreground">Overfitting vs Underfitting:</strong>
                    <p className="text-foreground/80">Balance between memorizing training data and generalizing to new data is crucial.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <strong className="text-foreground">Feature Engineering:</strong>
                    <p className="text-foreground/80">Selecting and creating the right features often matters more than the algorithm choice.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                  <div>
                    <strong className="text-foreground">Evaluation Metrics:</strong>
                    <p className="text-foreground/80">Choose metrics that align with your business goals—accuracy isn't always the best measure.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applications */}
          <Card className="shadow-soft bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-2xl">Real-World Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Healthcare</h4>
                  <p className="text-sm text-foreground/80">Disease diagnosis, patient risk stratification</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Finance</h4>
                  <p className="text-sm text-foreground/80">Fraud detection, credit scoring, risk assessment</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">E-commerce</h4>
                  <p className="text-sm text-foreground/80">Product recommendations, customer segmentation</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Technology</h4>
                  <p className="text-sm text-foreground/80">Image recognition, spam filtering, voice assistants</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
