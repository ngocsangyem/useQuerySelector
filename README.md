<h1 align="center">Welcome to Vue Query Selector 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/ngocsangyem/useQuerySelector#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/ngocsangyem/useQuerySelector/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/ngocsangyem/useQuerySelector/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/ngocsangyem/Vue Query Selector" />
  </a>
  <a href="https://twitter.com/ngocsangyem" target="_blank">
    <img alt="Twitter: ngocsangyem" src="https://img.shields.io/twitter/follow/ngocsangyem.svg?style=social" />
  </a>
</p>

> Based on [#1985](https://github.com/vueuse/vueuse/issues/1985) and [gist](https://gist.github.com/loilo/1261d239278b22f10e9d3dad66b77602), the `useQuerySelector` composable is designed to help you select and observe a DOM element based on a CSS selector. It provides reactive tracking of the first element that matches the selector within a specified root element and updates the selection if the DOM changes.

### 🏠 [Homepage](https://github.com/ngocsangyem/useQuerySelector#readme)

## Why?

In Vue 3, there are situations where we need to select an element from the HTML document, but the element might not exist yet or could change over time. To handle this, we can use Vue's reactive system to dynamically track and select the element whenever it appears or changes. Additionally, there are cases where we need to select an element that is outside the current component's scope.

## Usage

```typescript
import { useQuerySelector } from 'vue-query';

const { element } = useQuerySelector('#demo');
```

## Install

```sh
pnpm install
```

## Run tests

```sh
pnpm test
```

## Todo
- Unit test

## Author

👤 **ngocsangyem**

* Website: https://www.ngocsangyem.dev/
* Twitter: [@ngocsangyem](https://twitter.com/ngocsangyem)
* Github: [@ngocsangyem](https://github.com/ngocsangyem)
* LinkedIn: [@ngocsangyem](https://linkedin.com/in/ngocsangyem)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/ngocsangyem/useQuerySelector/issues). You can also take a look at the [contributing guide](https://github.com/ngocsangyem/useQuerySelector/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/ngocsangyem">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## 📝 License

Copyright © 2024 [ngocsangyem](https://github.com/ngocsangyem).<br />
This project is [MIT](https://github.com/ngocsangyem/useQuerySelector/blob/main/LICENSE) licensed.