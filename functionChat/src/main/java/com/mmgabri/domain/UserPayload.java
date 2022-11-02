package com.mmgabri.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@SuperBuilder
public class UserPayload {
	private String _id;
	private String avatar;
	private String name;
}
