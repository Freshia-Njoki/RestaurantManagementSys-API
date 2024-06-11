import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import { logger } from 'hono/logger'
import { csrf } from 'hono/csrf'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { timeout } from 'hono/timeout'
import { HTTPException } from 'hono/http-exception'
import { prometheus } from '@hono/prometheus'
import { html, raw } from 'hono/html'

import { userRouter } from './users/users.router'
import { stateRouter } from './state/state.router'
import { cityRouter } from './city/city.router'
import { restaurantRouter } from './restaurant/restaurant.router'
import { categoryRouter } from './category/category.router'
import { menuRouter } from './menu_item/menu_item.router'
import { addressRouter } from './address/address.router'
import { commentRouter } from './comment/comment.router'
import { ordersRouter } from './orders/orders.router'
import { driverRouter } from './driver/driver.router'
import { orderMenuItemRouter } from './order_menu_item/order_menu_item.router'
import { orderStatusRouter } from './orders-status/orders-status.router'
import { restuarantOwnerRouter } from './restaurant_owner/restaurant_owner.router'
import { statusCatalogRouter } from './status-catalog/status-catalog.router'
import { authRouter } from './auth/auth.router'


const app = new Hono().basePath('/api')

const customTimeoutException = () =>
  new HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
  })

const { printMetrics, registerMetrics } = prometheus()

// inbuilt middlewares
app.use(logger())  //logs request and response to the console
app.use(csrf()) //prevents CSRF attacks by checking request headers.
app.use(trimTrailingSlash()) //removes trailing slashes from the request URL
app.use('/', timeout(10000, customTimeoutException))
//3rd party middlewares
app.use('*', registerMetrics)


// default route
app.get('/', (c) => {
  return c.html(
    html`
      <h1>Welcome to Restaurant Management API!</h1>
      <li>Feel free to query my API😎</li>`
  )
})

app.get('/ok', (c) => {
  return c.text('The server is running📢😏😏😏!')
})
app.get('/timeout', async (c) => {
  await new Promise((resolve) => setTimeout(resolve, 11000))
  return c.text("data after 5 seconds", 200)
})
app.get('/metrics', printMetrics)

// custom route
app.route("/", userRouter)   // /users
app.route("/", stateRouter)
app.route("/", cityRouter)
app.route("/", restaurantRouter)
app.route("/", categoryRouter)
app.route("/", menuRouter)
app.route("/", addressRouter)
app.route("/", commentRouter)
app.route("/", ordersRouter)
app.route("/", driverRouter)
app.route("/", orderMenuItemRouter)
app.route("/", orderStatusRouter)
app.route("/", restuarantOwnerRouter)
app.route("/", statusCatalogRouter)
app.route("auth/", authRouter)   // api/auth/register   or api/auth/login



serve({
  fetch: app.fetch,
  port: Number(process.env.PORT)
})
console.log(`Server is running on port ${process.env.PORT}`)