import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import {
  PrediccionRequest,
  PrediccionResponse,
  ModeloInfoResponse,
  ComparativaResponse,
  HistoryResponse,
  DistribucionResponse,
  DistribucionRequest,
  DistribucionCompletaResponse
} from '../models/prediccion.model'

@Injectable({ providedIn: 'root' })
export class PrediccionService {
  private api = `${environment.iaApiUrl}/predictions`

  constructor(private http: HttpClient) {}

  listarModelos() {
    return this.http.get<ModeloInfoResponse>(`${this.api}/models`)
  }

  predecir(request: PrediccionRequest) {
    return this.http.post<PrediccionResponse>(`${this.api}/predict`, request)
  }

  comparar() {
    return this.http.get<ComparativaResponse>(`${this.api}/compare`)
  }

  historial(target: string) {
    return this.http.get<HistoryResponse>(`${this.api}/history/${target}`)
  }

  distribucionCoffins() {
    return this.http.get<DistribucionResponse>(`${this.api}/distribution/coffins`)
  }

  distribucionChapels() {
    return this.http.get<DistribucionResponse>(`${this.api}/distribution/chapels`)
  }

  prediccionDistribucion(request: DistribucionRequest) {
    return this.http.post<DistribucionCompletaResponse>(`${this.api}/distribution/predict`, request)
  }
}
