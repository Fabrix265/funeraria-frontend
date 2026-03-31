import os

# Ruta de tu proyecto Angular
PROYECTO = r"C:\Users\HP\Desktop\proyecto_fab\Angular\FunerariaAranzabal_Front\funeraria-frontend"

# Archivo final
SALIDA = "angular_proyecto_completo.txt"

# Extensiones a buscar
EXTENSIONES = (".ts", ".html", ".css")

# Carpetas a ignorar
IGNORAR = {"node_modules", "dist", ".git", ".angular", "__pycache__"}

with open(SALIDA, "w", encoding="utf-8") as salida:

    for root, dirs, files in os.walk(PROYECTO):

        # eliminar carpetas ignoradas
        dirs[:] = [d for d in dirs if d not in IGNORAR]

        for file in files:
            if file.endswith(EXTENSIONES):

                ruta = os.path.join(root, file)

                try:
                    with open(ruta, "r", encoding="utf-8") as f:
                        contenido = f.read()

                    salida.write("\n")
                    salida.write("="*80 + "\n")
                    salida.write(f"ARCHIVO: {ruta}\n")
                    salida.write("="*80 + "\n\n")
                    salida.write(contenido)
                    salida.write("\n\n")

                except Exception as e:
                    print(f"No se pudo leer {ruta}: {e}")

print("✅ Archivo generado:", SALIDA)