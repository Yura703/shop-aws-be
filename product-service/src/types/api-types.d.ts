export  interface IProduct {
  id: string;
  title: string,
  description: string,
  price: number,
  count: number,
  imageId: string
}

export interface INewProduct {
  title: string,
  description: string,
  price: number,
  count: number,
  imageId: string
}

export interface IProducts {
  products: IProduct[]
}