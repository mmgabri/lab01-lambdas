package com.mmgabri.domain;

import lombok.*;
import com.mmgabri.domain.enuns.CategoriaEnum;
import com.mmgabri.domain.enuns.StatusAnuncioEnum;
import com.mmgabri.domain.enuns.TipoAnuncioEnum;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnuncioRequest {
	private Anuncio anuncio;
	private List<File> files;
}
