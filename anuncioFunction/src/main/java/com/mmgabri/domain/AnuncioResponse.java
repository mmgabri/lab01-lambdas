package com.mmgabri.domain;

import com.mmgabri.domain.enuns.CategoriaEnum;
import com.mmgabri.domain.enuns.StatusAnuncioEnum;
import com.mmgabri.domain.enuns.TipoAnuncioEnum;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Data
@NoArgsConstructor
@SuperBuilder
public class AnuncioResponse {
	private String id;
	private String userId;
	private TipoAnuncioEnum tipo;
	private CategoriaEnum categoria;
	private StatusAnuncioEnum status;
	private String titulo;
	private String descricao;
	private int valor;
	private String cep;
	private String dataHoraCriacao;
	private List<String> imagens;
}
