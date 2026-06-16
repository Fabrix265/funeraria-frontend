import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { NgApexchartsModule } from 'ng-apexcharts'
import {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  ApexPlotOptions,
  ApexGrid,
  ApexStroke,
  ApexDataLabels
} from 'ng-apexcharts'
import { PrediccionService } from '../../core/services/prediccion'
import {
  ModeloInfoResponse,
  ComparativaResponse,
  MetricaModelo,
  HistoryResponse,
  PrediccionResponse,
  ModeloTipo,
  TargetTipo,
  DistribucionCompletaResponse,
  PrediccionDistribucionItem
} from '../../core/models/prediccion.model'

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries
  chart: ApexChart
  xaxis?: ApexXAxis
  yaxis?: ApexYAxis | ApexYAxis[]
  title?: ApexTitleSubtitle
  legend?: ApexLegend
  fill?: ApexFill
  tooltip?: ApexTooltip
  colors?: string[]
  plotOptions?: ApexPlotOptions
  labels?: string[]
  grid?: ApexGrid
  stroke?: ApexStroke
  dataLabels?: ApexDataLabels
}

@Component({
  selector: 'app-predicciones',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgApexchartsModule],
  templateUrl: './predicciones.html',
  styleUrls: ['./predicciones.css']
})
export class Predicciones implements OnInit {

  tabActiva: 'modelos' | 'prediccion' | 'comparacion' | 'necesidades' = 'modelos'

  modelosInfo: ModeloInfoResponse | null = null
  comparativa: ComparativaResponse | null = null
  historialServicios: HistoryResponse | null = null
  historialMonto: HistoryResponse | null = null

  modeloSeleccionado: ModeloTipo = 'sarima'
  targetSeleccionado: TargetTipo = 'servicios_totales'
  targetComparacion: TargetTipo = 'servicios_totales'
  pasos: number = 6

  resultadoPrediccion: PrediccionResponse | null = null
  cargando = false
  error = ''

  readonly modelos: ModeloTipo[] = ['sarima', 'prophet', 'xgboost', 'lgbm', 'lstm', 'ets']
  readonly targets: TargetTipo[] = ['servicios_totales', 'monto_total']

  chartHistorial: Partial<ChartOptions> = {}
  chartPrediccion: Partial<ChartOptions> = {}
  chartComparacion: Partial<ChartOptions> = {}
  chartNecesidadesAtaudes: Partial<ChartOptions> = {}
  chartNecesidadesCapillas: Partial<ChartOptions> = {}

  mesInicio: string = '2026-06'
  mesFin: string = '2026-12'
  resultadoDistribucion: DistribucionCompletaResponse | null = null
  cargandoDistribucion = false
  tiposAtaude: string[] = []
  tiposCapilla: string[] = []

  constructor(
    private prediccionService: PrediccionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales()
  }

  cambiarTab(tab: 'modelos' | 'prediccion' | 'comparacion' | 'necesidades'): void {
    this.tabActiva = tab
    if (tab === 'comparacion' && !this.comparativa) {
      this.cargarComparacion()
    }
  }

  cargarDatosIniciales(): void {
    this.prediccionService.listarModelos().subscribe({
      next: (info) => {
        this.modelosInfo = info
        this.cdr.detectChanges()
      },
      error: () => console.warn('No se pudo cargar info de modelos')
    })

    this.prediccionService.historial('servicios_totales').subscribe({
      next: (hist) => {
        this.historialServicios = hist
        this.generarChartHistorial()
        this.cdr.detectChanges()
      }
    })

    this.prediccionService.historial('monto_total').subscribe({
      next: (hist) => {
        this.historialMonto = hist
        this.cdr.detectChanges()
      }
    })
  }

  cargarComparacion(): void {
    this.prediccionService.comparar().subscribe({
      next: (comp) => {
        this.comparativa = comp
        this.generarChartComparacion()
        this.cdr.detectChanges()
      }
    })
  }

  ejecutarPrediccion(): void {
    this.cargando = true
    this.error = ''
    this.resultadoPrediccion = null

    this.prediccionService.predecir({
      modelo: this.modeloSeleccionado,
      target: this.targetSeleccionado,
      pasos: this.pasos
    }).subscribe({
      next: (res) => {
        this.resultadoPrediccion = res
        this.generarChartPrediccion()
        this.cargando = false
        this.cdr.detectChanges()
      },
      error: (err) => {
        this.error = err?.error?.detail || 'Error al ejecutar predicción'
        this.cargando = false
        this.cdr.detectChanges()
      }
    })
  }

