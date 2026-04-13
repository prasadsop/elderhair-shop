import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { CheckCircle, CreditCard, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { useCart } from "../context/CartContext";

type CheckoutStep = "details" | "payment" | "success";

interface PaymentErrors {
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}

function validateCardNumber(value: string): string | undefined {
  const digits = value.replace(/\s/g, "");
  if (!/^\d{16}$/.test(digits)) return "Card number must be 16 digits.";
  return undefined;
}

function validateExpiry(value: string): string | undefined {
  if (!/^\d{2}\/\d{2}$/.test(value)) return "Enter expiry as MM/YY.";
  const [mm, yy] = value.split("/").map(Number);
  if (!mm || mm < 1 || mm > 12) return "Invalid month.";
  const now = new Date();
  const fullYear = 2000 + (yy ?? 0);
  if (
    fullYear < now.getFullYear() ||
    (fullYear === now.getFullYear() && (mm ?? 0) < now.getMonth() + 1)
  ) {
    return "Card has expired.";
  }
  return undefined;
}

function validateCvv(value: string): string | undefined {
  if (!/^\d{3,4}$/.test(value)) return "CVV must be 3 or 4 digits.";
  return undefined;
}

export function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>("details");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Nepal",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [paymentErrors, setPaymentErrors] = useState<PaymentErrors>({});

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: PaymentErrors = {
      cardNumber: validateCardNumber(formData.cardNumber),
      expiry: validateExpiry(formData.expiry),
      cvv: validateCvv(formData.cvv),
    };
    const hasErrors = Object.values(errors).some(Boolean);
    setPaymentErrors(errors);
    if (hasErrors) return;
    setStep("success");
    clearCart();
  };

  if (items.length === 0 && step !== "success") {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag
            size={48}
            className="text-muted-foreground mx-auto mb-4"
          />
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">
            Your cart is empty
          </h2>
          <Button asChild>
            <Link
              to="/"
              search={{ category: undefined, sort: "byRating", q: "" }}
            >
              Browse Products
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  if (step === "success") {
    return (
      <Layout>
        <div
          className="container mx-auto px-4 py-20 max-w-lg text-center"
          data-ocid="checkout-success"
        >
          <div className="bg-card border border-border rounded-2xl p-10 shadow-subtle">
            <CheckCircle size={56} className="text-accent mx-auto mb-5" />
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Order Confirmed!
            </h2>
            <p className="text-lg text-muted-foreground font-body mb-8 leading-relaxed">
              Thank you for your purchase. Your hair care products are on their
              way to you!
            </p>
            <Button size="lg" className="text-base font-body w-full" asChild>
              <Link
                to="/"
                search={{ category: undefined, sort: "byRating", q: "" }}
                data-ocid="checkout-success-shop-cta"
              >
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Checkout
          </h1>

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-8">
            {(["details", "payment"] as CheckoutStep[]).map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-display font-bold transition-colors ${step === s || (s === "details" && step === "payment") ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {i + 1}
                </div>
                <span
                  className={`font-body text-base capitalize ${step === s ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  {s === "details" ? "Your Details" : "Payment"}
                </span>
                {i === 0 && <span className="text-muted-foreground">→</span>}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {step === "details" && (
                <form
                  onSubmit={handleDetailsSubmit}
                  className="bg-card border border-border rounded-xl p-6 space-y-5"
                >
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Contact & Delivery
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-base font-body" htmlFor="fullName">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        className="text-base font-body h-11"
                        value={formData.fullName}
                        onChange={handleChange("fullName")}
                        required
                        data-ocid="checkout-name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-base font-body" htmlFor="phone">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        className="text-base font-body h-11"
                        value={formData.phone}
                        onChange={handleChange("phone")}
                        required
                        data-ocid="checkout-phone"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-base font-body" htmlFor="email">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="text-base font-body h-11"
                      value={formData.email}
                      onChange={handleChange("email")}
                      required
                      data-ocid="checkout-email"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-base font-body" htmlFor="address">
                      Delivery Address
                    </Label>
                    <Input
                      id="address"
                      className="text-base font-body h-11"
                      placeholder="Street address"
                      value={formData.address}
                      onChange={handleChange("address")}
                      required
                      data-ocid="checkout-address"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-base font-body" htmlFor="city">
                        City
                      </Label>
                      <Input
                        id="city"
                        className="text-base font-body h-11"
                        value={formData.city}
                        onChange={handleChange("city")}
                        required
                        data-ocid="checkout-city"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-base font-body" htmlFor="country">
                        Country
                      </Label>
                      <Input
                        id="country"
                        className="text-base font-body h-11"
                        value={formData.country}
                        onChange={handleChange("country")}
                        required
                        data-ocid="checkout-country"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-base font-body"
                    data-ocid="checkout-details-next"
                  >
                    Continue to Payment
                  </Button>
                </form>
              )}

              {step === "payment" && (
                <form
                  onSubmit={handlePaymentSubmit}
                  className="bg-card border border-border rounded-xl p-6 space-y-5"
                >
                  <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
                    <CreditCard size={22} />
                    Payment Details
                  </h2>
                  <div className="space-y-1.5">
                    <Label className="text-base font-body" htmlFor="cardNumber">
                      Card Number
                    </Label>
                    <Input
                      id="cardNumber"
                      className={`text-base font-body h-11 font-mono ${paymentErrors.cardNumber ? "border-destructive" : ""}`}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={formData.cardNumber}
                      onChange={handleChange("cardNumber")}
                      data-ocid="checkout-card-number"
                    />
                    {paymentErrors.cardNumber && (
                      <p className="text-sm text-destructive font-body">
                        {paymentErrors.cardNumber}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-base font-body" htmlFor="expiry">
                        Expiry Date
                      </Label>
                      <Input
                        id="expiry"
                        className={`text-base font-body h-11 font-mono ${paymentErrors.expiry ? "border-destructive" : ""}`}
                        placeholder="MM/YY"
                        maxLength={5}
                        value={formData.expiry}
                        onChange={handleChange("expiry")}
                        data-ocid="checkout-expiry"
                      />
                      {paymentErrors.expiry && (
                        <p className="text-sm text-destructive font-body">
                          {paymentErrors.expiry}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-base font-body" htmlFor="cvv">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        type="password"
                        className={`text-base font-body h-11 font-mono ${paymentErrors.cvv ? "border-destructive" : ""}`}
                        placeholder="•••"
                        maxLength={4}
                        value={formData.cvv}
                        onChange={handleChange("cvv")}
                        data-ocid="checkout-cvv"
                      />
                      {paymentErrors.cvv && (
                        <p className="text-sm text-destructive font-body">
                          {paymentErrors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="text-base font-body flex-1"
                      onClick={() => setStep("details")}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      className="text-base font-body flex-1"
                      data-ocid="checkout-pay-btn"
                    >
                      Pay ${totalPrice.toFixed(2)}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Order summary sidebar */}
            <div className="bg-card border border-border rounded-xl p-5 h-fit sticky top-24">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Order Summary
              </h3>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div
                    key={item.product.id.toString()}
                    className="flex justify-between gap-2 text-sm"
                  >
                    <span className="text-muted-foreground font-body truncate">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-body font-medium text-foreground shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between">
                <span className="font-display font-bold text-foreground">
                  Total
                </span>
                <span className="font-display text-xl font-bold text-foreground">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
