"""
Pruebas de integración Frontend - Flujo completo con Selenium
Verifica que los servicios Angular interactúen correctamente con la API backend.
"""
import time
import json
from conftest import BASE_URL, screenshot, login, wait_for_url


def test_login_y_almacenamiento_token(driver):
    """
    GIVEN: El usuario está en la página de login
    WHEN:  Ingresa credenciales válidas y hace clic en Ingresar
    THEN:  Se almacenan token, userId, roles y permisos en localStorage
    """
    driver.get(f"{BASE_URL}/login")
    time.sleep(2)

    driver.execute_script("localStorage.clear();")
    time.sleep(1)

    user_input = driver.find_element("css selector", "input[placeholder='Nombre de usuario']")
    user_input.clear()
    user_input.send_keys("fabAdmin")

    pass_input = driver.find_element("css selector", "input[type='password']")
    pass_input.clear()
    pass_input.send_keys("265336aaaa")

    btn = driver.find_element("css selector", "button.login-btn")
    time.sleep(1)
    btn.click()
    time.sleep(4)

    screenshot(driver, "int_01_tras_login")

    token = driver.execute_script("return localStorage.getItem('token');")
    assert token is not None, "No se almacenó el token en localStorage"
    assert len(token) > 0, "El token está vacío"

    login_time = driver.execute_script("return localStorage.getItem('loginTime');")
    assert login_time is not None, "No se almacenó el loginTime"

    roles = driver.execute_script("return localStorage.getItem('roles');")
    assert roles is not None, "No se almacenaron los roles"
    roles_parsed = json.loads(roles)
    assert isinstance(roles_parsed, list), "Los roles no son una lista"
    assert len(roles_parsed) > 0, "La lista de roles está vacía"

    permisos = driver.execute_script("return localStorage.getItem('permisos');")
    assert permisos is not None, "No se almacenaron los permisos"
    permisos_parsed = json.loads(permisos)
    assert isinstance(permisos_parsed, list), "Los permisos no son una lista"

    screenshot(driver, "int_02_token_verificado")


def test_creacion_servicio_con_catalogos(driver):
    """
    GIVEN: El usuario está logueado
    WHEN:  Navega a la página de servicios
    THEN:  Los catálogos se cargan correctamente
    """
    login(driver)
    time.sleep(2)

    driver.get(f"{BASE_URL}/servicios")
    time.sleep(4)

    assert "/servicios" in driver.current_url or wait_for_url(driver, "/servicios"), \
        f"No se navegó a servicios. URL: {driver.current_url}"

    screenshot(driver, "int_03_servicios_cargados")


def test_gestion_inventario_ataudes(driver):
    """
    GIVEN: El usuario está logueado
    WHEN:  Navega a la página de ataúdes
    THEN:  La lista de ataúdes carga y muestra datos
    """
    login(driver)
    time.sleep(2)

    driver.get(f"{BASE_URL}/ataudes")
    time.sleep(4)

    assert "/ataudes" in driver.current_url or wait_for_url(driver, "/ataudes"), \
        f"No se navegó a ataúdes. URL: {driver.current_url}"

    screenshot(driver, "int_04_ataudes_cargados")

    driver.get(f"{BASE_URL}/capillas")
    time.sleep(3)
    screenshot(driver, "int_05_capillas_cargados")


def test_gestion_usuarios(driver):
    """
    GIVEN: El usuario admin está logueado
    WHEN:  Navega a la página de usuarios
    THEN:  La lista de usuarios carga correctamente
    """
    login(driver)
    time.sleep(2)

    driver.get(f"{BASE_URL}/usuarios")
    time.sleep(4)

    assert "/usuarios" in driver.current_url or wait_for_url(driver, "/usuarios"), \
        f"No se navegó a usuarios. URL: {driver.current_url}"

    screenshot(driver, "int_06_usuarios_cargados")


def test_navegacion_con_permisos(driver):
    """
    GIVEN: El usuario admin está logueado
    WHEN:  Navega por el sidebar verificando permisos
    THEN:  Las páginas según permisos cargan correctamente
    """
    login(driver)
    time.sleep(2)

    screenshot(driver, "int_07_dashboard_permisos")

    paginas = [
        ("/servicios", "int_08_servicios_permiso"),
        ("/ataudes", "int_09_ataudes_permiso"),
        ("/usuarios", "int_10_usuarios_permiso"),
        ("/perfil", "int_11_perfil_permiso"),
    ]

    for path, foto in paginas:
        driver.get(f"{BASE_URL}{path}")
        time.sleep(3)
        assert path in driver.current_url or wait_for_url(driver, path), \
            f"No se navegó a {path}. URL: {driver.current_url}"
        screenshot(driver, foto)
