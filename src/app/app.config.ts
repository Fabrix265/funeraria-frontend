import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http'
import {
  provideLucideIcons,
  LucideLayoutDashboard,
  LucideFileText,
  LucideScanLine,
  LucideBox,
  LucideChurch,
  LucideCar,
  LucideBarChart3,
  LucideUser,
  LucideBird,
  LucideUsers,
  LucideShield,
  LucideScrollText,
  LucideSettings,
  LucideLogOut,
  LucideEye,
  LucideEyeOff,
  LucidePencil,
  LucideCheck,
  LucideX,
  LucideChevronDown,
  LucideArrowLeft,
  LucideArrowRight,
  LucideAlertTriangle,
  LucidePackage,
  LucideDollarSign,
  LucideRefreshCw,
  LucideLoader,
  LucideTrash2,
  LucideCircleCheck,
  LucideCircleX,
  LucideSearch,
  LucidePlus,
  LucideCalendar,
  LucideIdCard,
  LucideHeart,
  LucideUpload,
  LucideFolderOpen,
  LucideDownload,
  LucideReplace,
  LucideUploadCloud,
  LucideFileCheck,
  LucideScroll,
} from '@lucide/angular'

import { routes } from './app.routes'
import { authInterceptor } from './core/interceptors/auth-interceptor'

export const appConfig: ApplicationConfig = {

  providers: [

    provideRouter(routes),

    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),

    provideLucideIcons(
      LucideLayoutDashboard,
      LucideFileText,
      LucideScanLine,
      LucideBox,
      LucideChurch,
      LucideCar,
      LucideBarChart3,
      LucideUser,
      LucideBird,
      LucideUsers,
      LucideShield,
      LucideScrollText,
      LucideSettings,
      LucideLogOut,
      LucideEye,
      LucideEyeOff,
      LucidePencil,
      LucideCheck,
      LucideX,
      LucideChevronDown,
      LucideArrowLeft,
      LucideArrowRight,
      LucideAlertTriangle,
      LucidePackage,
      LucideDollarSign,
      LucideRefreshCw,
      LucideLoader,
      LucideTrash2,
      LucideCircleCheck,
      LucideCircleX,
      LucideSearch,
      LucidePlus,
      LucideCalendar,
      LucideIdCard,
      LucideHeart,
      LucideUpload,
      LucideFolderOpen,
      LucideDownload,
      LucideReplace,
      LucideUploadCloud,
      LucideFileCheck,
      LucideScroll,
    ),

  ]

}