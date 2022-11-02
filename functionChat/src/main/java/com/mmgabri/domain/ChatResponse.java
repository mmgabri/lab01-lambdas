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
public class ChatResponse {
 private String chatId;
 private String text;
 private String createdAt;
 private UserPayload userConversation;
}
