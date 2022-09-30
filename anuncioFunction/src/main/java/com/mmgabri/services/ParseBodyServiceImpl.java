package com.mmgabri.services;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.google.common.collect.ImmutableMap;
import com.mmgabri.domain.AnuncioRequest;
import com.mmgabri.domain.File;
import lombok.SneakyThrows;
import com.mmgabri.domain.enuns.CategoriaEnum;
import com.mmgabri.domain.enuns.StatusAnuncioEnum;
import com.mmgabri.domain.enuns.TipoAnuncioEnum;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.fileupload.MultipartStream;
import org.apache.commons.io.output.ByteArrayOutputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ParseBodyServiceImpl {
    private static final Logger logger = LoggerFactory.getLogger(ParseBodyServiceImpl.class);

    @SneakyThrows
    public AnuncioRequest parse(String body, Map<String, String> headers) {

        logger.info("Iniciando parse Body");

        String contentType = getContentType(headers);

        List<File> files = new ArrayList<>();
        AnuncioRequest request = new AnuncioRequest();

        try {

            byte[] bI = Base64.decodeBase64(body.getBytes());

            String[] boundaryArray = contentType.split("=");

            byte[] boundary = boundaryArray[1].getBytes();

            ByteArrayInputStream content = new ByteArrayInputStream(bI);

            MultipartStream multipartStream = new MultipartStream(content, boundary, bI.length, null);

            ByteArrayOutputStream out = new ByteArrayOutputStream();

            boolean nextPart = multipartStream.skipPreamble();

            int countInputField = 0;

            while (nextPart) {

                countInputField++;

                String header = multipartStream.readHeaders();

                Map<String, String> allHeaders = splitHeaders(header);

                String inputFieldName = extractFields(allHeaders, "name");

                String inputFilename = inputFieldName.equals("file") ? extractFields(allHeaders, "filename") : "";

                multipartStream.readBodyData(out);

                switch (inputFieldName) {
                    case "file":
                        files.add(buildFile(out, inputFilename));
                        break;
                    case "id":
                        request.setId(out.toString());
                        break;
                    case "userId":
                        request.setUserId(out.toString());
                        break;
                    case "tipo":
                        request.setTipo(TipoAnuncioEnum.valueOf(out.toString()));
                        break;
                    case "categoria":
                        request.setCategoria(CategoriaEnum.valueOf(out.toString()));
                        break;
                    case "status":
                        request.setStatus(StatusAnuncioEnum.valueOf(out.toString()));
                        break;
                    case "titulo":
                        request.setTitulo(out.toString());
                        break;
                    case "descricao":
                        request.setDescricao(out.toString());
                        break;
                    case "valor":
                        request.setValor(out.toString());
                        break;
                    case "cep":
                        request.setCep(out.toString());
                        break;
                    default:
                        logger.info("Input Field Name Unknow");
                        break;
                }
                out.reset();
                nextPart = multipartStream.readBoundary();
            }

            if (files.size() > 0) {
                request.setFiles(files);
            }
            logger.info("Body parseado com sucesso. Quantidade de Input Field: " + countInputField);

        } catch (IOException e) {
            logger.error("Erro no parse do Body: " + e.getMessage());
        }

        return request;
    }

    private String getContentType(Map<String, String> headers) {

        if (headers != null) {
            String ct = headers.get("content-type");
            return ct != null ? ct : headers.get("Content-Type");
        } else {
            return null;
        }
    }

    private Map<String, String> splitHeaders(String readHeaders) {
        ImmutableMap.Builder<String, String> headersBuilder = new ImmutableMap.Builder<String, String>();
        String[] headers = readHeaders.split("\r\n");
        for (String headerLine : headers) {
            int index = headerLine.indexOf(':');
            if (index < 0) {
                continue;
            }
            String key = headerLine.substring(0, index);
            String value = headerLine.substring(index + 1).trim();
            headersBuilder.put(key, value);
        }
        return headersBuilder.build();
    }

    private String extractFields(Map<String, String> allHeaders, String field) {

        String contentTypeHeader = allHeaders.get("Content-Disposition");

        ImmutableMap.Builder<String, String> fieldsBuilder = new ImmutableMap.Builder<String, String>();
        String[] contentTypeHeaderParts = contentTypeHeader.split("[;,]");
        for (String contentTypeHeaderPart : contentTypeHeaderParts) {
            String[] kv = contentTypeHeaderPart.split("=");
            if (kv.length == 2) {
                fieldsBuilder.put(kv[0].trim(), kv[1].trim());
            }
        }
        String str = fieldsBuilder.build().get(field);
        String[] strSplit = str.split("\"");
        return strSplit[1];
    }

    @SneakyThrows
    private File buildFile(ByteArrayOutputStream file, String inputFilename) {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.toByteArray().length);
        metadata.setContentType("image/jpeg");
        metadata.setCacheControl("public, max-age=31536000");

        return File.builder()
                .file(new ByteArrayInputStream(file.toByteArray()))
                .fileName(inputFilename)
                .metadata(metadata)
                .build();
    }
}