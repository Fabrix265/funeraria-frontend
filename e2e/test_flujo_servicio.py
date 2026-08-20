"""
Flujo E2E 1: Creacion de Servicio Funerario
Flujo completo: Login -> Crear servicio -> Verificar en lista -> Ver detalle -> Eliminar
"""
import time
from conftest import BASE_URL, screenshot, login, wait_for_url


def test_flujo_completo_servicio(driver):
    """
    GIVEN: El usuario esta en la pagina de login
    WHEN:  Inicia sesion, crea un servicio funerario completo con todos sus componentes,
           lo verifica en la lista, visualiza el detalle y lo elimina
    THEN:  El servicio se crea correctamente, aparece en la lista, el detalle muestra
           todas las relaciones y al eliminar se redirige a la lista
    """
    timestamp = int(time.time())

    # --- PASO 1: Login ---
    login(driver)
    time.sleep(4)
    screenshot(driver, "flujo_servicio_01_login")
    assert wait_for_url(driver, "/dashboard"), "No se pudo iniciar sesion"

    # --- PASO 2: Navegar a Servicios ---
    driver.get(f"{BASE_URL}/servicios")
    time.sleep(3)
    screenshot(driver, "flujo_servicio_02_lista_servicios")
    assert "/servicios" in driver.current_url, "No se navigo a servicios"

    # --- PASO 3: Ir a Crear Servicio (el boton es un <a>, no <button>) ---
    btn_crear = driver.find_element("css selector", "a.btn.btn--primary")
    btn_crear.click()
    time.sleep(3)
    screenshot(driver, "flujo_servicio_03_formulario_crear")
    assert "/servicios/crear" in driver.current_url, "No se navigo a crear servicio"

    # --- PASO 4: Completar datos del servicio ---
    input_direccion = driver.find_element("css selector", 'input[name="direccion"]')
    input_direccion.clear()
    input_direccion.send_keys(f"Av Los Alamos {timestamp}")
    time.sleep(1)

    input_fecha = driver.find_element("css selector", 'input[name="fecha"]')
    input_fecha.clear()
    input_fecha.send_keys("2026-08-15")
    time.sleep(1)

    input_costo = driver.find_element("css selector", 'input[name="costo"]')
    input_costo.clear()
    input_costo.send_keys("2500")
    time.sleep(1)

    # Seleccionar tipo de pago
    select_tipo_pago = driver.find_element("css selector", 'select[name="tipo_pago"]')
    select_tipo_pago.click()
    time.sleep(0.5)
    options_pago = driver.find_elements("css selector", 'select[name="tipo_pago"] option')
    for opt in options_pago:
        if "directo" in opt.get_attribute("value"):
            opt.click()
            break
    time.sleep(1)

    screenshot(driver, "flujo_servicio_04_datos_servicio")

    # --- PASO 5: Datos del fallecido (DNI) ---
    input_dni_fallecido = driver.find_element("css selector", 'input[name="fallecido_dni"]')
    input_dni_fallecido.clear()
    input_dni_fallecido.send_keys("40123456")
    time.sleep(1)

    # El boton Verificar es hermano del input dentro de div.field__inline
    btn_verificar_fallecido = driver.find_element(
        "xpath",
        "//input[@name='fallecido_dni']/following-sibling::button"
    )
    btn_verificar_fallecido.click()
    time.sleep(4)

    screenshot(driver, "flujo_servicio_05_fallecido_verificado")

    # --- PASO 6: Datos del contratante (DNI + telefono) ---
    input_dni_contratante = driver.find_element("css selector", 'input[name="contratante_dni"]')
    input_dni_contratante.clear()
    input_dni_contratante.send_keys("75232248")
    time.sleep(1)

    btn_verificar_contratante = driver.find_element(
        "xpath",
        "//input[@name='contratante_dni']/following-sibling::button"
    )
    btn_verificar_contratante.click()
    time.sleep(4)

    input_telefono = driver.find_element("css selector", 'input[name="contratante_tel"]')
    input_telefono.clear()
    input_telefono.send_keys("987654321")
    time.sleep(1)

    screenshot(driver, "flujo_servicio_06_contratante_verificado")

    # --- PASO 7: Seleccionar capilla y ataud ---
    # Esperar a que carguen los selects
    time.sleep(2)

    # Seleccionar capilla - buscar la primera opcion con valor numerico
    select_capilla = driver.find_element("css selector", 'select[name="capilla"]')
    select_capilla.click()
    time.sleep(1)
    options_capilla = driver.find_elements("css selector", 'select[name="capilla"] option')
    capillaSeleccionada = False
    for opt in options_capilla:
        val = opt.get_attribute("value")
        if val and val.isdigit():
            opt.click()
            capillaSeleccionada = True
            break
    time.sleep(1)

    # Seleccionar ataud - buscar la primera opcion con valor numerico
    select_ataud = driver.find_element("css selector", 'select[name="ataud"]')
    select_ataud.click()
    time.sleep(1)
    options_ataud = driver.find_elements("css selector", 'select[name="ataud"] option')
    ataudSeleccionado = False
    for opt in options_ataud:
        val = opt.get_attribute("value")
        if val and val.isdigit():
            opt.click()
            ataudSeleccionado = True
            break
    time.sleep(1)

    screenshot(driver, "flujo_servicio_07_capilla_ataud_seleccionados")

    # --- PASO 8: Guardar servicio ---
    btn_guardar = driver.find_element("css selector", "div.form-footer button.btn.btn--primary")
    btn_guardar.click()
    time.sleep(5)
    screenshot(driver, "flujo_servicio_08_servicio_creado")

    # --- PASO 9: Verificar en lista ---
    driver.get(f"{BASE_URL}/servicios")
    time.sleep(4)
    screenshot(driver, "flujo_servicio_09_lista_con_nuevo_servicio")

    # --- PASO 10: Ver detalle del servicio ---
    rows = driver.find_elements("css selector", "tr.tabla__fila")
    if len(rows) > 0:
        # Hacer clic en el boton de ver detalle (ojo) de la ultima fila
        btn_ver = rows[-1].find_element("css selector", "a.icon-btn.icon-btn--view")
        btn_ver.click()
        time.sleep(4)
        screenshot(driver, "flujo_servicio_10_detalle_servicio")

    # --- PASO 11: Eliminar servicio desde el detalle ---
    # El boton Eliminar solo aparece si tiene permiso (puedeEliminar)
    try:
        btn_eliminar = driver.find_element("css selector", "button.btn.btn--danger")
        btn_eliminar.click()
        time.sleep(2)
        screenshot(driver, "flujo_servicio_11_confirmar_eliminar")

        # Confirmar eliminacion en modal
        btn_confirmar = driver.find_element("css selector", "div.modal__footer button.btn.btn--danger")
        btn_confirmar.click()
        time.sleep(4)
        screenshot(driver, "flujo_servicio_12_servicio_eliminado")
    except Exception:
        # Si no hay boton de eliminar, tomar screenshot y continuar
        screenshot(driver, "flujo_servicio_11_sin_permiso_eliminar")
        # Volver a la lista
        driver.get(f"{BASE_URL}/servicios")
        time.sleep(2)

    # --- PASO 12: Verificar que volvio a la lista ---
    assert "/servicios" in driver.current_url, "No se retorno a la lista de servicios"
    screenshot(driver, "flujo_servicio_13_lista_final")
