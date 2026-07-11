import time
from conftest import BASE_URL, screenshot, login, wait_for_url

PAGINAS = [
    ("/dashboard", "Dashboard", "05_nav_dashboard"),
    ("/servicios", "Servicios", "06_nav_servicios"),
    ("/ataudes", "Ataúdes", "07_nav_ataudes"),
    ("/capillas", "Capillas", "08_nav_capillas"),
    ("/vehiculos", "Vehículos", "09_nav_vehiculos"),
    ("/contratantes", "Contratantes", "10_nav_contratantes"),
    ("/fallecidos", "Fallecidos", "11_nav_fallecidos"),
    ("/usuarios", "Usuarios", "12_nav_usuarios"),
    ("/perfil", "Perfil", "13_nav_perfil"),
]


def test_navegacion_sidebar(driver):
    """
    GIVEN: El usuario esta logueado en el dashboard
    WHEN:  Navega a cada pagina del sidebar
    THEN:  Cada pagina carga correctamente
    """
    login(driver)
    time.sleep(1)

    for path, nombre, foto in PAGINAS:
        driver.get(f"{BASE_URL}{path}")
        time.sleep(2)

        assert path in driver.current_url or wait_for_url(driver, path), \
            f"No se cargo la pagina {nombre}. URL actual: {driver.current_url}"

        screenshot(driver, foto)
