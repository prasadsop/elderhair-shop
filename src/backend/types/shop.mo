module {
  public type ProductCategory = {
    #shampoosAndConditioners;
    #treatmentsAndSerums;
    #stylingTools;
    #scalpCare;
  };

  public type StockStatus = {
    #inStock;
    #lowStock;
    #outOfStock;
  };

  public type SortOrder = {
    #byPrice;
    #byPopularity;
    #byRating;
    #byNewest;
  };

  public type GuideTag = {
    #greyHair;
    #thinning;
    #scalpCare;
    #styling;
    #products;
  };

  public type Product = {
    id : Nat;
    name : Text;
    brand : Text;
    price : Float;
    category : ProductCategory;
    description : Text;
    imageUrl : Text;
    rating : Float;
    reviewCount : Nat;
    stockStatus : StockStatus;
    keyIngredients : [Text];
    benefits : [Text];
    suitableFor : [Text];
    size : Text;
    tags : [Text];
    createdAt : Int;
  };

  public type Review = {
    id : Nat;
    productId : Nat;
    authorName : Text;
    rating : Float;
    content : Text;
    date : Int;
  };

  public type GuideArticle = {
    id : Nat;
    title : Text;
    author : Text;
    publishDate : Int;
    readTime : Nat;
    content : Text;
    tags : [GuideTag];
    relatedProductIds : [Nat];
  };

  public type ProductFilter = {
    category : ?ProductCategory;
    searchTerm : ?Text;
    sortOrder : ?SortOrder;
  };
};
