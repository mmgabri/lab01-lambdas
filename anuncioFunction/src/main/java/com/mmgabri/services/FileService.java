package com.mmgabri.services;

import com.mmgabri.domain.File;

import java.net.URI;
import java.util.List;

public interface FileService{
    List<URI> uploadFile(List<File> files);
    void deleteFile(String filePath);
}
