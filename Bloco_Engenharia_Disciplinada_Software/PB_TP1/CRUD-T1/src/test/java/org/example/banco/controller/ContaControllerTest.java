package org.example.banco.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.banco.dto.ContaRequestDTO;
import org.example.banco.dto.ContaResponseDTO;
import org.example.banco.exception.ContaNotFoundException;
import org.example.banco.exception.GlobalExceptionHandler;
import org.example.banco.service.ContaService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.util.List;
import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ContaController.class)
@Import(GlobalExceptionHandler.class)
class ContaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @TestConfiguration
    static class MockConfig {
        @Bean
        public ContaService contaService() {
            return Mockito.mock(ContaService.class);
        }
    }

    @Autowired
    private ContaService contaService;

    @Test
    @DisplayName("GET /contas - deve retornar lista de contas")
    void listarTodasContas() throws Exception {
        var contas = List.of(
                new ContaResponseDTO(1L, "Joao", 100.0),
                new ContaResponseDTO(2L, "Maria", 200.0)
        );
        Mockito.when(contaService.listarTodasContas()).thenReturn(contas);

        mockMvc.perform(get("/contas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].nome", is("Joao")))
                .andExpect(jsonPath("$[0].saldo", is(100.0)))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].nome", is("Maria")))
                .andExpect(jsonPath("$[1].saldo", is(200.0)));
    }

    @Test
    @DisplayName("GET /contas/{id} - deve retornar conta existente")
    void buscarContaPorId() throws Exception {
        var conta = new ContaResponseDTO(1L, "Joao", 100.0);
        Mockito.when(contaService.buscarContaPorId(1L)).thenReturn(conta);

        mockMvc.perform(get("/contas/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.nome", is("Joao")))
                .andExpect(jsonPath("$.saldo", is(100.0)));
    }

    @Test
    @DisplayName("GET /contas/{id} - deve retornar 404 se não encontrada")
    void buscarContaPorId_naoEncontrada() throws Exception {
        Mockito.when(contaService.buscarContaPorId(99L)).thenThrow(new ContaNotFoundException(99L));

        mockMvc.perform(get("/contas/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error", containsString("Conta não encontrada")))
                .andExpect(jsonPath("$.message", containsString("99")));
    }

    @Test
    @DisplayName("POST /contas - deve criar nova conta")
    void criarNovaConta() throws Exception {
        var req = new ContaRequestDTO("Ana", 150.0);
        var resp = new ContaResponseDTO(10L, "Ana", 150.0);
        Mockito.when(contaService.criarConta(eq("Ana"), eq(150.0))).thenReturn(resp);

        mockMvc.perform(post("/contas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(10)))
                .andExpect(jsonPath("$.nome", is("Ana")))
                .andExpect(jsonPath("$.saldo", is(150.0)));
    }

    @Test
    @DisplayName("PUT /contas/{id} - deve atualizar conta")
    void atualizarConta() throws Exception {
        var req = new ContaRequestDTO("Maria Silva", 120.0);
        var resp = new ContaResponseDTO(2L, "Maria Silva", 120.0);
        Mockito.when(contaService.atualizarConta(eq(2L), eq("Maria Silva"), eq(120.0))).thenReturn(resp);

        mockMvc.perform(put("/contas/2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(2)))
                .andExpect(jsonPath("$.nome", is("Maria Silva")))
                .andExpect(jsonPath("$.saldo", is(120.0)));
    }

    @Test
    @DisplayName("PATCH /contas/{id}/saldo - deve atualizar saldo")
    void atualizarSaldo() throws Exception {
        var req = new ContaRequestDTO(null, 200.0);
        var resp = new ContaResponseDTO(1L, "Joao", 200.0);
        Mockito.when(contaService.atualizarSaldo(eq(1L), eq(200.0))).thenReturn(resp);

        mockMvc.perform(patch("/contas/1/saldo")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.nome", is("Joao")))
                .andExpect(jsonPath("$.saldo", is(200.0)));
    }

    @Test
    @DisplayName("DELETE /contas/{id} - deve excluir conta")
    void excluirConta() throws Exception {
        Mockito.doNothing().when(contaService).excluirConta(3L);
        mockMvc.perform(delete("/contas/3"))
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("DELETE /contas/{id} - deve retornar 404 se não encontrada")
    void excluirConta_naoEncontrada() throws Exception {
        Mockito.doThrow(new ContaNotFoundException(99L)).when(contaService).excluirConta(99L);
        mockMvc.perform(delete("/contas/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error", containsString("Conta não encontrada")))
                .andExpect(jsonPath("$.message", containsString("99")));
    }
}
