import { d as useCart, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-BrmIA-SK.js";
import { d as createLucideIcon, L as Layout, a as Button, I as Input } from "./Layout-DGc-UyHY.js";
import { L as Label } from "./label-CiDjjNje.js";
import { S as Separator } from "./separator-DdAPHIV_.js";
import { C as CircleCheckBig } from "./circle-check-big-BCRpcjay.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode);
function validateCardNumber(value) {
  const digits = value.replace(/\s/g, "");
  if (!/^\d{16}$/.test(digits)) return "Card number must be 16 digits.";
  return void 0;
}
function validateExpiry(value) {
  if (!/^\d{2}\/\d{2}$/.test(value)) return "Enter expiry as MM/YY.";
  const [mm, yy] = value.split("/").map(Number);
  if (!mm || mm < 1 || mm > 12) return "Invalid month.";
  const now = /* @__PURE__ */ new Date();
  const fullYear = 2e3 + (yy ?? 0);
  if (fullYear < now.getFullYear() || fullYear === now.getFullYear() && (mm ?? 0) < now.getMonth() + 1) {
    return "Card has expired.";
  }
  return void 0;
}
function validateCvv(value) {
  if (!/^\d{3,4}$/.test(value)) return "CVV must be 3 or 4 digits.";
  return void 0;
}
function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = reactExports.useState("details");
  const [formData, setFormData] = reactExports.useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Nepal",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });
  const [paymentErrors, setPaymentErrors] = reactExports.useState({});
  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };
  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setStep("payment");
  };
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const errors = {
      cardNumber: validateCardNumber(formData.cardNumber),
      expiry: validateExpiry(formData.expiry),
      cvv: validateCvv(formData.cvv)
    };
    const hasErrors = Object.values(errors).some(Boolean);
    setPaymentErrors(errors);
    if (hasErrors) return;
    setStep("success");
    clearCart();
  };
  if (items.length === 0 && step !== "success") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ShoppingBag,
        {
          size: 48,
          className: "text-muted-foreground mx-auto mb-4"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "Your cart is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/",
          search: { category: void 0, sort: "byRating", q: "" },
          children: "Browse Products"
        }
      ) })
    ] }) });
  }
  if (step === "success") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "container mx-auto px-4 py-20 max-w-lg text-center",
        "data-ocid": "checkout-success",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-10 shadow-subtle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 56, className: "text-accent mx-auto mb-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-3", children: "Order Confirmed!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground font-body mb-8 leading-relaxed", children: "Thank you for your purchase. Your hair care products are on their way to you!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "text-base font-body w-full", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              search: { category: void 0, sort: "byRating", q: "" },
              "data-ocid": "checkout-success-shop-cta",
              children: "Continue Shopping"
            }
          ) })
        ] })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "Checkout" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 mb-8", children: ["details", "payment"].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-display font-bold transition-colors ${step === s || s === "details" && step === "payment" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
          children: i + 1
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `font-body text-base capitalize ${step === s ? "text-foreground font-medium" : "text-muted-foreground"}`,
          children: s === "details" ? "Your Details" : "Payment"
        }
      ),
      i === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "→" })
    ] }, s)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        step === "details" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleDetailsSubmit,
            className: "bg-card border border-border rounded-xl p-6 space-y-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Contact & Delivery" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-base font-body", htmlFor: "fullName", children: "Full Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "fullName",
                      className: "text-base font-body h-11",
                      value: formData.fullName,
                      onChange: handleChange("fullName"),
                      required: true,
                      "data-ocid": "checkout-name"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-base font-body", htmlFor: "phone", children: "Phone Number" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "phone",
                      type: "tel",
                      className: "text-base font-body h-11",
                      value: formData.phone,
                      onChange: handleChange("phone"),
                      required: true,
                      "data-ocid": "checkout-phone"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-base font-body", htmlFor: "email", children: "Email Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "email",
                    type: "email",
                    className: "text-base font-body h-11",
                    value: formData.email,
                    onChange: handleChange("email"),
                    required: true,
                    "data-ocid": "checkout-email"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-base font-body", htmlFor: "address", children: "Delivery Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "address",
                    className: "text-base font-body h-11",
                    placeholder: "Street address",
                    value: formData.address,
                    onChange: handleChange("address"),
                    required: true,
                    "data-ocid": "checkout-address"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-base font-body", htmlFor: "city", children: "City" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "city",
                      className: "text-base font-body h-11",
                      value: formData.city,
                      onChange: handleChange("city"),
                      required: true,
                      "data-ocid": "checkout-city"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-base font-body", htmlFor: "country", children: "Country" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "country",
                      className: "text-base font-body h-11",
                      value: formData.country,
                      onChange: handleChange("country"),
                      required: true,
                      "data-ocid": "checkout-country"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  size: "lg",
                  className: "w-full text-base font-body",
                  "data-ocid": "checkout-details-next",
                  children: "Continue to Payment"
                }
              )
            ]
          }
        ),
        step === "payment" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handlePaymentSubmit,
            className: "bg-card border border-border rounded-xl p-6 space-y-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 22 }),
                "Payment Details"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-base font-body", htmlFor: "cardNumber", children: "Card Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "cardNumber",
                    className: `text-base font-body h-11 font-mono ${paymentErrors.cardNumber ? "border-destructive" : ""}`,
                    placeholder: "1234 5678 9012 3456",
                    maxLength: 19,
                    value: formData.cardNumber,
                    onChange: handleChange("cardNumber"),
                    "data-ocid": "checkout-card-number"
                  }
                ),
                paymentErrors.cardNumber && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive font-body", children: paymentErrors.cardNumber })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-base font-body", htmlFor: "expiry", children: "Expiry Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "expiry",
                      className: `text-base font-body h-11 font-mono ${paymentErrors.expiry ? "border-destructive" : ""}`,
                      placeholder: "MM/YY",
                      maxLength: 5,
                      value: formData.expiry,
                      onChange: handleChange("expiry"),
                      "data-ocid": "checkout-expiry"
                    }
                  ),
                  paymentErrors.expiry && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive font-body", children: paymentErrors.expiry })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-base font-body", htmlFor: "cvv", children: "CVV" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "cvv",
                      type: "password",
                      className: `text-base font-body h-11 font-mono ${paymentErrors.cvv ? "border-destructive" : ""}`,
                      placeholder: "•••",
                      maxLength: 4,
                      value: formData.cvv,
                      onChange: handleChange("cvv"),
                      "data-ocid": "checkout-cvv"
                    }
                  ),
                  paymentErrors.cvv && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive font-body", children: paymentErrors.cvv })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "lg",
                    className: "text-base font-body flex-1",
                    onClick: () => setStep("details"),
                    children: "Back"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "submit",
                    size: "lg",
                    className: "text-base font-body flex-1",
                    "data-ocid": "checkout-pay-btn",
                    children: [
                      "Pay $",
                      totalPrice.toFixed(2)
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 h-fit sticky top-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-4", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex justify-between gap-2 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-body truncate", children: [
                item.product.name,
                " × ",
                item.quantity
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-body font-medium text-foreground shrink-0", children: [
                "$",
                (item.product.price * item.quantity).toFixed(2)
              ] })
            ]
          },
          item.product.id.toString()
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl font-bold text-foreground", children: [
            "$",
            totalPrice.toFixed(2)
          ] })
        ] })
      ] })
    ] })
  ] }) }) });
}
export {
  CheckoutPage
};
