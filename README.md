# CNPJ MANAGER
Gerador, validador e gerenciador de CNPJ's para JavaScript e TypeScript.

## Instalação

```shell
$ npm install cnpj-manager
```

## Gere um CNPJ Válido

```js
const cnpj = require('cnpj-manager');
const cnpj = Cnpj.generate();
console.log(cnpj); // 56.616.297/0001-79
```

## Valide um CNPJ

```js
const Cnpj = require('cnpj-manager');

const cnpjValido = Cnpj.validate('56.616.297/0001-79');
console.log(cnpjValido); // true

const cnpjInvalido = Cnpj.validate('22.222.222/2222-22');
console.log(cnpjInvalido); // false
```

## Formate um CNPJ

```js
const Cnpj = require('cnpj-manager');

const cnpjFormatado = Cnpj.format('56616297000179');
console.log(cnpjFormatado); // 56.616.297/0001-79
```

## Valide o formato de um CNPJ

```js
const Cnpj = require('cnpj-manager');

const formatoValido = Cnpj.validateFormat('22.222.222/2222-22');
console.log(formatoValido); //true

const formatoInvalido = Cnpj.validateFormat('22/222/222/2222/22');
console.log(formatoInvalido); // false
```

## Limpe um CNPJ

```js
const Cnpj = require('cnpj-manager');

const cnpjLimpo = Cnpj.cleanUp('56.616.297/0001-79');
console.log(cnpjLimpo); // 56616297000179
```
