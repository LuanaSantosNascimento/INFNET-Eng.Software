package org.example.banco;

import org.example.banco.util.MenuConsole;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CrudT1Application {

    public static void main(String[] args) {
        SpringApplication.run(CrudT1Application.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(MenuConsole menu) {
        return args -> menu.iniciar();
    }
}
