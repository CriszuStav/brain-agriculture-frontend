export interface Produtor {
  id?: string;
  document: string;
  name: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  agricultureArea: number;
  vegetationArea: number;
  cultures: Culture[];
}

export interface Culture {
  id: string;
  name: string;
}