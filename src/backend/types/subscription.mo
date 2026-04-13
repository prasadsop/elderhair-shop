module {
  public type SubscriptionPlan = {
    id : Text;
    name : Text;
    description : Text;
    price : Float;
    currency : Text;
    interval : Text; // "month" | "year"
    features : [Text];
  };

  public type SubscriptionStatus = {
    #active;
    #inactive;
    #cancelled;
  };

  public type Subscriber = {
    userId : Principal;
    planId : Text;
    var status : SubscriptionStatus;
    startedAt : Int;
    var stripeCustomerId : Text;
    var stripeSubscriptionId : Text;
  };

  public type SubscriberPublic = {
    userId : Principal;
    planId : Text;
    status : SubscriptionStatus;
    startedAt : Int;
    stripeCustomerId : Text;
    stripeSubscriptionId : Text;
  };

  public type CheckoutResult = {
    #ok : Text; // Stripe checkout URL
    #err : Text;
  };
};
