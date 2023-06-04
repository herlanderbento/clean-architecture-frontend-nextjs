# The Clean Architecture: Typescript & Next.js

```html
<img
  src="http://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg"
/>
```

```text
└── @core
    ├── aplication
    │   ├── cart
    │   │   ├── add-product-in-cart.use-case.ts
    │   │   ├── clear-cart.use-case.ts
    │   │   ├── get-cart.use-case.ts
    │   │   └── remove-product-from-cart.use-case.ts
    │   ├── order
    │   │   ├── get-order.use-case.ts
    │   │   └── process-order.use-case.ts
    │   ├── product
    │   │   ├── get-product.use-case.ts
    │   │   └── list-products.use-case.ts
    ├── domain
    │   ├── entities
    │   │   │
    │   │   ├── cart.ts
    │   │   ├── order.ts
    │   │   └── product.ts
    │   │
    │   └── gateways
       
```
