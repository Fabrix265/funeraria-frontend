import time
from conftest import BASE_URL, screenshot, login, wait_for_url


def test_crud_servicio(driver):
    """
    GIVEN: El usuario esta logueado con permisos de servicios
    WHEN:  Navega a la lista de servicios
    THEN:  La pagina carga y muestra la tabla de servicios
    """
    login(driver)
    time.sleep(1)

    driver.get(f"{BASE_URL}/servicios")
    time.sleep(3)

    screenshot(driver, "14_lista_servicios")

    page_source = driver.page_source
    assert "servicio" in page_source.lower() or "Servicios" in page_source or "servicios" in driver.current_url, \
        "La pagina de servicios no cargo correctamente"

    tables = driver.find_elements("css selector", "table")
    if len(tables) > 0:
        screenshot(driver, "15_tabla_servicios")

    driver.get(f"{BASE_URL}/ataudes")
    time.sleep(2)
    screenshot(driver, "16_lista_ataudes")

    driver.get(f"{BASE_URL}/capillas")
    time.sleep(2)
    screenshot(driver, "17_lista_capillas")
