import axios from 'axios';

export class ApiService {
  private api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  public async getDashboardInfos() {
    const respose = await this.api.get('/produtor/dashboard');

    return respose;
  }

  public async getPorudores() {
    const response = await this.api.get('/produtor');

    return response;
  }

  public async createProdutor(produtor: any) {
    const response = await this.api.post('/produtor', produtor);

    return response;
  }

  public async updateProdutor(id: string, produtor: any) {
    const response = await this.api.patch(`/produtor/${id}`, produtor);

    return response;
  }

  public async deleteProdutor(produtorId: string) {
    const response = await this.api.delete(`/produtor/${produtorId}`);

    return response;
  }
}
