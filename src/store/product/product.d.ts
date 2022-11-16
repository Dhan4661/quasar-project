export interface IProduct {
  products: {
    totalRecords: number;
    page: number;
    offset: number;
  };
  posts: IPost;
}

export interface IPost{
    userId: number,
    id: number,
    title: string,
    body: string,
}

// export interface ICategories {
//   id: string;
//   label: string;
//   urlslug: string;
//   children: ICategories[];
// }

// export interface IBrand {
//   imageUrl: string;
//   name: string;
//   id: string;
//   urlslug: string;
// }

// export interface IImageObj {
//   webImage: string;
//   mobileImage: string;
//   link: string;
//   openInNewWindow: boolean;
// }

// export interface IProductFilterResponse {
//   nodes: ICategories[];
//   brand: IBrand[];
//   slider: IImageObj[];
//   banner: IImageObj;
// }

// export interface IProductFilterModel {
//   filterBy: string;
//   q?: string;
// }

// export interface IFilterEmit {
//   filterModel: {
//     selectedSubCategories: string[];
//     selectedCategories: string[];
//     selectedBrands: string[];
//     availability: boolean;
//   };
//   sortType: string;
//   banner: IProductFilterResponse['banner'];
//   sliderImages: IProductFilterResponse['slider'];
// }

// export interface IInstantSearchResponse {
//   objectID: string;
//   sku: string;
//   brand: string;
//   displayName: string;
//   imageUrl: string;
//   urlSlug: string;
//   category: string;
//   source: string;
//   accset: string;
//   isAvailableInLocation: boolean;
//   stockAvailable: number;
//   stockIsInfinite: boolean;
// }

// export interface ISearchParams {
//   q: string;
//   accset: string;
// }

// export interface IProductParams {
//   q?: string;
//   type?: string;
//   categories?: string[];
//   brands?: string[];
//   accset?: string;
//   orderBy?: string;
//   page?: number;
//   offset?: number;
//   limit?: number;
//   isAvailable?: boolean;
// }

// export interface IImageSrc {
//   src: string;
// }
// export interface IProductDetail extends IProductObj {
//   description: string;
//   alternateSku: string;
//   stockStatus: string;
//   locationName: string;
//   inboundStock: string[];
//   defaultComment: string;
//   ingredients: string;
//   servingSize: string;
//   nutritionUnit: string;
//   nutrition: string[];
//   allergens: string;
//   secondImage: string[];
// }
// export interface IProductDetailResponse {
//   productDetail: IProductDetail;
//   recentView: IProductObj[];
// }
// export interface IRencentView {
//   Sku: string;
//   Viewfrom: string;
// }

// export interface IExtraInfo{
//   minordQty: string;
//   toggleUnit: string;
//   leadTime: string;
//   cookInstr: string;
//   cookInstr2: string;
//   otherInfo: string;
//   size: string;
//   unit: string;
//   width: string;
//   depth: string;
//   height: string;
//   volume: string;
//   storage: string
//   lowRCPUnit: string;
//   unitConversion: string;
//   outDIWidth: string;
//   outDIDepth: string;
//   outDIHight: string;
//   outDIVolume: string;
//   cartOnPRLY: string;
//   noOfLayer: string;
//   cartOnPRPL: string;
// }

// export interface IExtraNutritional{
//   dailyserve: string;
//   label: string;
//   perServe: string;
//   per100: string;
//   childNutritional?: IExtraNutritional[];
// }
// export interface INutritionls{
//   servingSize:string;
//   nutritional:IExtraNutritional[];
// }
// export interface ISubstitutes{
//   products: IProductObj[];
//   descSub1: string;
//   descSub2: string;
//   descSub3?: string;
// }
// export interface IAllergens{
//   labelDesc: string;
//   ingrdent: string;
//   moluscs: number;
//   eggs: number;
//   fish: number;
//   lupin: number;
//   soya: number;
//   milk: number;
//   peanuts: number;
//   gluten: number;
//   crustacean: number;
//   mustard: number;
//   nuts: number;
//   sesame: number;
//   celery: number;
//   sulphites: number;
//   glutenfree: number;
//   lactosefree: number;
//   nutfree: number;
//   sugarfree: number;
//   gmofree: number;
//   soyafree: number;
//   vegan: number;
//   vegetarian: number;
//   organic: number;
//   bio: number;
//   eco: number;
//   garlic: number;
//   wheat: number;
//   nzMade: number;
//   nzGrown: number;
//   dairyfree: number;
//   halal: number;
//   kosher: number;
//   packInstr: string;
//   bestBefore: string;
//   speciesCat: string;
//   pluCode: string;
//   labelWHT: string;
//   labelUnit: string;
// }
// export interface IExtraProductInfo{
//   productInfo:IExtraInfo;
//   nutritionals:INutritionls;
//   substitutes:ISubstitutes;
//   allergens:IAllergens;
// }