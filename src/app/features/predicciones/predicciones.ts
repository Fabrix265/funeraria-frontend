import { Component, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { NgApexchartsModule } from 'ng-apexcharts'
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  ApexGrid
} from 'ng-apexcharts'
import { PrediccionService } from '../../core/services/prediccion'
import { AtaudService } from '../../core/services/ataud'
import { DemandaResponse } from '../../core/models/prediccion.model'

export type ChartOptions = {
  series: ApexAxisChartSeries
  chart: ApexChart
  xaxis?: ApexXAxis
  yaxis?: ApexYAxis
  legend?: ApexLegend
  fill?: ApexFill
  tooltip?: ApexTooltip
  colors?: string[]
  grid?: ApexGrid
}

@Component({
  selector: 'app-predicciones',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgApexchartsModule],
  templateUrl: './predicciones.html',
  styleUrls: ['./predicciones.css']
})
export class Predicciones {

  resultadoDemanda: DemandaResponse | null = null
  cargandoDemanda = false
  error = ''
  usarStockActual = false
  mesesDemanda: number = 6
  chartDemanda: Partial<ChartOptions> = {}

  constructor(
    private prediccionService: PrediccionService,
    private ataudService: AtaudService,
    private cdr: ChangeDetectorRef
  ) {}

  calcularDemanda(): void {
    this.cargandoDemanda = true
    this.resultadoDemanda = null
    this.error = ''
    this.cdr.detectChanges()

    if (this.usarStockActual) {
      this.ataudService.listar({}).subscribe({
        next: (ataudes) => {
          const stockPorCategoria: Record<string, number> = {}
          const categoriasClave = ['americano', 'lincoln', 'imperial', 'sin_ataud', 'madera', 'biblia', 'principe']

          ataudes.forEach(a => {
            const modeloLower = a.modelo.toLowerCase()
            let categoria = 'Otros'
            for (const cat of categoriasClave) {
              if (modeloLower.includes(cat)) {
                categoria = cat.charAt(0).toUpperCase() + cat.slice(1)
                if (categoria === 'Sin_ataud') categoria = 'sin_ataud'
                break
              }
            }
            stockPorCategoria[categoria] = (stockPorCategoria[categoria] || 0) + a.stock
          })

          this.ejecutarPrediccionDemanda(stockPorCategoria)
        },
        error: () => {
          this.ejecutarPrediccionDemanda()
        }
      })
    } else {
      this.ejecutarPrediccionDemanda()
    }
  }

  private ejecutarPrediccionDemanda(stockActual?: Record<string, number>): void {
    this.prediccionService.predecirDemanda({
      stock_actual: stockActual,
      meses: this.mesesDemanda
    }).subscribe({
      next: (res) => {
        this.resultadoDemanda = res
        this.generarChartDemanda()
        this.cargandoDemanda = false
        this.cdr.detectChanges()
      },
      error: (err) => {
        this.error = err?.error?.detail || 'Error al calcular demanda'
        this.cargandoDemanda = false
        this.cdr.detectChanges()
      }
    })
  }

  generarChartDemanda(): void {
    if (!this.resultadoDemanda) return

    const cats = this.resultadoDemanda.demanda_por_categoria
    const colores = ['#9db8e8', '#7ecfa0', '#c0aad8', '#f0b752', '#e88b8b', '#6dd8d8', '#b8a9e8', '#e8d76d']

    this.chartDemanda = {
      series: [{
        name: 'Demanda predicha',
        data: cats.map(c => c.cantidad_predicha)
      }],
      chart: {
        type: 'bar',
        height: 320,
        background: 'transparent',
        toolbar: { show: false },
        fontFamily: "'DM Sans', sans-serif"
      },
      colors: colores,
      xaxis: {
        categories: cats.map(c => c.categoria),
        labels: { style: { colors: '#7a92b0', fontSize: '11px' } }
      },
      yaxis: {
        labels: { style: { colors: '#7a92b0' } }
      },
      legend: { show: false },
      fill: { opacity: 0.85 },
      tooltip: { theme: 'dark' },
      grid: {
        borderColor: '#1e3a5f',
        strokeDashArray: 3
      }
    }
  }

  formatearNumero(valor: number): string {
    return Math.round(valor).toString()
  }
}
