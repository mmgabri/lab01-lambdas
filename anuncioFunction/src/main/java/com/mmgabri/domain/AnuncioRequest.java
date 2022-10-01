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
	private Anuncio anuncio;
	private List<File> files;
}
