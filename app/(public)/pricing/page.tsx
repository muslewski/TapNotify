"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function Subscriptions() {
  interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    interval: string;
    price_id: string;
  }

  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    // Fetch subscription plans from your API
    fetch("/api/stripe/subscription-plans")
      .then((res) => res.json())
      .then((data) => setPlans(data));
  }, []);

  const handleSubscribe = async (priceId: string) => {
    const stripe = await stripePromise;
    const { sessionId } = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId }),
    }).then((res) => res.json());

    const result = await stripe?.redirectToCheckout({ sessionId });

    if (result?.error) {
      console.error(result.error);
    }
  };

  return (
    <div>
      <h1>Choose a Subscription Plan</h1>
      {plans.map((plan) => (
        <div key={plan.id}>
          <h2>{plan.name}</h2>
          <p>{plan.description}</p>
          <p>
            Price: ${plan.price / 100} / {plan.interval}
          </p>
          <button onClick={() => handleSubscribe(plan.price_id)}>
            Subscribe
          </button>
        </div>
      ))}
    </div>
  );
}
