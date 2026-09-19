import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ServicioArchivosResponse, TipoArchivo } from '../models/servicio-archivo.model'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ArchivoService {
  private api = environment.apiUrl

  constructor(private http: HttpClient) {}

  listar(servicioId: number) {
    return this.http.get<ServicioArchivosResponse>(
      `${this.api}/services/${servicioId}/archivos`
    )
  }

  subir(servicioId: number, tipo: TipoArchivo, file: File) {
    const formData = new FormData()
    formData.append('tipo', tipo)
    formData.append('file', file)
    return this.http.post(
      `${this.api}/services/${servicioId}/archivos`,
      formData
    )
  }

  descargar(servicioId: number, archivoId: number) {
    return this.http.get(
      `${this.api}/services/${servicioId}/archivos/${archivoId}/descargar`,
      { responseType: 'blob' }
    )
  }

  reemplazar(servicioId: number, archivoId: number, file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return this.http.put(
      `${this.api}/services/${servicioId}/archivos/${archivoId}`,
      formData
    )
  }

  eliminar(servicioId: number, archivoId: number) {
    return this.http.delete(
      `${this.api}/services/${servicioId}/archivos/${archivoId}`
    )
  }
}
