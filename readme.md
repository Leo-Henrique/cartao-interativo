# Cartão interativo com validação em RegExp | Desafio do Frontend Mentor

Apesar de ser um desafio simples – em que as informações passadas em um formulário apenas é exibida na tela –, aproveitei que os campos consistia em simular a entrada de dados de um cartão comum para impor condições e validações mais amplas no formulário.

Todas as validações que realizei foram baseadas ou criadas com *expressões regulares*. Minha ideia era facilitar e economizar o máximo possível de tempo do usuário, impedindo que caracteres inválidos sejam digitados e formatando cada campo conforme o usuário digita, por exemplo. 

Os principais termos de **RegExp (expressões regulares)** que utilizei foram:

* Classes de caracteres
* Flags
* Quantificadores
* Grupos de captura e substituições
* Lookaround com lookbehind e lookahead

![Captura de tela do projeto](https://user-images.githubusercontent.com/72027449/205304175-4f512b1e-39b6-49cc-9770-c7bfb0fcef3e.png)

## 📋 Índice

* [Visão geral](#-visão-geral)
    * [Status](#-status)
    * [O desafio](#-o-desafio)
    * [Links](#-acesse-o-projeto)
* [Desenvolvimento](#%EF%B8%8F-desenvolvimento)
    * [Tecnologias utilizadas](#-tecnologias-utilizadas)
    * [Aperfeiçoamentos](#-aperfeiçoamentos)
        * [Lógica](#lógica)
        * [Renderização](#renderização)
        * [Formato e substituições](#formato-e-substituições)

## 🔎 Visão geral

### ✅ Status

Finalizado.

### 🏁 O desafio

Para a resolução deste desafio, os usuários devem ser capazes de:

* Visualizar exatamente o layout proposto de acordo com o tamanho da janela de exibição (responsividade)
* Visualizar os estados – pairar, clicar ou selecionar – nos elementos interativos para uma usabilidade adequada
* Preencher o formulário e ver a atualização dos dados do cartão em tempo real
* Receber mensagens de erro quando o formulário for enviado se:
   * Algum campo de entrada estiver vazio
   * Algum campo de entrada estiver no formato errado


### 🔗 Acesse o projeto

* [Link do projeto](https://leo-henrique.github.io/cartao-interativo/)
* [Desafio no Frontend mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw)

## ⚙️ Desenvolvimento

### 💻 Tecnologias utilizadas

* HTML
* CSS / SASS
* Vanilla JavaScript

### 💡 Aperfeiçoamentos

A proposta do desafio em relação a validação era realizar a mesma quando o usuário clicasse no botão que submetia o formulário.

Como meu principal objetivo com este projeto era usar expressões regulares, decidi então deixar o formulário com a validação mais rigorosa possível, ao mesmo tempo que esta validação não complicasse a cabeça do usuário.

#### Lógica

Havia um padrão de informações para cada dado ou campo, como cada um deles possuir um valor padrão, ter uma regex para rejeição, outra para formatação e entre outras informações. Dessa forma, criei um objeto representando cada campo do formulário:

```js
cardholder: {
    empty: "Leonardo Henrique",
    reject: /[^a-zÀ-öù-Ź\s]/gi,
    format: {
        character: " ",
        reject: /(?<!\w)\s/,
        accept: /(?<!\w)[a-z]/g,
        insert(...replaceArgs) {
            return replaceArgs[0].toUpperCase();
        }
    },
    finished: /[a-zÀ-öù-Ź]+ [a-zÀ-öù-Ź ]+/gi,
},
```

Com um objeto para cada dado criado, fiz um loop para cada um desses objetos, instanciando uma classe / função construtora para cada um deles. Essa classe continha como propriedade cada uma das chaves do meu objeto que representa o dado. Dessa forma, cada método da classe que fazia as validações era executado de acordo com a regex de cada campo, sem muitas complicações.


#### Renderização

Cada informação possui um valor padrão, ao qual é exibida no cartão quando os campos estão vazios. No entanto, enquanto é preenchido os campos que renderizam os números, o cartão ficava meio "sem vida", pois levava vários caracteres até finalizar a renderização (como no número do cartão, que possui muitos números).

Pensando nisso, eu fiz com que todos os campos de números renderizasse outros zeros na frente enquanto ele não estivesse totalmente preenchido e, ao mesmo tempo, renderizasse no formato correto com o uso de RegExp.

https://user-images.githubusercontent.com/72027449/205358367-6c9c87ff-8137-412d-856c-4f74ce212fbb.mp4

#### Formato e substituições

Como facilita a visualização exibir os números no devido formato, optei por formatar cada campo simultaneamente em quanto o usuário digitava, com o uso do `input event` do DOM. 

Digitar caracteres inválidos eram instantaneamente apagados; esquecer algum espaço essencial era automaticamente colocado; e entre outras formatações eram feitas com o uso de RegExp em conjunto com o método `replace()` de strings em JavaScript.

https://user-images.githubusercontent.com/72027449/205358425-301f4b61-6c90-4438-91fd-98361df11313.mp4
