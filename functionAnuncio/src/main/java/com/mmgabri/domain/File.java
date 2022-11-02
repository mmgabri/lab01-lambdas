package com.mmgabri.domain;

import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.InputStream;

@Builder
@Data
public class File {
    private InputStream file;
    private String fileName;
    private ObjectMetadata metadata;
}