  generarChartHistorial(): void {
    if (!this.historialServicios) return

    const datos = this.historialServicios.datos
    this.chartHistorial = {
      series: [{
        name: 'Servicios totales',
        data: datos.map(d => d.valor)
      }],
      chart: {
        type: 'area', 
        height: 320,
        background: 'transparent',
        toolbar: { show: false },
        fontFamily: "'DM Sans', sans-serif"
      },
      dataLabels: { enabled: false },
      colors: ['#81d4fa'],
      title: { text: '' },
      xaxis: {
        categories: datos.map(d => d.mes),
        labels: { style: { colors: '#7a92b0', fontSize: '11px' } }
      },
      yaxis: {
        labels: { style: { colors: '#7a92b0' } }
      },
      legend: { show: false },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark', 
          type: 'vertical',
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.01,
          stops: [0, 90, 100]
        }
      },
      tooltip: {
        theme: 'dark',
        style: { fontSize: '12px' }
      },
      grid: {
        borderColor: '#1e3a5f',
        strokeDashArray: 3
      },
      stroke: {
        curve: 'smooth', 
        width: 3,        
        colors: ['#81d4fa'] 
      }
    }
  }

  generarChartPrediccion(): void {
    if (!this.resultadoPrediccion) return

    const hist = this.targetSeleccionado === 'servicios_totales'
      ? this.historialServicios?.datos || []
      : this.historialMonto?.datos || []

    const histValores = hist.map(d => d.valor)
    const histFechas = hist.map(d => d.mes)
    const predValores = this.resultadoPrediccion.predicciones.map(p => p.valor)
    const predFechas = this.resultadoPrediccion.predicciones.map(p => p.mes)

    const todasFechas = [...histFechas, ...predFechas]
    const valoresHist = [...histValores, ...new Array(predValores.length).fill(null)]
    const valoresPred = [...new Array(histValores.length).fill(null), ...predValores]

    this.chartPrediccion = {
      series: [
        {
          name: 'Histórico',
          data: valoresHist
        },
        {
          name: 'Predicción',
          data: valoresPred
        }
      ],
      chart: {
        type: 'line',
        height: 350,
        background: 'transparent',
        toolbar: { show: false },
        fontFamily: "'DM Sans', sans-serif"
      },
      dataLabels: { enabled: false },
      colors: ['#81d4fa', '#7ecfa0'],
      title: { text: '' },
      xaxis: {
        categories: todasFechas,
        labels: {
          style: { colors: '#7a92b0', fontSize: '11px' },
          rotate: -45,
          rotateAlways: true
        }
      },
      yaxis: {
        labels: { style: { colors: '#7a92b0' } }
      },
      legend: {
        position: 'top',
        labels: { colors: '#e8edf5' }
      },
      stroke: {
        width: [3, 3],
        dashArray: [0, 5],
        colors: ['#81d4fa', '#7ecfa0'] 
      },
      tooltip: {
        theme: 'dark',
        shared: true
      },
      grid: {
        borderColor: '#1e3a5f',
        strokeDashArray: 3
      }
    }
  }

  generarChartComparacion(): void {
    if (!this.comparativa) return

    const filtradas = this.comparativa.metricas.filter(m => m.target === this.targetComparacion)
    this.chartComparacion = {
      series: [
        { name: 'MAE', data: filtradas.map(m => m.mae) },
        { name: 'RMSE', data: filtradas.map(m => m.rmse) },
        { name: 'MAPE (%)', data: filtradas.map(m => m.mape) }
      ],
      chart: {
        type: 'bar',
        height: 350,
        background: 'transparent',
        toolbar: { show: false },
        fontFamily: "'DM Sans', sans-serif"
      },
      colors: ['#9db8e8', '#7ecfa0', '#c0aad8'],
      title: { text: '' },
      xaxis: {
        categories: filtradas.map(m => m.modelo),
        labels: { style: { colors: '#7a92b0', fontSize: '11px' } }
      },
      yaxis: {
        labels: { style: { colors: '#7a92b0' } }
      },
      legend: {
        position: 'top',
        labels: { colors: '#e8edf5' }
      },
      fill: { opacity: 0.85 },
      tooltip: { theme: 'dark' },
      grid: {
        borderColor: '#1e3a5f',
        strokeDashArray: 3
      }
    }
  }

  cambiarTargetComparacion(): void {
    this.generarChartComparacion()
    this.cdr.detectChanges()
  }

  calcularNecesidades(): void {
    this.cargandoDistribucion = true
    this.resultadoDistribucion = null
    this.cdr.detectChanges()

    this.prediccionService.prediccionDistribucion({
      modelo: this.modeloSeleccionado,
      target: 'servicios_totales',
      mes_inicio: this.mesInicio,
      mes_fin: this.mesFin
    }).subscribe({
      next: (res) => {
        try {
          this.resultadoDistribucion = res
          this.extraerTipos()
          this.generarChartNecesidades()
        } catch (e) {
          console.error('Error procesando distribución:', e)
        } finally {
          this.cargandoDistribucion = false
          this.cdr.detectChanges()
        }
      },
      error: (err) => {
        console.error('Error en predicción distribución:', err)
        this.cargandoDistribucion = false
        this.cdr.detectChanges()
      }
    })
  }

  extraerTipos(): void {
    if (!this.resultadoDistribucion?.predicciones?.length) return
    const first = this.resultadoDistribucion.predicciones[0]
    this.tiposAtaude = first.ataudes.map(a => a.nombre)
    this.tiposCapilla = first.capillas.map(c => c.nombre)
  }

  generarChartNecesidades(): void {
    if (!this.resultadoDistribucion?.predicciones?.length) return

    const preds = this.resultadoDistribucion.predicciones
    const meses = preds.map(p => p.mes)

    const colores = ['#9db8e8', '#7ecfa0', '#c0aad8', '#f0b752', '#e88b8b', '#6dd8d8', '#b8a9e8', '#e8d76d', '#e88bdf']

    const tooltipBase = { theme: 'dark' as const, shared: true, intersect: false }

    const tiposConDemandAtaudes = this.tiposAtaude.filter(tipo =>
      preds.some(p => { const item = p.ataudes.find(a => a.nombre === tipo); return item && item.cantidad_estimada > 0 })
    )

    const seriesAtaude: ApexAxisChartSeries = tiposConDemandAtaudes.map(tipo => ({
      name: tipo,
      data: preds.map(p => {
        const item = p.ataudes.find(a => a.nombre === tipo)
        return item ? Math.round(item.cantidad_estimada) : 0
      })
    }))

    this.chartNecesidadesAtaudes = {
      series: seriesAtaude,
      chart: { type: 'bar', stacked: true, height: 300, background: 'transparent', toolbar: { show: false }, fontFamily: "'DM Sans', sans-serif" },
      colors: colores,
      title: { text: '' },
      xaxis: { categories: meses, labels: { style: { colors: '#7a92b0', fontSize: '11px' } } },
      yaxis: { labels: { style: { colors: '#7a92b0' } } },
      legend: { position: 'top', labels: { colors: '#e8edf5' } },
      fill: { opacity: 0.85 },
      tooltip: tooltipBase,
      plotOptions: { bar: { columnWidth: '50%' } },
      grid: { borderColor: '#1e3a5f', strokeDashArray: 3 }
    }

    const tiposConDemandCapillas = this.tiposCapilla.filter(tipo =>
      preds.some(p => { const item = p.capillas.find(c => c.nombre === tipo); return item && item.cantidad_estimada > 0 })
    )

    const seriesCapilla: ApexAxisChartSeries = tiposConDemandCapillas.map(tipo => ({
      name: tipo,
      data: preds.map(p => {
        const item = p.capillas.find(c => c.nombre === tipo)
        return item ? Math.round(item.cantidad_estimada) : 0
      })
    }))

    this.chartNecesidadesCapillas = {
      series: seriesCapilla,
      chart: { type: 'bar', stacked: true, height: 300, background: 'transparent', toolbar: { show: false }, fontFamily: "'DM Sans', sans-serif" },
      colors: colores.slice().reverse(),
      title: { text: '' },
      xaxis: { categories: meses, labels: { style: { colors: '#7a92b0', fontSize: '11px' } } },
      yaxis: { labels: { style: { colors: '#7a92b0' } } },
      legend: { position: 'top', labels: { colors: '#e8edf5' } },
      fill: { opacity: 0.85 },
      tooltip: tooltipBase,
      plotOptions: { bar: { columnWidth: '50%' } },
      grid: { borderColor: '#1e3a5f', strokeDashArray: 3 }
    }
  }

  formatearNumero(valor: number): string {
    return Math.round(valor).toString()
  }

  buscarCantidad(items: { nombre: string; cantidad_estimada: number }[], nombre: string): number {
    const found = items.find(i => i.nombre === nombre)
    return found ? found.cantidad_estimada : 0
  }

  formatearMetrica(valor: number): string {
    return valor.toFixed(2)
  }
}