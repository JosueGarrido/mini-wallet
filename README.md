
# 💳 Mini Wallet

Bienvenido al proyecto de simulación de una **Billetera Virtual**.

Este proyecto incluye:

- **Backend SOAP** (Laravel) para operaciones principales (registro, recarga, pago, confirmación, consulta saldo).
- **Microservicio REST** (Lumen) como puente entre el Frontend y el SOAP.
- **Frontend** (ReactJS + Ant Design) para interacción de usuarios de forma amigable.
- **Preparado para dockerización** de la base de datos.

---

## 🛠 Tecnologías utilizadas

- **PHP 8.2** con **Laravel 10** (Backend SOAP)
- **Lumen 10** (Microservicio REST)
- **React 18 + Vite** (Frontend Web)
- **Ant Design 5** (Framework de componentes visuales)
- **MySQL 8** (Base de datos, pendiente dockerización)
- **Docker / Docker Compose** (en preparación)

---

## ⚙️ Instalación y Ejecución local

### 📂 1. Clonar el repositorio

```bash
git clone https://github.com/JosueGarrido/mini-wallet.git
cd mini-wallet
```

---

### 🛠 2. Configuración del Backend SOAP (Laravel)

```bash
cd soap-wallet
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

- Servidor SOAP corriendo en: `http://127.0.0.1:8000/soap-server`

---

### 🛠 3. Configuración del Microservicio REST (Lumen)

```bash
cd ../rest-wallet
composer install
cp .env.example .env
php artisan migrate
php -S localhost:8001 -t public
```

- Microservicio REST corriendo en: `http://127.0.0.1:8001/api`

---

### 🛠 4. Configuración del Frontend (React)

```bash
cd ../frontend-wallet
npm install
npm run dev
```

- Frontend disponible en: `http://localhost:5173`

---

## ⚡ Estructura de Proyecto

```
/soap-wallet/         -> Backend SOAP (Laravel)
/rest-wallet/         -> Microservicio REST (Lumen)
/frontend-wallet/     -> Frontend ReactJS
/docker/              -> (Pendiente: archivos para dockerizar la base de datos)
```

---

## 📚 Endpoints REST disponibles

| Método | Endpoint | Descripción |
|:--|:--|:--|
| POST | `/api/registro` | Registrar nuevo cliente |
| POST | `/api/recargar` | Recargar saldo en billetera |
| POST | `/api/pagar` | Iniciar un pago con generación de token |
| POST | `/api/confirmar-pago` | Confirmar pago con token |
| GET  | `/api/consultar-saldo` | Consultar saldo disponible |

---

## 🐳 Notas sobre Dockerización

Actualmente, el proyecto está preparado para levantar:

- **SOAP** + **REST** + **MySQL** via Docker Compose.
- Se incluirá un `docker-compose.yml` para facilitar el montaje completo localmente (en preparación).

---

## 📬 Notas sobre el envío de Token

- El token de pago se genera aleatoriamente (6 dígitos).
- Actualmente se envía simuladamente a través de **logs** (`storage/logs/laravel.log`).
- Puede adaptarse fácilmente a SMTP real (Mailtrap, Gmail, etc.)

---

## 🎥 Video de Demostración

- Explicación en máximo 15 minutos (recomendado).
- Mostrar:
  - Flujo completo: Registro ➔ Recarga ➔ Pago ➔ Confirmación ➔ Consulta de Saldo.
  - Arquitectura: cómo interactúan SOAP, REST y Frontend.

---

## 📦 Requisitos para correr exitosamente

- PHP >= 8.1
- Composer
- Node.js >= 18
- NPM
- MySQL (puede ser dockerizado después)
- Navegador web compatible (recomendado Chrome)

---

## 🧠 Consideraciones Finales

- Se sigue una arquitectura limpia y desacoplada: **Frontend ➔ REST ➔ SOAP ➔ DB**.
- Todas las respuestas REST son estandarizadas en formato JSON.
- CORS habilitado correctamente para desarrollo local.
- Ant Design utilizado para mejorar la experiencia de usuario en el Frontend.

---

## 👨‍💻 Autor

**Tu nombre**  
**GitHub:** [@JosueGarrido](https://github.com/JosueGarrido)
