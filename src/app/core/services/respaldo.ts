import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import {
  Respaldo,
  RespaldoConfig,
  RespaldoEstado,
  RespaldoJob,
  RespaldoListaResponse,
  RespaldoResincronizacion,
  TokenRestauracion,
} from '../models/respaldo.model'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class RespaldoService {
  private api = `${environment.apiUrl}/respaldos`

  constructor(private http: HttpClient) {}

  estado(): Observable<RespaldoEstado> {
    return this.http.get<RespaldoEstado>(`${this.api}/estado`)
  }

  listar(): Observable<RespaldoListaResponse> {
    return this.http.get<RespaldoListaResponse>(`${this.api}/`)
  }

  obtenerConfig(): Observable<RespaldoConfig> {
    return this.http.get<RespaldoConfig>(`${this.api}/config`)
  }

  actualizarConfig(datos: Partial<RespaldoConfig>): Observable<RespaldoConfig> {
    return this.http.put<RespaldoConfig>(`${this.api}/config`, datos)
  }

  obtenerJob(jobId: string): Observable<RespaldoJob> {
    return this.http.get<RespaldoJob>(`${this.api}/jobs/${jobId}`)
  }

  crear(observacion: string | null): Observable<RespaldoJob> {
    return this.http.post<RespaldoJob>(`${this.api}/`, { observacion })
  }

  resincronizar(): Observable<RespaldoResincronizacion> {
    return this.http.post<RespaldoResincronizacion>(`${this.api}/resincronizar`, {})
  }

  solicitarCodigo(respaldoId: number): Observable<TokenRestauracion> {
    return this.http.post<TokenRestauracion>(`${this.api}/${respaldoId}/codigo`, {})
  }

  restaurar(
    respaldoId: number,
    datos: { confirmacion: string; token: string; restaurar_archivos: boolean }
  ): Observable<RespaldoJob> {
    return this.http.post<RespaldoJob>(`${this.api}/${respaldoId}/restaurar`, datos)
  }

  recuperarArchivos(respaldoId: number): Observable<RespaldoJob> {
    return this.http.post<RespaldoJob>(`${this.api}/${respaldoId}/recuperar-archivos`, {})
  }

  eliminar(respaldoId: number): Observable<unknown> {
    return this.http.delete(`${this.api}/${respaldoId}`)
  }

  descargar(respaldoId: number): Observable<Blob> {
    return this.http.get(`${this.api}/${respaldoId}/descargar`, { responseType: 'blob' })
  }
}
