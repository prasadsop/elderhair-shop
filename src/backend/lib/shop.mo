import Types "../types/shop";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  // --- Products ---

  public func addProduct(
    products : List.List<Types.Product>,
    nextId : Nat,
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
  ) : Types.Product {
    let product : Types.Product = {
      id = nextId;
      name;
      brand;
      price;
      category;
      description;
      imageUrl;
      rating = 0.0;
      reviewCount = 0;
      stockStatus;
      keyIngredients;
      benefits;
      suitableFor;
      size;
      tags;
      createdAt = Time.now();
    };
    products.add(product);
    product;
  };

  public func getProduct(
    products : List.List<Types.Product>,
    id : Nat,
  ) : ?Types.Product {
    products.find(func(p) { p.id == id });
  };

  public func listProducts(
    products : List.List<Types.Product>,
    filter : Types.ProductFilter,
  ) : [Types.Product] {
    let filtered = products.filter(func(p) {
      let categoryMatch = switch (filter.category) {
        case null true;
        case (?cat) p.category == cat;
      };
      let searchMatch = switch (filter.searchTerm) {
        case null true;
        case (?term) {
          let lowerTerm = term.toLower();
          p.name.toLower().contains(#text lowerTerm) or
          p.description.toLower().contains(#text lowerTerm) or
          p.brand.toLower().contains(#text lowerTerm);
        };
      };
      categoryMatch and searchMatch;
    });

    let arr = filtered.toArray();

    switch (filter.sortOrder) {
      case null arr;
      case (?#byPrice) arr.sort(func(a, b) {
        if (a.price < b.price) #less
        else if (a.price > b.price) #greater
        else #equal;
      });
      case (?#byRating) arr.sort(func(a, b) {
        if (a.rating > b.rating) #less
        else if (a.rating < b.rating) #greater
        else #equal;
      });
      case (?#byPopularity) arr.sort(func(a, b) {
        if (a.reviewCount > b.reviewCount) #less
        else if (a.reviewCount < b.reviewCount) #greater
        else #equal;
      });
      case (?#byNewest) arr.sort(func(a, b) {
        if (a.createdAt > b.createdAt) #less
        else if (a.createdAt < b.createdAt) #greater
        else #equal;
      });
    };
  };

  public func getRelatedProducts(
    products : List.List<Types.Product>,
    productId : Nat,
    limit : Nat,
  ) : [Types.Product] {
    let source = switch (products.find(func(p) { p.id == productId })) {
      case null { return [] };
      case (?p) p;
    };
    let related = products.filter(func(p) {
      p.id != productId and p.category == source.category
    });
    let arr = related.toArray();
    if (arr.size() <= limit) arr
    else arr.sliceToArray(0, limit);
  };

  // --- Reviews ---

  public func addReview(
    reviews : List.List<Types.Review>,
    products : List.List<Types.Product>,
    nextId : Nat,
    productId : Nat,
    authorName : Text,
    rating : Float,
    content : Text,
  ) : Types.Review {
    let review : Types.Review = {
      id = nextId;
      productId;
      authorName;
      rating;
      content;
      date = Time.now();
    };
    reviews.add(review);

    // Update product rating and review count
    let productReviews = reviews.filter(func(r) { r.productId == productId });
    let count = productReviews.size();
    let total = productReviews.foldLeft(0.0, func(acc, r) { acc + r.rating });
    let newRating = if (count > 0) total / count.toFloat() else 0.0;

    products.mapInPlace(func(p) {
      if (p.id == productId) { { p with rating = newRating; reviewCount = count } }
      else p
    });

    review;
  };

  public func getProductReviews(
    reviews : List.List<Types.Review>,
    productId : Nat,
  ) : [Types.Review] {
    reviews.filter(func(r) { r.productId == productId }).toArray();
  };

  // --- Guide Articles ---

  public func addGuideArticle(
    guides : List.List<Types.GuideArticle>,
    nextId : Nat,
    title : Text,
    author : Text,
    readTime : Nat,
    content : Text,
    tags : [Types.GuideTag],
    relatedProductIds : [Nat],
  ) : Types.GuideArticle {
    let article : Types.GuideArticle = {
      id = nextId;
      title;
      author;
      publishDate = Time.now();
      readTime;
      content;
      tags;
      relatedProductIds;
    };
    guides.add(article);
    article;
  };

  public func getGuideArticle(
    guides : List.List<Types.GuideArticle>,
    id : Nat,
  ) : ?Types.GuideArticle {
    guides.find(func(g) { g.id == id });
  };

  public func listGuideArticles(
    guides : List.List<Types.GuideArticle>,
    tag : ?Types.GuideTag,
  ) : [Types.GuideArticle] {
    switch (tag) {
      case null guides.toArray();
      case (?t) guides.filter(func(g) {
        g.tags.find(func(gt) { gt == t }) != null
      }).toArray();
    };
  };

  // --- Seed Data ---

  public func seedProducts(products : List.List<Types.Product>, nextId : { var value : Nat }) {
    if (products.size() > 0) return;

    let items : [(Text, Text, Float, Types.ProductCategory, Text, Text, Types.StockStatus, [Text], [Text], [Text], Text, [Text])] = [
      (
        "Silver Shine Purple Shampoo",
        "SilverGlow",
        18.99,
        #shampoosAndConditioners,
        "Specially formulated purple shampoo for grey and white hair. Neutralizes yellow tones while gently cleansing. Enriched with violet pigments and keratin for luminous, bright silver hair.",
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400",
        #inStock,
        ["Violet Pigment", "Keratin", "Argan Oil", "Panthenol"],
        ["Neutralizes yellow tones", "Brightens grey hair", "Adds shine", "Gentle on sensitive scalp"],
        ["Grey hair", "White hair", "Color-treated hair"],
        "250ml",
        ["grey-hair", "shampoo", "brightening"],
      ),
      (
        "Gentle Scalp Soothing Shampoo",
        "NaturaCare",
        15.99,
        #shampoosAndConditioners,
        "Ultra-gentle, sulfate-free shampoo for sensitive and aging scalps. Calms irritation with chamomile and aloe vera while effectively cleansing without stripping natural oils.",
        "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400",
        #inStock,
        ["Chamomile Extract", "Aloe Vera", "Oat Extract", "Tea Tree Oil"],
        ["Soothes sensitive scalp", "Reduces itching", "Gentle cleansing", "Maintains scalp pH"],
        ["Sensitive scalp", "Elderly hair", "Dry scalp"],
        "300ml",
        ["scalp-care", "shampoo", "sensitive"],
      ),
      (
        "Volume Boost Thinning Hair Shampoo",
        "DensityPro",
        22.50,
        #shampoosAndConditioners,
        "Clinically proven shampoo for thinning hair. Biotin and caffeine complex stimulates hair follicles, adds volume and thickness to fine, sparse hair. Ideal for age-related hair thinning.",
        "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=400",
        #inStock,
        ["Biotin", "Caffeine", "Niacinamide", "Saw Palmetto"],
        ["Stimulates follicles", "Adds volume", "Thickens fine hair", "Reduces hair fall"],
        ["Thinning hair", "Fine hair", "Age-related hair loss"],
        "250ml",
        ["thinning-hair", "shampoo", "volume"],
      ),
      (
        "Argan Oil Deep Conditioning Treatment",
        "LuxeHair",
        28.99,
        #treatmentsAndSerums,
        "Intensive weekly treatment for dry, brittle grey and white hair. Pure Moroccan argan oil deeply nourishes and restores elasticity to aging hair. Leaves hair silky smooth and manageable.",
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
        #inStock,
        ["Pure Argan Oil", "Shea Butter", "Vitamin E", "Hyaluronic Acid"],
        ["Deep nourishment", "Restores elasticity", "Reduces breakage", "Adds intense shine"],
        ["Dry hair", "Brittle hair", "Grey hair", "Coarse hair"],
        "200ml",
        ["treatment", "grey-hair", "nourishing"],
      ),
      (
        "Biotin Hair Growth Serum",
        "GrowthPlus",
        34.99,
        #treatmentsAndSerums,
        "Advanced topical serum with biotin and peptide complex to support healthy hair growth in thinning areas. Lightweight, non-greasy formula absorbs quickly. Apply directly to scalp daily.",
        "https://images.unsplash.com/photo-1631390093280-53d5f50fba23?w=400",
        #inStock,
        ["Biotin", "Peptide Complex", "Minoxidil-free Formula", "Zinc"],
        ["Supports hair growth", "Strengthens existing hair", "Improves hair density", "Non-greasy"],
        ["Thinning hair", "Sparse areas", "Age-related thinning"],
        "50ml",
        ["thinning-hair", "serum", "growth"],
      ),
      (
        "Grey Hair Toning Gloss Treatment",
        "ChromaShine",
        24.99,
        #treatmentsAndSerums,
        "Weekly glossing treatment that enhances natural grey and silver tones. Adds brilliant shine and softness while depositing subtle cool tones to maintain a polished, elegant appearance.",
        "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=400",
        #lowStock,
        ["Silver Toning Pigments", "Silk Proteins", "Ceramides", "Vitamin C"],
        ["Enhances silver tones", "Adds brilliant shine", "Softens texture", "Easy to use"],
        ["Grey hair", "Silver hair", "White hair"],
        "150ml",
        ["grey-hair", "treatment", "toning"],
      ),
      (
        "Scalp Massage Oil with Rosemary",
        "ScalpRevive",
        19.99,
        #scalpCare,
        "Therapeutic scalp oil with rosemary and peppermint to improve circulation and nourish the scalp. Regular massage with this oil promotes healthier hair growth and relieves dryness and flakiness.",
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400",
        #inStock,
        ["Rosemary Essential Oil", "Peppermint Oil", "Jojoba Oil", "Vitamin E"],
        ["Improves scalp circulation", "Reduces dryness", "Nourishes follicles", "Relieves flakiness"],
        ["Dry scalp", "Flaky scalp", "All hair types"],
        "100ml",
        ["scalp-care", "oil", "massage"],
      ),
      (
        "Anti-Dandruff Scalp Serum",
        "ClearScalp",
        26.50,
        #scalpCare,
        "Medicated scalp serum with zinc pyrithione and salicylic acid targets dandruff and scalp build-up common in elderly individuals. Gentle enough for daily use without causing irritation.",
        "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400",
        #inStock,
        ["Zinc Pyrithione", "Salicylic Acid", "Tea Tree Oil", "Aloe Vera"],
        ["Eliminates dandruff", "Reduces flaking", "Soothes irritation", "Controls oil"],
        ["Dandruff-prone scalp", "Sensitive scalp", "Oily scalp"],
        "75ml",
        ["scalp-care", "serum", "anti-dandruff"],
      ),
      (
        "Moisturizing Scalp Mask",
        "HydraScalp",
        21.99,
        #scalpCare,
        "Deep-conditioning scalp mask for extremely dry and flaky scalp. Rich in hyaluronic acid and ceramides to restore moisture barrier. Use weekly for lasting relief from dry scalp conditions.",
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
        #inStock,
        ["Hyaluronic Acid", "Ceramides", "Avocado Oil", "Honey Extract"],
        ["Deeply hydrates scalp", "Restores moisture barrier", "Reduces flaking", "Nourishes hair roots"],
        ["Very dry scalp", "Flaky scalp", "Mature skin"],
        "180ml",
        ["scalp-care", "mask", "hydrating"],
      ),
      (
        "Ionic Wide-Tooth Detangling Comb",
        "GentleStyle",
        12.99,
        #stylingTools,
        "Wide-tooth anti-static comb designed for detangling fragile elderly hair without breakage. Ionic technology reduces frizz and static. Ergonomic handle for easy grip for arthritic hands.",
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
        #inStock,
        ["Anti-static Ion Technology", "Smooth rounded teeth"],
        ["Gentle detangling", "Reduces breakage", "Controls frizz", "Easy grip handle"],
        ["Fragile hair", "Thinning hair", "All hair types"],
        "Standard",
        ["styling-tools", "comb", "detangling"],
      ),
      (
        "Low-Heat Soft Roller Set",
        "ClassicWave",
        29.99,
        #stylingTools,
        "Foam roller set for creating gentle waves and volume in fine, thinning hair. No heat required — simply roll damp hair and allow to air dry or use on low heat. Adds body without damage.",
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
        #inStock,
        ["Soft foam material", "No heat technology"],
        ["Adds volume and waves", "No heat damage", "Easy to use", "Comfortable overnight wear"],
        ["Fine hair", "Thinning hair", "Grey hair"],
        "Set of 12",
        ["styling-tools", "rollers", "volume"],
      ),
      (
        "Silver Toning Leave-In Conditioner",
        "SilverGlow",
        16.99,
        #treatmentsAndSerums,
        "Lightweight leave-in conditioner with violet toning for daily use on grey and white hair. Detangles, softens and keeps grey hair looking fresh and bright between wash days.",
        "https://images.unsplash.com/photo-1631390093280-53d5f50fba23?w=400",
        #inStock,
        ["Violet Pigment", "Panthenol", "Glycerin", "Silk Amino Acids"],
        ["Tones grey hair daily", "Detangles easily", "Lightweight moisture", "Prevents yellowing"],
        ["Grey hair", "White hair", "All textures"],
        "200ml",
        ["grey-hair", "leave-in", "toning"],
      ),
    ];

    for ((name, brand, price, category, description, imageUrl, stockStatus, keyIngredients, benefits, suitableFor, size, tags) in items.values()) {
      let product : Types.Product = {
        id = nextId.value;
        name;
        brand;
        price;
        category;
        description;
        imageUrl;
        rating = 0.0;
        reviewCount = 0;
        stockStatus;
        keyIngredients;
        benefits;
        suitableFor;
        size;
        tags;
        createdAt = Time.now();
      };
      products.add(product);
      nextId.value += 1;
    };
  };

  public func seedReviews(
    reviews : List.List<Types.Review>,
    products : List.List<Types.Product>,
    nextId : { var value : Nat },
  ) {
    if (reviews.size() > 0) return;

    let items : [(Nat, Text, Float, Text)] = [
      (0, "Sunita Shrestha", 5.0, "यो shampoo प्रयोग गरेपछि मेरो सेतो कपाल एकदम उज्यालो र चम्किलो भयो। पहेँलोपन पूरै हट्यो!"),
      (0, "Ram Bahadur Karki", 4.0, "धेरै राम्रो product छ। कपाल नरम र चम्किलो भयो। Price अलि बढी छ तर quality राम्रो छ।"),
      (1, "Kamala Devi Thapa", 5.0, "मेरो scalp धेरै sensitive थियो, यो shampoo ले धेरै राहत दियो। कुनै irritation भएन।"),
      (1, "Hari Prasad Neupane", 4.0, "Gentle formula छ। मेरो दाहिने scalp को खटिरा पनि कम भयो।"),
      (2, "Meena Rai", 5.0, "मेरो कपाल थिन हुँदै थियो। यो shampoo प्रयोग गरेको ३ हप्तामा नै volume आउन थाल्यो।"),
      (3, "Bishnu Maya Gurung", 5.0, "Deep conditioning treatment ले मेरो रुखो र भाँचिने कपालमा जादुको काम गर्यो। एकदम recommend गर्छु।"),
      (4, "Laxmi Tamang", 4.0, "Serum राम्रो छ, thin areas मा नयाँ कपाल उम्रेको देखिन्छ। Regular use गर्नुपर्छ।"),
      (6, "Gita Sharma", 5.0, "Rosemary oil ले scalp massage गर्दा एकदम राम्रो feeling आउँछ। Circulation राम्रो भएको महसुस हुन्छ।"),
      (9, "Prem Kumar Adhikari", 5.0, "यो comb ले कपाल detangle गर्दा बिल्कुल break हुँदैन। मेरो arthritic हातले पनि सजिलैसँग hold गर्न सकिन्छ।"),
    ];

    for ((productIndex, authorName, rating, content) in items.values()) {
      let review : Types.Review = {
        id = nextId.value;
        productId = productIndex;
        authorName;
        rating;
        content;
        date = Time.now();
      };
      reviews.add(review);
      nextId.value += 1;
    };

    // Recalculate ratings for all products
    products.mapInPlace(func(p) {
      let productReviews = reviews.filter(func(r) { r.productId == p.id });
      let count = productReviews.size();
      if (count == 0) return p;
      let total = productReviews.foldLeft(0.0, func(acc, r) { acc + r.rating });
      let newRating = total / count.toFloat();
      { p with rating = newRating; reviewCount = count };
    });
  };

  public func seedGuides(
    guides : List.List<Types.GuideArticle>,
    nextId : { var value : Nat },
  ) {
    if (guides.size() > 0) return;

    let items : [(Text, Text, Nat, Text, [Types.GuideTag], [Nat])] = [
      (
        "सेतो र खैरो कपाललाई उज्यालो र चम्किलो राख्ने ७ तरिका",
        "Dr. Anita Sharma",
        6,
        "सेतो र खैरो कपाल सुन्दर हुन्छ, तर यसको सही हेरचाह नगर्दा पहेँलो र रुखो देखिन सक्छ। यहाँ ७ वटा सिद्ध तरिकाहरू छन् जसले तपाईंको सेतो कपाललाई सधैं चम्किलो राख्छन्।\n\n**१. Purple/Violet Shampoo प्रयोग गर्नुहोस्**\nPurple pigments पहेँलो रङलाई neutralize गर्छ। हप्तामा १-२ पटक प्रयोग गर्नुहोस्।\n\n**२. Heat styling कम गर्नुहोस्**\nHeat ले सेतो कपालको outer layer (cuticle) लाई क्षति गर्छ र पहेँलो बनाउँछ। Air drying वा low-heat options रोज्नुहोस्।\n\n**३. UV Protection प्रयोग गर्नुहोस्**\nघाम बाहिर जाँदा UV-protective hair spray लगाउनुहोस् — सूर्यको किरणले पनि कपाल पहेँलो बनाउँछ।\n\n**४. Deep Conditioning हप्तामा एकपटक**\nSilver र white hair naturally dry हुन्छ। Argan oil वा shea butter युक्त treatment नियमित प्रयोग गर्नुहोस्।\n\n**५. Sulfate-free Shampoo छान्नुहोस्**\nSulfate ले natural oils हटाएर कपाल रुखो र dull बनाउँछ। Gentle, sulfate-free formula प्रयोग गर्नुहोस्।\n\n**६. धुलो र प्रदूषणबाट जोगाउनुहोस्**\nBाहिर जाँदा scarf वा hat लगाउने बानी राख्नुहोस्। Pollution ले कपाललाई discolor गर्न सक्छ।\n\n**७. Regular Trimming**\nDry र split ends ले कपाल dull देखाउँछ। हर ६-८ हप्तामा trimming गर्नुहोस्।",
        [#greyHair],
        [0, 5, 11],
      ),
      (
        "पातलिँदो कपालको हेरचाह: बुढेसकालमा volume र density कसरी बढाउने",
        "Dr. Rajesh Koirala",
        8,
        "उमेर बढ्दै जाँदा कपाल पातलो हुनु सामान्य हो — तर यसको सही व्यवस्थापन गर्न सकिन्छ। यो गाइडमा तपाईंले पातलिँदो कपाललाई घना र स्वस्थ राख्ने वैज्ञानिक तरिकाहरू पाउनुहुनेछ।\n\n**पातलो कपालका कारणहरू**\n- Hormonal changes (विशेष महिलाहरूमा menopause पछि)\n- Nutritional deficiencies (Iron, Zinc, Biotin)\n- Scalp circulation कमजोर हुनु\n- Stress र थकान\n- Harsh hair products को प्रयोग\n\n**Volume बढाउने तरिकाहरू**\n\n**१. Volumizing Shampoo र Conditioner**\nBiotin र panthenol युक्त volumizing products प्रयोग गर्नुहोस्। Roots मा मात्र conditioner लगाउनु पर्दैन — ends मा मात्र लगाउनुहोस्।\n\n**२. Scalp Massage दैनिक**\nदिनमा ५ मिनेट scalp massage गर्नुहोस्। यसले circulation बढाउँछ र hair follicles लाई stimulate गर्छ। Rosemary oil थप्दा अझ राम्रो असर हुन्छ।\n\n**३. Biotin Supplement**\nDoctorको सल्लाहमा biotin supplement लिन सकिन्छ। Biotin hair keratin production मा सहयोग गर्छ।\n\n**४. Gentle Styling**\nTight hairstyles, heavy products, र heat styling बाट बच्नुहोस् — यिनीहरूले fragile hair लाई थप क्षति गर्छन्।\n\n**५. Protein Treatment**\nHair protein treatments ले weak, thin strands लाई strengthen गर्छन्। महिनामा एकपटक deep protein mask प्रयोग गर्नुहोस्।\n\n**कहिले doctor देखाउने?**\nयदि ६ महिनामा कपाल उल्लेखनीय रूपमा झरेको छ भने dermatologist वा trichologist लाई भेट्नुहोस्।",
        [#thinning],
        [2, 4, 10],
      ),
      (
        "संवेदनशील scalp को पूर्ण हेरचाह गाइड",
        "Dr. Priya Pandey",
        7,
        "उमेर बढ्दै जाँदा scalp अधिक संवेदनशील हुन्छ। सही हेरचाहले itching, flaking र discomfort कम गर्न सकिन्छ।\n\n**Sensitive Scalp का लक्षणहरू**\n- Itching र burning sensation\n- Flaking र dandruff\n- Redness वा irritation\n- Tightness वा dryness\n\n**हेरचाहका उपाय**\n\n**१. Gentle, Fragrance-Free Products छान्नुहोस्**\nSulfate, parabens, र artificial fragrance भएका products बेवास्ता गर्नुहोस्। Hypoallergenic formula खोज्नुहोस्।\n\n**२. पानीको तापक्रम ध्यान दिनुहोस्**\nधेरै तातो पानीले scalp को natural moisture हटाउँछ। Lukewarm पानीमा कपाल धुनुहोस्।\n\n**३. Anti-inflammatory Ingredients खोज्नुहोस्**\nChamomile, aloe vera, oat extract, र tea tree oil ले scalp inflammation कम गर्छन्।\n\n**४. Scratching बन्द गर्नुहोस्**\nScalp नखोस्नुहोस् — नाखूनले micro-wounds बनाउँछ र infection को जोखिम बढाउँछ। Wide-tooth comb प्रयोग गर्नुहोस्।\n\n**५. Hydrating Scalp Mask**\nHप्तामा एकपटक moisturizing scalp mask प्रयोग गर्नुहोस् जसले dry scalp को moisture barrier पुनर्स्थापित गर्छ।\n\n**६. Stress Management**\nStress ले scalp conditions बिग्रन सक्छ। Adequate sleep, yoga, र relaxation techniques helpful हुन्छन्।\n\n**कहिले medical help लिने?**\nयदि home care ले सुधार नभएमा, psoriasis वा eczema को सन्देह भएमा dermatologist देखाउनुहोस्।",
        [#scalpCare],
        [1, 7, 8],
      ),
      (
        "बुढेसकालमा कपाल स्टाइल गर्ने सजिला र elegant तरिकाहरू",
        "Sushila Maharjan",
        5,
        "सेतो वा खैरो कपाललाई सुन्दर र fashionable तरिकाले style गर्न सकिन्छ। यहाँ elderly individuals का लागि practical styling tips छन्।\n\n**सहज Hairstyles**\n\n**१. Classic Bob**\nShoulder-length bob सेतो कपालमा एकदम elegant देखिन्छ। Maintenance कम चाहिन्छ र versatile छ।\n\n**२. Soft Waves**\nHeat-free foam rollers वा flexi-rods ले soft waves बनाउन सकिन्छ। Volume थप्छ र thinning hair लाई fuller देखाउँछ।\n\n**३. Textured Pixie Cut**\nShort pixie cut bold र stylish छ। Minimal styling चाहिन्छ — perfect for busy days.\n\n**४. Low Bun वा Chignon**\nElegant updo जुन formal र casual दुवैमा काम गर्छ। Arthritis भएकाहरूका लागि hair pins को सट्टा soft hair ties प्रयोग गर्नुहोस्।\n\n**Styling Tips**\n\n**Heat Protection सधैं लगाउनुहोस्**\nHeat tools प्रयोग गर्दा heat protectant spray अनिवार्य छ। Grey hair विशेष गरी heat damage प्रति sensitive हुन्छ।\n\n**Light Hold Products मात्र प्रयोग गर्नुहोस्**\nHeavy gels र stiff hairsprays thinning hair लाई flat देखाउँछन्। Light mousse वा flexible hold spray रोज्नुहोस्।\n\n**Wide-Tooth Comb र Soft Bristle Brush प्रयोग गर्नुहोस्**\nFragile elderly hair का लागि gentle tools अत्यावश्यक छ। Metal combs बेवास्ता गर्नुहोस्।\n\n**Dry Shampoo उपयोगी हुन्छ**\nBetween wash days मा dry shampoo ले volume थप्छ र oil control गर्छ।",
        [#styling, #greyHair],
        [0, 9, 10, 11],
      ),
      (
        "कपालको स्वास्थ्यका लागि सही nutrition र diet",
        "Nutritionist Kavita Bhandari",
        6,
        "स्वस्थ कपाल भित्रबाटै आउँछ। सही खानाले hair growth, strength, र shine मा ठूलो फरक पार्छ।\n\n**कपालका लागि आवश्यक Nutrients**\n\n**Protein**\nKपाल keratin protein बाट बनेको हुन्छ। Adequate protein intake अत्यावश्यक छ।\n- स्रोत: Dal, paneer, eggs, chicken, fish\n- प्रतिदिन ०.८ग्राम per kg body weight\n\n**Iron**\nIron deficiency hair fall को प्रमुख कारण हो, विशेष महिलाहरूमा।\n- स्रोत: Spinach, lentils, pumpkin seeds, red meat\n- Vitamin C सँगै खाँदा absorption बढ्छ\n\n**Biotin (Vitamin B7)**\nHair growth र strength का लागि essential।\n- स्रोत: Eggs, nuts, sweet potato, avocado\n- Supplement: Doctor को सल्लाहमा मात्र\n\n**Zinc**\nScalp health र follicle strength का लागि important।\n- स्रोत: Pumpkin seeds, chickpeas, cashews\n\n**Omega-3 Fatty Acids**\nScalp hydration र anti-inflammation का लागि।\n- स्रोत: Flaxseeds, walnuts, fatty fish, chia seeds\n\n**Vitamin D**\nHair follicle cycling मा role खेल्छ। Sun exposure र fortified foods बाट पाइन्छ।\n\n**बेवास्ता गर्नुपर्ने कुराहरू**\n- Excessive sugar: Inflammation बढाउँछ\n- Processed foods: Nutrients कम, harmful additives बढी\n- Crash dieting: Sudden caloric restriction ले hair fall गराउँछ\n- Alcohol: B vitamins absorb गर्न गाह्रो बनाउँछ\n\n**हाइड्रेसन**\nDiन्मा कम्तिमा ८ गिलास पानी पिउनुहोस्। Dehydration ले dry, brittle hair हुन्छ।",
        [#thinning, #greyHair, #scalpCare],
        [2, 4],
      ),
      (
        "Elderly Hair Care: बुढेसकालमा उत्पादनहरू छान्ने सही तरिका",
        "Beauty Expert Rima Thapa",
        4,
        "बुढेसकालमा कपालको nature बदलिन्छ — सही products छान्न जान्नु महत्वपूर्ण छ। यहाँ के हेर्ने र के बेवास्ता गर्ने भन्ने complete guide छ।\n\n**Label पढ्ने तरिका**\n\n**राम्रा Ingredients**\n- Hyaluronic Acid: Deep hydration\n- Ceramides: Protective hair barrier\n- Keratin: Strengthens hair structure\n- Argan/Jojoba/Coconut Oil: Nourishment\n- Panthenol (Vitamin B5): Moisture retention\n- Biotin: Hair growth support\n- Aloe Vera: Scalp soothing\n\n**बेवास्ता गर्नुपर्ने Ingredients**\n- Sodium Lauryl Sulfate (SLS): Too harsh, strips natural oils\n- Parabens: Potential irritants\n- Alcohol (Denat): Dries out hair\n- Artificial Fragrances: Common sensitizers\n- Formaldehyde Releasers: Harmful chemicals\n\n**Budget vs. Quality**\nMahango product नै best हुन्छ भन्ने छैन। Ingredients list नै guide हो। Mid-range products मा पनि excellent ingredients हुन सक्छन्।\n\n**Elderly-Specific Considerations**\n- Sensitive scalp: Hypoallergenic, fragrance-free रोज्नुहोस्\n- Thinning hair: Volumizing, lightweight formulas\n- Grey/white hair: Color-depositing, brightening products\n- Dry hair: Rich moisturizing, oil-based treatments\n\n**Trial Period**\nNew product कम्तिमा ४ हप्ता consistently use गर्नुहोस् — hair care results तुरुन्त देखिँदैन।",
        [#products, #greyHair, #thinning, #scalpCare],
        [0, 1, 2, 3, 7],
      ),
    ];

    for ((title, author, readTime, content, tags, relatedProductIds) in items.values()) {
      let article : Types.GuideArticle = {
        id = nextId.value;
        title;
        author;
        publishDate = Time.now();
        readTime;
        content;
        tags;
        relatedProductIds;
      };
      guides.add(article);
      nextId.value += 1;
    };
  };
};
