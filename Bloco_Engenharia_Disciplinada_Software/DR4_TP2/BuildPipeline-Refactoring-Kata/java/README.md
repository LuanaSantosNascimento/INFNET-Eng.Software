## Análise do Código Original

### Problemas Identificados
 - Falta de type-safety: Utilização de strings diretas para comparar resultados de execução, o que é propenso a erros e dificulta a manutenção em grandes sistemas
 - Uso de booleanos para representar o estado do pipelineService, o que pode levar a confusão e falta de clareza.
 - Falta de encapsulamento para o estado do pipelineService e para a construção de mensagens de email.
 - Responsabilidades mal definidas, com a classe `Pipeline` lidando tanto com a execução do pipelineService quanto com a construção de mensagens de email.
 - Método principal `run` com lógica de decisão complexa e encadeamento de if-else, dificultando a leitura do código.
 - Organização das classes em pacotes
### Alterações aplicadas
 - Criação da classe `ExecutionStatus` para encapsular o estado da pipelineService.
 - Criação da classe `EmailNotificationService` para lidar com a construção de mensagens de email, separando responsabilidades.
 - Refatoração do método `run` para melhorar a clareza e reduzir a complexidade, utilizando métodos auxiliares para cada etapa do processo.
 - Separação das classes `Project` e `ProjectBuilder` para melhor organização e clareza.
 - Alteração da organização das classes nos pacotes para seguir uma estrutura mais limpa e modular.
 - Adição do plugin jacoco para análise de cobertura de testes
 - Adição de novos testes para maior cobertura de código.
