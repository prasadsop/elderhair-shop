import Types "../types/subscription";
import Map "mo:core/Map";
import Time "mo:core/Time";

module {
  // --- Plan Definitions ---

  public let monthlyPlan : Types.SubscriptionPlan = {
    id = "elderhair-monthly";
    name = "ElderHair Monthly Membership";
    description = "ElderHair Shop मासिक सदस्यता";
    price = 9.99;
    currency = "usd";
    interval = "month";
    features = [
      "नयाँ products मा exclusive discount",
      "Hair care guide को पूर्ण पहुँच",
      "Priority customer support",
      "Monthly hair care newsletter",
    ];
  };

  public let yearlyPlan : Types.SubscriptionPlan = {
    id = "elderhair-yearly";
    name = "ElderHair Yearly Membership";
    description = "ElderHair Shop वार्षिक सदस्यता (२ महिना नि:शुल्क)";
    price = 99.99;
    currency = "usd";
    interval = "year";
    features = [
      "नयाँ products मा exclusive discount",
      "Hair care guide को पूर्ण पहुँच",
      "Priority customer support",
      "Monthly hair care newsletter",
      "वार्षिक सदस्यतामा २ महिना नि:शुल्क",
    ];
  };

  public func listPlans() : [Types.SubscriptionPlan] {
    [monthlyPlan, yearlyPlan];
  };

  public func getPlan(planId : Text) : ?Types.SubscriptionPlan {
    if (planId == monthlyPlan.id) ?monthlyPlan
    else if (planId == yearlyPlan.id) ?yearlyPlan
    else null;
  };

  // --- Subscriber Management ---

  public func recordSubscriber(
    subscribers : Map.Map<Principal, Types.Subscriber>,
    userId : Principal,
    planId : Text,
    stripeCustomerId : Text,
    stripeSubscriptionId : Text,
  ) : Types.Subscriber {
    let sub : Types.Subscriber = {
      userId;
      planId;
      var status = #active;
      startedAt = Time.now();
      var stripeCustomerId;
      var stripeSubscriptionId;
    };
    subscribers.add(userId, sub);
    sub;
  };

  public func getSubscriber(
    subscribers : Map.Map<Principal, Types.Subscriber>,
    userId : Principal,
  ) : ?Types.SubscriberPublic {
    switch (subscribers.get(userId)) {
      case null null;
      case (?sub) ?{
        userId = sub.userId;
        planId = sub.planId;
        status = sub.status;
        startedAt = sub.startedAt;
        stripeCustomerId = sub.stripeCustomerId;
        stripeSubscriptionId = sub.stripeSubscriptionId;
      };
    };
  };

  public func cancelSubscription(
    subscribers : Map.Map<Principal, Types.Subscriber>,
    userId : Principal,
  ) : Bool {
    switch (subscribers.get(userId)) {
      case null false;
      case (?sub) {
        sub.status := #cancelled;
        true;
      };
    };
  };

  public func isActiveSubscriber(
    subscribers : Map.Map<Principal, Types.Subscriber>,
    userId : Principal,
  ) : Bool {
    switch (subscribers.get(userId)) {
      case null false;
      case (?sub) sub.status == #active;
    };
  };

  public func toPublic(sub : Types.Subscriber) : Types.SubscriberPublic {
    {
      userId = sub.userId;
      planId = sub.planId;
      status = sub.status;
      startedAt = sub.startedAt;
      stripeCustomerId = sub.stripeCustomerId;
      stripeSubscriptionId = sub.stripeSubscriptionId;
    };
  };
};
