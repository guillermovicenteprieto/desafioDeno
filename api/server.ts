import { Application } from "./deps.ts";
import { router } from "./src/routes/user.routes.ts";
import { routerProduct } from "./src/routes/product.routes.ts";
import { routerCart } from "./src/routes/cart.routes.ts";
const app = new Application();

app.use(router.routes());
app.use(routerProduct.routes());
app.use(routerCart.routes());


app.use((ctx) => {
    ctx.response.body = "Hello World";
})


app.listen({ port: 8000 });
console.log(`Server on http://localhost:8000/`);