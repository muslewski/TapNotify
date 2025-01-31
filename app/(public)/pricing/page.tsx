import { Check, Video, Zap, Star, Sparkles, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const plans = [
  {
    name: "Lite",
    description: "Basic AI video generation",
    price: "$0",
    priceInfo: "1st month, then $9.99/mo",
    features: [
      "5 videos per month",
      "720p resolution",
      "Standard AI voices",
      "Basic stock footage",
    ],
    icon: Video,
  },
  {
    name: "Creator",
    description: "For growing creators",
    price: "$24.99",
    features: [
      "15 videos per month",
      "1080p resolution",
      "Enhanced AI voices",
      "Editable scripts",
      "Larger stock media library",
    ],
    icon: Zap,
    popular: true,
  },
  {
    name: "Premium",
    description: "Advanced AI tools",
    price: "$49.99",
    features: [
      "30 videos per month",
      "4K resolution",
      "Ultra-realistic AI voices",
      "AI-generated summaries & shorts",
      "Social media integration",
    ],
    icon: Star,
  },
  {
    name: "Elite",
    description: "Unlimited AI power",
    price: "$99.99",
    features: [
      "60 videos per month",
      "4K HDR quality",
      "Most advanced AI voices",
      "Automated editing & thumbnails",
      "Full social media automation",
      "API access",
    ],
    icon: Sparkles,
  },
];

export default function PricingPage() {
  return (
    <TooltipProvider>
      <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-[90vh] flex justify-center items-center">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Choose Your Plan
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Select the perfect plan for your AI video generation needs
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`flex flex-col ${
                  plan.popular ? "border-primary shadow-lg" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <plan.icon className="h-6 w-6 text-primary" />
                    {plan.popular && <Badge>Most Popular</Badge>}
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-3xl font-bold">
                    {plan.price}
                    {!plan.priceInfo && (
                      <span className="text-sm font-normal">/month</span>
                    )}
                  </div>
                  {plan.priceInfo && (
                    <div className="flex items-center mt-1">
                      <p className="text-sm text-muted-foreground">
                        {plan.priceInfo}
                      </p>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Free for the first month, no credit card required.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  )}
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.name === "Lite" ? "Start Free Trial" : "Choose Plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
