import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Crown, Leaf, Sparkles, Star, Truck } from "lucide-react";
import { Layout } from "../components/Layout";

const BENEFITS = [
  {
    icon: <Truck size={24} className="text-primary" />,
    title: "नि:शुल्क डेलिभरी",
    desc: "सबै अर्डरमा नेपालभर नि:शुल्क होम डेलिभरी पाउनुहोस्।",
  },
  {
    icon: <Star size={24} className="text-primary" />,
    title: "विशेष छुट",
    desc: "प्रत्येक महिना सबै उत्पादनमा १५% सम्म विशेष सदस्य छुट।",
  },
  {
    icon: <Sparkles size={24} className="text-primary" />,
    title: "नयाँ उत्पादन पहिले",
    desc: "नयाँ कपाल हेरचाह उत्पादनहरू सबैभन्दा पहिले हेर्ने र किन्ने मौका।",
  },
  {
    icon: <Leaf size={24} className="text-primary" />,
    title: "विशेषज्ञ सल्लाह",
    desc: "कपाल हेरचाह विशेषज्ञबाट व्यक्तिगत सल्लाह र मार्गदर्शन।",
  },
  {
    icon: <CheckCircle size={24} className="text-primary" />,
    title: "प्राथमिकता सेवा",
    desc: "सदस्यहरूलाई ग्राहक सेवामा प्राथमिकता र छिटो समाधान।",
  },
  {
    icon: <Crown size={24} className="text-primary" />,
    title: "विशेष उपहार",
    desc: "जन्मदिन र चाडपर्वमा विशेष उपहार र सरप्राइज।",
  },
];

const PLANS = [
  {
    name: "मासिक योजना",
    nameEn: "Monthly Plan",
    price: "रु. ४९९",
    priceNote: "प्रति महिना",
    highlight: false,
    features: ["नि:शुल्क डेलिभरी", "१०% छुट", "विशेषज्ञ सल्लाह", "नयाँ उत्पादन पहिले"],
  },
  {
    name: "वार्षिक योजना",
    nameEn: "Annual Plan",
    price: "रु. ४,४९९",
    priceNote: "प्रति वर्ष",
    highlight: true,
    badge: "सबैभन्दा राम्रो मूल्य",
    features: [
      "नि:शुल्क डेलिभरी",
      "१५% छुट",
      "विशेषज्ञ सल्लाह",
      "नयाँ उत्पादन पहिले",
      "जन्मदिन उपहार",
      "प्राथमिकता सेवा",
    ],
  },
];

export function SubscriptionPage() {
  const handleSubscribe = (plan: string) => {
    // Stripe checkout integration will go here
    alert(`${plan} को लागि सदस्यता प्रक्रिया सुरु हुँदैछ...`);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-card border-b border-border py-14 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
              <Crown size={32} className="text-primary" />
            </div>
          </div>
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-sm font-body px-4 py-1">
            विशेष सदस्यता
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            ElderHair सदस्यता
          </h1>
          <p className="text-xl text-muted-foreground font-body leading-relaxed max-w-xl mx-auto">
            हाम्रो विशेष सदस्यता लिनुहोस् र बुढाबुढीका लागि उत्कृष्ट कपाल हेरचाह उत्पादनहरूमा
            अतिरिक्त सुविधा र छुट पाउनुहोस्।
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-2">
            सदस्यताका फाइदाहरू
          </h2>
          <p className="text-center text-muted-foreground font-body text-lg mb-10">
            सदस्य भएपछि तपाईंले पाउनुहुने विशेष सुविधाहरू
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <Card
                key={b.title}
                className="bg-card border border-border hover:shadow-elevated transition-smooth"
              >
                <CardContent className="p-6 flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    {b.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {b.title}
                  </h3>
                  <p className="text-base text-muted-foreground font-body leading-relaxed">
                    {b.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Pricing Plans */}
      <section className="py-14 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-2">
            योजना छान्नुहोस्
          </h2>
          <p className="text-center text-muted-foreground font-body text-lg mb-10">
            आफ्नो सुविधाअनुसार मासिक वा वार्षिक योजना छान्नुहोस्
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {PLANS.map((plan) => (
              <Card
                key={plan.nameEn}
                className={`relative border-2 ${
                  plan.highlight
                    ? "border-primary bg-card shadow-elevated"
                    : "border-border bg-card"
                }`}
              >
                {plan.highlight && plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground font-body px-4 py-1 text-sm shadow">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8 flex flex-col gap-5">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body">
                      {plan.nameEn}
                    </p>
                  </div>
                  <div>
                    <span className="font-display text-4xl font-bold text-primary">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground font-body ml-2 text-base">
                      {plan.priceNote}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-base font-body text-foreground"
                      >
                        <CheckCircle
                          size={18}
                          className="text-primary shrink-0"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="lg"
                    variant={plan.highlight ? "default" : "outline"}
                    className={`w-full mt-2 text-lg font-semibold h-14 ${
                      plan.highlight
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-elevated"
                        : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    } transition-smooth focus-visible-ring`}
                    onClick={() => handleSubscribe(plan.nameEn)}
                    data-ocid="subscribe-btn"
                    aria-label={`Subscribe Now - ${plan.nameEn}`}
                  >
                    Subscribe Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-muted-foreground font-body text-base mt-8">
            कुनै पनि बेला रद्द गर्न सक्नुहुन्छ। कुनै लुकेको शुल्क छैन।
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-4 bg-background">
        <div className="container mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
            सामान्य प्रश्नहरू
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "सदस्यता कसरी लिने?",
                a: "माथिको 'Subscribe Now' बटन थिच्नुहोस् र भुक्तानी प्रक्रिया पूरा गर्नुहोस्।",
              },
              {
                q: "सदस्यता रद्द गर्न सकिन्छ?",
                a: "हो, तपाईं जुनसुकै बेला सदस्यता रद्द गर्न सक्नुहुन्छ। अतिरिक्त शुल्क लाग्दैन।",
              },
              {
                q: "छुट कसरी मिल्छ?",
                a: "सदस्य भएपछि, सबै उत्पादन किन्दा स्वतः छुट लागू हुन्छ।",
              },
              {
                q: "डेलिभरी कति दिनमा आउँछ?",
                a: "सदस्यहरूलाई प्राथमिकता डेलिभरी दिइन्छ — सामान्यतया १–३ कार्य दिनभित्र।",
              },
            ].map((item) => (
              <Card key={item.q} className="bg-card border border-border">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {item.q}
                  </h3>
                  <p className="text-base text-muted-foreground font-body leading-relaxed">
                    {item.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 px-4 bg-primary/5 border-t border-border">
        <div className="container mx-auto max-w-xl text-center">
          <Crown size={36} className="text-primary mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
            आजै सुरु गर्नुहोस्
          </h2>
          <p className="text-lg text-muted-foreground font-body leading-relaxed mb-8">
            हजारौं बुढाबुढी सदस्यहरूसँग जोडिनुहोस् र उत्कृष्ट कपाल हेरचाहको अनुभव लिनुहोस्।
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl font-semibold px-12 h-16 shadow-elevated transition-smooth focus-visible-ring"
            onClick={() => handleSubscribe("Annual Plan")}
            data-ocid="subscribe-cta-btn"
            aria-label="Subscribe Now"
          >
            Subscribe Now
          </Button>
        </div>
      </section>
    </Layout>
  );
}
