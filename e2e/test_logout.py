import time
from conftest import BASE_URL, screenshot, login, wait_for_url


def test_logout(driver):
    """
    GIVEN: El usuario esta logueado
    WHEN:  Hace clic en Cerrar sesion
    THEN:  Se redirige a /login y localStorage esta vacio
    """
    login(driver)
    time.sleep(1)

    screenshot(driver, "18_antes_logout")

    logout_btn = driver.find_element("css selector", "button.sidebar__logout")
    assert logout_btn.is_displayed(), "El boton de logout no se mostro"
    logout_btn.click()

    time.sleep(2)

    assert wait_for_url(driver, "/login"), f"No se redirigio a /login. URL actual: {driver.current_url}"

    token = driver.execute_script("return localStorage.getItem('token');")
    assert token is None, f"El token deberia ser null, pero es: {token}"

    local_storage_len = driver.execute_script("return localStorage.length;")
    assert local_storage_len == 0, f"localStorage deberia estar vacio, pero tiene {local_storage_len} items"

    screenshot(driver, "19_tras_logout")
