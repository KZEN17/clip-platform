"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const HowToParticipate = () => {
  const steps = [
    {
      step: 1,
      title: "Browse Campaigns",
      description:
        "Check active campaigns and choose ones that match your interests.",
    },
    {
      step: 2,
      title: "Create Clips",
      description:
        "Make high-quality clips following campaign guidelines and requirements.",
    },
    {
      step: 3,
      title: "Submit & Track",
      description:
        "Submit your clips through our platform and track performance in real-time.",
    },
    {
      step: 4,
      title: "Earn Rewards",
      description:
        "Get paid based on views, engagement, and campaign goals achieved.",
    },
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-white">How to Participate</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <Card
            key={step.step}
            className="text-center hover:shadow-lg transition-all duration-300 bg-gray-800 border-gray-700"
          >
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">
                  {step.step}
                </span>
              </div>
              <CardTitle className="text-lg text-white">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
