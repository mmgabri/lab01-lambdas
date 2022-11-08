package com.mmgabri.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Reponse {
    private int statusCode;
    private String message;
}
