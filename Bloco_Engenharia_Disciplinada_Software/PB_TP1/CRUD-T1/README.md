# CRUD-T1 - TP3

Projeto de exemplo CRUD utilizando Spring Boot, com foco em testes unitários e de integração, e geração de relatório de cobertura de testes com Jacoco.
Foi utilizado o CRUD feito no TP1 de projeto de bloco (com banco de dados em memória H2), adicionado uma interface web estática utilizando Thymeleaf para facilitar os testes com selenium.

## Pré-requisitos

*   Java 17 ou superior
*   Maven 3.6 ou superior

## Como rodar a aplicação

Para iniciar a aplicação, execute o seguinte comando na raiz do projeto:

```bash
mvn spring-boot:run
```

A aplicação estará disponível em `http://localhost:8080`.

## Como rodar os testes

Para executar os testes unitários e de integração, utilize o comando:

```bash
mvn test
```

## Relatório de Cobertura de Testes

Após a execução dos testes, o relatório de cobertura de testes gerado pelo Jacoco estará disponível em:

`target/site/jacoco/index.html`

## Evidências dos Testes com Selenium

As capturas de tela dos testes com Selenium são salvas no decorrer dos testes no diretório:

`src/test/java/org/example/banco/selenium/screenshots/`
