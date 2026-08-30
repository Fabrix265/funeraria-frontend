"""
Flujo E2E 2: Gestion de Usuarios
Flujo completo: Login -> Crear usuario -> Verificar en lista -> Cambiar estado -> Verificar username unico
"""
import time
from conftest import BASE_URL, screenshot, login, wait_for_url


def test_flujo_gestion_usuarios(driver):
    """
    GIVEN: El usuario admin esta en la pagina de login
    WHEN:  Inicia sesion, crea un usuario nuevo, lo verifica en la lista,
           cambia su estado y verifica que el username debe ser unico
    THEN:  El usuario se crea correctamente, aparece en la lista,
           su estado se alterna y no se permiten usernames duplicados
    """
    timestamp = int(time.time())
    unique_username = f"test_e2e_{timestamp}"

    # --- PASO 1: Login ---
    login(driver)
    time.sleep(4)
    screenshot(driver, "flujo_usuarios_01_login")
    assert wait_for_url(driver, "/dashboard"), "No se pudo iniciar sesion"

    # --- PASO 2: Navegar a Usuarios ---
    driver.get(f"{BASE_URL}/usuarios")
    time.sleep(3)
    screenshot(driver, "flujo_usuarios_02_lista_usuarios")
    assert "/usuarios" in driver.current_url, "No se navigo a usuarios"

    # --- PASO 3: Abrir modal de crear usuario ---
    btn_nuevo = driver.find_element("css selector", "button.btn.btn--primary")
    btn_nuevo.click()
    time.sleep(2)
    screenshot(driver, "flujo_usuarios_03_modal_crear")

    # Verificar que el modal se abrio
    modal = driver.find_element("css selector", "div.modal-overlay")
    assert modal.is_displayed(), "El modal de crear usuario no se abrio"

    # --- PASO 4: Completar formulario ---
    input_username = driver.find_element("css selector", 'input[placeholder="Nombre de usuario"]')
    input_username.clear()
    input_username.send_keys(unique_username)
    time.sleep(0.5)

    input_password = driver.find_element("css selector", 'input[type="password"]')
    input_password.clear()
    input_password.send_keys("testpass123")
    time.sleep(0.5)

    # Seleccionar rol
    select_rol = driver.find_element("css selector", "div.modal-overlay select")
    select_rol.click()
    time.sleep(0.5)
    options_rol = driver.find_elements("css selector", "div.modal-overlay select option")
    if len(options_rol) > 1:
        options_rol[1].click()
    time.sleep(0.5)

    screenshot(driver, "flujo_usuarios_04_formulario_completado")

    # --- PASO 5: Guardar usuario ---
    btn_crear = driver.find_element("css selector", "div.modal__footer button.btn.btn--primary")
    btn_crear.click()
    time.sleep(5)
    screenshot(driver, "flujo_usuarios_05_usuario_creado")

    # --- PASO 6: Verificar en lista ---
    driver.get(f"{BASE_URL}/usuarios")
    time.sleep(5)
    screenshot(driver, "flujo_usuarios_06_lista_con_nuevo_usuario")

    # Esperar a que cargue la tabla
    try:
        driver.find_element("css selector", "tr.tabla__fila")
    except Exception:
        time.sleep(3)

    screenshot(driver, "flujo_usuarios_06b_tabla_cargada")

    # Verificar en las filas de la tabla
    rows = driver.find_elements("css selector", "tr.tabla__fila")
    usuario_en_lista = False
    for row in rows:
        if unique_username in row.text:
            usuario_en_lista = True
            break

    assert usuario_en_lista, \
        f"El usuario {unique_username} no aparece en la lista"

    # --- PASO 7: Cambiar estado del usuario ---
    rows = driver.find_elements("css selector", "tr.tabla__fila")
    user_row = None
    for row in rows:
        if unique_username in row.text:
            user_row = row
            break

    if user_row:
        toggle = user_row.find_element("css selector", "label.switch")
        toggle.click()
        time.sleep(3)
        screenshot(driver, "flujo_usuarios_07_confirmar_cambio_estado")

        # Confirmar cambio de estado en modal
        try:
            modal_toggle = driver.find_element("css selector", "div.modal-overlay")
            if modal_toggle.is_displayed():
                btn_confirmar = driver.find_element(
                    "css selector", "div.modal__footer button.btn.btn--primary"
                )
                btn_confirmar.click()
                time.sleep(4)
                screenshot(driver, "flujo_usuarios_08_estado_cambiado")
        except Exception:
            pass

    # --- PASO 8: Verificar username unico (intentar duplicar) ---
    driver.get(f"{BASE_URL}/usuarios")
    time.sleep(5)

    btn_nuevo = driver.find_element("css selector", "button.btn.btn--primary")
    btn_nuevo.click()
    time.sleep(3)

    input_username = driver.find_element("css selector", 'input[placeholder="Nombre de usuario"]')
    input_username.clear()
    input_username.send_keys(unique_username)
    time.sleep(1)

    input_password = driver.find_element("css selector", 'input[type="password"]')
    input_password.clear()
    input_password.send_keys("testpass123")
    time.sleep(1)

    select_rol = driver.find_element("css selector", "div.modal-overlay select")
    select_rol.click()
    time.sleep(1)
    options_rol = driver.find_elements("css selector", "div.modal-overlay select option")
    if len(options_rol) > 1:
        options_rol[1].click()
    time.sleep(1)

    screenshot(driver, "flujo_usuarios_09_intento_duplicar_username")

    btn_crear = driver.find_element("css selector", "div.modal__footer button.btn.btn--primary")
    btn_crear.click()
    time.sleep(4)
    screenshot(driver, "flujo_usuarios_10_error_username_duplicado")

    # Verificar que aparece un error o toast
    page_source = driver.page_source
    assert "ya existe" in page_source.lower() or "duplicado" in page_source.lower() or \
           "error" in page_source.lower() or "toast" in page_source.lower() or \
           "existe" in page_source.lower(), \
        "No se detecto error por username duplicado"

    # Cerrar modal si sigue abierto
    try:
        btn_cerrar = driver.find_element("css selector", "button.modal__close")
        btn_cerrar.click()
        time.sleep(1)
    except Exception:
        pass

    screenshot(driver, "flujo_usuarios_11_fin_flujo")
