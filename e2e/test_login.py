import time
from conftest import BASE_URL, screenshot, login, wait_for_url


def test_login_exitoso(driver):
    """
    GIVEN: El navegador esta en la pagina de login
    WHEN:  El usuario ingresa credenciales validas y hace clic en Ingresar
    THEN:  Se redirige al dashboard
    """
    driver.get(f"{BASE_URL}/login")
    time.sleep(1)

    screenshot(driver, "01_login_page")

    user_input = driver.find_element("css selector", "input[placeholder='Nombre de usuario']")
    user_input.clear()
    user_input.send_keys("fabAdmin")

    pass_input = driver.find_element("css selector", "input[placeholder='••••••••']")
    pass_input.clear()
    pass_input.send_keys("265336aaaa")

    screenshot(driver, "02_login_credenciales")

    btn = driver.find_element("css selector", "button.login-btn")
    assert btn.is_enabled(), "El boton de login deberia estar habilitado"
    btn.click()

    time.sleep(3)

    assert wait_for_url(driver, "/dashboard"), f"No se redirigio al dashboard. URL actual: {driver.current_url}"

    sidebar = driver.find_element("css selector", "aside.sidebar")
    assert sidebar.is_displayed(), "El sidebar no se mostro"

    screenshot(driver, "03_dashboard_tras_login")
