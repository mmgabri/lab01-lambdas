package com.mmgabri.domain;

import lombok.Getter;
import lombok.Setter;
import com.mmgabri.domain.enuns.CategoriaEnum;
import com.mmgabri.domain.enuns.StatusAnuncioEnum;
import com.mmgabri.domain.enuns.TipoAnuncioEnum;

import java.util.List;

@Getter
@Setter
public class AnuncioRequest {
	private String id;
	private String userId;
	private TipoAnuncioEnum tipo;
	private CategoriaEnum categoria;
	private StatusAnuncioEnum status;
	private String titulo;
	private String descricao;
	private String valor;
	private String cep;
	private List<String> imagens;
	private List<File> files;
}
