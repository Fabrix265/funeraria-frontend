import os
import time
import pytest
from selenium import webdriver
from selenium.webdriver.edge.service import Service as EdgeService
from selenium.webdriver.edge.options import Options as EdgeOptions
from webdriver_manager.microsoft import EdgeChromiumDriverManager

BASE_URL = "http://localhost:4200"
SCREENSHOT_DIR = os.path.join(os.path.dirname(__file__), "screenshots")
USERNAME = "fabAdmin"
PASSWORD = "265336aaaa"


@pytest.fixture(scope="session")
def driver():
    options = EdgeOptions()
    options.add_argument("--start-maximized")
    options.add_argument("--disable-notifications")
    options.add_experimental_option("excludeSwitches", ["enable-logging"])

    service = EdgeService(EdgeChromiumDriverManager().install())
    drv = webdriver.Edge(service=service, options=options)
    drv.implicitly_wait(5)

    yield drv

    drv.quit()


@pytest.fixture(autouse=True)
def _test_screenshots_folder():
    os.makedirs(SCREENSHOT_DIR, exist_ok=True)


def screenshot(driver, name):
    path = os.path.join(SCREENSHOT_DIR, f"{name}.png")
    driver.save_screenshot(path)
    return path


def login(driver, username=USERNAME, password=PASSWORD):
    driver.get(f"{BASE_URL}/login")
    time.sleep(2)

    user_input = driver.find_element("css selector", "input[placeholder='Nombre de usuario']")
    user_input.clear()
    user_input.send_keys(username)
    time.sleep(1)

    pass_input = driver.find_element("css selector", "input[placeholder='••••••••']")
    pass_input.clear()
    pass_input.send_keys(password)
    time.sleep(1)

    btn = driver.find_element("css selector", "button.login-btn")
    time.sleep(1)
    btn.click()

    time.sleep(3)


def wait_for_url(driver, expected_path, timeout=10):
    for _ in range(timeout * 2):
        if expected_path in driver.current_url:
            return True
        time.sleep(0.5)
    return False
