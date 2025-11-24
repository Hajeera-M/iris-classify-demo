import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { Tag, Brain, BarChart3, TrendingUp, ArrowRight } from "lucide-react";

const Index = () => {
  const concepts = [
    {
      icon: Tag,
      title: "Features & Labels",
      description: "Features are the measurements we use (like petal width), while labels are the categories we predict (like species).",
    },
    {
      icon: Brain,
      title: "Algorithms",
      description: "Machine learning algorithms learn patterns from data to make predictions on new, unseen examples.",
    },
    {
      icon: BarChart3,
      title: "Evaluation Metrics",
      description: "We measure how well our model performs using metrics like accuracy, precision, and recall.",
    },
    {
      icon: TrendingUp,
      title: "Generalisation",
      description: "A good model doesn't just memorize training data—it learns patterns that work on new data too.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
            Classification Project: Organising Complexity with Precision
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Classification is the process of organizing items into categories based on their characteristics. 
            Just like sorting construction projects by type, size, or complexity, machine learning algorithms 
            can automatically classify data points into predefined groups.
          </p>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Try our interactive demo with <strong>4 different classification problems</strong>: 
            Iris Flowers 🌸, Wine Types 🍷, Fruits 🍎, and Animals 🐾
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button asChild size="lg" className="shadow-soft">
              <NavLink to="/iris-demo">
                Try Iris Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </NavLink>
            </Button>
            <Button asChild variant="outline" size="lg">
              <NavLink to="/about">Learn More</NavLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Real-World Example Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-soft bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl">Real-World Example</CardTitle>
              <CardDescription className="text-lg">
                Classification in construction project management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                Imagine managing hundreds of construction projects. You could classify them by:
              </p>
              <ul className="space-y-3 text-foreground/90">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2" />
                  <span><strong>Project Type:</strong> Residential, Commercial, Industrial</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                  <span><strong>Size:</strong> Small, Medium, Large based on budget or area</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2" />
                  <span><strong>Priority:</strong> High, Medium, Low based on deadlines and importance</span>
                </li>
              </ul>
              <p className="text-foreground/90 leading-relaxed pt-2">
                This classification helps allocate resources efficiently, prioritize tasks, and make better decisions. 
                Machine learning can automate this process by learning from past projects!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Key Concepts Section */}
      <section className="container mx-auto px-6 py-16 pb-24">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Key Concepts in Classification</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Understanding the building blocks of machine learning classification
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {concepts.map((concept, index) => (
              <Card 
                key={index} 
                className="shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border/50"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <concept.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{concept.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 leading-relaxed">
                    {concept.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
