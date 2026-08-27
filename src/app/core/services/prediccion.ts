import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import {
  DemandaRequest,
  DemandaResponse
} from '../models/prediccion.model'

@Injectable({ providedIn: 'root' })
export class PrediccionService {
  private api = `${environment.iaApiUrl}/predictions`

  constructor(private http: HttpClient) {}

  predecirDemanda(request: DemandaRequest) {
    return this.http.post<DemandaResponse>(`${this.api}/demanda`, request)
  }
}
