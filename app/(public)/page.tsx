"use client";

import HomeHero from "@/components/home-hero";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Zap, Globe, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <HomeHero />

      {/* Features Section */}
      <section className="py-16 bg-background flex items-center min-h-screen">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our SMS Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Send thousands of messages in seconds.",
              },
              {
                icon: Globe,
                title: "Global Reach",
                description: "Connect with customers worldwide.",
              },
              {
                icon: Shield,
                title: "Secure & Compliant",
                description: "Your data is safe with us.",
              },
              {
                icon: CheckCircle,
                title: "Easy to Use",
                description: "No technical skills required.",
              },
            ].map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 min-h-screen flex items-center bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$29",
                messages: "1,000",
                features: ["API Access", "24/7 Support"],
              },
              {
                name: "Pro",
                price: "$99",
                messages: "10,000",
                features: ["API Access", "24/7 Support", "Advanced Analytics"],
              },
              {
                name: "Enterprise",
                price: "Custom",
                messages: "Unlimited",
                features: [
                  "API Access",
                  "24/7 Support",
                  "Advanced Analytics",
                  "Dedicated Account Manager",
                ],
              },
            ].map((plan, index) => (
              <Card key={index} className={index === 1 ? "border-primary" : ""}>
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-4xl font-bold">{plan.price}</span>
                    /month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">Up to {plan.messages} messages</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    {index === 2 ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
