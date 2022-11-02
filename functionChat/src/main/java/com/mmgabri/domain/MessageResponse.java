package com.mmgabri.domain;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@Data
@NoArgsConstructor
@SuperBuilder
public class MessageResponse {
	private String _id;
	private String createdAt;
	private String text;
	private UserPayload user;
}
