export interface Filters {
  limit?: number;
  skip?: number;
  order?: string;
  sortBy?: string;
}

// User types
export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

export interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

export interface Hair {
  color: string;
  type: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  email: string;
  gender: string;
  birthDate: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  address: Address;
  phone: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  macAddress: string;
  ip: string;
  role: string;
  image: string;
  crypto: Crypto;
}

// Products types
export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  images: string[];
  thumbnail: string;
}

// Posts types
export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}
