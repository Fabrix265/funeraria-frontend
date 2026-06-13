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
  ApexStroke
} from 'ng-apexcharts'
import { PrediccionService } from '../../core/services/prediccion'
import {
  ModeloInfoResponse,
  ComparativaResponse,
  MetricaModelo,
  HistoryResponse,
  DistribucionResponse,
  PrediccionResponse,
  ModeloTipo,
  TargetTipo
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
}

@Component({
  selector: 'app-predicciones',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgApexchartsModule],
  templateUrl: './predicciones.html',
  styleUrls: ['./predicciones.css']
})
export class Predicciones implements OnInit {

  tabActiva: 'modelos' | 'prediccion' | 'comparacion' | 'distribucion' = 'modelos'

  modelosInfo: ModeloInfoResponse | null = null
  comparativa: ComparativaResponse | null = null
  historialServicios: HistoryResponse | null = null
  historialMonto: HistoryResponse | null = null
  distribucionCoffins: DistribucionResponse | null = null
  distribucionChapels: DistribucionResponse | null = null

  modeloSeleccionado: ModeloTipo = 'sarima'
  targetSeleccionado: TargetTipo = 'servicios_totales'
  pasos: number = 6

  resultadoPrediccion: PrediccionResponse | null = null
  cargando = false
  error = ''

  readonly modelos: ModeloTipo[] = ['sarima', 'prophet', 'xgboost', 'lgbm', 'lstm', 'ets']
  readonly targets: TargetTipo[] = ['servicios_totales', 'monto_total']

  chartHistorial: Partial<ChartOptions> = {}
  chartPrediccion: Partial<ChartOptions> = {}
  chartComparacion: Partial<ChartOptions> = {}
  chartDistribucionCoffins: Partial<ChartOptions> = {}
  chartDistribucionChapels: Partial<ChartOptions> = {}

  constructor(
    private prediccionService: PrediccionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales()
  }

  cambiarTab(tab: 'modelos' | 'prediccion' | 'comparacion' | 'distribucion'): void {
    this.tabActiva = tab
    if (tab === 'comparacion' && !this.comparativa) {
      this.cargarComparacion()
    }
    if (tab === 'distribucion' && !this.distribucionCoffins) {
      this.cargarDistribuciones()
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

  cargarDistribuciones(): void {
    this.prediccionService.distribucionCoffins().subscribe({
      next: (dist) => {
        this.distribucionCoffins = dist
        this.generarChartDistribucionCoffins()
        this.cdr.detectChanges()
      }
    })

    this.prediccionService.distribucionChapels().subscribe({
      next: (dist) => {
        this.distribucionChapels = dist
        this.generarChartDistribucionChapels()
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
        type: 'line',
        height: 320,
        background: 'transparent',
        toolbar: { show: false }
      },
      colors: ['#9db8e8'],
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
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
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
        toolbar: { show: false }
      },
      colors: ['#9db8e8', '#7ecfa0'],
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
        width: [2, 2],
        dashArray: [0, 5]
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

    const metricas = this.comparativa.metricas
    this.chartComparacion = {
      series: [
        { name: 'MAE', data: metricas.map(m => m.mae) },
        { name: 'RMSE', data: metricas.map(m => m.rmse) },
        { name: 'MAPE (%)', data: metricas.map(m => m.mape) }
      ],
      chart: {
        type: 'bar',
        height: 350,
        background: 'transparent',
        toolbar: { show: false }
      },
      colors: ['#9db8e8', '#7ecfa0', '#c0aad8'],
      title: { text: '' },
      xaxis: {
        categories: metricas.map(m => m.modelo),
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

  generarChartDistribucionCoffins(): void {
    if (!this.distribucionCoffins) return

    const dist = this.distribucionCoffins.distribucion
    this.chartDistribucionCoffins = {
      series: dist.map(d => d.proporcion * 100),
      chart: {
        type: 'donut',
        height: 320,
        background: 'transparent'
      },
      colors: ['#9db8e8', '#7ecfa0', '#c0aad8', '#d8c898', '#d08080', '#b8cad8', '#a0d4a8', '#e8b8b8', '#b8d8e8'],
      title: { text: '' },
      labels: dist.map(d => d.nombre),
      legend: {
        position: 'right',
        labels: { colors: '#e8edf5' }
      },
      tooltip: {
        theme: 'dark',
        y: { formatter: (val: number) => val.toFixed(1) + '%' }
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: { show: true, color: '#e8edf5' },
              value: { color: '#7a92b0' }
            }
          }
        }
      }
    }
  }

  generarChartDistribucionChapels(): void {
    if (!this.distribucionChapels) return

    const dist = this.distribucionChapels.distribucion
    this.chartDistribucionChapels = {
      series: dist.map(d => d.proporcion * 100),
      chart: {
        type: 'donut',
        height: 320,
        background: 'transparent'
      },
      colors: ['#d8c898', '#9db8e8', '#7ecfa0', '#c0aad8', '#d08080', '#b8cad8', '#a0d4a8', '#e8b8b8'],
      title: { text: '' },
      labels: dist.map(d => d.nombre),
      legend: {
        position: 'right',
        labels: { colors: '#e8edf5' }
      },
      tooltip: {
        theme: 'dark',
        y: { formatter: (val: number) => val.toFixed(1) + '%' }
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: { show: true, color: '#e8edf5' },
              value: { color: '#7a92b0' }
            }
          }
        }
      }
    }
  }

  formatearMetrica(valor: number): string {
    return valor.toFixed(2)
  }
}
