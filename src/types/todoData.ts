export default interface TodoData {
  isLoading: boolean;
  data: Todos[];
}

export interface Todos {
  id: number;
  todo: string;
  status: number;
}
