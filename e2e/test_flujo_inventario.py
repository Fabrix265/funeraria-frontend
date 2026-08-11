"""
Flujo E2E 3: Gestion de Inventario
Flujo completo: Login -> Crear ataud -> Actualizar stock -> Crear capilla -> Actualizar stock
"""
import time
from conftest import BASE_URL, screenshot, login, wait_for_url


def test_flujo_inventario_ataudes(driver):
    """
    GIVEN: El usuario admin esta en la pagina de login
    WHEN:  Inicia sesion, navega a ataudes, crea un ataud nuevo,
           actualiza su stock positiva y negativamente
    THEN:  El ataud se crea, el stock se incrementa y decrementa correctamente
    """
    timestamp = int(time.time())
    modelo_ataud = f"Test E2E Ataud {timestamp}"

    # --- PASO 1: Login ---
    login(driver)
    time.sleep(4)
    screenshot(driver, "flujo_inventario_01_login")
    assert wait_for_url(driver, "/dashboard"), "No se pudo iniciar sesion"

    # --- PASO 2: Navegar a Ataudes ---
    driver.get(f"{BASE_URL}/ataudes")
    time.sleep(3)
    screenshot(driver, "flujo_inventario_02_lista_ataudes")
    assert "/ataudes" in driver.current_url, "No se navigo a ataudes"

    # --- PASO 3: Abrir modal de crear ataud ---
    btn_nuevo = driver.find_element("css selector", "button.btn.btn--primary")
    btn_nuevo.click()
    time.sleep(2)
    screenshot(driver, "flujo_inventario_03_modal_crear_ataud")

    # Verificar que el modal se abrio
    modal = driver.find_element("css selector", "div.modal-overlay")
    assert modal.is_displayed(), "El modal de crear ataud no se abrio"

    # --- PASO 4: Completar formulario del ataud ---
    # Stock inicial
    inputs = driver.find_elements("css selector", "div.modal__body input.field__input")
    if len(inputs) > 0:
        inputs[0].clear()
        inputs[0].send_keys("10")
        time.sleep(0.5)

    # Modelo
    input_modelo = driver.find_element("css selector", 'input[placeholder="Ej: Clásico Premium"]')
    input_modelo.clear()
    input_modelo.send_keys(modelo_ataud)
    time.sleep(0.5)

    # Color
    input_color = driver.find_element("css selector", 'input[placeholder="Ej: Negro"]')
    input_color.clear()
    input_color.send_keys("Blanco")
    time.sleep(0.5)

    screenshot(driver, "flujo_inventario_04_formulario_ataud_completado")

    # --- PASO 5: Guardar ataud ---
    btn_crear = driver.find_element("css selector", "div.modal__footer button.btn.btn--primary")
    btn_crear.click()
    time.sleep(3)
    screenshot(driver, "flujo_inventario_05_ataud_creado")

    # --- PASO 6: Verificar en lista ---
    driver.get(f"{BASE_URL}/ataudes")
    time.sleep(3)
    screenshot(driver, "flujo_inventario_06_lista_con_nuevo_ataud")

    page_source = driver.page_source
    assert modelo_ataud in page_source, \
        f"El ataud {modelo_ataud} no aparece en la lista"

    # --- PASO 7: Actualizar stock (+5) ---
    rows = driver.find_elements("css selector", "tr.tabla__fila")
    target_row = None
    for row in rows:
        if modelo_ataud in row.text:
            target_row = row
            break

    if target_row:
        btn_stock = target_row.find_element("css selector", "button.icon-btn.icon-btn--stock")
        btn_stock.click()
        time.sleep(2)
        screenshot(driver, "flujo_inventario_07_modal_stock")

        # Ingresar cantidad positiva
        input_cantidad = driver.find_element("css selector", 'input[placeholder="Ej: 5 o -2"]')
        input_cantidad.clear()
        input_cantidad.send_keys("5")
        time.sleep(0.5)

        screenshot(driver, "flujo_inventario_08_cantidad_positiva")

        btn_actualizar = driver.find_element(
            "css selector", "div.modal__footer button.btn.btn--primary"
        )
        btn_actualizar.click()
        time.sleep(3)
        screenshot(driver, "flujo_inventario_09_stock_incrementado")

    # --- PASO 8: Actualizar stock (-3) ---
    driver.get(f"{BASE_URL}/ataudes")
    time.sleep(3)

    rows = driver.find_elements("css selector", "tr.tabla__fila")
    for row in rows:
        if modelo_ataud in row.text:
            target_row = row
            break

    if target_row:
        btn_stock = target_row.find_element("css selector", "button.icon-btn.icon-btn--stock")
        btn_stock.click()
        time.sleep(2)

        input_cantidad = driver.find_element("css selector", 'input[placeholder="Ej: 5 o -2"]')
        input_cantidad.clear()
        input_cantidad.send_keys("-3")
        time.sleep(0.5)

        screenshot(driver, "flujo_inventario_10_cantidad_negativa")

        btn_actualizar = driver.find_element(
            "css selector", "div.modal__footer button.btn.btn--primary"
        )
        btn_actualizar.click()
        time.sleep(3)
        screenshot(driver, "flujo_inventario_11_stock_decrementado")


