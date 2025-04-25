package com.Learning.JapoApp.dao;




import com.Learning.JapoApp.entities.Lesson;
import com.Learning.JapoApp.entities.Language;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;

@Repository
public class LanguageRepository {

    public List<Lesson> cargarLecciones(String language) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            ClassPathResource resource = new ClassPathResource("languages/" + language + "/diccionario.json");
            return mapper.readValue(resource.getInputStream(), new TypeReference<List<Lesson>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public List<Language> cargarLenguajes() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            ClassPathResource resource = new ClassPathResource("languages/languages.json");
            return mapper.readValue(resource.getInputStream(), new TypeReference<List<Language>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
    public JsonNode cargarAppendix(String language, String appendixName) throws IOException {
        ClassPathResource resource = new ClassPathResource("languages/" + language + "/appendix/" + appendixName + ".json");
        String content = new String(Files.readAllBytes(Paths.get(resource.getURI())));
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readTree(content);
    }
}
