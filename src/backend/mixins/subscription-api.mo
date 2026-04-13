import Types "../types/subscription";
import SubLib "../lib/subscription";
import Map "mo:core/Map";

mixin (
  subscribers : Map.Map<Principal, Types.Subscriber>,
) {
  // --- Subscription Plans ---

  /// List all available subscription plans
  public query func listSubscriptionPlans() : async [Types.SubscriptionPlan] {
    SubLib.listPlans();
  };

  /// Get a specific subscription plan by ID
  public query func getSubscriptionPlan(planId : Text) : async ?Types.SubscriptionPlan {
    SubLib.getPlan(planId);
  };

  // --- Subscriber Status ---

  /// Get subscription status for the calling user
  public shared query ({ caller }) func getMySubscription() : async ?Types.SubscriberPublic {
    SubLib.getSubscriber(subscribers, caller);
  };

  /// Check if the calling user has an active subscription
  public shared query ({ caller }) func isSubscribed() : async Bool {
    SubLib.isActiveSubscriber(subscribers, caller);
  };

  // --- Subscription Management ---

  /// Record a completed subscription (called after successful Stripe checkout)
  public shared ({ caller }) func recordSubscription(
    planId : Text,
    stripeCustomerId : Text,
    stripeSubscriptionId : Text,
  ) : async Types.SubscriberPublic {
    let plan = switch (SubLib.getPlan(planId)) {
      case null Runtime.trap("Invalid plan ID: " # planId);
      case (?p) p;
    };
    ignore plan;
    let sub = SubLib.recordSubscriber(
      subscribers,
      caller,
      planId,
      stripeCustomerId,
      stripeSubscriptionId,
    );
    SubLib.toPublic(sub);
  };

  /// Cancel the calling user's subscription
  public shared ({ caller }) func cancelMySubscription() : async Bool {
    SubLib.cancelSubscription(subscribers, caller);
  };
};