def test_flujo_inventario_capillas(driver):
    """
    GIVEN: El usuario admin esta en la pagina de login
    WHEN:  Inicia sesion, navega a capillas, crea una capilla nueva,
           actualiza su stock positiva y negativamente
    THEN:  La capilla se crea, el stock se incrementa y decrementa correctamente
    """
    timestamp = int(time.time())
    modelo_capilla = f"Test E2E Capilla {timestamp}"

    # --- PASO 1: Login ---
    login(driver)
    time.sleep(4)
    screenshot(driver, "flujo_capillas_01_login")
    assert wait_for_url(driver, "/dashboard"), "No se pudo iniciar sesion"

    # --- PASO 2: Navegar a Capillas ---
    driver.get(f"{BASE_URL}/capillas")
    time.sleep(3)
    screenshot(driver, "flujo_capillas_02_lista_capillas")
    assert "/capillas" in driver.current_url, "No se navigo a capillas"

    # --- PASO 3: Abrir modal de crear capilla ---
    btn_nueva = driver.find_element("css selector", "button.btn.btn--primary")
    btn_nueva.click()
    time.sleep(2)
    screenshot(driver, "flujo_capillas_03_modal_crear_capilla")

    modal = driver.find_element("css selector", "div.modal-overlay")
    assert modal.is_displayed(), "El modal de crear capilla no se abrio"

    # --- PASO 4: Completar formulario ---
    input_modelo = driver.find_element("css selector", 'input[placeholder="Ej: Capilla Classic A"]')
    input_modelo.clear()
    input_modelo.send_keys(modelo_capilla)
    time.sleep(0.5)

    # Stock inicial
    inputs = driver.find_elements("css selector", "div.modal__body input.field__input")
    if len(inputs) > 1:
        inputs[1].clear()
        inputs[1].send_keys("8")
        time.sleep(0.5)

    screenshot(driver, "flujo_capillas_04_formulario_completado")

    # --- PASO 5: Guardar capilla ---
    btn_crear = driver.find_element("css selector", "div.modal__footer button.btn.btn--primary")
    btn_crear.click()
    time.sleep(3)
    screenshot(driver, "flujo_capillas_05_capilla_creada")

    # --- PASO 6: Verificar en lista ---
    driver.get(f"{BASE_URL}/capillas")
    time.sleep(3)
    screenshot(driver, "flujo_capillas_06_lista_con_nueva_capilla")

    page_source = driver.page_source
    assert modelo_capilla in page_source, \
        f"La capilla {modelo_capilla} no aparece en la lista"

    # --- PASO 7: Actualizar stock (+4) ---
    rows = driver.find_elements("css selector", "tr.tabla__fila")
    target_row = None
    for row in rows:
        if modelo_capilla in row.text:
            target_row = row
            break

    if target_row:
        btn_stock = target_row.find_element("css selector", "button.icon-btn.icon-btn--stock")
        btn_stock.click()
        time.sleep(2)
        screenshot(driver, "flujo_capillas_07_modal_stock")

        input_cantidad = driver.find_element("css selector", 'input[placeholder="Ej: 3 o -1"]')
        input_cantidad.clear()
        input_cantidad.send_keys("4")
        time.sleep(0.5)

        screenshot(driver, "flujo_capillas_08_cantidad_positiva")

        btn_actualizar = driver.find_element(
            "css selector", "div.modal__footer button.btn.btn--primary"
        )
        btn_actualizar.click()
        time.sleep(3)
        screenshot(driver, "flujo_capillas_09_stock_incrementado")

    # --- PASO 8: Actualizar stock (-2) ---
    driver.get(f"{BASE_URL}/capillas")
    time.sleep(3)

    rows = driver.find_elements("css selector", "tr.tabla__fila")
    for row in rows:
        if modelo_capilla in row.text:
            target_row = row
            break

    if target_row:
        btn_stock = target_row.find_element("css selector", "button.icon-btn.icon-btn--stock")
        btn_stock.click()
        time.sleep(2)

        input_cantidad = driver.find_element("css selector", 'input[placeholder="Ej: 3 o -1"]')
        input_cantidad.clear()
        input_cantidad.send_keys("-2")
        time.sleep(0.5)

        screenshot(driver, "flujo_capillas_10_cantidad_negativa")

        btn_actualizar = driver.find_element(
            "css selector", "div.modal__footer button.btn.btn--primary"
        )
        btn_actualizar.click()
        time.sleep(3)
        screenshot(driver, "flujo_capillas_11_stock_decrementado")

    screenshot(driver, "flujo_capillas_12_fin_flujo")
