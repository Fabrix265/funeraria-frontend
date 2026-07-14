import time
from conftest import BASE_URL, screenshot, wait_for_url


def test_proteccion_rutas_sin_token(driver):
    """
    GIVEN: El usuario NO esta autenticado (sin token en localStorage)
    WHEN:  Navega directamente a /dashboard
    THEN:  Se redirige a /login
    """
    driver.get(f"{BASE_URL}/login")
    time.sleep(1)

    driver.execute_script("localStorage.clear();")
    time.sleep(0.5)

    driver.get(f"{BASE_URL}/dashboard")
    time.sleep(2)

    assert wait_for_url(driver, "/login"), f"No se redirigio a /login. URL actual: {driver.current_url}"

    user_input = driver.find_element("css selector", "input[placeholder='Nombre de usuario']")
    assert user_input.is_displayed(), "El formulario de login no se mostro"

    screenshot(driver, "04_proteccion_rutas")
