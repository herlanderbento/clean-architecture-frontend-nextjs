# The Clean Architecture: Typescript & Next.js

<br>

<div style="width: 100%; display: flex; flex-direction: column; align-content: center">
  <img
  style="width: 400px; height:300px;"
  src="http://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg"
/>
<div>


<br>
<br>

## The Clean Architecture:
<br>
The Clean Architecture, originally presented in a 2012 paper written by Bob Martin, proposes a division of the application into layers, where each layer has a specific responsibility. The diagram represents this division into layers, with the dependencies directed towards the centre of the application.

<br>
<br>

- Entities: At the centre of the diagram are the Entities, which represent the business logic of the application. These entities are independent of any platform or implementation details, such as frameworks or libraries. For example, an entity "cart" can have functionalities like adding products, removing products, etc. This entity has no knowledge of any platform-specific details such as the use of React, Angular ou databases.

- Use Cases: The Use Cases layer (also called Interactors) is located right after the Entities. Use Cases describe how to interact with Entities within the context of the application. For example, a Use Case might receive a request from the cart and send it to a repository or API.

-  Gateways/Repositories: The Gateways (aka Repositories) and Presentation (aka View Models) layers handle communication between the application's business rules and the platform-dependent parts. Gateways provide interfaces to access APIs or databases, while View Models are used to connect user interface components (such as React components) to business logic calls.
<br>
<br>

<!-- ```text
├── @core
├── components
├── context
├── pages
├── styles
└── utils

``` -->

### The folder/group structure of the project takes on the following form:
<br>

```text
    src
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
        │   │   ├── cart.ts
        │   │   ├── order.ts
        │   │   └── product.ts
        │   └── gateways
        │   │   ├── cart.gateway.ts
        │   │   ├── order.gateway.ts
        │   │   └── product.gateway.ts
        ├── infra
        │   ├── gateways
        │   │   ├── cart-local-storage.gateway.ts
        │   │   ├── order-http.gateway.ts
        │   │   └── products-http.gateway.ts
        │   ├── container-registry.ts
        │   └── http.ts
        components
        │   └── my-cart.tsx
        context
        │   └── cart.provider.tsx
        pages
        │   ├── checkout
        │   │   ├── [id]
        │   │   │    └── success.tsx
        │   │   └── index.tsx
        │   ├── products
        │   │   └── [id].tsx
        │   ├── _app.tsx
        │   ├── _document.tsx
        │   ├── index.tsx
        styles
        │   ├── globals.css
        │   └── Home.module.css
        utils
        │   ├── http.ts
        │   └── models.ts


```
<br>

### # Loading descriptions...
