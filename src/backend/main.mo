import Types "types/shop";
import SubTypes "types/subscription";
import ShopLib "lib/shop";
import ShopApi "mixins/shop-api";
import SubApi "mixins/subscription-api";
import List "mo:core/List";
import Map "mo:core/Map";

actor {
  let products = List.empty<Types.Product>();
  let reviews = List.empty<Types.Review>();
  let guides = List.empty<Types.GuideArticle>();

  let nextProductId = { var value : Nat = 0 };
  let nextReviewId = { var value : Nat = 0 };
  let nextGuideId = { var value : Nat = 0 };

  // Subscription state
  let subscribers = Map.empty<Principal, SubTypes.Subscriber>();

  // Seed sample data on first initialization
  ShopLib.seedProducts(products, nextProductId);
  ShopLib.seedReviews(reviews, products, nextReviewId);
  ShopLib.seedGuides(guides, nextGuideId);

  include ShopApi(products, reviews, guides, nextProductId, nextReviewId, nextGuideId);
  include SubApi(subscribers);
};
