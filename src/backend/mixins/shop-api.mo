import Types "../types/shop";
import ShopLib "../lib/shop";
import List "mo:core/List";

mixin (
  products : List.List<Types.Product>,
  reviews : List.List<Types.Review>,
  guides : List.List<Types.GuideArticle>,
  nextProductId : { var value : Nat },
  nextReviewId : { var value : Nat },
  nextGuideId : { var value : Nat },
) {
  // --- Product Catalog ---

  public query func listProducts(filter : Types.ProductFilter) : async [Types.Product] {
    ShopLib.listProducts(products, filter);
  };

  public query func getProduct(id : Nat) : async ?Types.Product {
    ShopLib.getProduct(products, id);
  };

  public query func getRelatedProducts(productId : Nat, limit : Nat) : async [Types.Product] {
    ShopLib.getRelatedProducts(products, productId, limit);
  };

  // --- Admin: Product Management ---

  public shared ({ caller = _ }) func createProduct(
    name : Text,
    brand : Text,
    price : Float,
    category : Types.ProductCategory,
    description : Text,
    imageUrl : Text,
    stockStatus : Types.StockStatus,
    keyIngredients : [Text],
    benefits : [Text],
    suitableFor : [Text],
    size : Text,
    tags : [Text],
  ) : async Types.Product {
    let product = ShopLib.addProduct(
      products,
      nextProductId.value,
      name,
      brand,
      price,
      category,
      description,
      imageUrl,
      stockStatus,
      keyIngredients,
      benefits,
      suitableFor,
      size,
      tags,
    );
    nextProductId.value += 1;
    product;
  };

  // --- Reviews ---

  public query func getProductReviews(productId : Nat) : async [Types.Review] {
    ShopLib.getProductReviews(reviews, productId);
  };

  public shared func submitReview(
    productId : Nat,
    authorName : Text,
    rating : Float,
    content : Text,
  ) : async Types.Review {
    let review = ShopLib.addReview(
      reviews,
      products,
      nextReviewId.value,
      productId,
      authorName,
      rating,
      content,
    );
    nextReviewId.value += 1;
    review;
  };

  // --- Hair Care Guides ---

  public query func listGuideArticles(tag : ?Types.GuideTag) : async [Types.GuideArticle] {
    ShopLib.listGuideArticles(guides, tag);
  };

  public query func getGuideArticle(id : Nat) : async ?Types.GuideArticle {
    ShopLib.getGuideArticle(guides, id);
  };

  public shared ({ caller = _ }) func createGuideArticle(
    title : Text,
    author : Text,
    readTime : Nat,
    content : Text,
    tags : [Types.GuideTag],
    relatedProductIds : [Nat],
  ) : async Types.GuideArticle {
    let article = ShopLib.addGuideArticle(
      guides,
      nextGuideId.value,
      title,
      author,
      readTime,
      content,
      tags,
      relatedProductIds,
    );
    nextGuideId.value += 1;
    article;
  };
};
