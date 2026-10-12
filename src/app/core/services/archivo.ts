import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { ServicioArchivosResponse, TipoArchivo } from '../models/servicio-archivo.model'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ArchivoService {
  private api = environment.apiUrl

  // Caché en memoria de blobs por id de archivo → segunda vista/descarga instantánea (evita re-leer Drive)
  private cache = new Map<number, Blob>()

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
    ).pipe(
      tap((res: any) => {
        if (res?.id && file) this.cache.set(Number(res.id), file as Blob)
      })
    )
  }

  descargar(servicioId: number, archivoId: number): Observable<Blob> {
    const cacheado = this.cache.get(archivoId)
    if (cacheado) return of(cacheado)
    return this.http.get(
      `${this.api}/services/${servicioId}/archivos/${archivoId}/descargar`,
      { responseType: 'blob' }
    ).pipe(tap((blob) => this.cache.set(archivoId, blob)))
  }

  reemplazar(servicioId: number, archivoId: number, file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return this.http.put(
      `${this.api}/services/${servicioId}/archivos/${archivoId}`,
      formData
    ).pipe(
      tap((res: any) => {
        if (file) this.cache.set(archivoId, file as Blob)
      })
    )
  }

  eliminar(servicioId: number, archivoId: number) {
    return this.http.delete(
      `${this.api}/services/${servicioId}/archivos/${archivoId}`
    ).pipe(tap(() => this.cache.delete(archivoId)))
  }
}
