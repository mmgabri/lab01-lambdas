package com.mmgabri.adapter.files;

import com.amazonaws.services.s3.AmazonS3;
import com.mmgabri.adapter.files.exceptions.FileException;
import com.mmgabri.domain.File;
import com.mmgabri.services.FileService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
public class S3FileServiceImpl implements FileService {
    private final AmazonS3 s3Client;
    private final String bucketName;

    private static final Logger logger = LoggerFactory.getLogger(S3FileServiceImpl.class);

    @Override
    public List<String> uploadFile(List<File> files) {
        List<String> listUri = new ArrayList<>();

        if (files != null) {
            for (File f : files) {
                URI uri = upload(f);
                listUri.add(uri.toString());
            }
        }
        return listUri;
    }

    @Override
    public void deleteFile(String uri) {
        try {
            logger.info("Iniciando deleção da imagem");
            String fileName = uri.substring(uri.lastIndexOf("/") + 1);
            s3Client.deleteObject(bucketName, fileName);
            logger.info("deleção da imagem finalizada");
        } catch (Exception e) {
            throw new FileException("Erro de IO: " + e.getMessage());
        }
    }

    private URI upload(File file) {
        try {
            s3Client.putObject(bucketName, file.getFileName(), file.getFile(), file.getMetadata());
            return s3Client.getUrl(bucketName, file.getFileName()).toURI();
        } catch (URISyntaxException e) {
            throw new FileException("Erro ao converter URL para URI");
        } catch (Exception e) {
            throw new FileException("Erro Upload S3" + e.getMessage());
        }
    }
}
