"use client";

import ComingSoon from "@/components/coming-soon";

// import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
// );

export default function Subscriptions() {
  // interface Plan {
  //   id: string;
  //   name: string;
  //   description: string;
  //   price: number;
  //   interval: string;
  //   price_id: string;
  // }

  // const [plans, setPlans] = useState<Plan[]>([]);

  // useEffect(() => {
  //   // Fetch subscription plans from your API
  //   fetch("/api/stripe/subscription-plans")
  //     .then((res) => res.json())
  //     .then((data) => setPlans(data));
  // }, []);

  // const handleSubscribe = async (priceId: string) => {
  //   const stripe = await stripePromise;
  //   const { sessionId } = await fetch("/api/stripe/create-checkout-session", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ priceId }),
  //   }).then((res) => res.json());

  //   const result = await stripe?.redirectToCheckout({ sessionId });

  //   if (result?.error) {
  //     console.error(result.error);
  //   }
  // };

  return (
    <div>
      <ComingSoon />
    </div>
  );
}
