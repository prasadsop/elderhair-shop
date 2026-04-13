import { j as jsxRuntimeExports } from "./index-BrmIA-SK.js";
import { d as createLucideIcon, L as Layout, C as Crown, B as Badge, a as Button, c as Leaf } from "./Layout-DGc-UyHY.js";
import { C as Card, a as CardContent, S as Star } from "./card-CZWIEjsJ.js";
import { S as Separator } from "./separator-DdAPHIV_.js";
import { C as CircleCheckBig } from "./circle-check-big-BCRpcjay.js";
import { S as Sparkles } from "./sparkles-_xxA7JUv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
const BENEFITS = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 24, className: "text-primary" }),
    title: "नि:शुल्क डेलिभरी",
    desc: "सबै अर्डरमा नेपालभर नि:शुल्क होम डेलिभरी पाउनुहोस्।"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 24, className: "text-primary" }),
    title: "विशेष छुट",
    desc: "प्रत्येक महिना सबै उत्पादनमा १५% सम्म विशेष सदस्य छुट।"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 24, className: "text-primary" }),
    title: "नयाँ उत्पादन पहिले",
    desc: "नयाँ कपाल हेरचाह उत्पादनहरू सबैभन्दा पहिले हेर्ने र किन्ने मौका।"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { size: 24, className: "text-primary" }),
    title: "विशेषज्ञ सल्लाह",
    desc: "कपाल हेरचाह विशेषज्ञबाट व्यक्तिगत सल्लाह र मार्गदर्शन।"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 24, className: "text-primary" }),
    title: "प्राथमिकता सेवा",
    desc: "सदस्यहरूलाई ग्राहक सेवामा प्राथमिकता र छिटो समाधान।"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 24, className: "text-primary" }),
    title: "विशेष उपहार",
    desc: "जन्मदिन र चाडपर्वमा विशेष उपहार र सरप्राइज।"
  }
];
const PLANS = [
  {
    name: "मासिक योजना",
    nameEn: "Monthly Plan",
    price: "रु. ४९९",
    priceNote: "प्रति महिना",
    highlight: false,
    features: ["नि:शुल्क डेलिभरी", "१०% छुट", "विशेषज्ञ सल्लाह", "नयाँ उत्पादन पहिले"]
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
      "प्राथमिकता सेवा"
    ]
  }
];
function SubscriptionPage() {
  const handleSubscribe = (plan) => {
    alert(`${plan} को लागि सदस्यता प्रक्रिया सुरु हुँदैछ...`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-14 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 32, className: "text-primary" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-primary/10 text-primary border-primary/20 text-sm font-body px-4 py-1", children: "विशेष सदस्यता" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4", children: "ElderHair सदस्यता" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground font-body leading-relaxed max-w-xl mx-auto", children: "हाम्रो विशेष सदस्यता लिनुहोस् र बुढाबुढीका लागि उत्कृष्ट कपाल हेरचाह उत्पादनहरूमा अतिरिक्त सुविधा र छुट पाउनुहोस्।" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14 px-4 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground text-center mb-2", children: "सदस्यताका फाइदाहरू" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground font-body text-lg mb-10", children: "सदस्य भएपछि तपाईंले पाउनुहुने विशेष सुविधाहरू" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: BENEFITS.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "bg-card border border-border hover:shadow-elevated transition-smooth",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center", children: b.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground", children: b.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground font-body leading-relaxed", children: b.desc })
          ] })
        },
        b.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14 px-4 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground text-center mb-2", children: "योजना छान्नुहोस्" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground font-body text-lg mb-10", children: "आफ्नो सुविधाअनुसार मासिक वा वार्षिक योजना छान्नुहोस्" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto", children: PLANS.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: `relative border-2 ${plan.highlight ? "border-primary bg-card shadow-elevated" : "border-border bg-card"}`,
          children: [
            plan.highlight && plan.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3.5 left-1/2 -translate-x-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground font-body px-4 py-1 text-sm shadow", children: plan.badge }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 flex flex-col gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold text-foreground mb-1", children: plan.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: plan.nameEn })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-4xl font-bold text-primary", children: plan.price }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-body ml-2 text-base", children: plan.priceNote })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: plan.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-center gap-2 text-base font-body text-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CircleCheckBig,
                      {
                        size: 18,
                        className: "text-primary shrink-0"
                      }
                    ),
                    f
                  ]
                },
                f
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: plan.highlight ? "default" : "outline",
                  className: `w-full mt-2 text-lg font-semibold h-14 ${plan.highlight ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-elevated" : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"} transition-smooth focus-visible-ring`,
                  onClick: () => handleSubscribe(plan.nameEn),
                  "data-ocid": "subscribe-btn",
                  "aria-label": `Subscribe Now - ${plan.nameEn}`,
                  children: "Subscribe Now"
                }
              )
            ] })
          ]
        },
        plan.nameEn
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground font-body text-base mt-8", children: "कुनै पनि बेला रद्द गर्न सक्नुहुन्छ। कुनै लुकेको शुल्क छैन।" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14 px-4 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground text-center mb-10", children: "सामान्य प्रश्नहरू" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: [
        {
          q: "सदस्यता कसरी लिने?",
          a: "माथिको 'Subscribe Now' बटन थिच्नुहोस् र भुक्तानी प्रक्रिया पूरा गर्नुहोस्।"
        },
        {
          q: "सदस्यता रद्द गर्न सकिन्छ?",
          a: "हो, तपाईं जुनसुकै बेला सदस्यता रद्द गर्न सक्नुहुन्छ। अतिरिक्त शुल्क लाग्दैन।"
        },
        {
          q: "छुट कसरी मिल्छ?",
          a: "सदस्य भएपछि, सबै उत्पादन किन्दा स्वतः छुट लागू हुन्छ।"
        },
        {
          q: "डेलिभरी कति दिनमा आउँछ?",
          a: "सदस्यहरूलाई प्राथमिकता डेलिभरी दिइन्छ — सामान्यतया १–३ कार्य दिनभित्र।"
        }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-2", children: item.q }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground font-body leading-relaxed", children: item.a })
      ] }) }, item.q)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14 px-4 bg-primary/5 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 36, className: "text-primary mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-3", children: "आजै सुरु गर्नुहोस्" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground font-body leading-relaxed mb-8", children: "हजारौं बुढाबुढी सदस्यहरूसँग जोडिनुहोस् र उत्कृष्ट कपाल हेरचाहको अनुभव लिनुहोस्।" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "lg",
          className: "bg-primary hover:bg-primary/90 text-primary-foreground text-xl font-semibold px-12 h-16 shadow-elevated transition-smooth focus-visible-ring",
          onClick: () => handleSubscribe("Annual Plan"),
          "data-ocid": "subscribe-cta-btn",
          "aria-label": "Subscribe Now",
          children: "Subscribe Now"
        }
      )
    ] }) })
  ] });
}
export {
  SubscriptionPage
};
