# Angular Micro Frontends Workspace

Este workspace contém múltiplos projetos Angular organizados como micro-frontends, todos gerados com o [Angular CLI](https://github.com/angular/angular-cli) versão 19.1.8.

Projetos incluídos:

- **Welcome**
- **ShellContainer**
- **Produto**
- **Home**
- **Cliente**

Cada projeto funciona de forma independente e precisa ser instalado e executado separadamente.

---

## 🚀 Como iniciar cada Micro Frontend

Para rodar qualquer um dos micro-frontends, siga os passos abaixo dentro da **pasta do projeto correspondente**:

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:

   ```bash
   ng serve
   ```

3. Acesse no navegador:

   ```
   http://localhost:4200/
   ```

> ⚠️ Se estiver usando portas diferentes entre os projetos, verifique a configuração em `angular.json` ou use o parâmetro `--port`.

---

## ⚙️ Gerar Código com o Angular CLI

Você pode usar o Angular CLI para gerar componentes, serviços, diretivas, pipes e mais:

```bash
ng generate component component-name
```

Para ver todas as opções de geração disponíveis:

```bash
ng generate --help
```

---

## 🏗️ Build do Projeto

Para compilar qualquer projeto para produção:

```bash
ng build
```

Os arquivos resultantes serão colocados na pasta `dist/`, com otimizações aplicadas para desempenho.

---

## ✅ Rodar Testes Unitários

Execute os testes unitários com o [Karma](https://karma-runner.github.io):

```bash
ng test
```

---

## 🧪 Testes End-to-End (E2E)

O Angular CLI não inclui testes E2E por padrão. Você pode configurar manualmente com ferramentas como:

- [Cypress](https://www.cypress.io/)
- [Playwright](https://playwright.dev/)

---

## 📚 Recursos Adicionais

Para mais informações sobre o Angular CLI, acesse:

👉 [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)

---
