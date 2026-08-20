"""
Demostración del sistema para video promocional.
Ejecutar: python e2e/demo_video.py
Grabar pantalla con Windows + G antes de ejecutar.
"""
import time
from selenium import webdriver
from selenium.webdriver.edge.service import Service as EdgeService
from selenium.webdriver.edge.options import Options as EdgeOptions
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.microsoft import EdgeChromiumDriverManager

BASE_URL = "https://funeraria-frontend-beta.vercel.app"
USERNAME = "fabAdmin"
PASSWORD = "265336aaaa"

PAUSA_CORTA = 3
PAUSA_MEDIA = 5
PAUSA_LARGA = 8


def crear_driver():
    options = EdgeOptions()
    options.add_argument("--start-maximized")
    options.add_argument("--disable-notifications")
    options.add_experimental_option("excludeSwitches", ["enable-logging"])
    service = EdgeService(EdgeChromiumDriverManager().install())
    driver = webdriver.Edge(service=service, options=options)
    driver.implicitly_wait(5)
    return driver


def login(driver):
    print("[1/14] Login...")
    driver.get(f"{BASE_URL}/login")
    time.sleep(PAUSA_CORTA)

    user_input = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Nombre de usuario']")
    user_input.clear()
    user_input.send_keys(USERNAME)
    time.sleep(1)

    pass_input = driver.find_element(By.CSS_SELECTOR, "input[placeholder='••••••••']")
    pass_input.clear()
    pass_input.send_keys(PASSWORD)
    time.sleep(1)

    btn = driver.find_element(By.CSS_SELECTOR, "button.login-btn")
    time.sleep(1)
    btn.click()

    print("   Esperando 10 segundos antes de ingresar...")
    time.sleep(10)


def navegar(driver, num, ruta, descripcion, pausa=PAUSA_MEDIA):
    print(f"[{num}/14] {descripcion}...")
    driver.get(f"{BASE_URL}{ruta}")
    time.sleep(pausa)


def main():
    print("=" * 60)
    print("  DEMOSTRACION DEL SISTEMA - FUNERARIA ARANZABAL")
    print("  Grabar pantalla con Windows + G antes de iniciar")
    print("=" * 60)
    print()
    input("Presiona ENTER para iniciar la demo... ")
    print()

    driver = crear_driver()

    try:
        login(driver)

        navegar(driver, 2, "/dashboard", "Dashboard principal")
        navegar(driver, 3, "/servicios", "Lista de servicios")
        navegar(driver, 4, "/ataudes", "Inventario de ataudes")
        navegar(driver, 5, "/capillas", "Inventario de capillas")
        navegar(driver, 6, "/vehiculos", "Inventario de vehiculos")
        navegar(driver, 7, "/contratantes", "Gestion de contratantes")
        navegar(driver, 8, "/fallecidos", "Gestion de fallecidos")

        print("[9/14] Modulo de extraccion con IA (solo muestra)...")
        driver.get(f"{BASE_URL}/ia")
        time.sleep(PAUSA_MEDIA)

        navegar(driver, 10, "/predicciones", "Modulo de predicciones")
        navegar(driver, 11, "/usuarios", "Gestion de usuarios")
        navegar(driver, 12, "/roles", "Gestion de roles y permisos")
        navegar(driver, 13, "/perfil", "Perfil de usuario")

        print("[14/14] Volviendo al dashboard...")
        driver.get(f"{BASE_URL}/dashboard")
        time.sleep(PAUSA_MEDIA)

        print()
        print("=" * 60)
        print("  DEMO COMPLETADA")
        print("  Detener grabacion con Windows + G")
        print("=" * 60)

    finally:
        time.sleep(3)
        driver.quit()


if __name__ == "__main__":
    main()
