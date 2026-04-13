import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Layout } from "../components/Layout";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export function CartPage() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity } =
    useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div
          className="container mx-auto px-4 py-20 text-center"
          data-ocid="cart-empty-state"
        >
          <ShoppingCart
            size={56}
            className="text-muted-foreground mx-auto mb-5"
          />
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
            Your cart is empty
          </h2>
          <p className="text-lg text-muted-foreground font-body mb-8 max-w-md mx-auto">
            Discover our gentle, expert-formulated hair care products for silver
            and mature hair.
          </p>
          <Button size="lg" className="text-base font-body" asChild>
            <Link
              to="/"
              search={{ category: undefined, sort: "byRating", q: "" }}
              data-ocid="cart-empty-shop-cta"
            >
              Browse Products
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-8">
            Shopping Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id.toString()}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-card border border-border rounded-xl p-5 flex gap-4"
                    data-ocid="cart-item"
                  >
                    <Link
                      to="/products/$id"
                      params={{ id: item.product.id.toString() }}
                      className="shrink-0"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg bg-muted"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/assets/images/placeholder.svg";
                        }}
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground font-body">
                        {item.product.brand}
                      </p>
                      <Link
                        to="/products/$id"
                        params={{ id: item.product.id.toString() }}
                      >
                        <h3 className="font-display font-semibold text-foreground text-lg leading-snug hover:text-primary transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground font-body">
                        {item.product.size}
                      </p>
                      <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                        <div className="flex items-center gap-2 border border-border rounded-lg overflow-hidden">
                          <button
                            type="button"
                            className="p-2 hover:bg-muted transition-colors"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                            data-ocid="cart-decrease-qty"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 font-body font-medium text-base w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="p-2 hover:bg-muted transition-colors"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                            data-ocid="cart-increase-qty"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-display text-xl font-bold text-foreground">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id)}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded"
                            aria-label="Remove from cart"
                            data-ocid="cart-remove-item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h2 className="font-display text-xl font-bold text-foreground mb-5">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div
                      key={item.product.id.toString()}
                      className="flex justify-between gap-2"
                    >
                      <span className="text-base text-muted-foreground font-body truncate">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="text-base font-body font-medium text-foreground shrink-0">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center mb-6">
                  <span className="font-display text-lg font-bold text-foreground">
                    Total
                  </span>
                  <span className="font-display text-2xl font-bold text-foreground">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <Button
                  size="lg"
                  className="w-full text-base font-body"
                  asChild
                >
                  <Link to="/checkout" data-ocid="cart-checkout-cta">
                    Proceed to Checkout
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-base font-body mt-3"
                  asChild
                >
                  <Link
                    to="/"
                    search={{ category: undefined, sort: "byRating", q: "" }}
                    data-ocid="cart-continue-shopping"
                  >
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
