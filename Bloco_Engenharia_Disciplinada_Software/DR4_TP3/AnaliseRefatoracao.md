# Análise de Problemas do Código - App.java

```java
import java.util.ArrayList;
import java.util.List;

public class App {
    public static void main(String[] args) {
        Order order = new Order();
        order.clientName = "João";
        order.clientEmail = "joao@email.com";
        order.products.add("Notebook");
        order.quantities.add(1);
        order.prices.add(3500.0);
        order.products.add("Mouse");
        order.quantities.add(2);
        order.prices.add(80.0);
        order.printInvoice();
        order.sendEmail();
    }
}

class Order {
    public String clientName;
    public String clientEmail;
    public List products = new ArrayList<>();
    public List quantities = new ArrayList<>();
    public List prices = new ArrayList<>();
    public double discountRate = 0.1;

    public void printInvoice() {
        double total = 0;
        System.out.println("Cliente: " + clientName);
        for (int i = 0; i < products.size(); i++) {
            System.out.println(quantities.get(i) + "x " + products.get(i) + " - R$" + prices.get(i));
            total += prices.get(i) * quantities.get(i);
        }
        System.out.println("Subtotal: R$" + total);
        System.out.println("Desconto: R$" + (total * discountRate));
        System.out.println("Total final: R$" + (total * (1 - discountRate)));
    }

    public void sendEmail() {
        EmailService.sendEmail(clientEmail, "Pedido recebido! Obrigado pela compra.");
    }

}

class EmailService {
    public static void sendEmail(String to, String message) {
        System.out.println("Enviando e-mail para " + to + ": " + message);
    }
}

class DiscountPolicy {
    public static double calculateDiscount(double amount, double rate) {
        return amount * rate;
    }
}

```

## Problemas Identificados:

- Classe Order responsável por múltiplas funcionalidades (cálculo, impressão, envio email)
- Todos os atributos da classe Order são públicos, violando encapsulamento
- Uso de 3 listas paralelas para representar produto, quantidade e preços, propenso a erros de sincronização
- DiscountPolicy está implementada mas não é usada
- Cálculo de desconto feito manualmente mesmo existindo método em DiscountPolicy
- Order diretamente acoplada à EmailService e com muitas responsabilidades (envio de email, impressão, cálculo)
- Nenhuma validação de dados de entrada ou tratamento de exceçõs
- Mensagens e textos fixos no código
- Classes sem construtores

---

## Correções Implementadas:

### Classes Criadas:

- **model**: Product, Order, Client - Encapsulam dados, validações iniciais e calculos especificos de cada entidade
- **service**: DiscountService, EmailService, InvoicePrinter, OrderService - Responsáveis por lógica de negócio e
  operações'
- **interfaces**: DiscountService, EmailService, InvoicePrinter, OrderService
- **exception**: ValidationException - Exceção personalizada para erros de validação
- **Main.java**: Classe para demonstração do uso das classes refatoradas

### Problemas Corrigidos:

- Encapsulamento com getters
- Validação em construtores e métodos
- Constantes para strings hardcoded
- Separação de lógica e apresentação
- Responsabilidades bem definidas entre classes
- Tratamento de exceções com ValidationException personalizada
- Substituição de listas paralelas por Product

